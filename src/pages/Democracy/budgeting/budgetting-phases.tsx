import BudgetingPhasesTable from "@/components/Democracy/budgeting/BudgetingTable";
import { useNavigationContext } from "@/contexts/NavigationContext";
import { useEffect } from "react";

export default function BudgetingPhasesPage() {
  const { setBreadcrumbs, activeLink } = useNavigationContext();

  useEffect(() => {
    setBreadcrumbs([
      {
        label: "main",
        link: "/main",
      },
      {
        label: "dialogue",
        link: "/democracy",
      },
      {
        label: "Requests",
        link: "/dialogue/requests",
      },
    ]);
  }, [activeLink]);
  return (
    <div className="page-wrapper">
      <BudgetingPhasesTable />
    </div>
  );
}
