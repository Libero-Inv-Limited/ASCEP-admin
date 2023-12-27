import { StatsCard } from "@/components/custom";
import { TickSquare } from "iconsax-react";

export default function DemocracyStats() {
  return (
    <div className="grid grid-cols-4 gap-6 ">
      <StatsCard icon={<TickSquare />} title="Total Debates" count={"32k"} />
      <StatsCard
        icon={<TickSquare />}
        title="Total initiatives"
        count={"3.2k"}
      />
      <StatsCard icon={<TickSquare />} title="Total Proposals" count={"1.2k"} />
      <StatsCard icon={<TickSquare />} title="Total Voting" count={"1.9k"} />
      <StatsCard icon={<TickSquare />} title="Total Budgeting" count={"1.2k"} />
      <StatsCard icon={<TickSquare />} title="Total SDGs" count={"18"} />
    </div>
  );
}
