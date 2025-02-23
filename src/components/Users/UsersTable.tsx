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
import RoleFiltersButton from "../custom/RoleFiltersButton";
import UsersFilters from "./UsersFilter";

import { useAppContext } from "@/contexts/AppContext";

// const { user } = useAppContext();

export type Post = {
  id: string;
  email: string;
  user: string;
  date: string;
  phoneNumber: string;
};

export const columns: ColumnDef<UserObj>[] = [
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
      const { user } = useAppContext();
      console.log(user);

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="w-8 h-8 p-0 bg-transparent hover:bg-gray-200">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="px-2" align="end">
            {
              user?.permissions && user?.permissions?.some((perm) => perm.trim() === 'view user detail') &&
              (<DropdownMenuLabel>
                <Link to={`/users/${row.getValue("id")}`}>
                  <div className="table-menu">View User Details</div>
                </Link>
              </DropdownMenuLabel>)
            }

            {/* <DropdownMenuLabel>
              <div className="table-menu">Assign role / privilege</div>
            </DropdownMenuLabel>
            <DropdownMenuLabel>
              <div className="table-menu">Reset Password </div>
            </DropdownMenuLabel>
            <DropdownMenuLabel>
              <div className="table-menu">Reset 2FA</div>
            </DropdownMenuLabel> */}
            {
              user?.permissions && user?.permissions?.some((perm) => perm.trim() === 'deactivate user account') &&
              (<DropdownMenuLabel>
                <DeactivateAccount
                  status={row.original.status}
                  id={row.getValue("id")}
                />
              </DropdownMenuLabel>)
            }

            {
              user?.permissions && user?.permissions?.some((perm) => perm.trim() === 'delete user account') &&
              (<DropdownMenuLabel>
                <DeleteAccount id={row.getValue("id")} />
              </DropdownMenuLabel>)
            }

          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function UsersTable() {
  const [tableData, setTableData] = useState<UserObj[]>([]);
  const [roleId, setRoleId] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useGetUsersAnalytics(page);

  useEffect(() => {
    if (!data?.users) return;

    if (roleId !== "") {
      setTableData((data?.users ?? []).filter((item) => item.role === Number(roleId)));
    } else {
      setTableData(data.users);
    }
  }, [data, roleId]);

  // console.log(tableData);
  // console.log("Role Id:", roleId);

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <p className="text-xl font-medium text-dark">
          Users
        </p>

        <div className="flex items-center gap-3">
          <RoleFiltersButton variant="pill">
            <UsersFilters setRoleId={setRoleId} />
          </RoleFiltersButton>
        </div>
      </div>
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
