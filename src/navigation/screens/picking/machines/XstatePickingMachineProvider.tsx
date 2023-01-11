import { useInterpret } from "@xstate/react";
import { InterpreterFrom } from "xstate";

import { createContext, useMemo } from "react";
import { usePickingActionsImplems } from "./pickingActions";
import { usePickingServicesImplems } from "./pickingServices";
import { pickingMachine, PICKING_MACHINE_ID } from "./pickingMachine";
import { useNavigate } from "react-router-dom";

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

  const pickingService = useInterpret(pickingMachine, {
    actions,
    services,
  }).onTransition(state => {
    // Synchonize Xstate with react router
    console.log(state.meta[`${PICKING_MACHINE_ID}.${state.value}`]);
  });

  const values = useMemo(() => ({ pickingService }), [pickingService]);

  return (
    <XStatePickingContext.Provider value={values}>
      {children}
    </XStatePickingContext.Provider>
  );
}
