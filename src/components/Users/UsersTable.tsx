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
import { CustomPagination, EmptyState, TableSkeleton } from "../custom";
import { Link } from "react-router-dom";
import { useGetUsersAnalytics } from "@/api/user";
import DeactivateAccount from "./DeactivateAccount";
import DeleteAccount from "./DeleteAccount";

export type Post = {
  id: string;
  email: string;
  user: string;
  date: string;
  phoneNumber: string;
};

export const columns: ColumnDef<UserObj>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue("id")}</div>;
    },
  },
  {
    accessorKey: "username",
    header: "Username",
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue("username")}</div>;
    },
  },
  {
    accessorKey: "firstname",
    header: "First Name",
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue("firstname")}</div>;
    },
  },
  {
    accessorKey: "lastname",
    header: "Last Name",
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue("lastname")}</div>;
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
    accessorKey: "mobile",
    header: "Mobile",
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue("mobile")}</div>;
    },
  },

  {
    accessorKey: "created_at",
    header: "Date Joined",
    cell: ({ row }) => {
      return (
        <div className="capitalize">
          {new Date(row.getValue("created_at")).toDateString()}
        </div>
      );
    },
  },

  {
    accessorKey: "id",
    header: "Actions",
    cell: ({ row }) => {
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
              <Link to={`/users/${row.getValue("id")}`}>
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
              <DeactivateAccount
                status={row.original.status}
                id={row.getValue("id")}
              />
            </DropdownMenuLabel>
            <DropdownMenuLabel>
              <DeleteAccount id={row.getValue("id")} />
            </DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function UsersTable() {
  const [tableData, setTableData] = useState<UserObj[]>([]);
  const [page, setPage] = useState(1);

  const { data, isLoading } = useGetUsersAnalytics(page);

  useEffect(() => {
    if (data?.users) {
      setTableData(data.users);
    }
  }, [data]);
  return (
    <div className="space-y-4">
      <div className="bg-white  rounded-lg p-4 min-h-[65vh]">
        {isLoading ? (
          <TableSkeleton />
        ) : tableData ? (
          <DataTable columns={columns} data={tableData} />
        ) : (
          <EmptyState height={"60vh"} />
        )}
      </div>
      {data && (
        <CustomPagination
          page={page}
          setPage={setPage}
          paginationData={data?.meta}
        />
      )}
    </div>
  );
}
