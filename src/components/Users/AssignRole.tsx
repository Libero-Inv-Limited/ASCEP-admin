import useDisclosure from "@/hooks/useDisclosure";
import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import FormSelect from "../custom/FormSelect";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { changeRoleSchema } from "@/schemas/userSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectItem } from "../ui/select";
// import { useEffect, useState } from "react";
// import { CustomMultiSelect } from "../custom";
// import { useToast } from "../ui/use-toast";
import { useUserSettingsContext } from "@/providers/UserSettingsProvider";
import { useChangeUserRole, useGetAllRoles } from "@/api/roles";
import { FaSpinner } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function AssignRole() {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { userObj, fetchingUserObj } = useUserSettingsContext();
  const [selectedRole, setSelectedRole] = useState(userObj?.role.toString());
  const form = useForm<z.infer<typeof changeRoleSchema>>({
    resolver: zodResolver(changeRoleSchema),
    defaultValues: {
      roleId: userObj?.role.toString(),
    },
  });

  const { data, isLoading } = useGetAllRoles();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const { mutate, isLoading: changingRole, isSuccess } = useChangeUserRole();

  useEffect(() => {
    setSelectedRole(form.watch("roleId"));
  }, [form.watch("roleId")]);

  useEffect(() => {
    if (isSuccess) onClose();
  }, [isSuccess]);

  const onSubmit = (data: z.infer<typeof changeRoleSchema>) => {
    mutate({
      ...data,
      userId: userObj!.id,
    });
  };

  return (
    <div>
      <div onClick={onOpen} className="table-menu">
        Assign role / privilege
      </div>

      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent
          className="min-w-[700px]"
          style={{ borderRadius: 40, padding: 32 }}
        >
          <h4 className="pb-3 border-b border-dark/10 ">Change Role</h4>

          <div className="min-h-[200px]">
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)}>
                {isLoading || fetchingUserObj ? (
                  <div className="h-[200px] flex justify-center items-center">
                    <FaSpinner className="text-[40px] animate-spin text-primary" />
                  </div>
                ) : (
                  data && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between ">
                        <p className="text-subtle_text">Role Title</p>
                        <div className=" w-full max-w-[350px]">
                          <FormSelect
                            name="roleId"
                            control={control}
                            placeholder="Update"
                            errors={errors}
                            onValueChange={(e) => alert(e)}
                          >
                            {data?.map((role) => (
                              <SelectItem value={role.id.toString()}>
                                {role.name}
                              </SelectItem>
                            ))}
                          </FormSelect>
                        </div>
                      </div>

                      <div className="flex items-center justify-between ">
                        <p className="text-subtle_text">Permissions</p>

                        <div className=" w-full max-w-[350px] flex flex-wrap gap-2">
                          {data
                            ?.filter(
                              (role) => role.id.toString() === selectedRole
                            )[0]
                            .rolePermission.map((roleItem) => (
                              <div
                                className="px-3 py-1 text-white bg-black rounded-md"
                                key={roleItem.permission_id}
                              >
                                {roleItem.permission.name}
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  )
                )}

                <div className="flex justify-end">
                  <Button isLoading={changingRole} className="">
                    Update Role
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// const permissions: MultiSelectData[] = [
//   { id: "Permission 1", name: "Permission 1" },
//   { id: "Permission 2", name: "Permission 2" },
//   { id: "Permission 3", name: "Permission 3" },
//   { id: "Permission 4", name: "Permission 4" },
//   { id: "Permission 5", name: "Permission 5" },
//   { id: "Permission 6", name: "Permission 6" },
//   { id: "Permission 7", name: "Permission 7" },
//   { id: "Permission 8", name: "Permission 8" },
//   { id: "Permission 9", name: "Permission 9" },
// ];
