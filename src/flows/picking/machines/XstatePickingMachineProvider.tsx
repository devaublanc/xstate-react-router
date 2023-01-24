import { useInterpret } from "@xstate/react";
import { InterpreterFrom } from "xstate";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { usePickingActionsImplems } from "./pickingActions";
import { usePickingServicesImplems } from "./pickingServices";
import { pickingMachine, PICKING_MACHINE_ID } from "./pickingMachine";
import { useLocation, useNavigate } from "react-router-dom";
import { useDisclosure } from "../../../core/useDisclosure";
import React from "react";

export const XStatePickingContext = createContext({
  confirm: () => {},
  cancel: () => {},
  pickingService: {} as InterpreterFrom<typeof pickingMachine>,
  isConfirmOpen: false,
  withGoBackConfirmation: false,
  setWithGoBackConfirmation: (confirm: boolean) => {},
});

export function XStatePickingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const actions = usePickingActionsImplems();
  const services = usePickingServicesImplems();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    isOpen: isConfirmOpen,
    open: showConfirmModal,
    close: cancel,
  } = useDisclosure();

  const [withGoBackConfirmation, setWithGoBackConfirmation] = useState(false);

  const pickingService = useInterpret(
    pickingMachine,
    {
      actions,
      services,
    },
    state => {
      // synchonize react router with Xstate
      const hasNestedSubstate = Object.keys(state.value)[0] === "0";
      const metaKey = hasNestedSubstate
        ? state.value
        : Object.keys(state.value)[0];

      const routeFromXState: string | undefined =
        state.meta[`${PICKING_MACHINE_ID}.${metaKey}`]?.route;

      if (routeFromXState && routeFromXState !== location.pathname) {
        navigate(routeFromXState);
      }
    }
  );

  const goBack = useCallback(() => {
    pickingService.send("GO_BACK");
  }, []);

  const confirm = useCallback(() => {
    goBack();
  }, [goBack]);

  useEffect(() => {
    const f = withGoBackConfirmation ? showConfirmModal : goBack;
    window.addEventListener("popstate", f);
    return () => window.removeEventListener("popstate", f);
  }, [goBack, withGoBackConfirmation]);

  const values = useMemo(
    () => ({
      pickingService,
      confirm,
      cancel,
      isConfirmOpen,
      setWithGoBackConfirmation,
      withGoBackConfirmation,
    }),
    [
      pickingService,
      confirm,
      cancel,
      isConfirmOpen,
      setWithGoBackConfirmation,
      withGoBackConfirmation,
    ]
  );

  return (
    <XStatePickingContext.Provider value={values}>
      {children}
    </XStatePickingContext.Provider>
  );
}

export function usePickingServiceContext() {
  return useContext(XStatePickingContext);
}

export function usePickingService() {
  const globalServices = useContext(XStatePickingContext);
  return globalServices.pickingService;
}
