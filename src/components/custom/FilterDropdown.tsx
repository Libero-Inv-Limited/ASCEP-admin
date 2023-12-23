import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ArrowDown2 } from "iconsax-react";
import { useState } from "react";

interface FilterDropdownProps {
  options: string[];
  title: string;
}

export default function FilterDropdown({
  options,
  title,
}: FilterDropdownProps) {
  const [selected, setSelected] = useState(options[0]);
  return (
    <div className="flex gap-3">
      <p className="text-lg text-subtitle_text">{title}</p>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="gap-4 capitalize rounded-full h-7 ">
            <p className="text-xs font-semibold text-dark">{selected}</p>

            <ArrowDown2 size="18" color="#292925" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="px-2 font-normal text-subtle_text rounded-[26px] "
          align="start"
        >
          {options.map((option, i) => (
            <DropdownMenuItem onClick={() => setSelected(option)} key={i}>
              <div className="p-1 capitalize">{option}</div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
