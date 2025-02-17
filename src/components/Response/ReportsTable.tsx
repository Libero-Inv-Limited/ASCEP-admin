/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";

import { DataTable } from "@/components/custom/DataTable";
import { useGetAllReports } from "@/api/response";
import GroupedFiltersButton from "../custom/GroupedFiltersButton";
import ResponseFilters from "./ResponseFilters";
import { TableSkeleton } from "../custom";
import { Link } from "react-router-dom";
import ResponsePostActions from "./ResponsePostActions";
import UserAvatar from "../custom/UserAvatar";
import ReportsPagination from "../custom/ReportsPagination";

export const columns: ColumnDef<ReportData>[] = [
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      return (
        <div className="flex-1 text-xs capitalize text-nowrap">
          {new Date(row.getValue("createdAt")).toDateString()}
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Post Title",
    cell: ({ row }) => {
      return (
        <div className="capitalize text-sm w-full max-w-[200px]">
          {row.getValue("title")}
        </div>
      );
    },
  },
  {
    accessorKey: "report_type",
    header: "Type",
    cell: ({ row }) => {
      return (
        <div className="text-sm capitalize">{row.getValue("report_type")}</div>
      );
    },
  },
  {
    accessorKey: "reportCategory",
    header: "Category",
    cell: ({ row }) => {
      return (
        <div className="text-sm capitalize">
          {row.original?.reportCategory?.categoryDetail?.name}
        </div>
      );
    },
  },
  {
    accessorKey: "reporter",
    header: "User",
    cell: ({ row }) => {
      const user = row.original.reporter;

      return (
        <div className="flex items-center gap-3 text-xs ">
          <div className="flex-1">
            <UserAvatar user={user} size={36} />
          </div>
          <p>
            {user.firstname
              ? `${user.firstname} ${user.lastname}`
              : user.username}
          </p>
        </div>
      );
    },
  },

  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => {
      return (
        <div className="capitalize text-sm max-w-[100px]">
          {row.original.location_meta}
        </div>
      );
    },
  },
  {
    accessorKey: "reportSDGs",
    header: "SDGs",
    cell: ({ row }) => {
      return (
        <div className="flex gap-1">
          {/* @ts-ignore */}
          {row.original.reportSDGs.map((sdg) => (
            <img src={sdg.sdg.banner} key={sdg.sdg_id} className="w-7" />
          ))}
        </div>
      );
    },
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.reportStatus.name;
      return (
        <div
          className={` rounded-[10px] text-xs font-semibold text-center w-fit px-2 py-[6px] capitalize ${status === "Completed"
            ? "bg-[#27AE60]/10 text-[#27AE60]"
            : status === "Public"
              ? "bg-[#9747FF]/10 text-[#9747FF]"
              : "bg-[#F2994A]/10 text-[#F2994A]"
            } `}
        >
          {status}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <ResponsePostActions report={row.original} />,
  },
];

export default function ReportsTable({ isSummary }: { isSummary?: boolean }) {
  const [tableData, setTableData] = useState<ReportData[]>([]);
  const [filtersString, setFiltersString] = useState("");
  const [isUpdated, setIsUpdated] = useState(0);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const { data: reports, isLoading } = useGetAllReports({ filtersString });

  // Arrange according to date-time
  const sortedReports = tableData.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const filteredReports = sortedReports.filter((report) => report.status_id != 14);

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
  console.log(filteredReports.length);

  // Calculate the start and end index for slicing the reports
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get the current page data
  const paginatedReports = filteredReports.slice(startIndex, endIndex);

  useEffect(() => {
    if (reports) {
      if (isSummary) {
        setTableData(reports);
        setItemsPerPage(3)
      } else setTableData(reports);
    }
  }, [reports, isSummary, isUpdated]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <p className="text-xl font-medium text-dark">
          {isSummary ? "Reports" : ""}
        </p>

        <div className="flex items-center gap-3">
          <GroupedFiltersButton variant="pill">
            <ResponseFilters setFiltersString={setFiltersString} />
          </GroupedFiltersButton>

          {isSummary && (
            <Link to="/response/reports" className="underline">
              See All
            </Link>
          )}
        </div>
      </div>
      <div className="p-4 bg-white rounded-lg">
        {isLoading ? (
          <TableSkeleton count={itemsPerPage} />
        ) : (
          <>
            {
              <DataTable columns={columns} data={paginatedReports} />
            }

            {/* Reports Pagination */}
            <ReportsPagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(newPage) => setPage(newPage)}
            />
          </>
        )}
      </div>
    </div>
  );
}
