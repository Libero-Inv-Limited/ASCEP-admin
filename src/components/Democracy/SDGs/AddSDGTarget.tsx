import { useAddSDGTarget } from "@/api/sdg";
import { FormInput } from "@/components/custom";
import FormTextArea from "@/components/custom/FormTextArea";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import useDisclosure from "@/hooks/useDisclosure";
import {
  AddSDGTargetSchema,
  addSDGTargetSchema,
} from "@/schemas/democracySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function AddSDGTarget({ id }: { id: number }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const form = useForm<AddSDGTargetSchema>({
    resolver: zodResolver(addSDGTargetSchema),
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  const { mutate, isLoading, isSuccess } = useAddSDGTarget();

  useEffect(() => {
    isSuccess && onClose();
  }, [isSuccess]);

  const onSubmit = (data: AddSDGTargetSchema) => {
    mutate({ sdgs_id: id, ...data });
  };
  return (
    <Dialog open={isOpen}>
      <div onClick={onOpen} className="table-menu">
        Add Target
      </div>
      <DialogContent>
        <div>
          <h4>Add Target</h4>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex items-center justify-between ">
                <p className="text-subtle_text">Title</p>
                <div className=" w-full max-w-[350px]">
                  <FormInput
                    name="code"
                    label="Code"
                    control={control}
                    placeholder="Enter code"
                    errors={errors}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between ">
                <p className="text-subtle_text">Description</p>
                <div className=" w-full max-w-[350px]">
                  <FormTextArea
                    control={control}
                    name="description"
                    placeholder="Title"
                    errors={errors}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button isLoading={isLoading}>Add Target</Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
