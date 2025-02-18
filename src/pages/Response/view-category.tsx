import {
  AddCategoryModerator,
  CategoryModeratorTable,
} from "@/components/Response";
import { useNavigationContext } from "@/contexts/NavigationContext";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft2 } from "iconsax-react";

export default function ViewCategoryPage() {
  const { setBreadcrumbs, activeLink, setActiveLink, SetTopBarComponents } =
    useNavigationContext();
  const { categoryId } = useParams();
  
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/response");
  };

  useEffect(() => {
    setActiveLink(`/response/categories/${categoryId}`);

    SetTopBarComponents(<AddCategoryModerator categoryId={categoryId!} />);

    return () => SetTopBarComponents(null);
  }, [categoryId]);

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
        label: "view category",
        link: `/response/categories/${categoryId}`,
      },
    ]);
  }, [activeLink]);

  return (
    <div className="page-wrapper">
      {/* <h3>{}</h3> */}
      <Button
          className="text-[14px] capitalize gap-1 bg-[#ebe5f0] w-fit  h-fit hover:bg-[#363636] hover:text-white text-dark px-2 mb-4"
          onClick={handleGoBack}
        >
          <ArrowLeft2 size="20" />
          Go Back
        </Button>

      <CategoryModeratorTable id={categoryId!} />
    </div>
  );
}
