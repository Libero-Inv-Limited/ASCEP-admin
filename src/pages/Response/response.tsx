import { MainStatsCard } from "@/components/Main";
import {
  ResponseActions,
  ResponseCategories,
  ResponsePosts,
} from "@/components/Response";
import { Tabs } from "@/components/ui/tabs";
import { useNavigationContext } from "@/contexts/NavigationContext";
import { TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Messages1, Profile2User, TickSquare } from "iconsax-react";
import { User } from "lucide-react";
import { useEffect } from "react";

const responsePostsTabs = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "recent-posts",
    label: "Recent Posts",
  },
  {
    value: "surveys",
    label: "Surveys",
  },
];

export default function ResponsePage() {
  const { setBreadcrumbs, activeLink } = useNavigationContext();
  // const [responsePostsTabs, setResponsePostsTabs] = {};

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
    ]);
  }, [activeLink]);
  return (
    <div className="page-wrapper">
      <div className="mt-8 space-y-5">
        {/* MAIN STATS */}
        <div className="grid grid-cols-4 gap-6 ">
          <MainStatsCard icon={<User />} title="Total Reports" count={"32k"} />
          <MainStatsCard
            icon={<Messages1 />}
            title="Total Survey"
            count={"3.2k"}
          />
          <MainStatsCard
            title="Total Democracy"
            icon={<Profile2User />}
            count={"1.2k"}
          />
          <MainStatsCard
            title="Reports Engagements"
            icon={<TickSquare />}
            count={"1.274m"}
          />
        </div>

        <ResponseActions />
        <ResponseCategories />

        <Tabs className="space-y-4" defaultValue="all">
          <TabsList className="flex gap-4">
            {responsePostsTabs.map((tab) => (
              <TabsTrigger
                className="data-[state=active]:border-b-[2px] border-primary data-[state=active]:text-dark text-subtle_text"
                key={tab.value}
                value={tab.value}
              >
                {tab.label}
              </TabsTrigger>
            ))}

            <div className="ml-auto">
              <p className="underline text-dark">See all</p>
            </div>
          </TabsList>

          <TabsContent value="all">
            <ResponsePosts />
          </TabsContent>
          <TabsContent value="recent-posts">
            <ResponsePosts />
          </TabsContent>
          <TabsContent value="surveys">
            <ResponsePosts />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
