import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

interface ResponseMenuProps {
  response: DialogueRequestResponse;
}
function DialogueResponseMenu({ response }: ResponseMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="w-12 h-12 p-0 bg-transparent focus-visible: hover:bg-gray-200">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="px-2" align="end">
        <DropdownMenuLabel>
          <div className="table-menu">Edit Response</div>
        </DropdownMenuLabel>
        <DropdownMenuLabel>
          <div className="table-menu">Delete Response </div>
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DialogueResponseMenu;
