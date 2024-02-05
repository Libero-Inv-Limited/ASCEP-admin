/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";
import { useGetDebateCommentResponses } from "@/api/democracy/debates";

import CommentCardHeader from "../common/CommentCardHeader";
import CommentCardFooter from "../common/CommentCardFooter";

interface DebateCommentResponseProps {
  response: CommentType;
  paddingLeft: number;
  refetchParentResponses: () => void;
}
const DebateCommentResponse: React.FC<DebateCommentResponseProps> = ({
  response,
  paddingLeft,
}) => {
  const [showResponse, setShowResponse] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    data: Data,
    isRefetching: isLoadingResponses,
    refetch: getResponses,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetDebateCommentResponses(response.id);

  const fetchResponse = async () => {
    setLoading(true);
    await getResponses();
    setLoading(false);
    setShowResponse(true);
  };

  return (
    <>
      <div>
        <div
          className={`pl-[${paddingLeft}px]`}
          style={{ paddingLeft: `${paddingLeft}px` }}
        >
          <Separator orientation="horizontal" className="my-1 bg-base-500" />
          <CommentCardHeader
            //  @ts-ignore
            username={response.author.username ?? response.author.firstname}
            content={response.content}
            createdAt={response.createdAt}
            profilePicture={response.author.profile_picture}
          />

          {/* FOOTER */}
          <div className="flex flex-wrap-reverse items-center justify-between gap-2">
            <CommentCardFooter
              numberOfResponses={response.comment_response_cache}
              setShowResponse={setShowResponse}
              showResponse={showResponse}
              fetchResponse={fetchResponse}
              isLoadingResponses={isLoadingResponses}
              loading={loading}
            />
          </div>
        </div>

        {Data && (
          <div
            className={`${showResponse ? "" : "h-0  overflow-hidden"} ${
              isLoadingResponses && "opacity-50 pointer-events-none"
            }`}
          >
            {Data?.pages.map((commentsData, i) => (
              <div key={i}>
                {commentsData.comments.map((response) => (
                  <DebateCommentResponse
                    key={response.id}
                    response={response}
                    paddingLeft={paddingLeft + 30}
                    refetchParentResponses={getResponses}
                  />
                ))}
              </div>
            ))}
            {Data?.pages[Data.pages.length - 1].meta.next_page_url && (
              <Button
                className="w-full py-4 -mb-5 bg-transparent h-fit hover:bg-transparent"
                onClick={() => fetchNextPage()}
                isLoading={isFetchingNextPage}
              >
                Load more
              </Button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default DebateCommentResponse;
