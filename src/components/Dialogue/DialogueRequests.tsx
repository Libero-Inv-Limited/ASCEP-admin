/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/custom/DataTable";
import { CustomPagination } from "../custom";
import { Link } from "react-router-dom";
import { useGetAllDialogueRequests } from "@/api/dialogue";
import SearchDialogueRequests from "./SearchDialogueRequests";
import { searchRequestSchema } from "@/schemas/dialogueSchemas";
import { z } from "zod";

export const columns: ColumnDef<FOIRequest>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      return <div className="capitalize">{row.original.title}</div>;
    },
  },
  {
    accessorKey: "author",
    header: "Author",
    cell: ({ row }) => {
      return <div className="capitalize">{row.original.author.username}</div>;
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      return (
        <div className="capitalize line-clamp-1 max-w-[140px]">
          {row.original.description}
        </div>
      );
    },
  },

  {
    accessorKey: "authority",
    header: "Authority",
    cell: ({ row }) => {
      return <div className="capitalize">{row.original.authority.name}</div>;
    },
  },
  {
    accessorKey: "authority",
    header: "Authority",
    cell: ({ row }) => {
      return <div className="capitalize">{row.original.authority.name}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      return (
        <div className="capitalize">
          {new Date(row.original.createdAt).toDateString()}
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
            status === "fulfilled" || status === "closed"
              ? "bg-[#27AE60]/10 text-[#27AE60]"
              : status === "rejected"
              ? "bg-[#E43F40]/10 text-[#E43F40]"
              : "bg-[#F2994A]/10 text-[#F2994A]"
          } `}
        >
          {row.original.status}
        </div>
      );
    },
  },

  {
    accessorKey: "public_identifier",
    header: "Visibility",
    cell: ({ row }) => {
      const visibility = row.original.public_identifier;
      return (
        <div
          className={` rounded-[10px] text-xs font-semibold text-center w-fit px-2 py-[6px] capitalize ${
            visibility === "public"
              ? "bg-[#27AE60]/10 text-[#27AE60]"
              : "bg-[#F2994A]/10 text-[#F2994A]"
          } `}
        >
          {row.original.public_identifier}
        </div>
      );
    },
  },

  {
    id: "actions",
    header: "Actions",
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="w-8 h-8 p-0 bg-transparent hover:bg-gray-200">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="px-2" align="end">
            <DropdownMenuLabel>
              <div className="table-menu">View Request</div>
            </DropdownMenuLabel>
            <DropdownMenuLabel>
              <div className="table-menu">Edit Request</div>
            </DropdownMenuLabel>
            <DropdownMenuLabel>
              <div className="table-menu">Set to Public </div>
            </DropdownMenuLabel>
            <DropdownMenuLabel>
              <div className="table-menu">Publish </div>
            </DropdownMenuLabel>
            <DropdownMenuLabel>
              <div className="table-menu">Decline </div>
            </DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const initialFilter = {
  text: undefined,
  authority: undefined,
  privacy: undefined,
  status: "all",
  datetimeRange: undefined,
};

export default function DialogueRequests({
  isSummary,
}: {
  isSummary?: boolean;
}) {
  const [tableData, setTableData] = useState<FOIRequest[]>([]);
  const [page, setPage] = useState(1);
  const [filterOptions, setFilterOptions] =
    useState<z.infer<typeof searchRequestSchema>>(initialFilter);

  const { data, mutateAsync, isLoading } = useGetAllDialogueRequests();

  useEffect(() => {
    mutateAsync({ page: page, perPage: 10, filter: filterOptions });
  }, [filterOptions]);

  console.log(data);

  useEffect(() => {
    if (data?.foi_requests) {
      const tableData = data?.foi_requests;
      setTableData(tableData);
    }
  }, [data]);
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <p className="text-lg text-subtle_text">Requests</p>
        <div className="flex items-center gap-3 ml-auto">
          {isSummary && (
            <Link to="/dialogue/view-all">
              <p className="underline text-dark">See all</p>
            </Link>
          )}
        </div>
      </div>

      <SearchDialogueRequests
        isLoading={isLoading}
        setFilterOptions={setFilterOptions}
      />

      {data && (
        <div className="p-4 bg-white rounded-lg">
          <DataTable columns={columns} data={tableData} />
          <CustomPagination
            page={page}
            paginationData={data?.meta}
            setPage={setPage}
          />
        </div>
      )}
    </div>
  );
}
