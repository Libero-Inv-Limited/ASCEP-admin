import { useNavigationContext } from "@/contexts/NavigationContext";
import { useEffect } from "react";
import ResponseFilter from "./ResponseFilter";
import { ResponsePosts } from "@/components/Response";
import { TablePagination } from "@/components/custom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ViewAllPage() {
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
        label: "view all",
        link: "/response/view-all",
      },
    ]);
  }, [activeLink]);
  return (
    <div className="space-y-5 page-wrapper">
      <Tabs className="space-y-4" defaultValue="all">
        <TabsList className="flex gap-4">
          {responsePostsTabs.map((tab) => (
            <TabsTrigger
              className="data-[state=active]:border-b-[3px] border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-dark text-subtle_text/40"
              key={tab.value}
              value={tab.value}
            >
              {tab.label}
            </TabsTrigger>
          ))}

          <div className="flex text-dark items-center gap-3 ml-auto">
            <ResponseFilter />
          </div>
        </TabsList>

        <TabsContent value="all">
          <ResponsePosts data={data} />
        </TabsContent>
        <TabsContent value="recent-posts">
          <ResponsePosts data={data.filter((post) => post.type === "Post")} />
        </TabsContent>
        <TabsContent value="surveys">
          <ResponsePosts data={data.filter((post) => post.type === "Survey")} />
        </TabsContent>
        <TablePagination />
      </Tabs>
    </div>
  );
}

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

const data: ResponsePost[] = [
  {
    id: "728ed52f",
    postTitle: "Risk Management",
    type: "Post",
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
    type: "Post",
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
    type: "Survey",
    category: "Democracy (Poll)",
    user: "Joh doe",
    date: "Jan 1st, 2022",
    status: "completed",
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
    type: "Post",
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
    type: "Survey",
    category: "Democracy (Poll)",
    user: "Joh doe",
    date: "Jan 1st, 2022",
    status: "published",
    action: "User login",
    location: "Umuleri, Anambra State",
    sdgs: ["/images/SDG/image 21.png", "/images/SDG/image 22.png"],
  },
  {
    id: "32h9un",
    postTitle: "Risk Management",
    type: "Survey",
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
    id: "q89hwr2",
    postTitle: "Risk Management",
    type: "Post",
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
    id: "q23r9j0",
    postTitle: "Risk Management",
    type: "Post",
    category: "Democracy (Poll)",
    user: "Joh doe",
    date: "Jan 1st, 2022",
    status: "completed",
    action: "User login",
    location: "Umuleri, Anambra State",
    sdgs: [
      "/images/SDG/image 20.png",
      "/images/SDG/image 21.png",
      "/images/SDG/image 22.png",
    ],
  },
  {
    id: "n9220qw",
    postTitle: "Risk Management",
    type: "Survey",
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
    id: "209j2",
    postTitle: "Risk Management",
    type: "Post",
    category: "Democracy (Poll)",
    user: "Joh doe",
    date: "Jan 1st, 2022",
    status: "published",
    action: "User login",
    location: "Umuleri, Anambra State",
    sdgs: ["/images/SDG/image 21.png", "/images/SDG/image 22.png"],
  },
];
