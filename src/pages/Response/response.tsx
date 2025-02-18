import {
  ReportsTable,
  ResponseActions,
  ResponseAnalytics,
  ResponseCategories,
  SurveysTable,
} from "@/components/Response";
import { useNavigationContext } from "@/contexts/NavigationContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft2 } from "iconsax-react";

export default function ResponsePage() {
  const { setBreadcrumbs, activeLink } = useNavigationContext();

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/main");
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
    ]);
  }, [activeLink]);

  return (
    <div className="page-wrapper">
      <Button
        className="text-[14px] capitalize gap-1 bg-[#ebe5f0] w-fit  h-fit hover:bg-[#363636] hover:text-white text-dark px-2"
        onClick={handleGoBack}
      >
        <ArrowLeft2 size="20" />
        Go Back
      </Button>

      <div className="mt-8 space-y-5">
        {/* MAIN STATS */}
        <ResponseAnalytics />

        <ResponseActions />
        <ResponseCategories />

        <ReportsTable isSummary />
        <SurveysTable isSummary />
      </div>
    </div>
  );
}
