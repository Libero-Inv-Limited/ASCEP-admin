import { useNavigationContext } from "@/contexts/NavigationContext";
import { useEffect } from "react";
import ResponseFilter from "./ResponseFilter";
import { ResponsePosts } from "@/components/Response";
import { TablePagination } from "@/components/custom";

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
      <div className="flex items-center justify-between gap-3 ">
        <p className="text-xl text-subtitle_text">Recent Posts</p>

        <ResponseFilter />
      </div>
      <ResponsePosts data={data} />
      <TablePagination />
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
  {
    id: "32h9un",
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
    id: "q89hwr2",
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
    id: "q23r9j0",
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
    id: "n9220qw",
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
    id: "209j2",
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
