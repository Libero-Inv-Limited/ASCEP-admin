import { CategoriesTable } from "@/components/Response";
import { useNavigationContext } from "@/contexts/NavigationContext";
import { useEffect } from "react";

export default function AllCategoriesPage() {
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
        label: "all categories",
        link: "/response/categories",
      },
    ]);
  }, [activeLink]);
  return (
    <div className="page-wrapper">
      <CategoriesTable />
    </div>
  );
}
