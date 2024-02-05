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
import { useDebateContext } from "@/contexts/DebateContext";
import { debateFilterButtonOptions } from "@/utils/Democracy/Debates";
import { CustomPagination, TableSkeleton } from "../../custom";
import DebatesFilter from "./DebatesFilter";

const columns: ColumnDef<DebateType>[] = [
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
      return <div className="capitalize">{row.original.title}</div>;
    },
  },
  // {
  //   accessorKey: "debateTag",
  //   header: "Tags",
  //   size: 200,
  //   cell: ({ row }) => {
  //     return (
  //       <div className="flex items-center gap-1 capitalize w-[250px] overflow-x-auto ">
  //         {row.original.debateTag.map((tag) => (
  //           <div
  //             key={tag.id}
  //             className="px-2 py-1 rounded-md bg-slate-200 text-nowrap "
  //           >
  //             {tag.tag_name}
  //           </div>
  //         ))}
  //       </div>
  //     );
  //   },
  // },
  // {
  //   accessorKey: "debateSDGs",
  //   header: "SDGs",
  //   size: 200,
  //   cell: ({ row }) => {
  //     return (
  //       <div className="flex items-center gap-1 capitalize w-[250px] custom-scrollbar overflow-x-auto">
  //         {row.original.debateSDGs.map((sdg) => (
  //           <img src={sdg.sdgs.banner} key={sdg.sdgs.id} className="w-8 h08 " />
  //         ))}
  //       </div>
  //     );
  //   },
  // },
  {
    accessorKey: "likes",
    header: "Likes",
    cell: ({ row }) => {
      return <div className="capitalize ">{row.original.likes}</div>;
    },
  },
  {
    accessorKey: "dislikes",
    header: "Disikes",
    cell: ({ row }) => {
      return <div className="capitalize ">{row.original.dislikes}</div>;
    },
  },
  {
    accessorKey: "likePercentage",
    header: "Like Percentage",
    cell: ({ row }) => {
      return <div className="capitalize ">{row.original.likePercentage}%</div>;
    },
  },
  {
    accessorKey: "dislikePercentage",
    header: "Dislike Percentage",
    cell: ({ row }) => {
      return (
        <div className="capitalize ">{row.original.dislikePercentage}%</div>
      );
    },
  },
  {
    accessorKey: "total_votes_cache",
    header: "Total Votes",
    cell: ({ row }) => {
      return (
        <div className="capitalize ">{row.original.total_votes_cache}</div>
      );
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

export default function DebatesTable({ isSummary }: { isSummary: boolean }) {
  const [tableData, setTableData] = useState<DebateType[]>([]);
  const {
    fetchingDebates,
    fetchedDebatesData,
    filterByButton,
    filterOptions,
    setFilterOptions,
    setPage,
    page,
  } = useDebateContext();

  useEffect(() => {
    if (fetchedDebatesData) {
      if (isSummary) {
        setTableData(fetchedDebatesData.debates.slice(0, 3));
      } else setTableData(fetchedDebatesData.debates);
    }
  }, [fetchedDebatesData]);
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end gap-3 ml-auto">
        <DebatesFilter
          filterButtonOptions={debateFilterButtonOptions}
          filterByButton={filterByButton}
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
          isSearching={fetchingDebates}
          defaultFilterButtonValue="newest"
        />
        {isSummary && (
          <Link to="/democracy/debates" className="text-end">
            <p className="underline text-dark text-nowrap">See all</p>
          </Link>
        )}
      </div>
      <div className="w-full p-4 bg-white rounded-lg ">
        {fetchingDebates ? (
          <TableSkeleton count={20} />
        ) : (
          tableData.length && <DataTable columns={columns} data={tableData} />
        )}
      </div>

      {fetchedDebatesData && (
        <CustomPagination
          page={page}
          paginationData={fetchedDebatesData?.meta}
          setPage={setPage}
        />
      )}
    </div>
  );
}
