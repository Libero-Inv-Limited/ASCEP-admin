import {
  AddCategoryModerator,
  CategoryModeratorTable,
} from "@/components/Response";
import { useNavigationContext } from "@/contexts/NavigationContext";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ViewRequestPage() {
  const { setBreadcrumbs, activeLink, setActiveLink, SetTopBarComponents } =
    useNavigationContext();
  const { requestId } = useParams();

  useEffect(() => {
    setActiveLink(`/response/categories/${requestId}`);

    SetTopBarComponents(<AddCategoryModerator categoryId={requestId!} />);

    return () => SetTopBarComponents(null);
  }, [requestId]);

  useEffect(() => {
    setBreadcrumbs([
      {
        label: "main",
        link: "/main",
      },
      {
        label: "dialogue",
        link: "/dialogue",
      },
      {
        label: "view Request",
        link: `/dialogue/requests/${requestId}`,
      },
    ]);
  }, [activeLink]);

  return (
    <div className="page-wrapper">
      {/* <h3>{}</h3> */}

      <CategoryModeratorTable id={requestId!} />
    </div>
  );
}
