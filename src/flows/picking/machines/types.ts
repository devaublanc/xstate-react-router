export type PickingMachineContext = {
  orderId: string | null;
};

export type PickingMachineEvents =
  | { type: "GO_BACK" }
  | { type: "GO_TO_SCAN_ITEMS" }
  | { type: "GO_TO_SCAN_CONTAINERS" }
  | { type: "EXIT" }
  | { type: "GO_TO_IDLE_SUBSTATE" }
  | { type: "GO_TO_TEST" }
  | { type: "FINISH" };
