import {
  CreateSurvey,
  CreateSurveyQuestions,
  StepIndicator,
} from "@/components/Response";
import { useNavigationContext } from "@/contexts/NavigationContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft2 } from "iconsax-react";

export default function CreateSurveyPage() {
  const { setBreadcrumbs, activeLink } = useNavigationContext();
  const [step, setStep] = useState(1);
  const [surveyData, setSurveyData] = useState();
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
        label: "create survey",
        link: "/response/create-survey",
      },
    ]);
  }, [activeLink]);

  return (
    <div className="page-wrapper space-y-7">
      <StepIndicator step={step} />
      <Button
        className="text-[14px] capitalize gap-1 bg-[#ebe5f0] w-fit  h-fit hover:bg-[#363636] hover:text-white text-dark px-2 mb-4"
        onClick={handleGoBack}
      >
        <ArrowLeft2 size="20" />
        Go Back
      </Button>

      {step === 1 && <CreateSurvey next={(data: any) => { setStep(2); setSurveyData(data); }} />}
      {step === 2 && <CreateSurveyQuestions surveyData={surveyData} />}
    </div>
  );
}
