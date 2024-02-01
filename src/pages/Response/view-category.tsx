import {
  AddCategoryModerator,
  CategoryModeratorTable,
} from "@/components/Response";
import { useNavigationContext } from "@/contexts/NavigationContext";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ViewCategoryPage() {
  const { setBreadcrumbs, activeLink, setActiveLink, SetTopBarComponents } =
    useNavigationContext();
  const { categoryId } = useParams();

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
        label: "response",
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

      <CategoryModeratorTable id={categoryId!} />
    </div>
  );
}
