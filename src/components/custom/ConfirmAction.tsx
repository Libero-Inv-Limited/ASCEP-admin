import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";

interface ConfirmActionProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  onContinue: () => void;
  isLoading?: boolean;
}

export default function ConfirmAction({
  isOpen,
  onClose,
  message,
  onContinue,
  isLoading,
}: ConfirmActionProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="min-w-[700px] space-y-6"
        style={{ borderRadius: 40, padding: 32 }}
      >
        <DialogTitle></DialogTitle>
        <p className="text-xl ">{message}</p>

        <div className="flex items-center justify-end gap-5">
          <Button
            onClick={onClose}
            variant="outline-primary"
            className="w-[160px]"
            disabled={isLoading}
          >
            No
          </Button>
          <Button
            onClick={onContinue}
            className="w-[160px]"
            isLoading={isLoading}
          >
            Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
