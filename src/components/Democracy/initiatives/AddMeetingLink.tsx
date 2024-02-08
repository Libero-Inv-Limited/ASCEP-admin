import { FormInput } from "@/components/custom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import useDisclosure from "@/hooks/useDisclosure";
import { addMeetingLinkSchema } from "@/schemas/InitiativesSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

type AddMeetinLinkSchema = z.infer<typeof addMeetingLinkSchema>;

export default function AddMeetingLink() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const form = useForm<AddMeetinLinkSchema>({
    resolver: zodResolver(addMeetingLinkSchema),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  const { toast } = useToast();

  const onSubmit = (data: AddMeetinLinkSchema) => {
    console.log(data);

    toast({
      description: "Meeting Link Added",
      variant: "success",
      duration: 2000,
    });
    reset();
    onClose();
  };
  return (
    <div className="fixed w-full bottom-12 right-10 ">
      <div className="flex justify-end gap-4">
        <Button onClick={onOpen}>Add Meeting Link</Button>
        <Button>Dowload Comments</Button>
      </div>

      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent
          className="min-w-[600px]"
          style={{ borderRadius: 40, padding: 32 }}
        >
          <h3 className="pb-3 text-2xl border-b text-textp border-black/10">
            Add Meeting Link
          </h3>

          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex items-center justify-between ">
                <p className="text-base text-subtitle_text">Meeting Link</p>

                <div className=" w-full max-w-[350px]">
                  <FormInput
                    name="link"
                    label="Link"
                    control={control}
                    placeholder="Meeting Link"
                    errors={errors}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="w-[175px]">Add Link</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
