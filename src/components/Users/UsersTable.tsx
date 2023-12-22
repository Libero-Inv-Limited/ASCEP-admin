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
import { TablePagination } from "../custom";
import { Link } from "react-router-dom";

export type Post = {
  id: string;
  email: string;
  user: string;
  date: string;
  phoneNumber: string;
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
    accessorKey: "user",
    header: "User",
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue("user")}</div>;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue("email")}</div>;
    },
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue("phoneNumber")}</div>;
    },
  },

  {
    accessorKey: "date",
    header: "Date Joined",
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue("date")}</div>;
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
              <Link to="/users/1">
                <div className="table-menu">View User</div>
              </Link>
            </DropdownMenuLabel>
            <DropdownMenuLabel>
              <div className="table-menu">Assign role / privilege</div>
            </DropdownMenuLabel>
            <DropdownMenuLabel>
              <div className="table-menu">Reset Password </div>
            </DropdownMenuLabel>
            <DropdownMenuLabel>
              <div className="table-menu">Reset 2FA</div>
            </DropdownMenuLabel>
            <DropdownMenuLabel>
              <div className="table-menu">Deactivate account</div>
            </DropdownMenuLabel>
            <DropdownMenuLabel>
              <div className="text-red-500 table-menu">Delete account</div>
            </DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function UsersTable() {
  const [tableData, setTableData] = useState<Post[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getData();
      setTableData(data);
    })();
  }, []);
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg p-4 min-h-[70vh]">
        <DataTable columns={columns} data={tableData} />
      </div>
      <TablePagination />
    </div>
  );
}

async function getData(): Promise<Post[]> {
  return [
    {
      id: "728ed52f",
      email: "johndoe@demo.com",
      phoneNumber: "07010722622",
      user: "Joh doe",
      date: "Jan 1st, 2022",
    },
    {
      id: "123ub8u1",
      email: "emekaike@demo.com",
      phoneNumber: "07010722622",
      user: "Joh doe",
      date: "Jan 1st, 2022",
    },
    {
      id: "nw901",
      email: "emekaike@demo.com",
      phoneNumber: "07010722622",
      user: "Joh doe",
      date: "Jan 1st, 2022",
    },
    {
      id: "12dcu1",
      email: "johndoe@demo.com",
      phoneNumber: "07010722622",
      user: "Joh doe",
      date: "Jan 1st, 2022",
    },
    {
      id: "xn180h2",
      email: "johndoe@demo.com",
      phoneNumber: "07010722622",
      user: "Joh doe",
      date: "Jan 1st, 2022",
    },
  ];
}
