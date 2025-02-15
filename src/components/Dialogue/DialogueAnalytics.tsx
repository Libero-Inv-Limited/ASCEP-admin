import { StatsCard } from "../custom";
import { Messages1, Profile2User, TickSquare } from "iconsax-react";
import DialogueTotalRequests from "./DialogueTotalRequests";


export default function DialogueAnalytics() {

  return (
    <div className="grid grid-cols-4 gap-6 ">
      <DialogueTotalRequests />
      <StatsCard
        icon={<Messages1 />}
        title="Inactive Requests"
        count={"0"}
      />
      <DialogueTotalRequests />
      <StatsCard icon={<TickSquare />} title="Engagements" count={"1.9k"} />
    </div>
  );
}
