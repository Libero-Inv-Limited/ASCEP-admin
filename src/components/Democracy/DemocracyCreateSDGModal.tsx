import { Dialog, DialogContent } from "../ui/dialog";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { FormInput } from "../custom";
import FormTextArea from "./common/FormTextArea";
import { ChangeEvent, useRef, useState } from "react";
import { createSDGSchema } from "@/schemas/democracySchema";

interface DemocracyCreateSDGModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DemocracyCreateSDGModal({
  isOpen,
  onClose,
}: DemocracyCreateSDGModalProps) {
  const [selectedImage, setSelectedImage] = useState<SelectedImage>();
  const inputRef = useRef<HTMLInputElement>(null);
  const form = useForm<z.infer<typeof createSDGSchema>>({
    resolver: zodResolver(createSDGSchema),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const { toast } = useToast();

  const handleFileSelection = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedImage({ image: file, byteArray: reader.result });
      };

      reader.readAsDataURL(file);
    }
  };

  const onSubmit = () => {
    toast({
      title: "Success!",
      variant: "success",
      description: `SDG created`,
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
        <h4 className="pb-3 border-b border-dark/10 ">Create SDG</h4>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                  control={control}
                  name="description"
                  placeholder="Title"
                  errors={errors}
                />
              </div>
            </div>

            <div className="flex items-center justify-between ">
              <p className="text-subtle_text">Image</p>
              <div
                className="cursor-pointer w-full max-w-[350px]"
                onClick={() => inputRef.current?.click()}
              >
                <FormInput
                  name="img"
                  label="Image"
                  control={control}
                  placeholder={selectedImage?.image.name || "Select Image"}
                  errors={errors}

                  //   value={selectedImage?.image.name}
                />
                <input
                  onChange={handleFileSelection}
                  className="hidden"
                  ref={inputRef}
                  type="file"
                  accept="image/*"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button>Create</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
