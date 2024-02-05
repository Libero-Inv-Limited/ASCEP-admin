import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import {
  useGetDebateCommentResponses,
  useVoteDebateComment,
} from "@/api/democracy/debates";

import CommentCard from "../common/CommentCard";
import DebateCommentResponse from "../debates/DebateCommentResponse";

import { useClickAway } from "@uidotdev/usehooks";
import { Separator } from "@/components/ui/separator";

interface DebateCommentCardProps {
  comment: CommentType;
}

const DebateCommentCard: React.FC<DebateCommentCardProps> = ({ comment }) => {
  const [dynamicPadding] = useState(20);

  const [showResponse, setShowResponse] = useState(false);

  const {
    data: Data,
    isRefetching: isLoadingResponses,
    refetch: getResponses,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetDebateCommentResponses(comment.id);

  const { mutate: voteComment, isLoading: isVotingComment } =
    useVoteDebateComment();

  // CLose responses on click away
  const ref = useClickAway<HTMLDivElement>(() => {
    setTimeout(() => {
      setShowResponse(false);
    }, 500);
  });

  // like comment
  const handleLike = () => {
    voteComment({ type: "like", comment_id: comment.id });
  };

  // dislike comment
  const handleDislike = () => {
    voteComment({ type: "dislike", comment_id: comment.id });
  };

  return (
    <div className="bg-[#fff] p-6 rounded-xl" ref={ref}>
      <CommentCard
        comment={comment}
        setShowResponse={setShowResponse}
        showResponse={showResponse}
        getResponses={getResponses}
        isLoadingResponses={isLoadingResponses}
        isVotingComment={isVotingComment}
        handleLike={handleLike}
        handleDislike={handleDislike}
      />

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
                paddingLeft={dynamicPadding + 10}
                refetchParentResponses={getResponses}
              />
            ))}
          </div>
        ))}
        <Separator orientation="horizontal" className="my-1 bg-base-500" />
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
    </div>
  );
};
export default DebateCommentCard;
