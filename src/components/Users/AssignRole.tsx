import useDisclosure from "@/hooks/useDisclosure";
import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import FormSelect from "../Democracy/common/FormSelect";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { assignRoleSchema } from "@/schemas/userSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectItem } from "../ui/select";
import { useEffect, useState } from "react";
import { CustomMultiSelect } from "../custom";
import { useToast } from "../ui/use-toast";

export default function AssignRole() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [selectedPermissions, setSelectedPermissions] = useState<
    MultiSelectData[]
  >([]);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof assignRoleSchema>>({
    resolver: zodResolver(assignRoleSchema),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const { toast } = useToast();

  console.log(error);

  useEffect(() => {
    if (selectedPermissions.length > 0) setError(null);
  }, [selectedPermissions]);

  const onSubmit = () => {
    if (selectedPermissions.length === 0) {
      setError("Privileges is required");
      return;
    }
    toast({
      title: "Success!",
      variant: "success",
      description: `Assigned Role`,
    });
    onClose();
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

          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex items-center justify-between ">
                <p className="text-subtle_text">Current Role</p>
                <div className=" w-full max-w-[350px]">
                  <FormSelect
                    name="currentRole"
                    control={control}
                    placeholder="Select Role"
                    errors={errors}
                  >
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="guest">Guest</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </FormSelect>
                </div>
              </div>
              <div className="flex items-center justify-between ">
                <p className="text-subtle_text">Privilege/Permission</p>
                <div className=" w-full max-w-[350px]">
                  <CustomMultiSelect
                    data={permissions}
                    selected={selectedPermissions}
                    setSelected={setSelectedPermissions}
                    placeholder="Select privileges"
                    showSearch
                    searchPlaceholder="Search privileges"
                  />
                  {error && (
                    <p className="text-sm font-medium text-red-500">{error}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <p> Role not listed?</p>{" "}
                  <p className="cursor-pointer text-primary">Create role</p>
                </div>
                <Button>Update Profile</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

const permissions: MultiSelectData[] = [
  { id: "Permission 1", name: "Permission 1" },
  { id: "Permission 2", name: "Permission 2" },
  { id: "Permission 3", name: "Permission 3" },
  { id: "Permission 4", name: "Permission 4" },
  { id: "Permission 5", name: "Permission 5" },
  { id: "Permission 6", name: "Permission 6" },
  { id: "Permission 7", name: "Permission 7" },
  { id: "Permission 8", name: "Permission 8" },
  { id: "Permission 9", name: "Permission 9" },
];
