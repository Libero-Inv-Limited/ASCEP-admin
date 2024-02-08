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
import { CustomPagination, TableSkeleton } from "../../custom";
import DebatesFilter from "../debates/DebatesFilter";
import { useInitiativeContext } from "@/contexts/InitiativeContext";
import UserAvatar from "@/components/custom/UserAvatar";
import { DataTable } from "@/components/custom/DataTable";
import ChangeInitiativeStatus from "./ChangeInitiativeStatus";
import { initiativeFilterButtonOptions } from "@/utils/Democracy/Initiatives";

const columns: ColumnDef<InitiativeType>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      return (
        <div className="capitalize w-[200px] overflow-x-auto line-clamp-2">
          {row.original.title}
        </div>
      );
    },
  },

  {
    accessorKey: "author",
    header: "Author",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2 capitalize ">
          <UserAvatar
            user={{
              username: row.original.author.username,
              profile_picture: row.original.author.profile_picture,
              firstname: "",
              lastname: "",
            }}
            size={30}
          />
          <p className="text-sm text-text">{row.original.author.username}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "",
    cell: ({ row }) => {
      return <div className="capitalize ">{row.original.email}</div>;
    },
  },
  {
    accessorKey: "follower",
    header: "Followers",
    cell: ({ row }) => {
      return (
        <div className="capitalize ">{row.original.total_followers_cache}</div>
      );
    },
  },

  {
    accessorKey: "total_comments_cache",
    header: "Total Comments",
    cell: ({ row }) => {
      return (
        <div className="capitalize ">{row.original.total_comments_cache}</div>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt).toDateString();
      return <div className="capitalize">{date}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return <div className="capitalize ">{row.original.status}</div>;
    },
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const initiatives = row.original;
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
              <Link to={`/democracy/initiativess/${initiatives.id}`}>
                <div className="table-menu">View Initiative</div>
              </Link>
            </DropdownMenuLabel>
            <DropdownMenuLabel>
              <ChangeInitiativeStatus id={row.original.id} />
            </DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function InitiativesTable({
  isSummary,
}: {
  isSummary?: boolean;
}) {
  const [tableData, setTableData] = useState<InitiativeType[]>([]);
  const {
    fetchingInitiatives,
    fetchedInitiativeData,
    filterByButton,
    filterOptions,
    setFilterOptions,
    page,
    setPage,
  } = useInitiativeContext();
  useEffect(() => {
    if (fetchedInitiativeData) {
      if (isSummary) {
        setTableData(fetchedInitiativeData.initiatives.slice(0, 3));
      } else setTableData(fetchedInitiativeData.initiatives);
    }
  }, [fetchedInitiativeData]);
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end gap-3 ml-auto">
        <DebatesFilter
          filterButtonOptions={initiativeFilterButtonOptions}
          filterByButton={filterByButton}
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
          isSearching={fetchingInitiatives}
          defaultFilterButtonValue="newest"
        />
        {isSummary && (
          <Link to="/democracy/initiatives" className="text-end">
            <p className="underline text-dark text-nowrap">See all</p>
          </Link>
        )}
      </div>
      <div className="w-full p-4 bg-white rounded-lg ">
        {fetchingInitiatives ? (
          <TableSkeleton count={20} />
        ) : (
          tableData.length && <DataTable columns={columns} data={tableData} />
        )}
      </div>

      {fetchedInitiativeData && (
        <CustomPagination
          page={page}
          paginationData={fetchedInitiativeData?.meta}
          setPage={setPage}
        />
      )}
    </div>
  );
}
