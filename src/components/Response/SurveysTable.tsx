/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/custom/DataTable";
import { useGetAllSurveys } from "@/api/response";
import { TableSkeleton } from "../custom";
// import { Link } from "react-router-dom";
import SurveyActions from "./SurveyActions";
import { Link } from "react-router-dom";
import ReportsPagination from "../custom/ReportsPagination";

export const columns: ColumnDef<SurveyData>[] = [
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
    accessorKey: "reportCategory",
    header: "Category",
    cell: ({ row }) => {
      return (
        <div className="capitalize  text-sm line-clamp-1 w-full max-w-[280px]">
          {row.original.description}
        </div>
      );
    },
  },
  {
    accessorKey: "start_date",
    header: "Start - End dates",
    cell: ({ row }) => {
      return (
        <div className="flex text-xs items-center gap-3 w-[220px] ">
          From {new Date(row.original.start_date).toDateString()} -
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
        <div className="capitalize max-w-[100px] text-sm">
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
    cell: ({ row }) => <SurveyActions survey={row.original} />,
  },
];

export default function SurveysTable({ isSummary }: { isSummary?: boolean }) {
  const [tableData, setTableData] = useState<SurveyData[]>([]);

  const { data: surveys, isLoading } = useGetAllSurveys();

  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  console.log(surveys);

  // Arrange according to date-time
  const sortedSurveys = tableData.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  // const filteredSurveys = sortedSurveys.filter((report) => report.status_id != 14);

  // Calculate the total number of pages
  const totalPages = Math.ceil(sortedSurveys.length / itemsPerPage);
  // console.log(filteredReports.length);

  // Calculate the start and end index for slicing the reports
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get the current page data
  const paginatedSurveys = sortedSurveys.slice(startIndex, endIndex);

  useEffect(() => {
    if (surveys) {
      if (isSummary) {
        setTableData(surveys);
        setItemsPerPage(3)
      } else setTableData(surveys);
    }
  }, [surveys, isSummary]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <p className="text-xl font-medium text-dark">
          {isSummary ? "Survey" : ""}
        </p>

        <div className="flex items-center gap-3">
          {isSummary && (
            <Link to="/response/all-surveys" className="underline">
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
              <DataTable columns={columns} data={paginatedSurveys} />
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
