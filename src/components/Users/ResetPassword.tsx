import useDisclosure from "@/hooks/useDisclosure";
import { Dialog, DialogContent } from "../ui/dialog";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";

export default function ResetPassword() {
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
        Reset Password
      </div>

      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent
          className="min-w-[700px]"
          style={{ borderRadius: 40, padding: 32 }}
        >
          <h4 className="pb-3 border-b border-dark/10 ">Delete Account</h4>

          <div className="space-y-8">
            <p className="text-base text-subtle_text">
              Reset users password, by sending a mail prompt for user to change
              password
            </p>

            <div className="flex justify-end">
              <Button onClick={onSubmit}>Reset password</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
