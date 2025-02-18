/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  ResponseComment,
  ResponseDetails,
  ResponseImageSelect,
} from "@/components/Response";
// import { Button } from "@/components/ui/button";
import { useParams, useNavigate } from "react-router-dom";
import { useNavigationContext } from "@/contexts/NavigationContext";
import { useEffect, useState} from "react";
import { useGetReportComments, useGetReportInfo } from "@/api/response";
import { CustomPagination, EmptyState, PageLoader } from "@/components/custom";
import { Skeleton } from "@/components/ui/skeleton";
import RejectPost from "@/components/Response/RejectPost";
import AcceptPost from "@/components/Response/AcceptPost"
import { Button } from "@/components/ui/button";
import { ArrowLeft2 } from "iconsax-react";

export default function ViewReportPage() {
  const { reportId } = useParams();
  const { setBreadcrumbs, activeLink } = useNavigationContext();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/response");
  };

  useEffect(() => {
    setBreadcrumbs([
      {
        label: "main",
        link: "/main",
      },
      {
        label: "updates",
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
        <Button
          className="text-[14px] capitalize gap-1 bg-[#ebe5f0] w-fit  h-fit hover:bg-[#363636] hover:text-white text-dark px-2 mb-4"
          onClick={handleGoBack}
        >
          <ArrowLeft2 size="20" />
          Go Back
        </Button>
        <h3 className="text-2xl">View Response</h3>
        <ResponseImageSelect images={data?.reportImages} />
        <ResponseDetails
          description={data?.description}
          locationMeta={data?.location_meta}
          sdgs={data?.reportSDGs}
          title={data?.title}
          // @ts-ignore
          createdAt={data?.createdAt}
        />
        <div className="text-xl">
          <strong>Report Status:</strong> {data?.reportStatus.name} ({data?.reportStatus.description})
        </div>

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
          <RejectPost id={data.id} />

          <AcceptPost id={data.id} />
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
