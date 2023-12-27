import { DemocracyTable } from "@/components/Democracy";
import DemocracyTableFilter from "@/components/Democracy/DemocracyTableFilter";
import { useNavigationContext } from "@/contexts/NavigationContext";
import { useEffect } from "react";

export default function ViewAllDemocracyPage() {
  const { setBreadcrumbs, activeLink } = useNavigationContext();

  useEffect(() => {
    setBreadcrumbs([
      {
        label: "main",
        link: "/main",
      },
      {
        label: "democracy",
        link: "/democracy",
      },
      {
        label: "view all",
        link: "/democracy/view-all",
      },
    ]);
  }, [activeLink]);
  return (
    <div className="page-wrapper">
      <div className="space-y-4">
        <div className="flex justify-between">
          <p className="text-lg text-subtle_text">Requests</p>
          <div className="flex items-center gap-3 ml-auto">
            <DemocracyTableFilter />
          </div>
        </div>

        <DemocracyTable data={data} />
      </div>
    </div>
  );
}
const data: DemocracyTableData[] = [
  {
    id: "728ed52f",
    title: "Metro at night (on weekends). Is it positive?",
    category: "Debate",
    user: "Joh doe",
    date: "Jan 1st, 2022",
    status: "published",
    action: "User login",
    location: "Umuleri, Anambra State",
  },
  {
    id: "123ub8u1",
    title: "Refurbishment of the North Square",
    category: "Voting",
    user: "Joh doe",
    date: "Jan 1st, 2022",
    status: "pending",
    action: "User logout",
    location: "Umuleri, Anambra State",
  },
  {
    id: "nw901",
    title: "The shareing of paliatives",
    category: "Initiatives",
    user: "Joh doe",
    date: "Jan 1st, 2022",
    status: "unavailable",
    action: "User login",
    location: "Umuleri, Anambra State",
  },
  {
    id: "12dcu1",
    title: "Strategic plan for a 100% green city",
    category: "Proposals",
    user: "Joh doe",
    date: "Jan 1st, 2022",
    status: "published",
    action: "User logout",
    location: "Umuleri, Anambra State",
  },
  {
    id: "xn180h2",
    title: "City projects",
    category: "Budgeting",
    user: "Joh doe",
    date: "Jan 1st, 2022",
    status: "published",
    action: "User login",
    location: "Umuleri, Anambra State",
  },
  {
    id: "32h9un",
    title: "Refurbishment of the North Square",
    category: "Voting",
    user: "Joh doe",
    date: "Jan 1st, 2022",
    status: "published",
    action: "User login",
    location: "Umuleri, Anambra State",
  },
  {
    id: "q89hwr2",
    title: "The shareing of paliatives",
    category: "SDG",
    user: "Joh doe",
    date: "Jan 1st, 2022",
    status: "pending",
    action: "User logout",
    location: "Umuleri, Anambra State",
  },
];
