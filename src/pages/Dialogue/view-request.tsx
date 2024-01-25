import {
  AddModerator,
  DialogueRequestInfo,
  DialogueRequestResponses,
} from "@/components/Dialogue";
import { useNavigationContext } from "@/contexts/NavigationContext";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ViewRequestPage() {
  const { setBreadcrumbs, activeLink, setActiveLink, SetTopBarComponents } =
    useNavigationContext();
  const { requestId } = useParams();

  useEffect(() => {
    setActiveLink(`/dialogue/view-request/${requestId}`);

    SetTopBarComponents(<AddModerator />);

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
        label: `view Request - ${requestId}`,
        link: `/dialogue/view-request/${requestId}`,
      },
    ]);
  }, [activeLink]);

  return (
    <div className="space-y-8 page-wrapper">
      <DialogueRequestInfo />
      <DialogueRequestResponses />
    </div>
  );
}
