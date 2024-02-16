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
import UserAvatar from "@/components/custom/UserAvatar";
import AdvancedSearch from "../AdvancedSearch";
import { proposalFilterButtonOptions } from "@/utils/Democracy/Proposals";
import { useVotingContext } from "@/contexts/VotingContext";
// import DebatesFilter from "./DebatesFilter";

const columns: ColumnDef<VotingType>[] = [
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
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      return (
        <div className="capitalize line-clamp-2 max-w-[200px]">
          {row.original.description}
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
    accessorKey: "",
    header: "Description",
    cell: ({ row }) => {
      return (
        <div className="capitalize line-clamp-2 max-w-[200px]">
          {row.original.description}
        </div>
      );
    },
  },
  {
    accessorKey: "votingTarget",
    header: "Targets",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-1 capitalize flex-wrap max-w-[200px]">
          {row.original.votingTarget.map((target) => (
            <div
              className="px-2 py-1 text-xs text-center text-white bg-black rounded-md text-nowrap"
              key={target.target_id}
            >
              {target.targetInfo.code}
            </div>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "votingSDGs",
    header: "SDGs",
    cell: ({ row }) => {
      return (
        <div className="flex capitalize">
          {row.original.votingSDGs.map((sdg) => (
            <img src={sdg.sdg.banner} key={sdg.sdg_id} />
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
      const proposal = row.original;
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
              <Link to={`/democracy/proposals/${proposal.id}`}>
                <div className="table-menu">View Proposal</div>
              </Link>
            </DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function VotingTable({ isSummary }: { isSummary?: boolean }) {
  const [tableData, setTableData] = useState<VotingType[]>([]);
  const {
    fetchingPolls,
    fetchedPollsData,
    filterByButton,
    filterOptions,
    setFilterOptions,
    setPage,
    page,
  } = useVotingContext();

  useEffect(() => {
    if (fetchedPollsData) {
      if (isSummary) {
        setTableData(fetchedPollsData.polls.slice(0, 3));
      } else setTableData(fetchedPollsData.polls);
    }
  }, [fetchedPollsData]);
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end gap-3 ml-auto">
        <AdvancedSearch
          filterButtonOptions={proposalFilterButtonOptions}
          filterByButton={filterByButton}
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
          isSearching={fetchingPolls}
          defaultFilterButtonValue="newest"
        />
        {isSummary && (
          <Link to="/democracy/proposals" className="text-end">
            <p className="underline text-dark text-nowrap">See all</p>
          </Link>
        )}
      </div>
      <div className="w-full p-4 bg-white rounded-lg ">
        {fetchingPolls ? (
          <TableSkeleton count={20} />
        ) : (
          <DataTable columns={columns} data={tableData} />
        )}
      </div>

      {fetchedPollsData && (
        <CustomPagination
          page={page}
          paginationData={fetchedPollsData?.meta}
          setPage={setPage}
        />
      )}
    </div>
  );
}
