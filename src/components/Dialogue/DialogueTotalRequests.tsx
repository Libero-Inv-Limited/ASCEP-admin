import { useEffect, useState } from 'react'
import { StatsCard } from "../custom";
import { User } from "lucide-react";
import {
  useGetAllDialogueRequests,
} from "@/api/dialogue";
import { searchRequestSchema } from "@/schemas/dialogueSchemas";
import { z } from "zod";

function DialogueTotalRequests() {
  const initialFilter = {
    text: undefined,
    authority: undefined,
    privacy: undefined,
    status: "all",
    datetimeRange: undefined,
  };

  const { data, mutateAsync, isLoading } = useGetAllDialogueRequests();
  const [page, setPage] = useState(1);
  const [filterOptions, setFilterOptions] = useState<z.infer<typeof searchRequestSchema>>(initialFilter);

  useEffect(() => {
    mutateAsync({ page: page, perPage: 1000000, filter: filterOptions });
  }, [filterOptions, page]);

  return (
    <div>
      <StatsCard icon={<User />} title="Total Requests" count={data?.foi_requests ? `${data?.foi_requests.length}` : 0} />
    </div>
  )
}

export default DialogueTotalRequests