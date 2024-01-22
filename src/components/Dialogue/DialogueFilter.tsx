import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BiFilterAlt } from "react-icons/bi";
import { FilterDropdown } from "../custom";
import { Dispatch } from "react";
import { getPastDays } from "@/utils/helper";

const dateRange: FilterOption[] = [
  {
    label: "All",
    value: "",
  },
  {
    label: "Today",
    value: getPastDays(0),
  },
  {
    label: "Past One Week",
    value: getPastDays(7),
  },
  {
    label: "Past One Month",
    value: getPastDays(31),
  },
  {
    label: "Past One Year",
    value: getPastDays(366),
  },
];

interface DialogueFilterProps {
  dialogueFilter: GetFIORequestsPayload;
  setDialogueFilter: Dispatch<React.SetStateAction<GetFIORequestsPayload>>;
}

export default function DialogueFilter({
  dialogueFilter,
  setDialogueFilter,
}: DialogueFilterProps) {
  const handleSetDateRange = (date: FilterOption) => {
    setDialogueFilter({
      ...dialogueFilter,
      filter: {
        ...dialogueFilter.filter,
        datetimeRange: {
          startDate: date.value.toString(),
          endDate: getPastDays(0),
        },
      },
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="rounded-[10px] h-7 ">
          <span className="sr-only">Open menu</span>
          <BiFilterAlt size={16} />
          <p className="text-xs font-semibold">Filter</p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="px-2 font-normal text-subtle_text rounded-[26px] "
        align="end"
      >
        <div className="flex items-center gap-4 p-4 bg-white ">
          {/* <FilterDropdown title="Authority" options={authorities} /> */}
          <FilterDropdown
            title="Date range"
            options={dateRange}
            onSelect={handleSetDateRange}
          />
          {/* <FilterDropdown title="Visibility" options={visibility} /> */}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const authorities = [
  "State Government",
  "Police",
  "State Assembly",
  "High court",
  "FRSC",
  "NDLEA",
];

// const dateRanges = ["this weeek", "this month", "this year", "3 years"];

// const visibility = ["All", "Public", "Private"];
