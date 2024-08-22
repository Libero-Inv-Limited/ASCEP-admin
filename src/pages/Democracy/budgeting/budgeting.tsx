import { AddBudget } from "@/components/Democracy";
import BudgetsTable from "@/components/Democracy/budgeting/BudgetsTable";
import { Button } from "@/components/ui/button";
import { useNavigationContext } from "@/contexts/NavigationContext";
import useDisclosure from "@/hooks/useDisclosure";
import { useEffect } from "react";

export default function BudgetingPage() {
  const { setBreadcrumbs, activeLink } = useNavigationContext();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    setBreadcrumbs([
      {
        label: "main",
        link: "/main",
      },
      {
        label: "democracy",
        link: "/democracy",
      },
      {
        label: "budgeting",
        link: "/democracy/budgeting",
      },
    ]);
  }, [activeLink]);

  return (
    <div className="page-wrapper">
      <div className="flex items-center justify-between">
        <h3>Budgets</h3>

        <Button onClick={onOpen}>Add Budget</Button>
      </div>
      <div>
        <BudgetsTable />
      </div>
      <AddBudget onClose={onClose} isOpen={isOpen} />
    </div>
  );
}
