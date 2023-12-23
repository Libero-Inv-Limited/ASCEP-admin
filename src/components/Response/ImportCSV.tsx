import { Form } from "../ui/form";
import { FormInput } from "../custom";
import { importSchema } from "@/schemas/userSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";

interface ImportCSVProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ImportCSV({ isOpen, onClose }: ImportCSVProps) {
  const form = useForm<z.infer<typeof importSchema>>({
    resolver: zodResolver(importSchema),
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
      description: `Import Successful`,
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
        <h4 className="pb-3 border-b border-dark/10 ">Import</h4>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex items-center justify-between ">
              <p className="text-subtle_text">Upload file</p>
              <div className=" w-full max-w-[350px]">
                <FormInput
                  control={control}
                  name="title"
                  placeholder="Title"
                  errors={errors}
                />
              </div>
            </div>

            <div className="flex items-center justify-end">
              <Button>Import</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
