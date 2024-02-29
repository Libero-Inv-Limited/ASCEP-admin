import { useDeleteBudget } from "@/api/democracy/budgeting";
import { ConfirmAction } from "@/components/custom";
import useDisclosure from "@/hooks/useDisclosure";
import { useEffect } from "react";

export default function DeleteBudget({ id }: { id: number }) {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const { mutate, isLoading, isSuccess } = useDeleteBudget();

  useEffect(() => {
    isSuccess && onClose();
  }, [isSuccess]);

  return (
    <div>
      <div className="font-normal cursor-pointer" onClick={onOpen}>
        Delete Budget
      </div>
      <ConfirmAction
        isOpen={isOpen}
        onClose={onClose}
        message="Are you sure you want to delete this budget?"
        onContinue={() => mutate(id)}
        isLoading={isLoading}
      />
    </div>
  );
}
