import { TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
// import DemocracyTableFilter from "./DemocracyTableFilter";
import { Tabs } from "../ui/tabs";
import DebateProvider from "@/contexts/DebateContext";
import DebatesTable from "./debates/DebatesTable";
import InitiativesTable from "./initiatives/InitiativesTable";
import InitiativeProvider from "@/contexts/InitiativeContext";

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

      {tabs.map((tab) => (
        <TabsContent value={tab.value} key={tab.value}>
          {tab.table}
        </TabsContent>
      ))}
    </Tabs>
  );
}

const tabs = [
  {
    value: "Debates",
    label: "Debates",
    table: (
      <DebateProvider>
        <DebatesTable isSummary />
      </DebateProvider>
    ),
  },
  {
    value: "Initiatives",
    label: "Initiatives",
    table: (
      <InitiativeProvider>
        <InitiativesTable isSummary />
      </InitiativeProvider>
    ),
  },
  {
    value: "Proposals",
    label: "Proposals",
    table: (
      <DebateProvider>
        <DebatesTable isSummary />
      </DebateProvider>
    ),
  },
  {
    value: "Voting",
    label: "Voting",
    table: (
      <DebateProvider>
        <DebatesTable isSummary />
      </DebateProvider>
    ),
  },

  {
    value: "SDG",
    label: "SDG",
    table: (
      <DebateProvider>
        <DebatesTable isSummary />
      </DebateProvider>
    ),
  },
];
