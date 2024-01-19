import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { useGetAllCategories } from "@/api/category";

interface FormComboboxTargetProps {
  setCategory: React.Dispatch<React.SetStateAction<number | null>>;
}

const FormSelectCategory: React.FC<FormComboboxTargetProps> = ({
  setCategory,
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<number | string>();

  const { data, isLoading } = useGetAllCategories();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          role="combobox"
          aria-expanded={open}
          className="justify-between w-full bg-white rounded-full hover:bg-white text-dark"
        >
          {data?.find((category) => category.id === value)?.name ||
            "Select category..."}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search categories..." className="h-9" />
          <CommandEmpty>No target found.</CommandEmpty>
          <CommandGroup>
            {isLoading ? (
              <p className="py-20 text-clip">Loading Categories...</p>
            ) : (
              data &&
              data.map((category) => (
                <CommandItem
                  key={category.id}
                  value={category.id.toString()}
                  onSelect={() => {
                    setOpen(false);
                    setValue(category.id);
                    setCategory(category.id);
                  }}
                  className="w-full text-dark text-[14px]"
                >
                  {category.name}
                </CommandItem>
              ))
            )}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default FormSelectCategory;
