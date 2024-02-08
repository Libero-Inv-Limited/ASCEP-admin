import { PageLoader, CustomPagination } from "@/components/custom";
import { useParams } from "react-router-dom";

import { FilterButtons } from "..";
import { commentFilterButtonOptions } from "@/utils/Democracy/General";
import { useEffect, useState } from "react";
import { useGetInitiativeComments } from "@/api/democracy/initiatives";
import InitiativeCommentCard from "./InitiativeCommentCard";

interface InitiativeCommentSectionProp {}
const InitiativeCommentSection: React.FC<InitiativeCommentSectionProp> = () => {
  const { initiativeId } = useParams();

  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("newest");

  const {
    data: commentsData,
    isLoading: isLoadingComments,
    refetch,
    isFetching: isFetchingComments,
  } = useGetInitiativeComments(initiativeId!, page, filter);

  useEffect(() => {
    refetch();
  }, [page, filter]);

  return (
    <>
      <div className="w-full">
        <h2 className="pt-0 pb-2 pl-0 mb-4 text-lg font-medium border-b-4 text-text border-primary w-fit">
          Comments
        </h2>
      </div>
      {/* {!isLoggedIn ? (
        <Propmpt />
      ) : (
        <div>
          <Form {...form}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4 max-w-[900px]"
            >
              <FormInput
                label="Leave a comment"
                control={control}
                name="content"
                errors={errors}
              />

              <Button
                type="submit"
                className="w-full max-w-[200px] h-12"
                isLoading={isPublishingComment}
                disabled={isPublishingComment}
              >
                Publish Comment
              </Button>
            </form>
          </Form>
        </div>
      )} */}

      {/* FILTER BUTTONS */}
      <div className="my-8">
        <FilterButtons
          filterButtonOptions={commentFilterButtonOptions}
          filterByButton={(value: string) => {
            setFilter(value);
            setPage(1);
          }}
          defaultFilterButtonValue="newest"
          isFiltering={isFetchingComments}
        />
      </div>

      {/* LOADING */}
      {isLoadingComments && <PageLoader />}

      {/* NO COMMENTS */}
      {commentsData?.comments?.length === 0 && (
        <div>
          <h1 className="text-base text-text md:text-xl">
            This Initiative has no comments yet
          </h1>
        </div>
      )}

      {/* COMMENT CARD */}
      {commentsData && commentsData.comments.length > 0 && (
        <div
          className={`${
            isFetchingComments
              ? "opacity-50 pointer-events-none"
              : "opacity-100 "
          } flex flex-col gap-6`}
        >
          {commentsData.comments.map((comment: CommentType) => (
            <InitiativeCommentCard comment={comment} key={comment.id} />
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

export default InitiativeCommentSection;
