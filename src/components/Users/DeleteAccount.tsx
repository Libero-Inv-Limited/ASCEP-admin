import useDisclosure from "@/hooks/useDisclosure";
import { Dialog, DialogContent } from "../ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "../ui/use-toast";
import { reasonSchema } from "@/schemas/userSchemas";
import { Form } from "../ui/form";
import { FormInput } from "../custom";
import { Button } from "../ui/button";

export default function DeleteAccount() {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const form = useForm<z.infer<typeof reasonSchema>>({
    resolver: zodResolver(reasonSchema),
  });

  const { toast } = useToast();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = () => {
    toast({
      title: "Success!",
      variant: "success",
      description: `User account deleted`,
      duration: 1000,
    });
    onClose();
  };

  console.log(errors);

  return (
    <div>
      <div onClick={onOpen} className="text-red-500 table-menu">
        Delete Account
      </div>

      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent
          className="min-w-[700px]"
          style={{ borderRadius: 40, padding: 32 }}
        >
          <h4 className="pb-3 border-b border-dark/10 ">Delete Account</h4>

          <p className="text-base text-subtle_text">
            You are about to delete “Dexter Olaniyi” this would erase this
            user’s account, It can not be undone.
          </p>

          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex items-center justify-between ">
                <p className="text-subtle_text">Reason</p>
                <div className=" w-full max-w-[350px]">
                  <FormInput
                    name="reason"
                    control={control}
                    label="Reason"
                    placeholder="Enter text here"
                    errors={errors}
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-4">
                <p className=" text-dark">Delete?</p>

                <Button>Delete User</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}