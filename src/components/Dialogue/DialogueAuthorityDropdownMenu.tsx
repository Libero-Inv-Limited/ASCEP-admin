import { MoreVertical } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Link } from "react-router-dom";
import useDisclosure from "@/hooks/useDisclosure";
import { useDeleteAuthority } from "@/api/authorities";
import { useEffect } from "react";
import { ConfirmAction } from "../custom";
import AddAuthority from "./AddAuthority";
import { useAppContext } from "@/contexts/AppContext";

export default function DialogueAuthorityDropdownMenu({
  authority,
}: {
  authority: AuthorityType;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  const { user } = useAppContext();
  const { mutate, isLoading, data } = useDeleteAuthority();

  useEffect(() => {
    if (data) onClose();
  }, [data]);

  return (
    <div className="ml-auto">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="w-8 h-8 p-0 bg-transparent hover:bg-gray-200 ">
            <span className="sr-only">Open menu</span>
            <MoreVertical className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="px-2 font-normal text-subtle_text"
          align="end"
        >
          {
            user?.permissions && user?.permissions?.some((perm) => perm.trim() === 'view authority details') &&
            (<DropdownMenuLabel>
              <Link to={`/dialogue/authorities/${authority.id}`}>
                View Authority
              </Link>
            </DropdownMenuLabel>)
          }

          {
            user?.permissions && user?.permissions?.some((perm) => perm.trim() === 'edit authority') &&
            (<DropdownMenuLabel onClick={onEditOpen} className="cursor-pointer">
              <p>Edit Authority</p>
            </DropdownMenuLabel>)
          }

          {
            user?.permissions && user?.permissions?.some((perm) => perm.trim() === 'delete authority') &&
            (<DropdownMenuLabel className="cursor-pointer" onClick={onOpen}>
              <p>Delete Authority</p>
            </DropdownMenuLabel>)
          }
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmAction
        isOpen={isOpen}
        message="Are you sure you want to delete this authority?"
        onClose={onClose}
        onContinue={() => mutate(authority.id)}
        isLoading={isLoading}
      />

      <AddAuthority
        authority={authority}
        isOpen={isEditOpen}
        onClose={onEditClose}
      />
    </div>
  );
}
