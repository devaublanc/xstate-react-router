export type PickingMachineContext = {
  orderId: string | null;
};

export type PickingMachineEvents =
  | { type: "GO_TO_SCAN_ITEMS" }
  | { type: "GO_TO_SCAN_CONTAINERS" }
  | { type: "FINISH" };
