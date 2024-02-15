import { Dialog, DialogContent } from "@/components/ui/dialog";
import FormSelect from "../../custom/FormSelect";
import { useForm } from "react-hook-form";
import { SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { changeInittiativeStatusSchema } from "@/schemas/InitiativesSchema";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { useChangeInitiativeStatus } from "@/api/democracy/initiatives";
import { useEffect } from "react";
import useDisclosure from "@/hooks/useDisclosure";

export default function ChangeInitiativeStatus({ id }: { id: string }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const form = useForm<z.infer<typeof changeInittiativeStatusSchema>>({
    resolver: zodResolver(changeInittiativeStatusSchema),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const { mutate, isLoading, isSuccess } = useChangeInitiativeStatus();

  useEffect(() => {
    isSuccess && onClose();
  }, [isSuccess]);

  const handleUpdate = (
    data: z.infer<typeof changeInittiativeStatusSchema>
  ) => {
    mutate({ ...data, initiative_id: id });
  };

  return (
    <div>
      <div onClick={onOpen} className="table-menu">
        Change Status
      </div>
      <Dialog open={isOpen} onOpenChange={onClose}>
        {/* <DialogTrigger></DialogTrigger> */}
        <DialogContent
          style={{ borderRadius: 40, padding: 32 }}
          className=" min-w-[500px] "
        >
          <div className="space-y-8">
            <h4 className="pb-3 border-b h-fu border-dark/10 ">
              Change Status
            </h4>
            <Form {...form}>
              <form className="space-y-8" onSubmit={handleSubmit(handleUpdate)}>
                <FormSelect
                  control={control}
                  name="status"
                  placeholder="Select status"
                  label="Status"
                  errors={errors}
                >
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </FormSelect>

                <div className="flex justify-end">
                  <Button type="submit" isLoading={isLoading}>
                    Update Status
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

const statusOptions = [
  {
    value: "in review",
    label: "In Review",
  },
  {
    value: "open",
    label: "Open",
  },
  {
    value: "completed",
    label: "Completed",
  },
  {
    value: "rejected",
    label: "Rejected",
  },
];
