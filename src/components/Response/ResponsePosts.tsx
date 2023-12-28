/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";

import { DataTable } from "@/components/custom/DataTable";
import ResponsePostActions from "./ResponsePostActions";

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
              : status === "completed"
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
    cell: ({ row }) => <ResponsePostActions row={row} />,
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
