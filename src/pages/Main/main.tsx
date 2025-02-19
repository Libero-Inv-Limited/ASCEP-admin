import {
  DemocracyBarChart,
  DialogueBarChart,
  MainAnalytics,
  RecentPosts,
  ResponseChart,
} from "@/components/Main";

export default function MainPage() {
  return (
    <div className="page-wrapper">
      <div className="mt-8 space-y-5">
        <MainAnalytics />

        {/* RESPONSE CHART */}
        <ResponseChart />

        <div className="grid grid-cols-2 gap-6">
          <DialogueBarChart />
          <DemocracyBarChart />
        </div>

        <RecentPosts />
      </div>
    </div>
  );
}
