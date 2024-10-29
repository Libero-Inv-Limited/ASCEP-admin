// DownloadReport.tsx
import { useEffect } from "react";
import { useDeleteReport } from "@/api/response";
import { ConfirmAction } from "@/components/custom";
import useDisclosure from "@/hooks/useDisclosure";

export default function DeleteReport({ id }: { id: number}) {
  const { mutate, isLoading, isSuccess } = useDeleteReport();
  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    isSuccess && onClose();
  }, [isSuccess, onClose]);

  return (
    <div>
      <div className="font-normal cursor-pointer" onClick={onOpen}>
        Delete
      </div>
      <ConfirmAction
        isOpen={isOpen}
        onClose={onClose}
        message="Are you sure you want to delete this report?"
        onContinue={() => mutate(id)}
        isLoading={isLoading}
      />
    </div>
  );
}