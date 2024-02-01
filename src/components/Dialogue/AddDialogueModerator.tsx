/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Dialog, DialogContent } from "@/components/ui/dialog";
import useDisclosure from "@/hooks/useDisclosure";
import { Button } from "../ui/button";
import { SearchSelect } from "../custom";
import { useGetUsersAnalytics } from "@/api/user";
import { useEffect, useState } from "react";
import UserAvatar from "../custom/UserAvatar";
import { useGetAllAuthorities } from "@/api/authorities";
import { useAddDialogueModerator } from "@/api/dialogue";

interface AddDialogueModeratorProps {
  authorityId?: string;
}

export default function AddDialogueModerator({
  authorityId,
}: AddDialogueModeratorProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [users, setUsers] = useState<SelectOption[]>([]);
  const [authorities, setAuthorities] = useState<SelectOption[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserObj | null>(null);
  const [selectedAutority, setSelectedAuthority] = useState<
    number | string | null
  >(null);

  const { data, isLoading } = useGetUsersAnalytics(1, 1000);
  const { data: authoritiesData, isLoading: fetchingAuthorities } =
    useGetAllAuthorities();

  useEffect(() => {
    if (data) {
      const users: SelectOption[] = data.users.map((user) => ({
        label: user?.firstname
          ? `${user.firstname} ${user.lastname}`
          : user.username,
        value: user.id,
      }));

      setUsers(users);
    }
  }, [data]);

  useEffect(() => {
    if (authoritiesData) {
      const authorities: SelectOption[] = authoritiesData.map((authority) => ({
        label: authority?.name,
        value: authority.id,
      }));

      setAuthorities(authorities);
    }
  }, [authoritiesData]);

  const handleSelect = (id: string | number) => {
    const selectedUser = data?.users.filter((user) => user.id == id);
    if (selectedUser?.length) setSelectedUser(selectedUser[0]);
  };

  const {
    mutate,
    isLoading: creating,
    data: successResp,
  } = useAddDialogueModerator();

  useEffect(() => {
    if (successResp) onClose();
  }, [successResp]);

  const handleSubmit = () => {
    if (selectedUser?.id) {
      const payload = {
        user: selectedUser?.id,
        authority: authorityId || (selectedAutority as string),
      };

      mutate(payload);
    }
  };

  return (
    <div>
      <Button onClick={onOpen}>Add Moderator</Button>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent
            className="min-w-[700px]"
            style={{ borderRadius: 40, padding: 32 }}
          >
            <h3 className="border-b text-text border-black/10">
              Add Moderator
            </h3>

            <div className="space-y-6">
              <p className="text-base text-subtitle_text">
                Add moderators under authority
              </p>

              <div className="flex items-center justify-between">
                <p className="text-base text-subtitle_text">Search User</p>

                <div className="w-[350px]">
                  <SearchSelect
                    isLoading={isLoading}
                    options={users}
                    handleSelect={handleSelect}
                    placeholder="Search User"
                  />
                </div>
              </div>
              {!authorityId && (
                <div className="flex items-center justify-between">
                  <p className="text-base text-subtitle_text">
                    Select authority
                  </p>

                  <div className="w-[350px]">
                    <SearchSelect
                      isLoading={fetchingAuthorities}
                      options={authorities}
                      handleSelect={(e) => setSelectedAuthority(e)}
                      placeholder="Search Authorities"
                    />
                  </div>
                </div>
              )}
              <div className="flex items-center justify-between">
                <div></div>
                {selectedUser && (
                  <div className="w-[350px] flex items-center gap-3">
                    {/* @ts-ignore */}
                    <UserAvatar size={40} user={selectedUser} />

                    <div>
                      <p className="text-sm font-bold">
                        {selectedUser.firstname
                          ? `${selectedUser.firstname} ${selectedUser.lastname}`
                          : selectedUser.username}
                      </p>
                      <p className="text-[10px] text-subtle_text">
                        {selectedUser.email}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end">
                <Button
                  disabled={
                    !selectedUser || (!authorityId && !selectedAutority)
                  }
                  className="w-[175px]"
                  isLoading={creating}
                  onClick={handleSubmit}
                >
                  Update Status
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
