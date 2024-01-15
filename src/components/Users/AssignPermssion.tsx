import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { useEffect, useState } from "react";
import {
  useAssignPermissionToUser,
  useGetAllPermissions,
} from "@/api/permissions";
import { FaSpinner } from "react-icons/fa";
import useDisclosure from "@/hooks/useDisclosure";
import { useUserSettingsContext } from "@/providers/UserSettingsProvider";
import { CustomMultiSelect } from "../custom";

export default function AssignPermssion() {
  const [selectedPermissions, setSelectedPermissions] = useState<
    MultiSelectData[]
  >([]);
  const [err, setErr] = useState<string | null>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { userObj } = useUserSettingsContext();

  const { data: permissions, isLoading } = useGetAllPermissions();

  const {
    isLoading: assigning,
    mutate,
    isSuccess,
  } = useAssignPermissionToUser();

  function onSubmit() {
    if (selectedPermissions.length === 0) {
      setErr("Select at least one permission to continue");
      return;
    }
    const rolePermissions = selectedPermissions.map((permission) =>
      permission.id.toString()
    );
    mutate({ userId: userObj!.id, permissions: rolePermissions });
  }

  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
  }, [isSuccess]);
  return (
    <div>
      <Button onClick={onOpen}>Edit Role & Permissions</Button>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent
          className="min-w-[700px]"
          style={{ borderRadius: 40, padding: 32 }}
        >
          <h4 className="pb-3 border-b border-dark/10 ">Change Role</h4>
          <div className="space-y-6">
            {isLoading ? (
              <div className="h-[200px] flex justify-center items-center">
                <FaSpinner className="text-[40px] animate-spin text-primary" />
              </div>
            ) : (
              permissions && (
                <div className="flex items-center justify-between ">
                  <p className="text-subtle_text">Privilege/Permission</p>
                  <div className=" w-full max-w-[350px]">
                    <CustomMultiSelect
                      data={permissions || []}
                      selected={selectedPermissions}
                      setSelected={(e) => {
                        setSelectedPermissions(e);
                        setErr(null);
                      }}
                      placeholder={
                        isLoading ? "Loading prermssions" : "Select privileges"
                      }
                      showSearch
                      searchPlaceholder="Search privileges"
                    />

                    {err && <p className="text-sm text-red-500">{err}</p>}
                  </div>
                </div>
              )
            )}

            <div onClick={onSubmit} className="flex justify-end">
              <Button isLoading={assigning} className="">
                Update Role
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
