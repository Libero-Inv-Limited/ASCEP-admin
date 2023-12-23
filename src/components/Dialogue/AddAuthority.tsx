import { Dialog, DialogContent } from "../ui/dialog";
import FormSelect from "../Democracy/common/FormSelect";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectItem } from "../ui/select";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { createAuthoritySchema } from "@/schemas/dialogueSchemas";
import { SDGMultiSelect } from "../custom";
import { useState } from "react";
import { authorities } from "./DialogueFilter";

interface AddAuthorityProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddAuthority({ isOpen, onClose }: AddAuthorityProps) {
  const [selectedSDGs, setSelectedSDGs] = useState<SDGData[]>([]);

  const form = useForm<z.infer<typeof createAuthoritySchema>>({
    resolver: zodResolver(createAuthoritySchema),
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
      description: `Authority Added`,
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
        <h4 className="pb-3 border-b border-dark/10 ">Add Authority</h4>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex items-center justify-between ">
              <p className="text-subtle_text">Authority</p>
              <div className=" w-full max-w-[350px]">
                <FormSelect
                  name="authority"
                  control={control}
                  placeholder="Authority"
                  errors={errors}
                >
                  {authorities.map((authority) => (
                    <SelectItem key={authority} value={authority}>
                      {authority}
                    </SelectItem>
                  ))}
                </FormSelect>
              </div>
            </div>
            <div className="flex items-center justify-between ">
              <p className="text-subtle_text">Link to SDG (Optional)</p>
              <div className=" w-full max-w-[350px]">
                <SDGMultiSelect
                  selected={selectedSDGs}
                  setSelected={setSelectedSDGs}
                />
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
