/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useGetDebateInfo } from "@/api/democracy/debates";
import {
  DebateComments,
  DebateMeetingLink,
  DebateSupportSection,
  DebateTagsSection,
} from "@/components/Democracy";
import { PageLoader } from "@/components/custom";
import UserAvatar from "@/components/custom/UserAvatar";
import { useNavigationContext } from "@/contexts/NavigationContext";
import { useEffect } from "react";
import { MdOutlineMessage } from "react-icons/md";
import { useParams } from "react-router-dom";

export default function ViewDebatePage() {
  const { debateId } = useParams();
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
        label: `Debate - ${debateId}`,
        link: `/democracy/debates/${debateId}`,
      },
    ]);
  }, [activeLink, debateId]);
  const { data, isLoading } = useGetDebateInfo(debateId!);

  if (isLoading) return <PageLoader />;

  if (data)
    return (
      <div className="space-y-8 page-wrapper ">
        <h3>{data.title}</h3>

        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            {/* @ts-ignore */}
            <UserAvatar user={data.author} size={40} />

            <p className="text-lg font-bold">{data.author.username}</p>
          </div>
          <p className="text-subtle_text">
            {" "}
            {new Date(data.createdAt).toDateString()}
          </p>

          <div className="flex items-center gap-2 px-4 py-1 text-sm text-white bg-black rounded-lg">
            <MdOutlineMessage />
            {data.total_comments_cache} Comments
          </div>
        </div>

        <div dangerouslySetInnerHTML={{ __html: data.description }} />

        <DebateSupportSection data={data} />
        <DebateMeetingLink data={data} />
        <DebateTagsSection data={data} />
        <DebateComments />
      </div>
    );
}
