import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { DataTable } from "../custom/DataTable";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import { MdOutlineCancel, MdOutlineViewDay } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

export type Post = {
  id: string;
  postTitle: string;
  category: "Response" | "Dialogue" | "Democracy (Poll)" | "Risk Management";
  user: string;
  date: string;
  status: "successful" | "pending";
  action: string;
};

export const columns: ColumnDef<Post>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue("id")}</div>;
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
      return <div className="capitalize">{row.getValue("user")}</div>;
    },
  },

  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue("date")}</div>;
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
            status === "successful"
              ? "bg-[#27AE60]/10 text-[#27AE60]"
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
                <div className="table-menu">
                  <MdOutlineViewDay size="16" />
                  View Post
                </div>
              </Link>
            </DropdownMenuLabel>
            <DropdownMenuLabel>
              <div className="table-menu">
                <FaRegCheckCircle size="16" />
                Approve
              </div>
            </DropdownMenuLabel>
            <DropdownMenuLabel>
              <div className="table-menu">
                <MdOutlineCancel size="16" />
                Decline
              </div>
            </DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function RecentPosts() {
  const [tableData, setTableData] = useState<Post[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getData();
      setTableData(data);
    })();
  }, []);
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-lg">
        <p className="text-subtle_text">Recent Post</p>

        <p className="underline text-dark">See all</p>
      </div>
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
      postTitle: "Mobile",
      category: "Response",
      user: "Joh doe",
      date: "Jan 1st, 2022",
      status: "successful",
      action: "User login",
    },
    {
      id: "123ub8u1",
      postTitle: "PC",
      category: "Dialogue",
      user: "Joh doe",
      date: "Jan 1st, 2022",
      status: "pending",
      action: "User logout",
    },
    {
      id: "nw901",
      postTitle: "Mobile",
      category: "Democracy (Poll)",
      user: "Joh doe",
      date: "Jan 1st, 2022",
      status: "pending",
      action: "User login",
    },
    {
      id: "12dcu1",
      postTitle: "PC",
      category: "Risk Management",
      user: "Joh doe",
      date: "Jan 1st, 2022",
      status: "successful",
      action: "User logout",
    },
    {
      id: "xn180h2",
      postTitle: "Mobile",
      category: "Democracy (Poll)",
      user: "Joh doe",
      date: "Jan 1st, 2022",
      status: "successful",
      action: "User login",
    },
  ];
}
