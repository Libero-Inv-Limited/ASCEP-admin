import { useGetDialogueRequestResponses } from "@/api/dialogue";
import * as Accordion from "@radix-ui/react-accordion";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Skeleton } from "../ui/skeleton";
import UserAvatar from "../custom/UserAvatar";
import { ArrowCircleDown } from "iconsax-react";
import { CustomPagination, EmptyState } from "../custom";
import DialogueResponseMenu from "./DialogueResponseMenu";

export default function DialogueRequestResponses() {
  const { requestId } = useParams();

  const [page, setPage] = useState(1);

  const { data, isLoading } = useGetDialogueRequestResponses({
    page,

    id: requestId!,
  });

  if (isLoading)
    return (
      <div className="space-y-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton className="h-12 rounded-lg bg-slate-200" key={i} />
        ))}
      </div>
    );
  if (data)
    return (
      <div>
        <Accordion.Root
          type="single"
          className="space-y-6 AccordionRoot"
          collapsible
        >
          {data.responses.map((response) => (
            <Accordion.Item
              key={response.id}
              className="px-4 py-6 bg-white rounded-xl AccordionItem"
              value={response.id.toString()}
            >
              <div className="flex w-full text-subtitle_text">
                <Accordion.Trigger className="flex items-center flex-1 gap-3 ">
                  <UserAvatar size={40} user={response.user} />

                  <span className="text-lg">
                    <span className="text-primary">
                      {response.user.firstname} {response.user.firstname}
                    </span>{" "}
                    on {new Date(response.response_date).toDateString()}
                  </span>
                </Accordion.Trigger>

                <div className="flex items-center gap-6 ">
                  <ArrowCircleDown
                    size="24"
                    className="flex-1 icon"
                    color="black"
                  />

                  <DialogueResponseMenu response={response} />
                </div>
              </div>
              <Accordion.Content className="overflow-hidden pt-6 text-subtle_text font-normal text-lg transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                {response.response_text}
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>

        {data.meta.total === 0 && (
          <EmptyState height={"50vh"} text="No Response Yet" />
        )}
        {data && (
          <CustomPagination
            page={page}
            setPage={setPage}
            paginationData={data.meta}
          />
        )}
      </div>
    );
}
