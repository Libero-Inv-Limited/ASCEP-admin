import { Link } from "react-router-dom";
import { DemocracyTable } from ".";
import { TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import DemocracyTableFilter from "./DemocracyTableFilter";
import { Tabs } from "../ui/tabs";

export default function DemocracyTableSection() {
  return (
    <Tabs className="space-y-4" defaultValue="all">
      <TabsList className="flex gap-4">
        {tabs.map((tab) => (
          <TabsTrigger
            className="data-[state=active]:border-b-[3px] border-primary data-[state=active]:text-dark text-subtle_text/40"
            key={tab.value}
            value={tab.value}
          >
            {tab.label}
          </TabsTrigger>
        ))}

        <div className="flex items-center gap-3 ml-auto">
          <DemocracyTableFilter />
          <Link to="/democracy/view-all">
            <p className="underline text-dark">See all</p>
          </Link>
        </div>
      </TabsList>

      <TabsContent value="all">
        <DemocracyTable data={data} />
      </TabsContent>
    </Tabs>
  );
}

const tabs = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "Debates",
    label: "Debates",
  },
  {
    value: "Initiatives",
    label: "Initiatives",
  },
  {
    value: "Proposals",
    label: "Proposals",
  },
  {
    value: "Voting",
    label: "Voting",
  },
  // {
  //   value: "Participatory budgeting",
  //   label: "Participatory budgeting",
  // },
  {
    value: "SDG",
    label: "SDG",
  },
];

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
