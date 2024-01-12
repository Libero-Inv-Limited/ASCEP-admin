import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";

export default function ResponsePostActions({
  report,
}: {
  report: ReportData;
}) {
  const status = report.reportStatus.name;
  const type = report.report_type;
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
            navigate("/response/posts/1", { state: { status, type } })
          }
        >
          {/* <Link to={"/posts/1"}> */}
          <div className="table-menu">View</div>
          {/* </Link> */}
        </DropdownMenuLabel>
        <DropdownMenuLabel>
          <div className="table-menu">Download</div>
        </DropdownMenuLabel>
        <DropdownMenuLabel>
          <div className="table-menu">Edit </div>
        </DropdownMenuLabel>
        <DropdownMenuLabel>
          <div className="table-menu">Delete </div>
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
