import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import DownloadReport from "./DownloadReport"; // Import the new component
// import DeleteReport from "./DeleteReport";

export default function ResponsePostActions({
  report,
}: {
  report: ReportData;
}) {
  const [isDownloading, setIsDownloading] = useState(false);
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
            navigate(`/response/reports/${report.id}`, {
              state: { status: report.reportStatus.name, type: report.report_type },
            })
          }
        >
          <div className="table-menu">View</div>
        </DropdownMenuLabel>

        <DropdownMenuLabel onClick={() => setIsDownloading(true)}>
          <div className="table-menu">
            {isDownloading ? "Downloading..." : "Download"}
          </div>
        </DropdownMenuLabel>

        <DropdownMenuLabel>
          <div className="table-menu">Edit</div>
        </DropdownMenuLabel>
        <DropdownMenuLabel >
          <div className="table-menu">
            {/* <DeleteReport id={report.id} /> */}
          </div>
        </DropdownMenuLabel>
      </DropdownMenuContent>

      {/* Conditionally render DownloadReport component */}
      {isDownloading && (
        <DownloadReport
          reportId={report.id}
          onComplete={() => setIsDownloading(false)}
        />
      )}
    </DropdownMenu>
  );
}
