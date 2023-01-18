export const routes = {
  root: "/",
  picking: {
    root: "/picking",
    scanItems: "/picking/scan-items",
    scanContainers: "/picking/scan-containers",
  },
  inbound: {
    root: "/inbound",
    preDropping: "/inbound/pre-dropping",
    dropping: "/inbound/dropping",
  },
  inventory: {
    root: "/inventory",
    stockChecks: {
      root: "/inventory/stock-checks",
    },
    stockCorrections: {
      root: "/inventory/stock-corrections",
      searchResult: "/inventory/stock-corrections/search-result",
      declareStockCorrections:
        "/inventory/stock-corrections/declare-stock-corrections",
    },
  },
};
