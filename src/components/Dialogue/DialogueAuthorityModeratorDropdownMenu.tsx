import { MoreVertical } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Link } from "react-router-dom";
import { ConfirmAction } from "../custom";
import useDisclosure from "@/hooks/useDisclosure";
import { useEffect } from "react";
import { useDeleteDialogueAuthorityModerator } from "@/api/dialogue";

interface DialogueAuthorityModeratorDropdownMenuProps {
  authrority: CategoryModeratorType;
  authorityId: string | undefined;
}

export default function DialogueAuthorityModeratorDropdownMenu({
  authrority,
  authorityId,
}: DialogueAuthorityModeratorDropdownMenuProps) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { data, isLoading, mutate } = useDeleteDialogueAuthorityModerator();

  useEffect(() => {
    data && onClose();
  }, [data]);

  const onContinue = () => {
    mutate({ user: authrority.user_id, authority: authorityId! });
  };
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
          <DropdownMenuLabel className="cursor-pointer">
            <Link to={`/users/${authrority.user_id}`}>View user</Link>
          </DropdownMenuLabel>
          {/* <DropdownMenuLabel>
            <p>Edit authrority</p>
          </DropdownMenuLabel> */}
          <DropdownMenuLabel className="cursor-pointer" onClick={onOpen}>
            <p>Delete Moderator</p>
          </DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmAction
        isOpen={isOpen}
        onClose={onClose}
        onContinue={onContinue}
        message="Are you sure you want to delete this moderator?"
        isLoading={isLoading}
      />
    </div>
  );
}
