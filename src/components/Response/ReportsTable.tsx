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
          {row.original.reportCategory.categoryDetail.name}
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
          className={` rounded-[10px] text-xs font-semibold text-center w-fit px-2 py-[6px] capitalize ${
            status === "Completed"
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

  const { data, isLoading } = useGetAllReports({ filtersString });

  useEffect(() => {
    if (data) {
      if (isSummary) {
        setTableData(data.slice(0, 3));
      } else setTableData(data);
    }
  }, [data, isSummary]);

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
            <Link to="/response/all-reports" className="underline">
              See All
            </Link>
          )}
        </div>
      </div>
      <div className="p-4 bg-white rounded-lg">
        {isLoading ? (
          <TableSkeleton count={30} />
        ) : (
          <DataTable columns={columns} data={tableData} />
        )}
      </div>
    </div>
  );
}
