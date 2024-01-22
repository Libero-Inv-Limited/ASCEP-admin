import { User } from "lucide-react";
import { StatsCard } from "../custom";
import { Messages1, Profile2User, TickSquare } from "iconsax-react";

export default function DialogueAnalytics() {
  return (
    <div className="grid grid-cols-4 gap-6 ">
      <StatsCard icon={<User />} title="Total Requests" count={"32k"} />
      <StatsCard
        icon={<Messages1 />}
        title="Inactive Requests"
        count={"3.2k"}
      />
      <StatsCard
        icon={<Profile2User />}
        title="Active Requests"
        count={"1.2k"}
      />
      <StatsCard icon={<TickSquare />} title="Engagements" count={"1.9k"} />
    </div>
  );
}
