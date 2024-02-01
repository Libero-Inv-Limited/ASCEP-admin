import { Dialog, DialogContent } from "../ui/dialog";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import {
  CreateAuthoritySchema,
  createAuthoritySchema,
} from "@/schemas/dialogueSchemas";
import { FormInput } from "../custom";
import FormTextArea from "../custom/FormTextArea";
import { useEffect } from "react";
import { useCeateAuthority } from "@/api/authorities";

interface AddAuthorityProps {
  isOpen: boolean;
  onClose: () => void;
  authority?: AuthorityType;
}

export default function AddAuthority({
  isOpen,
  onClose,
  authority,
}: AddAuthorityProps) {
  const form = useForm<CreateAuthoritySchema>({
    resolver: zodResolver(createAuthoritySchema),
    defaultValues: authority,
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const { mutate, isLoading, data } = useCeateAuthority();

  useEffect(() => {
    if (data) onClose();
  }, [data]);

  const onSubmit = (data: CreateAuthoritySchema) => {
    mutate({ ...data, ...(authority && { id: authority?.id }) });
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="min-w-[700px]"
        style={{ borderRadius: 40, padding: 32 }}
      >
        <h4 className="pb-3 border-b border-dark/10 ">
          {authority ? "Edit" : "Add"} Authority
        </h4>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex items-center justify-between ">
              <p className="text-subtle_text">Title</p>
              <div className=" w-full max-w-[350px]">
                <FormInput
                  name="name"
                  label="Title"
                  control={control}
                  placeholder="Enter title"
                  errors={errors}
                />
              </div>
            </div>
            <div className="flex items-start justify-between ">
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
            <div className="flex items-start justify-between ">
              <p className="text-subtle_text">Contact Info</p>
              <div className=" w-full max-w-[350px]">
                <FormTextArea
                  name="contact_info"
                  label="Contact Info"
                  control={control}
                  placeholder="Enter contact info"
                  errors={errors}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button isLoading={isLoading}>
                {authority ? "Edit" : `Add`} Authority
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
