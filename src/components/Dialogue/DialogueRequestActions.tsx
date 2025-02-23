import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ConfirmAction } from "../custom";
import useDisclosure from "@/hooks/useDisclosure";
import { useEffect, useState } from "react";
import { UseMutateFunction } from "react-query";
import { useAppContext } from "@/contexts/AppContext";

interface DialogueRequestActionsProps {
  dialogue: FOIRequest;
  mutate: UseMutateFunction<
    any,
    unknown,
    UpdateDialogueRequestStatusPayload,
    unknown
  >;
  isLoading: boolean;
  data: any;
}

export default function DialogueRequestActions({
  dialogue,
  mutate,
  isLoading,
  data,
}: DialogueRequestActionsProps) {
  const { id } = dialogue;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [message, setMessage] = useState<string>("");
  const [payload, setPayload] =
    useState<UpdateDialogueRequestStatusPayload | null>(null);
  const { user } = useAppContext();

  const handleOpen = (action: FIORequestAction) => {
    setPayload({
      action,
      request_id: id,
    });
    switch (action) {
      case "publish":
        setMessage("Are you sure you want to publish this request");
        break;
      case "close":
        setMessage("Are you sure you want to close this request");
        break;
      case "decline":
        setMessage("Are you sure you want to decline this request");
        break;
      case "set_to_public":
        setMessage("Are you sure you want to set this request to public");
        break;
      default:
        break;
    }
    onOpen();
  };

  useEffect(() => {
    if (data) onClose();
  }, [data]);

  const handleUpdate = () => {
    if (payload) mutate(payload);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="w-8 h-8 p-0 bg-transparent hover:bg-gray-200">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="px-2" align="end">
          {
            user?.permissions && user?.permissions?.some((perm) => perm.trim() === 'view request details') &&
            (<DropdownMenuLabel>
              <Link to={`/dialogue/requests/${id}`} className="table-menu">
                View Request
              </Link>
            </DropdownMenuLabel>)
          }

          {/* <DropdownMenuLabel>
              <div className="table-menu">Edit Request</div>
            </DropdownMenuLabel> */}
          {
            user?.permissions && user?.permissions?.some((perm) => perm.trim() === 'set authority to public') &&
            (dialogue.public_identifier === "private" && (
              <DropdownMenuLabel onClick={() => handleOpen("set_to_public")}>
                <div className="table-menu">Set to Public</div>
              </DropdownMenuLabel>
            ))
          }
          {
            user?.permissions && user?.permissions?.some((perm) => perm.trim() === 'publish request') &&
            (<DropdownMenuLabel onClick={() => handleOpen("publish")}>
              <div className="table-menu">Publish</div>
            </DropdownMenuLabel>)
          }
          {
            user?.permissions && user?.permissions?.some((perm) => perm.trim() === 'decline request') &&
            (dialogue.status !== "rejected" && (
              <DropdownMenuLabel onClick={() => handleOpen("decline")}>
                <div className="table-menu">Decline</div>
              </DropdownMenuLabel>
            ))
          }
          {
            user?.permissions && user?.permissions?.some((perm) => perm.trim() === 'close request') &&
            (dialogue.status !== "closed" && (
              <DropdownMenuLabel onClick={() => handleOpen("close")}>
                <div className="table-menu">Close</div>
              </DropdownMenuLabel>
            ))
          }
        </DropdownMenuContent>
      </DropdownMenu>
      <ConfirmAction
        isOpen={isOpen}
        onClose={onClose}
        onContinue={handleUpdate}
        message={message}
        isLoading={isLoading}
      />
    </>
  );
}
