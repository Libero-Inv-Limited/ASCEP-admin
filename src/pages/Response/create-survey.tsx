import {
  CreateSurvey,
  CreateSurveyQuestions,
  StepIndicator,
} from "@/components/Response";
import { useNavigationContext } from "@/contexts/NavigationContext";
import { useEffect, useState } from "react";

export default function CreateSurveyPage() {
  const { setBreadcrumbs, activeLink } = useNavigationContext();
  const [step, setStep] = useState(1);
  const [surveyData, setSurveyData] = useState();

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
    <div className="page-wrapper space-y-7">
      <StepIndicator step={step} />

      {step === 1 && <CreateSurvey next={(data: any) => {setStep(2); setSurveyData(data);}} />}
      {step === 2 && <CreateSurveyQuestions surveyData={surveyData} />}
    </div>
  );
}
