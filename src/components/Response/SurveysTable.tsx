/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/custom/DataTable";
import { useGetAllSurveys } from "@/api/response";
import { TableSkeleton } from "../custom";
import { Link } from "react-router-dom";
import SurveyActions from "./SurveyActions";

export const columns: ColumnDef<SurveyData>[] = [
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      return (
        <div className="capitalize">
          {new Date(row.getValue("createdAt")).toDateString()}
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Post Title",
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue("title")}</div>;
    },
  },
  {
    accessorKey: "report_type",
    header: "Type",
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue("report_type")}</div>;
    },
  },
  {
    accessorKey: "reportCategory",
    header: "Category",
    cell: ({ row }) => {
      return <div className="capitalize">{row.original.description}</div>;
    },
  },
  {
    accessorKey: "start_date",
    header: "Start - End dates",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-3 ">
          {new Date(row.original.start_date).toDateString()} -
          {new Date(row.original.end_date).toDateString()}
        </div>
      );
    },
  },

  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => {
      return (
        <div className="capitalize max-w-[100px]">
          {row.original.location_meta}
        </div>
      );
    },
  },
  {
    accessorKey: "surveySDGs",
    header: "SDGs",
    cell: ({ row }) => {
      return (
        <div className="flex gap-1">
          {/* @ts-ignore */}
          {row.original.surveySDGs.map((sdg) => (
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
      const status = row.original.status;
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
    cell: ({ row }) => <SurveyActions survey={row.original} />,
  },
];

export default function SurveysTable({ isSummary }: { isSummary?: boolean }) {
  const [tableData, setTableData] = useState<SurveyData[]>([]);

  const { data, isLoading } = useGetAllSurveys();

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
