import GoBackButton from "@/components/custom/GoBackButton";
import BudgetingPhasesTable from "@/components/Democracy/budgeting/BudgetingPhasesTable";
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
        link: "/dialogue",
      },
      {
        label: "Requests",
        link: "/dialogue/requests",
      },
    ]);
  }, [activeLink]);
  return (
    <div className="page-wrapper">
      <GoBackButton link="/dialogue" />

      <BudgetingPhasesTable />
    </div>
  );
}
