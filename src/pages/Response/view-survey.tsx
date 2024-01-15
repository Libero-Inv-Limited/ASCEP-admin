import { ResponseDetails } from "@/components/Response";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import QuestionResponse from "./QuestionResponse";
import { useGetSurveyInfo } from "@/api/response";
import { EmptyState, PageLoader } from "@/components/custom";
import { useEffect } from "react";
import { useNavigationContext } from "@/contexts/NavigationContext";

export default function ViewSurveyPage() {
  const { setBreadcrumbs, activeLink } = useNavigationContext();
  const { surveyId } = useParams();

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
        label: "surveys",
        link: "/response/surveys",
      },
    ]);
  }, [activeLink]);

  const { data, isLoading } = useGetSurveyInfo(surveyId!);

  if (isLoading) {
    <PageLoader />;
  }
  if (data) {
    return (
      <div
        className="relative space-y-6 page-wrapper"
        style={{ paddingBottom: 100 }}
      >
        <h3 className="text-2xl">View Response</h3>
        <ResponseDetails
          description={data?.description}
          locationMeta={data?.location_meta}
          sdgs={data?.surveySDGs}
          title={data?.title}
        />
        {data?.questions &&
          data?.questions.map((question) => (
            <QuestionResponse question={question} key={question.id} />
          ))}

        {/* <div className="flex justify-end gap-3">
        <Button className="px-6 h-[44px]" variant="outline-primary">
          Reject post
        </Button>

        <Button className="px-6 h-[44px]">Approve post</Button>
      </div> */}

        <Button className="fixed bottom-10 right-10 ">Download Response</Button>
      </div>
    );
  }
  return <EmptyState height="50vh" />;
}
