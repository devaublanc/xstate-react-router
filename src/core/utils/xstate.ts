import { EventObject } from "xstate";

export const wrongEventErrorHandlerFactory =
  (machineName: string) => (_context: any, event: EventObject) => {
    const errorString = `[XSTATE ERROR]: Invalid call of event ${event.type} in the machine ${machineName}`;
    console.error(errorString);
  };
