import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { useClickAway } from "@uidotdev/usehooks";
import {
  useGetInitiativeCommentResponses,
  useVoteInitiativeComment,
} from "@/api/democracy/initiatives";
import CommentCardHeader from "../common/CommentCardHeader";
import CommentCardFooter from "../common/CommentCardFooter";
import VoteCommentButtons from "../common/VoteCommentButtons";

interface InitiativeCommentResponseProps {
  response: CommentType;
  paddingLeft: number;
  refetchParentResponses: () => void;
}
const InitiativeCommentResponse: React.FC<InitiativeCommentResponseProps> = ({
  response,
  paddingLeft,
}) => {
  const { isLoading: isVotingComment } = useVoteInitiativeComment();

  const [showResponse, setShowResponse] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    data: Data,
    isRefetching: isLoadingResponses,
    refetch: getResponses,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetInitiativeCommentResponses(response.id);

  const ref = useClickAway<HTMLDivElement>(() => {
    setTimeout(() => {
      setShowResponse(false);
    }, 500);
  });

  const fetchResponse = async () => {
    setLoading(true);
    await getResponses();
    setLoading(false);
    setShowResponse(true);
  };

  return (
    <>
      <div ref={ref}>
        <Separator orientation="horizontal" className="bg-base-500" />
        <div
          className={`pl-[${paddingLeft}px]`}
          style={{ paddingLeft: `${paddingLeft}px` }}
        >
          <CommentCardHeader
            username={response.author.username}
            content={response.content}
            createdAt={response.createdAt}
            profilePicture={response.author.profile_picture}
          />
          {/* FOOTER */}
          <div className="flex flex-wrap-reverse items-center justify-between gap-2">
            <CommentCardFooter
              numberOfResponses={response.comment_response_cache}
              // setIsReplying={setIsReplying}
              setShowResponse={setShowResponse}
              showResponse={showResponse}
              fetchResponse={fetchResponse}
              isLoadingResponses={isLoadingResponses}
              loading={loading}
            />

            <VoteCommentButtons
              // dislikeComment={handleDislike}
              // likeComment={handleLike}
              dislikes={response.dislikes}
              isVoting={isVotingComment}
              likes={response.likes}
              reactionType={response.userVoted.reactionType}
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
                  <InitiativeCommentResponse
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

export default InitiativeCommentResponse;
