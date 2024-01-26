/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";

import { DataTable } from "@/components/custom/DataTable";
import { CustomPagination } from "../custom";
import { Link } from "react-router-dom";
import {
  useGetAllDialogueRequests,
  useUpdateRequstStatus,
} from "@/api/dialogue";
import SearchDialogueRequests from "./SearchDialogueRequests";
import { searchRequestSchema } from "@/schemas/dialogueSchemas";
import { z } from "zod";
import DialogueVisibilityTag from "./DialogueVisibilityTag";
import DialogueStatusTag from "./DialogueStatusTag";
import DialogueRequestActions from "./DialogueRequestActions";

const initialFilter = {
  text: undefined,
  authority: undefined,
  privacy: undefined,
  status: "all",
  datetimeRange: undefined,
};

export default function DialogueRequests({
  isSummary,
}: {
  isSummary?: boolean;
}) {
  const [tableData, setTableData] = useState<FOIRequest[]>([]);
  const [page, setPage] = useState(1);
  const [filterOptions, setFilterOptions] =
    useState<z.infer<typeof searchRequestSchema>>(initialFilter);

  const {
    mutate,
    isLoading: updating,
    data: successResp,
    reset,
  } = useUpdateRequstStatus();

  const columns: ColumnDef<FOIRequest>[] = [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => {
        return <div className="text-xs capitalize">{row.original.title}</div>;
      },
    },
    {
      accessorKey: "author",
      header: "Author",
      cell: ({ row }) => {
        return (
          <div className="text-xs capitalize">
            {row.original.author.username}
          </div>
        );
      },
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => {
        return (
          <div className="capitalize text-xs line-clamp-1 max-w-[140px]">
            {row.original.description}
          </div>
        );
      },
    },

    {
      accessorKey: "authority",
      header: "Authority",
      cell: ({ row }) => {
        return (
          <div className="text-xs capitalize">
            {row.original.authority.name}
          </div>
        );
      },
    },
    {
      accessorKey: "authority",
      header: "Authority",
      cell: ({ row }) => {
        return (
          <div className="text-xs capitalize">
            {row.original.authority.name}
          </div>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }) => {
        return (
          <div className="text-xs capitalize">
            {new Date(row.original.createdAt).toDateString()}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        return <DialogueStatusTag status={status} />;
      },
    },

    {
      accessorKey: "public_identifier",
      header: "Visibility",
      cell: ({ row }) => {
        const visibility = row.original.public_identifier;
        return <DialogueVisibilityTag visibility={visibility} />;
      },
    },

    {
      accessorKey: "id",
      header: "Actions",
      cell: ({ row }) => {
        return (
          <DialogueRequestActions
            isLoading={updating}
            data={successResp}
            mutate={mutate}
            dialogue={row.original}
          />
        );
      },
    },
  ];

  const { data, mutateAsync, isLoading } = useGetAllDialogueRequests();

  useEffect(() => {
    mutateAsync({ page: page, perPage: 10, filter: filterOptions });
  }, [filterOptions]);

  useEffect(() => {
    if (successResp) {
      mutateAsync({ page: page, perPage: 10, filter: filterOptions });
      reset();
    }
  }, [successResp]);

  useEffect(() => {
    if (data?.foi_requests) {
      if (isSummary) {
        const tableData = data.foi_requests.slice(0, 3);
        setTableData(tableData);
      } else {
        const tableData = data?.foi_requests;
        setTableData(tableData);
      }
    }
  }, [data]);
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <p className="text-lg text-subtle_text">Requests</p>
        <div className="flex items-center gap-3 ml-auto">
          {isSummary && (
            <Link to="/dialogue/view-all">
              <p className="underline text-dark">See all</p>
            </Link>
          )}
        </div>
      </div>

      <SearchDialogueRequests
        isLoading={isLoading}
        setFilterOptions={setFilterOptions}
      />

      {data && (
        <div className="p-4 bg-white rounded-lg">
          <DataTable columns={columns} data={tableData} />
          {!isSummary && (
            <CustomPagination
              page={page}
              paginationData={data?.meta}
              setPage={setPage}
            />
          )}
        </div>
      )}
    </div>
  );
}
