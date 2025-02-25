import { StatsCard } from "../custom";
import { Messages1, Profile2User, TickSquare } from "iconsax-react";
import DialogueTotalRequests from "./DialogueTotalRequests";
import { useGetAllAuthorities } from "@/api/authorities";

export default function DialogueAnalytics() {
  const { data, isLoading } = useGetAllAuthorities();

  return (
    <div className="grid grid-cols-4 gap-6 ">
      <DialogueTotalRequests />
      {/* <StatsCard
        icon={<Messages1 />}
        title="Inactive Requests"
        count={"0"}
      /> */}
      {/* <DialogueTotalRequests /> */}
      <StatsCard icon={<TickSquare />} title="Total MDAs" count={isLoading ? "0" : `${data?.length}`} />
    </div>
  );
}
