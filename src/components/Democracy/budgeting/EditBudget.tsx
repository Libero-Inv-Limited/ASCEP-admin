import { Button } from "@/components/ui/button";
import { AddBudget } from "..";
import useDisclosure from "@/hooks/useDisclosure";

export default function EditBudget({ budget }: { budget: BudgetInfo }) {
  const { onClose, onOpen, isOpen } = useDisclosure();

  return (
    <div>
      <Button size="sm" onClick={onOpen}>
        Edit Budget
      </Button>
      {isOpen && (
        <AddBudget budget={budget} isOpen={isOpen} onClose={onClose} />
      )}
    </div>
  );
}
