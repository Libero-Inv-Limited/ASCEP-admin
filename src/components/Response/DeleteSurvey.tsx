// DeleteReport.tsx
import { useEffect } from "react";
import { useDeleteSurvey } from "@/api/response";
import { ConfirmAction } from "@/components/custom";
import useDisclosure from "@/hooks/useDisclosure";

export default function DeleteSurvey({ id }: { id: number}) {
  const { mutate, isLoading, isSuccess } = useDeleteSurvey();
  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    isSuccess && onClose();
  }, [isSuccess, onClose]);

  return (
    <div>
      <div className="font-semibold text-[12px] cursor-pointer ps-3 " onClick={onOpen}>
        Delete
      </div>
      <ConfirmAction
        isOpen={isOpen}
        onClose={onClose}
        message="Are you sure you want to delete this survey?"
        onContinue={() => mutate(id)}
        isLoading={isLoading}
      />
    </div>
  );
}