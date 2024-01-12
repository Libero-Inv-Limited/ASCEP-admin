import { Dialog, DialogContent } from "../ui/dialog";

interface ConfirmActionProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConfirmAction({ isOpen, onClose }: ConfirmActionProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="min-w-[700px]"
        style={{ borderRadius: 40, padding: 32 }}
      >
        <p>Are you sure?</p>
      </DialogContent>
    </Dialog>
  );
}
