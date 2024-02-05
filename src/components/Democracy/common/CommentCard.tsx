import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";
import CommentCardHeader from "./CommentCardHeader";
import CommentCardFooter from "./CommentCardFooter";
import VoteCommentButtons from "./VoteCommentButtons";

interface CommentsCardProps {
  comment: CommentType;
  showResponse: boolean;
  setShowResponse: React.Dispatch<React.SetStateAction<boolean>>;
  getResponses: () => void;
  isLoadingResponses: boolean;
  handleLike: () => void;
  handleDislike: () => void;
  isVotingComment: boolean;
}

const Comment: React.FC<CommentsCardProps> = ({
  comment,
  showResponse,
  setShowResponse,
  getResponses,
  isLoadingResponses,
  isVotingComment,
}) => {
  const [loading, setLoading] = useState(false);

  const fetchResponse = async () => {
    setLoading(true);
    await getResponses();
    setLoading(false);
    setShowResponse(true);
  };

  return (
    <>
      <CommentCardHeader
        username={comment.author.username}
        content={comment.content}
        createdAt={comment.createdAt}
        profilePicture={comment.author.profile_picture}
      />
      <Separator orientation="horizontal" className="bg-base-500" />
      {/* FOOTER */}
      <div className="flex flex-wrap-reverse items-center justify-between gap-2 py-2">
        <CommentCardFooter
          numberOfResponses={comment.comment_response_cache}
          setShowResponse={setShowResponse}
          showResponse={showResponse}
          fetchResponse={fetchResponse}
          isLoadingResponses={isLoadingResponses}
          loading={loading}
        />

        <VoteCommentButtons
          dislikes={comment.dislikes}
          isVoting={isVotingComment}
          likes={comment.likes}
          reactionType={comment.userVoted.reactionType}
        />
      </div>
    </>
  );
};
export default Comment;
