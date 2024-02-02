import { Dialog, DialogContent } from "../ui/dialog";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { FormInput } from "../custom";
import FormTextArea from "./common/FormTextArea";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { CreateSDGSchema, createSDGSchema } from "@/schemas/democracySchema";
import { useCreateSDG } from "@/api/sdg";
import { IoLink } from "react-icons/io5";

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
  const form = useForm<CreateSDGSchema>({
    resolver: zodResolver(createSDGSchema),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

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

  const { mutate, isLoading, data } = useCreateSDG();

  useEffect(() => {
    if (data) onClose();
  }, [data]);

  const onSubmit = (data: CreateSDGSchema) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (selectedImage) {
      formData.append("banner", selectedImage.image);
    }

    mutate(formData);
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
              <p className="text-subtle_text">Official Link</p>
              <div className=" w-full max-w-[350px]">
                <FormInput
                  name="official_link"
                  label="Official Link"
                  control={control}
                  placeholder="Paste Link here"
                  errors={errors}
                  rightElement={<IoLink />}
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
              <Button isLoading={isLoading}>Create</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
