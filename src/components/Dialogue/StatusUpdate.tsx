import { Dialog, DialogContent } from "../ui/dialog";
import FormSelect from "../Democracy/common/FormSelect";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectItem } from "../ui/select";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { statusUpdateSchema } from "@/schemas/dialogueSchemas";

interface AssignRoleProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function StatusUpdate({ isOpen, onClose }: AssignRoleProps) {
  const form = useForm<z.infer<typeof statusUpdateSchema>>({
    resolver: zodResolver(statusUpdateSchema),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const { toast } = useToast();

  const onSubmit = () => {
    toast({
      title: "Success!",
      variant: "success",
      description: `Update successful`,
      duration: 2000,
    });
    onClose();
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="min-w-[700px]"
        style={{ borderRadius: 40, padding: 32 }}
      >
        <h4 className="pb-3 border-b border-dark/10 ">Change Role</h4>

        <p className="text-subtle_text">
          Set the number of days before the status of every request is updated
        </p>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex items-center justify-between ">
              <p className="text-subtle_text">Status Update (Days)</p>
              <div className=" w-full max-w-[350px]">
                <FormSelect
                  name="update"
                  control={control}
                  placeholder="Update"
                  errors={errors}
                >
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="6">6</SelectItem>
                </FormSelect>
              </div>
            </div>

            <div className="flex justify-end">
              <Button>Update Status</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
