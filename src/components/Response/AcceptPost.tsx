// DownloadReport.tsx
import { useEffect } from "react";
import { useUpdateReportStatus } from "@/api/response";
import { ConfirmAction } from "@/components/custom";
import useDisclosure from "@/hooks/useDisclosure";
import { Button } from "@/components/ui/button";


export default function RejectPost({ id }: { id: number }) {
  const { mutate, isLoading, isSuccess } = useUpdateReportStatus();
  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    isSuccess && onClose();
  }, [isSuccess, onClose]);

  return (
    <>
      <Button className="px-6 h-[44px]" onClick={onOpen}>
        Accept post
      </Button>
      <ConfirmAction
        isOpen={isOpen}
        onClose={onClose}
        message="Are you sure you want to accept this report?"
        onContinue={() => mutate({report_id: id, status_id: 25})}
        isLoading={isLoading}
      />
    </>
  );
}