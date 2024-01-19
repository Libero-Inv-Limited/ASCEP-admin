import { CreateSurveyQuestions, StepIndicator } from "@/components/Response";
import { useNavigationContext } from "@/contexts/NavigationContext";
import { useEffect } from "react";

export default function AddSurveyQuestions() {
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
        label: "create survey",
        link: "/response/create-survey",
      },
    ]);
  }, [activeLink]);
  return (
    <div className="page-wrapper">
      <StepIndicator step={2} />
      <CreateSurveyQuestions />
    </div>
  );
}
