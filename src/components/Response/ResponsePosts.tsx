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
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/custom/DataTable";

export const columns: ColumnDef<ResponsePost>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue("date")}</div>;
    },
  },
  {
    accessorKey: "postTitle",
    header: "Post Title",
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue("postTitle")}</div>;
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue("type")}</div>;
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue("category")}</div>;
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
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => {
      return (
        <div className="capitalize max-w-[100px]">
          {row.getValue("location")}
        </div>
      );
    },
  },
  {
    accessorKey: "sdgs",
    header: "SDGs",
    cell: ({ row }) => {
      return (
        <div className="flex gap-1">
          {/* @ts-ignore */}
          {row.getValue("sdgs").map((sdg) => (
            <img src={sdg} key={sdg} className="w-7" />
          ))}
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
              : status === "survey"
              ? "bg-[#9747FF]/10 text-[#9747FF]"
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
              <Link to="/posts/1">
                <div className="table-menu">Download</div>
              </Link>
            </DropdownMenuLabel>
            <DropdownMenuLabel>
              <div className="table-menu">Edit Survey</div>
            </DropdownMenuLabel>
            <DropdownMenuLabel>
              <div className="table-menu">Delete Survey</div>
            </DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function ResponsePosts({ data }: { data: ResponsePost[] }) {
  const [tableData, setTableData] = useState<ResponsePost[]>([]);

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
    </div>
  );
}

async function getData(data: ResponsePost[]): Promise<ResponsePost[]> {
  return data;
}
