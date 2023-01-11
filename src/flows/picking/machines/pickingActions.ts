import { useNavigate } from "react-router";
import { routes } from "../../routes";

export function usePickingActionsImplems() {
  const navigate = useNavigate();

  const goToScanItems = () => {
    navigate(routes.picking.scanItems);
  };

  return {
    goToScanItems,
  };
}
