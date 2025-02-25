  /* eslint-disable @typescript-eslint/ban-ts-comment */
  import { useUpdatePermission } from "@/api/permissions";
  import { FormInput } from "@/components/custom";
  import FormTextArea from "@/components/custom/FormTextArea";
  import { Button } from "@/components/ui/button";
  import { Form } from "@/components/ui/form";
  import { useSettingsContext } from "@/providers/SettingsProvider";
  import { createPermissionSchema } from "@/schemas/SettingsSchema";
  import { zodResolver } from "@hookform/resolvers/zod";
  import { useEffect } from "react";
  import { useForm } from "react-hook-form";
  import { z } from "zod";

  interface CreatePermissionProps {
    setActiveRoleOption: React.Dispatch<React.SetStateAction<RolesOption>>;
    selectedPermission: Permission | null;
    setSelectedPermission: React.Dispatch<React.SetStateAction<Permission | null>>;
  }

  export default function UpdatePermission({ setActiveRoleOption, selectedPermission, setSelectedPermission }: CreatePermissionProps) {
    const { setActiveTitle } = useSettingsContext();
    useEffect(() => {
      setActiveTitle("Update Permission");
      return () => setActiveTitle(null);
    }, []);

    const form = useForm<z.infer<typeof createPermissionSchema>>({
      resolver: zodResolver(createPermissionSchema),
      defaultValues: {
        name: selectedPermission?.name || "",
        description: selectedPermission?.description || "",
      },
    });
    
    useEffect(() => {
      if (selectedPermission) {
        form.reset({
          name: selectedPermission.name,
          description: selectedPermission.description,
        });
      }
    }, [selectedPermission, form.reset]); 

    const {
      control,
      handleSubmit,
      formState: { errors },
    } = form;

    const { isLoading: updating, mutate, isSuccess } = useUpdatePermission();

    function onSubmit(values: z.infer<typeof createPermissionSchema>) { 
      mutate({ ...values, id: selectedPermission?.id });
    }

    function returnToPermission() {
      setActiveRoleOption("Permissions");
    }

    useEffect(() => {
      if (isSuccess) {
        setActiveRoleOption("Permissions");
        setSelectedPermission(null);
      }
    }, [isSuccess]);

    return (
      <div>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-3">
            <div className="flex items-center justify-between space-x-3">
              <p className="text-subtle_text">Permission Title</p>
              <div className="w-full max-w-[350px]">
                <FormInput
                  name="name"
                  label="Title"
                  value={`${selectedPermission?.name}`}
                  control={control}
                  placeholder="Enter tilte"
                  errors={errors}
                />
              </div>
            </div>
            <div className="flex items-center justify-between space-x-3">
              <p className="text-subtle_text">Description</p>
              <div className=" w-full max-w-[350px]">
                <FormTextArea
                  name="description"
                  value={`${selectedPermission?.description}`}
                  control={control}
                  placeholder="Enter Description"
                  errors={errors}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Button className="bg-gray-600 text-white hover:bg-red-500" onClick={returnToPermission}>Back</Button>

              <Button isLoading={updating}>Update Permission</Button>
            </div>
          </form>
        </Form>
      </div>
    );
  }
