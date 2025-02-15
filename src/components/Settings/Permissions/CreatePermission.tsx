/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useGetAllPermissions, useCreatePermission } from "@/api/permissions";
import { FormInput } from "@/components/custom";
import FormTextArea from "@/components/custom/FormTextArea";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useSettingsContext } from "@/providers/SettingsProvider";
import { createPermissionSchema } from "@/schemas/SettingsSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface CreatePermissionProps {
  setActiveRoleOption: React.Dispatch<React.SetStateAction<RolesOption>>;
}

export default function CreatePermission({ setActiveRoleOption }: CreatePermissionProps) {
  const { setActiveTitle } = useSettingsContext();
  useEffect(() => {
    setActiveTitle("New Permission");
    return () => setActiveTitle(null);
  }, []);

  const form = useForm<z.infer<typeof createPermissionSchema>>({
    resolver: zodResolver(createPermissionSchema),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const { isLoading: creating, mutate, isSuccess } = useCreatePermission();

  console.log(creating);
  function onSubmit(values: z.infer<typeof createPermissionSchema>) { 
    mutate({ ...values });
  }

  function returnToPermission() {
    setActiveRoleOption("Permissions");
  }

  useEffect(() => {
    if (isSuccess) {
      setActiveRoleOption("Permissions");
    }
  }, [isSuccess]);

  return (
    <div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pt-3">
          <div className="flex items-center justify-between ">
            <p className="text-subtle_text">Permission Title</p>
            <div className="w-full max-w-[350px]">
              <FormInput
                name="name"
                label="Title"
                control={control}
                placeholder="Enter tilte"
                errors={errors}
              />
            </div>
          </div>
          <div className="flex items-center justify-between ">
            <p className="text-subtle_text">Description</p>
            <div className=" w-full max-w-[350px]">
              <FormTextArea
                name="description"
                control={control}
                placeholder="Enter Description"
                errors={errors}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Button className="bg-gray-600 text-white hover:bg-red-500" onClick={returnToPermission}>Back</Button>

            <Button isLoading={creating}>Create Permission</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
