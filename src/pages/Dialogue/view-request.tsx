import GoBackButton from "@/components/custom/GoBackButton";
import { useNavigationContext } from "@/contexts/NavigationContext";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetDialogueRequestInfo, useGetDialogueRequestResponses } from "@/api/dialogue";
import { useAppContext } from "@/contexts/AppContext";
import ReplyRequest from "@/components/Dialogue/ReplyRequest";
import RequestResponseItem from "@/components/Dialogue/RequestResponseItem";

export default function ViewRequestPage() {
  const { setBreadcrumbs, activeLink, setActiveLink, SetTopBarComponents } =
    useNavigationContext();
  const { requestId } = useParams();
  const { user } = useAppContext();
  const { data, isLoading } = useGetDialogueRequestInfo(requestId!);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const { data: responseData, isLoading: loadingResponses } =
    useGetDialogueRequestResponses({page, perPage, id: requestId!});

  // console.log(data);

  const dateCreated = new Date(data?.createdAt).getDate();
  const monthCreated = new Date(data?.createdAt).getMonth() + 1;
  const yearCreated = new Date(data?.createdAt).getFullYear();

  useEffect(() => {
    setActiveLink(`/response/categories/${requestId}`);

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
    <div className="page-wrapper max-w-[900px]">
      {/* <h3>{}</h3> */}
      <div className="flex justify-between items-center">
        <GoBackButton link="/dialogue" />
        <div>
          Status:{" "}
          <span className="capitalize text-primary">{data?.status}</span>
        </div>
      </div>
      <div className="space-y-4 mt-2">
        <div className="font-semibold text-3xl capitalize">{data?.title}</div>
        <div className="flex justify-start space-x-2">
          <div className="text-subtle_text" >Reuquest to:</div>
          <Link to={`/dialogue/authorities/${data?.authority_id}`} className="text-blue-700">{data?.authority?.name}</Link>
          <div>by</div>
          <div className="text-primary">{data?.author.username}</div>
          <div className="text_subtle_text">on</div>
          <div className="font-semibold">{`${dateCreated}/${monthCreated}/${yearCreated}`}</div>
        </div>
        <div className="bg-white border-blue-800 p-2 border-2 rounded-lg">{data?.description}</div>
      </div>
      <div className="flex justify-end my-4">
        <ReplyRequest requestId={String(data?.id)} />
      </div>
      <div className="space-y-2">
        <span className="font-bold text-xl">Responses</span>
        {responseData?.responses.map((response) => (
          <RequestResponseItem response={response} />
        ))}
      </div>
    </div>
  );
}
