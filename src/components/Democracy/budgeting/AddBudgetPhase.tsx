import { FormInput } from "@/components/custom";
import FormSelect from "@/components/custom/FormSelect";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { SelectItem } from "@/components/ui/select";
import {
  AddBudgetPhaseSchema,
  addBudgetPhaseSchema,
} from "@/schemas/budgetingSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const formatString = (str: string): string => {
  // Replace underscores with spaces
  const stringWithSpaces = str.replace(/_/g, " ");

  // Capitalize the string
  const capitalizedString = stringWithSpaces.replace(/\b\w/g, (match) =>
    match.toUpperCase()
  );

  return capitalizedString;
};

interface AddBudgetPhaseProps {
  addPhase: (args: AddBudgetPhaseSchema) => void;
  isOpen: boolean;
  onClose: () => void;
  isLoading?: boolean;
  phases: BudgetPhaseModule[];
}

export default function AddBudgetPhase({
  addPhase,
  isOpen,
  onClose,
  isLoading,
  phases,
}: AddBudgetPhaseProps) {
  const form = useForm<AddBudgetPhaseSchema>({
    resolver: zodResolver(addBudgetPhaseSchema),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = (data: AddBudgetPhaseSchema) => {
    addPhase({
      ...data,
      phase_name: formatString(data.phase_module_code),
    });
    onClose();
  };

  console.log(errors);
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="!rounded-[40px] min-w-[580px]">
        <h4 className="pb-3 border-b border-dark/10 ">Add Budget Phase</h4>

        <div className="pt-8 space-y-8 max-h-[600px]">
          <Form {...form}>
            <form className="space-y-5">
              <div className="flex items-center justify-between ">
                <p className="text-subtle_text">Phase </p>
                <div className=" w-full max-w-[350px]">
                  <FormSelect
                    name="phase_module_code"
                    control={control}
                    label="Phase"
                    placeholder={
                      isLoading ? "Loading Phases" : "Select a phase"
                    }
                    errors={errors}
                  >
                    {phases?.map((phase) => (
                      <SelectItem
                        value={phase.phase_module_code}
                        key={phase.phase_module_code}
                      >
                        {phase.phase_module_name}
                      </SelectItem>
                    ))}
                  </FormSelect>

                  {/* </SearchSelect>
                  <CustomMultiSelect
                    data={phasesOptions || []}
                    selected={selectedPhases}
                    setSelected={setSelectedPhases}
                    placeholder={isLoading ? "Loading phases" : "Select phases"}
                    showSearch
                    searchPlaceholder="Search phases"
                  /> */}
                  {/* <FormInput
                    name="phase_name"
                    label="Phase name"
                    control={control}
                    placeholder="Enter phase name"
                    errors={errors}
                  /> */}
                </div>
              </div>

              {/* <div className="flex items-center justify-between ">
                <p className="text-subtle_text">Phase Module Code</p>
                <div className=" w-full max-w-[350px]">
                  <FormInput
                    name="phase_module_code"
                    label="Phase module code"
                    control={control}
                    placeholder="Enter phase module code"
                    errors={errors}
                  />
                </div>
              </div> */}

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

              <div className="flex items-center justify-end">
                <Button onClick={handleSubmit(onSubmit)} className="w-[180px]">
                  Add Phase
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
