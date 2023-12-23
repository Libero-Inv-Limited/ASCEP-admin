import useDisclosure from "@/hooks/useDisclosure";
import { Dialog, DialogContent } from "../ui/dialog";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";

export default function Reset2FA() {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const { toast } = useToast();

  const onSubmit = () => {
    toast({
      title: "Success!",
      variant: "success",
      description: `Password reset successful`,
      duration: 2000,
    });
    onClose();
  };

  return (
    <div>
      <div onClick={onOpen} className="table-menu">
        Reset 2FA
      </div>

      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent
          className="min-w-[700px]"
          style={{ borderRadius: 40, padding: 32 }}
        >
          <h4 className="pb-3 border-b border-dark/10 ">Reset 2FA </h4>

          <div className="space-y-8">
            <p className="text-base text-subtle_text">
              Reset users two factor authentication
            </p>

            <div className="flex justify-end">
              <Button onClick={onSubmit}>Reset 2FA</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
