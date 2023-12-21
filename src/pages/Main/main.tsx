import { Messages1, Profile2User, TickSquare, User } from "iconsax-react";

import {
  DemocracyBarChart,
  DialogueBarChart,
  MainStatsCard,
  RecentPosts,
  ResponseChart,
} from "@/components/Main";

export default function MainPage() {
  return (
    <div className="page-wrapper">
      <div className="mt-8 space-y-5">
        {/* MAIN STATS */}
        <div className="grid grid-cols-4 gap-6 ">
          <MainStatsCard icon={<User />} title="Total Response" count={"32k"} />
          <MainStatsCard
            icon={<Messages1 />}
            title="Total Response"
            count={"3.2k"}
          />
          <MainStatsCard
            icon={<Profile2User />}
            title="Total Dialogue "
            count={"1.2k"}
          />
          <MainStatsCard
            icon={<TickSquare />}
            title="Total Democracy"
            count={"1.9k"}
          />
        </div>

        {/* RESPONSE CHART */}
        <ResponseChart />

        <div className="grid grid-cols-2 gap-6">
          <DialogueBarChart />
          <DemocracyBarChart />
        </div>

        <RecentPosts />

        {/* RESPONSE ACTIVITIES */}
        {/* <p className="text-lg text-subtle_text">Recommendations</p>
        <div className="flex w-full gap-4 pb-5 overflow-x-auto custom-scrollbar">
          <ResponseActivity />
          <ResponseActivity />
          <ResponseActivity />
          <ResponseActivity />
          <ResponseActivity />
          <ResponseActivity />
        </div> */}

        {/* POPULAR POLLS */}
        {/* <p className="text-lg text-subtle_text">Popular Polls</p>

        <div className="space-y-4">
          <PopularPoll />
          <PopularPoll />
        </div> */}
      </div>
    </div>
  );
}
