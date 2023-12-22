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

export type Post = {
  id: string;
  location: string;
  postTitle: string;
  category: "Response" | "Dialogue" | "Democracy (Poll)" | "Risk Management";
  user: string;
  date: string;
  status: "published" | "pending" | "survey";
  action: string;
  sdgs: string[];
};

export const columns: ColumnDef<Post>[] = [
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

export default function ResponsePosts() {
  const [tableData, setTableData] = useState<Post[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getData();
      setTableData(data);
    })();
  }, []);
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-[30px] p-4">
        <DataTable columns={columns} data={tableData} />
      </div>
    </div>
  );
}

async function getData(): Promise<Post[]> {
  return [
    {
      id: "728ed52f",
      postTitle: "Risk Management",
      category: "Response",
      user: "Joh doe",
      date: "Jan 1st, 2022",
      status: "published",
      action: "User login",
      location: "Umuleri, Anambra State",
      sdgs: [
        "/images/SDG/image 19.png",
        "/images/SDG/image 21.png",
        "/images/SDG/image 22.png",
      ],
    },
    {
      id: "123ub8u1",
      postTitle: "Risk Management",
      category: "Dialogue",
      user: "Joh doe",
      date: "Jan 1st, 2022",
      status: "pending",
      action: "User logout",
      location: "Umuleri, Anambra State",
      sdgs: [
        "/images/SDG/image 19.png",
        "/images/SDG/image 20.png",
        "/images/SDG/image 21.png",
        "/images/SDG/image 22.png",
      ],
    },
    {
      id: "nw901",
      postTitle: "Risk Management",
      category: "Democracy (Poll)",
      user: "Joh doe",
      date: "Jan 1st, 2022",
      status: "survey",
      action: "User login",
      location: "Umuleri, Anambra State",
      sdgs: [
        "/images/SDG/image 20.png",
        "/images/SDG/image 21.png",
        "/images/SDG/image 22.png",
      ],
    },
    {
      id: "12dcu1",
      postTitle: "Risk Management",
      category: "Risk Management",
      user: "Joh doe",
      date: "Jan 1st, 2022",
      status: "published",
      action: "User logout",
      location: "Umuleri, Anambra State",
      sdgs: [
        "/images/SDG/image 19.png",

        "/images/SDG/image 21.png",
        "/images/SDG/image 22.png",
      ],
    },
    {
      id: "xn180h2",
      postTitle: "Risk Management",
      category: "Democracy (Poll)",
      user: "Joh doe",
      date: "Jan 1st, 2022",
      status: "published",
      action: "User login",
      location: "Umuleri, Anambra State",
      sdgs: ["/images/SDG/image 21.png", "/images/SDG/image 22.png"],
    },
  ];
}
