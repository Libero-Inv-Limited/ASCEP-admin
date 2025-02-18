import { CategoriesTable } from "@/components/Response";
import { useNavigationContext } from "@/contexts/NavigationContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft2 } from "iconsax-react";

export default function AllCategoriesPage() {
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
        label: "all categories",
        link: "/response/categories",
      },
    ]);
  }, [activeLink]);
  return (
    <div className="page-wrapper">
      <Button
          className="text-[14px] capitalize gap-1 bg-[#ebe5f0] w-fit  h-fit hover:bg-[#363636] hover:text-white text-dark px-2 mb-4"
          onClick={handleGoBack}
        >
          <ArrowLeft2 size="20" />
          Go Back
        </Button>
        <div className="text-xl font-medium text-dark mb-2">Categories</div>
      <CategoriesTable />
    </div>
  );
}
