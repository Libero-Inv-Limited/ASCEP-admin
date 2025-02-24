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
// import Reset2FA from "./Reset2FA";
import { useParams } from "react-router-dom";
import { useUserSettingsContext } from "@/providers/UserSettingsProvider";
import { useAppContext } from "@/contexts/AppContext";

export default function UserSettingsDropdownMenu() {
  const { userId } = useParams();
  const { userObj } = useUserSettingsContext();
  const { user } = useAppContext();

  return (
    <div className="ml-auto">
      {userId && userObj && (
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
            {
              user?.permissions && user?.permissions?.some((perm) => perm.trim() === 'assign roles') &&
              (<DropdownMenuLabel>
                <AssignRole />
              </DropdownMenuLabel>)
            }

            {
              user?.permissions && user?.permissions?.some((perm) => perm.trim() === 'update user password') &&
              (<DropdownMenuLabel>
                <ResetPassword />
              </DropdownMenuLabel>)
            }

            {/* <DropdownMenuLabel>
              <Reset2FA />
            </DropdownMenuLabel> */}
            {
              user?.permissions && user?.permissions?.some((perm) => perm.trim() === 'deactivate user account') &&
              (<DropdownMenuLabel>
                <DeactivateAccount id={userId} status={userObj.status} />
              </DropdownMenuLabel>)
            }

            {
              user?.permissions && user?.permissions?.some((perm) => perm.trim() === 'delete user account') &&
              (<DropdownMenuLabel>
                <DeleteAccount id={userId} />
              </DropdownMenuLabel>)
            }
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
