/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FormInput } from "@/components/custom";
import FormTextArea from "@/components/custom/FormTextArea";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import useDisclosure from "@/hooks/useDisclosure";
import { useForm } from "react-hook-form";
import AddBudgetPhase from "./AddBudgetPhase";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AddBudgetPhaseSchema,
  AddBudgetSchema,
  addBudgetSchema,
} from "@/schemas/budgetingSchema";
import { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import {
  useCreateBudgetSchema,
  useGetallBudgetPhases,
} from "@/api/democracy/budgeting";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface AddBudgetProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddBudget({ isOpen, onClose }: AddBudgetProps) {
  const {
    isOpen: isAddPhaseOpen,
    onOpen: onAddPhaseOpen,
    onClose: onAddphaseClose,
  } = useDisclosure();
  const [selectedPhases, setSelectedPhases] = useState<AddBudgetPhaseSchema[]>(
    []
  );
  const [phasesOptions, setPhasesOptions] = useState<BudgetPhaseModule[]>([]);
  const [phasesError, setPhasesError] = useState<boolean>(false);
  const form = useForm<AddBudgetSchema>({
    resolver: zodResolver(addBudgetSchema),
  });

  const { data, isLoading: loadingPhases } = useGetallBudgetPhases();

  useEffect(() => {
    if (data && !!data?.length) setPhasesOptions(data);
  }, [data]);

  useEffect(() => {
    if (selectedPhases?.length) {
      setPhasesOptions(
        phasesOptions.filter(
          (phaseOption) =>
            !selectedPhases.find(
              (selectedPhase) =>
                selectedPhase.phase_module_code ===
                phaseOption.phase_module_code
            )
        )
      );
    }
  }, [selectedPhases]);

  console.log(phasesOptions);

  const addPhase = (phase: AddBudgetPhaseSchema) => {
    setSelectedPhases((prev) => [...prev, phase]);
    setPhasesError(false);
  };

  const removePhase = (id: number) => {
    setSelectedPhases((prev) => prev.filter((phase, i) => i !== id && phase));
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  const { mutate, isLoading, isSuccess } = useCreateBudgetSchema();

  useEffect(() => {
    if (isSuccess) {
      reset();
      onClose();
    }
  }, [isSuccess]);

  const onSubmit = (data: AddBudgetSchema) => {
    const payload: CreateBudgetPayload = {
      ...data,
      // @ts-ignore
      // phases: selectedPhases,
      phases: selectedPhases.map((phase, i) => ({ ...phase, phase_index: i })),
    };
    mutate(payload);
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="!rounded-[40px] min-w-[680px]">
        <h4 className="pb-3 border-b border-dark/10 ">Add a Budget</h4>

        <div className="pt-8 space-y-8 max-h-[75vh] overflow-y-auto custom-scrollbar pr-2">
          <Form {...form}>
            <form className="space-y-6">
              <div className="flex items-center justify-between ">
                <p className="text-subtle_text">Title</p>
                <div className=" w-full max-w-[350px]">
                  <FormInput
                    name="title"
                    label="Title"
                    control={control}
                    placeholder="Enter title"
                    errors={errors}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between ">
                <p className="text-subtle_text">Description</p>
                <div className=" w-full max-w-[350px]">
                  <FormTextArea
                    name="description"
                    label="Description"
                    control={control}
                    placeholder="Enter description"
                    errors={errors}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between ">
                <p className="text-subtle_text">Time Frame</p>
                <div className=" w-full max-w-[350px]">
                  <div className="flex gap-2">
                    <FormInput
                      name="start_date"
                      label="Start Date"
                      control={control}
                      placeholder="Enter start date"
                      type="date"
                      errors={errors}
                    />
                    <FormInput
                      name="end_date"
                      label="End Date"
                      control={control}
                      placeholder="Enter end date"
                      type="date"
                      errors={errors}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between ">
                <p className="text-subtle_text">Total Amount</p>
                <div className=" w-full max-w-[350px]">
                  <FormInput
                    name="total_amount"
                    label="Total amount"
                    control={control}
                    placeholder="Enter total amount"
                    errors={errors}
                    type="number"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between ">
                <p className="text-subtle_text">Fiscal year</p>
                <div className=" w-full max-w-[350px]">
                  <FormInput
                    name="fiscal_year"
                    label="Fiscal year"
                    control={control}
                    placeholder="Enter fiscal year "
                    errors={errors}
                    type="number"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <p className="text-text">
                  Select the Phases involed with this budget and enter their
                  start and end dates in accordance
                </p>
                {phasesError && (
                  <div className="text-sm text-red-500">
                    Add at least one phase to continue
                  </div>
                )}

                <div className="flex flex-wrap gap-3">
                  {selectedPhases.map((phase, i) => (
                    <div
                      className="flex items-center gap-3 p-1 text-white bg-black rounded-lg "
                      key={i}
                    >
                      <p>{phase.phase_name}</p>
                      <IoCloseOutline
                        onClick={() => removePhase(i)}
                        className="text-base cursor-pointer"
                      />
                    </div>
                  ))}
                </div>

                <div className="ml-auto">
                  <Button
                    type="button"
                    variant="outline-primary"
                    onClick={onAddPhaseOpen}
                  >
                    Add Budget Phase
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-end">
                <Button
                  type="submit"
                  onClick={handleSubmit(onSubmit)}
                  isLoading={isLoading}
                  className="w-[180px]"
                >
                  Create
                </Button>
              </div>
            </form>
          </Form>
        </div>

        {isAddPhaseOpen && (
          <AddBudgetPhase
            addPhase={addPhase}
            isOpen={isAddPhaseOpen}
            onClose={onAddphaseClose}
            phases={phasesOptions}
            isLoading={loadingPhases}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
