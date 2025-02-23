import GoBackButton from "@/components/custom/GoBackButton";
import {
  AddCategoryModerator,
  CategoryModeratorTable,
} from "@/components/Response";
import { useNavigationContext } from "@/contexts/NavigationContext";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetDialogueRequestInfo } from "@/api/dialogue";
import { useAppContext } from "@/contexts/AppContext";

export default function ViewRequestPage() {
  const { setBreadcrumbs, activeLink, setActiveLink, SetTopBarComponents } =
    useNavigationContext();
  const { requestId } = useParams();
  const { user } = useAppContext();
  const { data, isLoading } = useGetDialogueRequestInfo(requestId!);

  console.log(data);

  useEffect(() => {
    setActiveLink(`/response/categories/${requestId}`);

    {
      user?.permissions && user?.permissions?.some((perm) => perm.trim() === 'create authority') &&
        (SetTopBarComponents(<AddCategoryModerator categoryId={requestId!} />))
    }

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
      <GoBackButton link="/dialogue" />
      <div className="space-y-2">
        <div className="text-subtle_text">Title:</div>
        <div className="font-semibold text-3xl capitalize">{data?.title}</div>
        <div className="flex justify-start space-x-2">
          <div className="text-subtle_text" >Author:</div>
          <div>{data?.author.username}</div>
          <div className="text_subtle_text">Date:</div>
          <div>{`${new Date(data?.createdAt).getDate()}/${new Date(data?.createdAt).getMonth()}/${new Date(data?.createdAt).getFullYear()}`}</div>
        </div>
        <div className="text-subtle_text" >Description:</div>
        <div>{data?.description}</div>
        <div className="text-subtle_text" >Status:</div>
        <div>{data?.status}</div>
        <div className="text-subtle_text" >Date:</div>
      </div>
    </div>
  );
}
