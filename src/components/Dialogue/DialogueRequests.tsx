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
import { TablePagination } from "../custom";

export const columns: ColumnDef<DialogueRequest>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue("date")}</div>;
    },
  },
  {
    accessorKey: "requestTitle",
    header: "Request Title",
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue("requestTitle")}</div>;
    },
  },
  {
    accessorKey: "request",
    header: "Request",
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue("request")}</div>;
    },
  },
  {
    accessorKey: "authority",
    header: "Authority",
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue("authority")}</div>;
    },
  },
  {
    accessorKey: "visibility",
    header: "Visibility",
    cell: ({ row }) => {
      const visibility = row.getValue("visibility");
      return (
        <div
          className={` rounded-[10px] text-xs font-semibold text-center w-fit px-2 py-[6px] capitalize ${
            visibility === "Public"
              ? "bg-[#27AE60]/10 text-[#27AE60]"
              : "bg-[#F2994A]/10 text-[#F2994A]"
          } `}
        >
          {row.getValue("visibility")}
        </div>
      );
    },
  },
  {
    accessorKey: "user",
    header: "User",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-3 ">
          <img src="/public/images/avatar.png" className="w-8" alt="" />
          <p>{row.getValue("user")}</p>
        </div>
      );
    },
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");
      return (
        <div
          className={` rounded-[10px] text-xs font-semibold text-center w-fit px-2 py-[6px] capitalize ${
            status === "published"
              ? "bg-[#27AE60]/10 text-[#27AE60]"
              : status === "unavailable"
              ? "bg-[#E43F40]/10 text-[#E43F40]"
              : "bg-[#F2994A]/10 text-[#F2994A]"
          } `}
        >
          {row.getValue("status")}
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

export default function DialogueRequests({
  data,
}: {
  data: DialogueRequest[];
}) {
  const [tableData, setTableData] = useState<DialogueRequest[]>([]);

  useEffect(() => {
    (async () => {
      const tableData = await getData(data);
      setTableData(tableData);
    })();
  }, []);
  return (
    <div className="space-y-4">
      <div className="p-4 bg-white rounded-lg">
        <DataTable columns={columns} data={tableData} />
      </div>
      <TablePagination />
    </div>
  );
}

async function getData(data: DialogueRequest[]): Promise<DialogueRequest[]> {
  return data;
}
