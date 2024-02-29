import { TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Tabs } from "../ui/tabs";
import DebateProvider from "@/contexts/DebateContext";
import DebatesTable from "./debates/DebatesTable";
import InitiativesTable from "./initiatives/InitiativesTable";
import InitiativeProvider from "@/contexts/InitiativeContext";
import ProposalsTable from "./proposals/ProposalsTable";
import ProposalProvider from "@/contexts/ProposalContext";
import VotingProvider from "@/contexts/VotingContext";
import VotingTable from "./voting/VotingTable";
import { SDGTable } from "./SDGs";
import BudgetsTable from "./budgeting/BudgetsTable";

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
      <ProposalProvider>
        <ProposalsTable isSummary />
      </ProposalProvider>
    ),
  },
  {
    value: "budgeting",
    label: "Budgeting",
    table: <BudgetsTable isSummary />,
  },
  {
    value: "Voting",
    label: "Voting",
    table: (
      <VotingProvider>
        <VotingTable isSummary />
      </VotingProvider>
    ),
  },

  {
    value: "SDG",
    label: "SDG",
    table: <SDGTable isSummary />,
  },
];
