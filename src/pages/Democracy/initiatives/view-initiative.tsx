/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useGetInitiativeInfo } from "@/api/democracy/initiatives";
import {
  AddMeetingLink,
  InitiativeCommentSection,
  InitiativeMeetingLink,
  InitiativeTagsSection,
  InitiavativeSupportSection,
} from "@/components/Democracy";
import { PageLoader } from "@/components/custom";
import UserAvatar from "@/components/custom/UserAvatar";
import { useNavigationContext } from "@/contexts/NavigationContext";
import { useEffect } from "react";
import { MdOutlineMessage } from "react-icons/md";
import { useParams } from "react-router-dom";

export default function ViewInitiativePage() {
  const { initiativeId } = useParams();
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
        label: `Initiative - ${initiativeId}`,
        link: `/democracy/initiatives/${initiativeId}`,
      },
    ]);
  }, [activeLink, initiativeId]);
  const { data, isLoading } = useGetInitiativeInfo(initiativeId!);

  if (isLoading) return <PageLoader />;

  if (data)
    return (
      <div className="relative space-y-8 page-wrapper ">
        <h3>{data.title}</h3>

        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            {/* @ts-ignore */}
            <UserAvatar user={data.author} size={40} />

            <p className="text-lg font-bold">{data.author.username}</p>
          </div>
          <p className="text-subtle_text">
            {new Date(data.createdAt).toDateString()}
          </p>

          <div className="flex items-center gap-2 px-4 py-1 text-sm text-white bg-black rounded-lg">
            <MdOutlineMessage />
            {data.total_comments_cache} Comments
          </div>
        </div>

        <div
          className="text-text/80"
          dangerouslySetInnerHTML={{ __html: data.description }}
        />
        <InitiavativeSupportSection data={data} />
        <InitiativeMeetingLink data={data} />
        <InitiativeTagsSection data={data} />

        {/* COMMENT SECTION */}
        <div className="max-w-[900px] mt-10">
          <InitiativeCommentSection />
        </div>

        {/* <DebateSupportSection data={data} />
        <DebateComments /> */}

        <AddMeetingLink />
      </div>
    );
}
