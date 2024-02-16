/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  ResponseComment,
  ResponseDetails,
  ResponseImageSelect,
} from "@/components/Response";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { useNavigationContext } from "@/contexts/NavigationContext";
import { useEffect, useState } from "react";
import { useGetReportComments, useGetReportInfo } from "@/api/response";
import { CustomPagination, EmptyState, PageLoader } from "@/components/custom";
import { Skeleton } from "@/components/ui/skeleton";

export default function ViewReportPage() {
  const { reportId } = useParams();
  const { setBreadcrumbs, activeLink } = useNavigationContext();

  useEffect(() => {
    setBreadcrumbs([
      {
        label: "main",
        link: "/main",
      },
      {
        label: "response",
        link: "/response",
      },
      {
        label: `Report - ${reportId}`,
        link: `/response/reports/${reportId}`,
      },
    ]);
  }, [activeLink, reportId]);
  const { data, isLoading } = useGetReportInfo(reportId!);

  const [page, setPage] = useState(1);

  const { data: commentsData, isLoading: loadingComments } =
    useGetReportComments({ id: reportId!, page });

  if (isLoading) return <PageLoader />;
  if (data)
    return (
      <div
        className="relative space-y-6 page-wrapper"
        style={{ paddingBottom: 100 }}
      >
        <h3 className="text-2xl">View Response</h3>
        <ResponseImageSelect images={data.reportImages} />
        <ResponseDetails
          description={data?.description}
          locationMeta={data?.location_meta}
          sdgs={data?.reportSDGs}
          title={data?.title}
          // @ts-ignore
          createdAt={data?.createdAt}
        />

        <p className="text-xl font-bold text-text">
          Total Comments ({data.total_comments_cache})
        </p>

        {/* Comments  */}
        {loadingComments
          ? Array.from({ length: 2 }).map(() => (
              <div className="space-y-4">
                <Skeleton className="w-12 h-12 rounded-full bg-slate-200" />
                <div className="space-y-4">
                  <Skeleton className="w-8/12 h-6 bg-slate-200" />
                  <Skeleton className="w-8/12 h-6 bg-slate-200" />
                  <Skeleton className="w-1/2 h-6 bg-slate-200" />
                </div>
              </div>
            ))
          : !!commentsData?.comments.length &&
            commentsData.comments.map((comment) => (
              <ResponseComment
                key={comment.id}
                comment={comment}
                reportId={reportId!}
              />
            ))}

        {!!commentsData?.comments.length && (
          <CustomPagination
            setPage={setPage}
            page={page}
            paginationData={commentsData?.meta}
          />
        )}

        <div className="flex justify-end gap-3">
          <Button className="px-6 h-[44px]" variant="outline-primary">
            Reject post
          </Button>

          <Button className="px-6 h-[44px]">Approve post</Button>
        </div>

        {/* {state.status !== "pending" && (
          <Button className="fixed bottom-10 right-10 ">
            Download Response
          </Button>
        )} */}
      </div>
    );
  return <EmptyState height={"80vh"} />;
}
