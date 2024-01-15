import useDisclosure from "@/hooks/useDisclosure";
import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetUserPasswordSchema } from "@/schemas/userSchemas";
import { Form } from "../ui/form";
import { FormInput } from "../custom";
import { z } from "zod";
import { useResetUserPassword } from "@/api/user";
import { useUserSettingsContext } from "@/providers/UserSettingsProvider";
import { useEffect } from "react";

export default function ResetPassword() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { userObj } = useUserSettingsContext();

  const form = useForm<z.infer<typeof resetUserPasswordSchema>>({
    resolver: zodResolver(resetUserPasswordSchema),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const { mutate, isLoading, isSuccess } = useResetUserPassword();

  const onSubmit = (data: z.infer<typeof resetUserPasswordSchema>) => {
    mutate({ password: data.password, user_id: userObj!.id });
  };

  useEffect(() => {
    if (isSuccess) onClose();
  }, [isSuccess]);

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
          <h4 className="pb-3 border-b border-dark/10 ">Reset Password</h4>

          <div className="space-y-8">
            <p className="text-base text-subtle_text">
              Reset users password, by sending a mail prompt for user to change
              password
            </p>
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="flex items-center justify-between ">
                  <p className="text-subtle_text">New Password</p>
                  <div className=" w-full max-w-[350px]">
                    <FormInput
                      name="password"
                      label="New Password"
                      control={control}
                      placeholder="Enter password"
                      type="password"
                      errors={errors}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between ">
                  <p className="text-subtle_text">Re-enter New Password</p>
                  <div className=" w-full max-w-[350px]">
                    <FormInput
                      name="confirmPassword"
                      label="Old Password"
                      control={control}
                      placeholder="Enter password"
                      type="password"
                      errors={errors}
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button isLoading={isLoading}>Reset password</Button>
                </div>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
