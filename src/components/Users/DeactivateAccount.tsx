import useDisclosure from "@/hooks/useDisclosure";
import { Dialog, DialogContent } from "../ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { reasonSchema } from "@/schemas/userSchemas";
import { Form } from "../ui/form";
import { FormInput } from "../custom";
import { Button } from "../ui/button";
import { useUpdateUserStatus } from "@/api/user";
import { useEffect } from "react";

export default function DeactivateAccount({
  id,
  status,
}: {
  id: number | string;
  status: string;
}) {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const form = useForm<z.infer<typeof reasonSchema>>({
    resolver: zodResolver(reasonSchema),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const { mutate, isLoading, isSuccess } = useUpdateUserStatus();

  useEffect(() => {
    if (isSuccess) onClose();
  }, [isSuccess]);

  const onSubmit = () => {
    const formData = new FormData();

    formData.append("user_id", id.toString());
    formData.append("status", "deactivated");

    mutate(formData);
  };

  const handleActivate = () => {
    const formData = new FormData();

    formData.append("user_id", id.toString());
    formData.append("status", "active");

    mutate(formData);
  };

  return (
    <div>
      <div onClick={onOpen} className="table-menu">
        {status === "deactivated" ? "Activate" : "Deactivate"} Account
      </div>

      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent
          className="min-w-[700px]"
          style={{ borderRadius: 40, padding: 32 }}
        >
          <h4 className="pb-3 border-b border-dark/10 ">
            {status === "deactivated" ? "Activate" : "Suspend"} Account
          </h4>

          <p className="text-base text-subtle_text">
            {status === "deactivated"
              ? "Are you sure you want to activate this user accout?"
              : " You are about to suspend “Dexter Olaniyi” this would prevent access  to this user’s account, but can be undone by activating it."}
          </p>

          {status === "deactivated" ? (
            <div className="flex justify-end">
              <Button onClick={handleActivate} isLoading={isLoading}>
                Activate User
              </Button>
            </div>
          ) : (
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
                  <p className=" text-dark">Suspend?</p>

                  <Button isLoading={isLoading}>Suspend User</Button>
                </div>
              </form>
            </Form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
