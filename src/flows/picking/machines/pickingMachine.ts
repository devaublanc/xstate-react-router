import { createMachine } from "xstate";

import { routes } from "../../routes";

import { PickingMachineContext, PickingMachineEvents } from "./types";

const contextInitialState: PickingMachineContext = {
  orderId: null,
};

export const PICKING_MACHINE_ID = "pickingMachine";

export const pickingMachine = createMachine({
  preserveActionOrder: true,
  id: PICKING_MACHINE_ID,
  predictableActionArguments: true,
  tsTypes: {} as import("./pickingMachine.typegen").Typegen0,
  schema: {
    context: {} as PickingMachineContext,
    events: {} as PickingMachineEvents,
  },

  context: contextInitialState,
  initial: "idle",
  states: {
    idle: {
      meta: {
        route: routes.picking.idle,
      },
      on: {
        GO_TO_SCAN_ITEMS: {
          target: "scanningItems",
        },
      },
    },
    scanningItems: {
      meta: {
        route: routes.picking.scanItems,
      },
      on: {
        GO_TO_SCAN_CONTAINERS: {
          target: "scanningContainers",
        },
      },
    },
    scanningContainers: {
      meta: {
        route: routes.picking.scanContainers,
      },
      on: {
        FINISH: {
          target: "idle",
        },
      },
    },
  },
});
