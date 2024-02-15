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
import { CustomPagination, TableSkeleton } from "../../custom";
import { useProposalContext } from "@/contexts/ProposalContext";
import UserAvatar from "@/components/custom/UserAvatar";
import AdvancedSearch from "../AdvancedSearch";
import { proposalFilterButtonOptions } from "@/utils/Democracy/Proposals";
// import DebatesFilter from "./DebatesFilter";

const columns: ColumnDef<ProposalType>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt).toDateString();
      return <div className="capitalize">{date}</div>;
    },
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      return (
        <div className="capitalize line-clamp-2 max-w-[200px]">
          {row.original.title}
        </div>
      );
    },
  },

  {
    accessorKey: "author",
    header: "Author",
    cell: ({ row }) => {
      const author = row.original.author;
      return (
        <div className="flex items-center gap-2 capitalize ">
          <UserAvatar
            user={{
              username: author.username,
              profile_picture: author.profile_picture,
              firstname: "",
              lastname: "",
            }}
            size={30}
          />
          <p className="text-sm text-text">{author.username}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "proposalCategory",
    header: "Categories",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-1 capitalize flex-wrap max-w-[200px]">
          {row.original.proposalCategory.map((category) => (
            <div
              className="px-2 py-1 text-xs text-center text-white bg-black rounded-md text-nowrap"
              key={category.category_id}
            >
              {category.categoryDetail.name}
            </div>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "proposalTag",
    header: "Tags",
    cell: ({ row }) => {
      return (
        <div className="flex capitalize">
          {row.original.proposalTag.map((tag) => (
            <div key={tag.id}>{tag.tag_name}</div>
          ))}
        </div>
      );
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
      const debate = row.original;
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
              <Link to={`/democracy/debates/${debate.id}`}>
                <div className="table-menu">View Debate</div>
              </Link>
            </DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function ProposalsTable({ isSummary }: { isSummary?: boolean }) {
  const [tableData, setTableData] = useState<ProposalType[]>([]);
  const {
    fetchingProposals,
    fetchedProposalData,
    filterByButton,
    filterOptions,
    setFilterOptions,
    setPage,
    page,
  } = useProposalContext();

  useEffect(() => {
    if (fetchedProposalData) {
      if (isSummary) {
        setTableData(fetchedProposalData.proposals.slice(0, 3));
      } else setTableData(fetchedProposalData.proposals);
    }
  }, [fetchedProposalData]);
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end gap-3 ml-auto">
        <AdvancedSearch
          filterButtonOptions={proposalFilterButtonOptions}
          filterByButton={filterByButton}
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
          isSearching={fetchingProposals}
          defaultFilterButtonValue="newest"
        />
        {isSummary && (
          <Link to="/democracy/debates" className="text-end">
            <p className="underline text-dark text-nowrap">See all</p>
          </Link>
        )}
      </div>
      <div className="w-full p-4 bg-white rounded-lg ">
        {fetchingProposals ? (
          <TableSkeleton count={20} />
        ) : (
          <DataTable columns={columns} data={tableData} />
        )}
      </div>

      {fetchedProposalData && (
        <CustomPagination
          page={page}
          paginationData={fetchedProposalData?.meta}
          setPage={setPage}
        />
      )}
    </div>
  );
}
