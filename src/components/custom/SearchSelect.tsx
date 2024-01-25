import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command";

interface SearchSelectProps {
  options: SelectOption[];
  handleSelect: (args: number | string) => void;
  placeholder: string;
  isLoading?: boolean;
  isWhite?: boolean;
}

export default function SearchSelect({
  options,
  isLoading,
  isWhite,
  handleSelect,
  placeholder,
}: SearchSelectProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<SelectOption | null>(null);
  const select = (id: string) => {
    setSelected(options.filter((option) => option.value == id)[0]);
    handleSelect(id);
    setOpen(false);
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          role="combobox"
          aria-expanded={open}
          className={` text-base text-text focus-visible:ring-0 focus-visible:ring-primary border-none focus:border-none focus-visible:ring-offset-0 rounded-[20px] h-[50px] placeholder:text-base placeholder:text-subtle_text/30 placeholder:font-medium w-full hover:bg-[#f5f5f5] justify-between ${
            isWhite ? "bg-white" : "bg-[#f5f5f5]"
          } `}
        >
          {isLoading ? "loading..." : selected?.label || placeholder}
          <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 h-[300px]">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandEmpty>No data found.</CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                value={option.value.toString()}
                onSelect={select}
              >
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
