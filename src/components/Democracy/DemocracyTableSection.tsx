import { TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
// import DemocracyTableFilter from "./DemocracyTableFilter";
import { Tabs } from "../ui/tabs";
import DebateProvider from "@/contexts/DebateContext";
import DebatesTable from "./debates/DebatesTable";

export default function DemocracyTableSection() {
  return (
    <Tabs className="space-y-4" defaultValue="Debates">
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
      </TabsList>

      <TabsContent value="Debates">
        <DebateProvider>
          <DebatesTable />
        </DebateProvider>
      </TabsContent>
    </Tabs>
  );
}

const tabs = [
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
