import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import DeleteSurvey from "./DeleteSurvey";
import { useAppContext } from "@/contexts/AppContext";

export default function SurveyActions({ survey }: { survey: SurveyData }) {
  const status = survey.status;
  const navigate = useNavigate();
  const { user } = useAppContext();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="w-8 h-8 p-0 bg-transparent hover:bg-gray-200">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="px-2" align="end">
        {
          user?.permissions && user?.permissions?.some((perm) => perm.trim() === 'view survey details') &&
          (<DropdownMenuLabel
            onClick={() =>
              navigate(`/response/surveys/${survey.id}`, { state: { status } })
            }
          >
            <div className="table-menu">View Survey</div>
          </DropdownMenuLabel>)
        }

        {/* <DropdownMenuLabel>
          <div className="table-menu">Download</div>
        </DropdownMenuLabel>
        <DropdownMenuLabel>
          <div className="table-menu">Edit </div>
        </DropdownMenuLabel> */}
        {
          user?.permissions && user?.permissions?.some((perm) => perm.trim() === 'delete survey') &&
          (<DropdownMenuLabel>
            <DeleteSurvey id={survey?.id} />
          </DropdownMenuLabel>)
        }

      </DropdownMenuContent>
    </DropdownMenu>
  );
}
