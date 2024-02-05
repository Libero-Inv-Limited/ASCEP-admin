import { PageLoader, CustomPagination } from "@/components/custom";
import { useParams } from "react-router-dom";
import { DebateCommentCard, FilterButtons } from "..";
import { useGetDebateComments } from "@/api/democracy/debates";
import { useEffect, useState } from "react";
import { commentFilterButtonOptions } from "@/utils/Democracy/General";

interface DebateCommentSectionProp {}
const DebateCommentSection: React.FC<DebateCommentSectionProp> = () => {
  const { debateId } = useParams();

  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("newest");

  const {
    data: commentsData,
    isLoading: isLoadingComments,
    refetch,
    isFetching: isFetchingComments,
  } = useGetDebateComments(debateId!, page, filter);

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
          <h1 className="text-base text-text md:text-xl">
            This debate has no comments yet
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
            <DebateCommentCard comment={comment} key={comment.id} />
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

export default DebateCommentSection;
