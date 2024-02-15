/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useGetAllPermissions } from "@/api/permissions";
import { useCreateRole } from "@/api/roles";
import FormSelect from "@/components/custom/FormSelect";
import { CustomMultiSelect, FormInput } from "@/components/custom";
import FormTextArea from "@/components/custom/FormTextArea";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { SelectItem } from "@/components/ui/select";
import { useSettingsContext } from "@/providers/SettingsProvider";
import { createRoleSchema } from "@/schemas/SettingsSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface CreateRoleProps {
  setActiveRoleOption: React.Dispatch<React.SetStateAction<RolesOption>>;
}

export default function CreateRole({ setActiveRoleOption }: CreateRoleProps) {
  const { setActiveTitle } = useSettingsContext();
  const [selectedPermissions, setSelectedPermissions] = useState<
    MultiSelectData[]
  >([]);
  useEffect(() => {
    setActiveTitle("New Role");
    return () => setActiveTitle(null);
  }, []);

  const { data: permissions, isLoading } = useGetAllPermissions();
  const form = useForm<z.infer<typeof createRoleSchema>>({
    resolver: zodResolver(createRoleSchema),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const { isLoading: creating, mutate, isSuccess } = useCreateRole();

  function onSubmit(values: z.infer<typeof createRoleSchema>) {
    const rolePermissions = selectedPermissions.map((permission) =>
      permission.id.toString()
    );
    mutate({ ...values, permissions: rolePermissions });
  }

  useEffect(() => {
    if (isSuccess) {
      setActiveRoleOption("Roles");
    }
  }, [isSuccess]);

  return (
    <div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex items-center justify-between ">
            <p className="text-subtle_text">Role Title</p>
            <div className=" w-full max-w-[350px]">
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
            <p className="text-subtle_text">Privilege/Permission</p>
            <div className=" w-full max-w-[350px]">
              <CustomMultiSelect
                data={permissions || []}
                selected={selectedPermissions}
                setSelected={setSelectedPermissions}
                placeholder={
                  isLoading ? "Loading prermssions" : "Select privileges"
                }
                showSearch
                searchPlaceholder="Search privileges"
              />
            </div>
          </div>

          <div className="flex items-center justify-between ">
            <p className="text-subtle_text">Type</p>
            <div className=" w-full max-w-[350px]">
              <FormSelect
                name="type"
                control={control}
                placeholder="Select Role Type"
                errors={errors}
              >
                <SelectItem value="citizen">Citizen</SelectItem>
                <SelectItem value="government">Government</SelectItem>
              </FormSelect>
            </div>
          </div>
          <div className="flex items-center justify-between ">
            <p className="text-subtle_text">Type</p>
            <div className=" w-full max-w-[350px]">
              <FormTextArea
                name="description"
                control={control}
                placeholder="Enter Description"
                errors={errors}
              />
            </div>
          </div>

          <div className="flex items-center justify-end">
            <Button isLoading={creating}>Create Role</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
