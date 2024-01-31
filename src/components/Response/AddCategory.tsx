import { useForm } from "react-hook-form";
import { FormInput } from "../custom";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Form } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateCategorySchema,
  createCategorySchema,
} from "@/schemas/responseSchemas";
import FormTextArea from "../custom/FormTextArea";
import { useAddNewCategory } from "@/api/category";
import { useEffect } from "react";

interface AddCategoryProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddCategory({ isOpen, onClose }: AddCategoryProps) {
  const form = useForm<CreateCategorySchema>({
    resolver: zodResolver(createCategorySchema),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const { mutate, isLoading, data } = useAddNewCategory();

  useEffect(() => {
    if (data) onClose();
  }, [data]);

  const onSubmit = (values: CreateCategorySchema) => {
    mutate({ ...values, type: "any" });
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-w-[600px] !rounded-[40px] ">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
            <div className="flex items-center justify-between ">
              <p className="text-subtle_text">Name</p>
              <div className=" w-full max-w-[350px]">
                <FormInput
                  name="name"
                  label="Name"
                  control={control}
                  placeholder="Enter Category Title"
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
                  placeholder="Enter a description"
                  errors={errors}
                />
              </div>
            </div>

            <div className="flex items-center justify-end">
              <Button isLoading={isLoading} className="w-[175px]">
                Create
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
