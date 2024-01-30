import { useGetSurveyResponse } from "@/api/response";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { CustomPagination, EmptyState, TableSkeleton } from "../custom";
import { DataTable } from "../custom/DataTable";
import UserAvatar from "../custom/UserAvatar";

export const columns: ColumnDef<SurveyResponseItem>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue("id")}</div>;
    },
  },
  {
    accessorKey: "user",
    header: "Username",
    cell: ({ row }) => {
      const user = row.original.user;
      return (
        <div className="flex items-center gap-2 capitalize">
          <UserAvatar size={40} user={user} />
          <p>
            {user?.firstname
              ? `${user.firstname} ${user.lastname}`
              : user.username}
          </p>
        </div>
      );
    },
  },

  {
    accessorKey: "response_text",
    header: "Response",

    cell: ({ row }) => {
      const response = row.original.response_text;
      return (
        <div className="capitalize">
          {typeof response === "string" ? (
            <p>{response}</p>
          ) : (
            response.map((responseText) => <p>{responseText}</p>)
          )}
        </div>
      );
    },
  },

  {
    accessorKey: "createdAt",
    header: "Date ",
    cell: ({ row }) => {
      const date = row.original.createdAt;
      return <div className="capitalize">{new Date(date).toDateString()}</div>;
    },
  },
];

export default function SurveyResponseTable({
  questionId,
}: {
  questionId: number;
}) {
  const [tableData, setTableData] = useState<SurveyResponseItem[]>([]);
  const [page, setPage] = useState(1);

  const { data, isLoading, refetch, remove } = useGetSurveyResponse({
    id: questionId.toString(),
    page,
  });

  useEffect(() => {
    refetch();
    return () => remove();
  }, []);

  useEffect(() => {
    if (data?.responses) {
      setTableData(data.responses);
    }
  }, [data]);
  return (
    <div className="space-y-4">
      <div className="p-4 bg-white rounded-lg ">
        {isLoading ? (
          <TableSkeleton count={20} />
        ) : tableData ? (
          <DataTable columns={columns} data={tableData} />
        ) : (
          <EmptyState height={"40vh"} />
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
