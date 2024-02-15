import { PageLoader, CustomPagination } from "@/components/custom";
import { useParams } from "react-router-dom";
import { FilterButtons } from "..";
import { commentFilterButtonOptions } from "@/utils/Democracy/General";
import { useEffect, useState } from "react";
import { useGetProposalComments } from "@/api/democracy/proposals";
import ProposalCommentCard from "./ProposalCommentCard";

interface ProposalCommentSectionProp {}

const ProposalCommentSection: React.FC<ProposalCommentSectionProp> = () => {
  const { proposalId } = useParams();

  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("newest");

  const {
    data: commentsData,
    isLoading: isLoadingComments,
    refetch,
    isFetching: isFetchingComments,
  } = useGetProposalComments(proposalId!, page, filter);

  useEffect(() => {
    refetch();
  }, [page, filter]);

  return (
    <>
      {/*COMMENTS */}
      <div className="w-full">
        <h2 className="pt-0 pb-2 pl-0 mb-4 text-lg font-medium border-b-4 text-text border-primary w-fit">
          Comments
        </h2>
      </div>

      {/* FILTER BUTTONS */}
      <div className="my-8">
        <FilterButtons
          filterButtonOptions={commentFilterButtonOptions}
          filterByButton={(value: string) => {
            setFilter(value);
            setPage(1);
          }}
          isFiltering={isFetchingComments}
          defaultFilterButtonValue="newest"
        />
      </div>

      {/* LOADING */}
      {isLoadingComments && <PageLoader />}
      {commentsData?.comments?.length === 0 && (
        <div>
          <h1 className="text-dark text-[16px] md:text-[20px]">
            This Proposal has no comments yet
          </h1>
        </div>
      )}

      {commentsData && commentsData.comments.length > 0 && (
        <div
          className={`${
            isFetchingComments
              ? "opacity-50 pointer-events-none"
              : "opacity-100 "
          } flex flex-col gap-6`}
        >
          {commentsData.comments.map((comment: CommentType) => (
            <ProposalCommentCard comment={comment} key={comment.id} />
          ))}

          {/* PAGINATION */}
          <CustomPagination
            page={page}
            setPage={setPage}
            paginationData={commentsData.meta}
            isFetching={isFetchingComments}
          />
        </div>
      )}
    </>
  );
};

export default ProposalCommentSection;
