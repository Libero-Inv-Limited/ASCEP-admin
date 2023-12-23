import {
  ResponseActions,
  ResponseCategories,
  ResponsePosts,
} from "@/components/Response";
import { StatsCard, TablePagination } from "@/components/custom";
import { Tabs } from "@/components/ui/tabs";
import { useNavigationContext } from "@/contexts/NavigationContext";
import { TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Messages1, Profile2User, TickSquare } from "iconsax-react";
import { User } from "lucide-react";
import { useEffect } from "react";
import ResponseFilter from "./ResponseFilter";
import { Link } from "react-router-dom";

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
          <StatsCard icon={<User />} title="Total Reports" count={"32k"} />
          <StatsCard icon={<Messages1 />} title="Total Survey" count={"3.2k"} />
          <StatsCard
            title="Total Democracy"
            icon={<Profile2User />}
            count={"1.2k"}
          />
          <StatsCard
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
                className="data-[state=active]:border-b-[3px] border-primary data-[state=active]:text-dark text-subtle_text/40"
                key={tab.value}
                value={tab.value}
              >
                {tab.label}
              </TabsTrigger>
            ))}

            <div className="flex items-center gap-3 ml-auto">
              <ResponseFilter />
              <Link to="/response/view-all">
                <p className="underline text-dark">See all</p>
              </Link>
            </div>
          </TabsList>

          <TabsContent value="all">
            <ResponsePosts data={data} />
          </TabsContent>
          <TabsContent value="recent-posts">
            <ResponsePosts data={data} />
          </TabsContent>
          <TabsContent value="surveys">
            <ResponsePosts data={data} />
          </TabsContent>
          <TablePagination />
        </Tabs>
      </div>
    </div>
  );
}

const data: ResponsePost[] = [
  {
    id: "728ed52f",
    postTitle: "Risk Management",
    category: "Response",
    user: "Joh doe",
    date: "Jan 1st, 2022",
    status: "published",
    action: "User login",
    location: "Umuleri, Anambra State",
    sdgs: [
      "/images/SDG/image 19.png",
      "/images/SDG/image 21.png",
      "/images/SDG/image 22.png",
    ],
  },
  {
    id: "123ub8u1",
    postTitle: "Risk Management",
    category: "Dialogue",
    user: "Joh doe",
    date: "Jan 1st, 2022",
    status: "pending",
    action: "User logout",
    location: "Umuleri, Anambra State",
    sdgs: [
      "/images/SDG/image 19.png",
      "/images/SDG/image 20.png",
      "/images/SDG/image 21.png",
      "/images/SDG/image 22.png",
    ],
  },
  {
    id: "nw901",
    postTitle: "Risk Management",
    category: "Democracy (Poll)",
    user: "Joh doe",
    date: "Jan 1st, 2022",
    status: "survey",
    action: "User login",
    location: "Umuleri, Anambra State",
    sdgs: [
      "/images/SDG/image 20.png",
      "/images/SDG/image 21.png",
      "/images/SDG/image 22.png",
    ],
  },
  {
    id: "12dcu1",
    postTitle: "Risk Management",
    category: "Risk Management",
    user: "Joh doe",
    date: "Jan 1st, 2022",
    status: "published",
    action: "User logout",
    location: "Umuleri, Anambra State",
    sdgs: [
      "/images/SDG/image 19.png",

      "/images/SDG/image 21.png",
      "/images/SDG/image 22.png",
    ],
  },
  {
    id: "xn180h2",
    postTitle: "Risk Management",
    category: "Democracy (Poll)",
    user: "Joh doe",
    date: "Jan 1st, 2022",
    status: "published",
    action: "User login",
    location: "Umuleri, Anambra State",
    sdgs: ["/images/SDG/image 21.png", "/images/SDG/image 22.png"],
  },
];
