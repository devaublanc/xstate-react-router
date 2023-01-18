// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {};
  missingImplementations: {
    actions: never;
    delays: never;
    guards: never;
    services: never;
  };
  eventsCausingActions: {
    wrongEventErrorHandler: "*";
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {};
  eventsCausingServices: {};
  matchesStates:
    | "idle"
    | "idle.idleSubstateFoo"
    | "scanningContainers"
    | "scanningItems"
    | "test"
    | { idle?: "idleSubstateFoo" };
  tags: never;
}
