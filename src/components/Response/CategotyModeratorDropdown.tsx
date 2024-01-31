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
import { useDeleteCategoryModerator } from "@/api/category";

export default function CategoryModeratorDropdownMenu({
  category,
}: {
  category: CategoryModeratorType;
}) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { data, isLoading, mutate } = useDeleteCategoryModerator();

  useEffect(() => {
    data && onClose();
  }, [data]);

  const onContinue = () => {
    mutate({ user: category.user_id, category: category.id });
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
            <Link to={`/users/${category.id}`}>View user</Link>
          </DropdownMenuLabel>
          {/* <DropdownMenuLabel>
            <p>Edit Category</p>
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
