import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BiFilterAlt } from "react-icons/bi";
import FilterDropdown from "./FilterDropdown";
export default function ResponseFilter() {
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
          <FilterDropdown title="Category" options={categories} />
          <FilterDropdown title="Date range" options={dateRanges} />
          <FilterDropdown title="Locations" options={locations} />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const categories = [
  "all",
  "event",
  "education",
  "justice",
  "violence",
  "accident",
  "build",
];
const dateRanges = ["this weeek", "this month", "this year", "3 years"];

const locations = ["Everywhere", "Abuja", "Lagos", "Kano", "Port-Harcout"];
