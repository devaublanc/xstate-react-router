import { useInterpret } from "@xstate/react";
import { InterpreterFrom } from "xstate";

import { createContext, useMemo } from "react";
import { usePickingActionsImplems } from "./pickingActions";
import { usePickingServicesImplems } from "./pickingServices";
import { pickingMachine } from "./pickingMachine";

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

  const pickingService = useInterpret(pickingMachine, {
    actions,
    services,
  }).onTransition(state => {
    console.log({ state });
  });

  const values = useMemo(() => ({ pickingService }), [pickingService]);

  return (
    <XStatePickingContext.Provider value={values}>
      {children}
    </XStatePickingContext.Provider>
  );
}
