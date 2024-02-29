import { useUpdateBudgetStatus } from "@/api/democracy/budgeting";
import FormSelect from "@/components/custom/FormSelect";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { SelectItem } from "@/components/ui/select";
import useDisclosure from "@/hooks/useDisclosure";
import {
  UpdateBudgetStatusSchema,
  updateBudgetStatusSchema,
} from "@/schemas/budgetingSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function UpdateBudgetStatus({ budget }: { budget: BudgetItem }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const form = useForm<UpdateBudgetStatusSchema>({
    resolver: zodResolver(updateBudgetStatusSchema),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const { mutate, isLoading, isSuccess } = useUpdateBudgetStatus();

  useEffect(() => {
    isSuccess && onClose();
  }, [isSuccess]);

  const onSubmit = (data: UpdateBudgetStatusSchema) => {
    mutate({ ...data, budget_id: budget.id });
  };
  return (
    <div>
      <div className="font-normal" onClick={onOpen}>
        Update Status
      </div>

      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="min-w-[600px] rounded-[40px] ">
          <h4 className="pb-3 border-b border-dark/10 ">
            Update Budget Status
          </h4>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex items-center justify-between ">
                <p className="text-subtle_text">Status</p>
                <div className=" w-full max-w-[350px]">
                  <FormSelect
                    name="status"
                    label="Status"
                    control={control}
                    placeholder="Enter status"
                    errors={errors}
                  >
                    <SelectItem value="proposed">Proposed</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </FormSelect>
                </div>
              </div>

              <div className="flex items-center justify-end">
                <Button isLoading={isLoading} className="w-[180px]">
                  Update Status
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
