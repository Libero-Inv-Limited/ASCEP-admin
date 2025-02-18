import UpdateReport from "@/components/Response/UpdateReport";
import { useNavigationContext } from "@/contexts/NavigationContext";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { ArrowLeft2 } from "iconsax-react";

export default function UpdateReportPage() {
  const { setBreadcrumbs, activeLink } = useNavigationContext();
  const location = useLocation();

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
        label: "Update Report",
        link: "/response/reports/update-report",
      },
    ]);
  }, [activeLink]);

  return (
    <div className="page-wrapper space-y-7">
      <Button
        className="text-[14px] capitalize gap-1 bg-[#ebe5f0] w-fit  h-fit hover:bg-[#363636] hover:text-white text-dark px-2 mb-4"
        onClick={handleGoBack}
      >
        <ArrowLeft2 size="20" />
        Go Back
      </Button>
      <UpdateReport reportData={location.state.reportData} />
    </div>
  );
}
