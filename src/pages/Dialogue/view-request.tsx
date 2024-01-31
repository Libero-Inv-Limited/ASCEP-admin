import {
  AddDialogueModerator,
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
    setActiveLink(`/dialogue/requests/${requestId}`);

    SetTopBarComponents(<AddDialogueModerator />);

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
        label: `Request - ${requestId}`,
        link: `/dialogue/requests/${requestId}`,
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
