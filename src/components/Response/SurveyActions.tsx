import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";

export default function SurveyActions({ survey }: { survey: SurveyData }) {
  const status = survey.status;
  //   const type = survey.ty;
  const navigate = useNavigate();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="w-8 h-8 p-0 bg-transparent hover:bg-gray-200">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="px-2" align="end">
        <DropdownMenuLabel
          onClick={() =>
            navigate(`/response/surveys/${survey.id}`, { state: { status } })
          }
        >
          <div className="table-menu">View</div>
        </DropdownMenuLabel>
        {/* <DropdownMenuLabel>
          <div className="table-menu">Download</div>
        </DropdownMenuLabel>
        <DropdownMenuLabel>
          <div className="table-menu">Edit </div>
        </DropdownMenuLabel>
        <DropdownMenuLabel>
          <div className="table-menu">Delete </div>
        </DropdownMenuLabel> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
