import { useInterpret } from "@xstate/react";
import { InterpreterFrom } from "xstate";

import { createContext, useContext, useMemo } from "react";
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
      // subscribes to state changes
      const routeFromXState: string | undefined =
        state.meta[`${PICKING_MACHINE_ID}.${state.value}`]?.route;
      if (routeFromXState && routeFromXState !== location.pathname) {
        // console.log("navigate to", routeFromState, location.pathname);
        navigate(routeFromXState);
      }
    }
  );

  // Synchonize Xstate with react router
  // const routeFromState: string | undefined =
  //   state.meta[`${PICKING_MACHINE_ID}.${state.value}`];
  // console.log("=======", state.value);

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
