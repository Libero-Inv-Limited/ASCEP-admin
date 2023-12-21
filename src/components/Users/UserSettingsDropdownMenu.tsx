import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import AssignRole from "./AssignRole";
import DeactivateAccount from "./DeactivateAccount";
import DeleteAccount from "./DeleteAccount";
import ResetPassword from "./ResetPassword";

export default function UserSettingsDropdownMenu() {
  return (
    <div className="ml-auto">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="w-8 h-8 p-0 bg-transparent hover:bg-gray-200 ">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="px-2 font-normal text-subtle_text"
          align="end"
        >
          <DropdownMenuLabel>
            <AssignRole />
          </DropdownMenuLabel>
          <DropdownMenuLabel>
            <ResetPassword />
          </DropdownMenuLabel>
          <DropdownMenuLabel>
            <div className="table-menu">Reset 2FA</div>
          </DropdownMenuLabel>
          <DropdownMenuLabel>
            <DeactivateAccount />
          </DropdownMenuLabel>
          <DropdownMenuLabel>
            <DeleteAccount />
          </DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
