import { useInterpret } from "@xstate/react";
import { InterpreterFrom } from "xstate";

import { createContext, useContext, useEffect, useMemo } from "react";
import { usePickingActionsImplems } from "./pickingActions";
import { usePickingServicesImplems } from "./pickingServices";
import { pickingMachine, PICKING_MACHINE_ID } from "./pickingMachine";
import { useLocation, useNavigate } from "react-router-dom";

export const XStatePickingContext = createContext({
  pickingService: {} as InterpreterFrom<typeof pickingMachine>,
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

  const pickingService = useInterpret(
    pickingMachine,
    {
      actions,
      services,
    },
    state => {
      // synchonize react router with Xstate
      const routeFromXState: string | undefined =
        state.meta[`${PICKING_MACHINE_ID}.${state.value}`]?.route;
      if (routeFromXState && routeFromXState !== location.pathname) {
        navigate(routeFromXState);
      }
    }
  );

  useEffect(() => {
    const onGoBack = () => {
      pickingService.send("GO_BACK");
    };
    window.addEventListener("popstate", onGoBack);
    return () => window.removeEventListener("popstate", onGoBack);
  }, []);

  const values = useMemo(() => ({ pickingService }), [pickingService]);

  return (
    <XStatePickingContext.Provider value={values}>
      {children}
    </XStatePickingContext.Provider>
  );
}

export function usePickingService() {
  const globalServices = useContext(XStatePickingContext);
  return globalServices.pickingService;
}
