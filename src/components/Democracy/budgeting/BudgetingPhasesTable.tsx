import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/custom/DataTable";
// import AddPhaseToBudget from "./AddPhaseToBudget";
import useDisclosure from "@/hooks/useDisclosure";
import AddBudget from "./AddBudget";

const columns: ColumnDef<BudgetInfoPhase>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return <div className="capitalize">{row.original.phase_name}</div>;
    },
  },
  {
    accessorKey: "phase_index",
    header: "Phase",
    cell: ({ row }) => {
      return <div>Phase {row.original.phase_index}</div>;
    },
  },

  {
    accessorKey: "start_date",
    header: "Time From",
    cell: ({ row }) => {
      return (
        <div className="capitalize">
          {new Date(row.original.start_date).toDateString()} -{" "}
          {new Date(row.original.end_date).toDateString()}
        </div>
      );
    },
  },
  {
    accessorKey: "current_phase",
    header: "Is Current",
    cell: ({ row }) => {
      return <div>{row.original.current_phase ? "Yes" : "No"}</div>;
    },
  },

  {
    id: "actions",
    header: "Actions",
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="w-8 h-8 p-0 bg-transparent hover:bg-gray-200">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          {/* <DropdownMenuContent className="px-2" align="end">
            <DropdownMenuLabel>
              <AddSDGTarget id={row.original.id} />
            </DropdownMenuLabel>
            <DropdownMenuLabel>
              <DeleteSDG id={row.original.id} />
            </DropdownMenuLabel>
          </DropdownMenuContent> */}
        </DropdownMenu>
      );
    },
  },
];

export default function BudgetingPhasesTable({
  budget,
}: {
  budget: BudgetInfo;
}) {
  const data = budget.budgetPhases;
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4>Budjet Phases</h4>

        <Button onClick={onOpen} size="sm">
          Add Phase
        </Button>
        {/* <AddPhaseToBudget
          budget={budget}
          isOpen={isOpen}
          onClose={onClose}
        /> */}

        {isOpen && budget && (
          <AddBudget
            isOpen={isOpen}
            onClose={onClose}
            budget={budget}
            defaultSelectedPhases={budget.budgetPhases}
            openAddPhase
          />
        )}
      </div>

      <DataTable columns={columns} data={data} />
    </div>
  );
}
