import { useDeleteSDG } from "@/api/sdg";
import { ConfirmAction } from "@/components/custom";
import useDisclosure from "@/hooks/useDisclosure";
import { useEffect } from "react";

export default function DeleteSDG({ id }: { id: number }) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { mutate, isLoading, isSuccess } = useDeleteSDG();

  useEffect(() => {
    isSuccess && onClose();
  }, [isSuccess]);

  return (
    <div>
      <div onClick={onOpen} className="table-menu">
        Delete SDG
      </div>

      <ConfirmAction
        isOpen={isOpen}
        onClose={onClose}
        onContinue={() => mutate(id)}
        message="Are you sure you want to delete this SDG?"
        isLoading={isLoading}
      />
    </div>
  );
}
