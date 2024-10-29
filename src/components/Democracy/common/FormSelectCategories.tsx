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
import React, { useState } from "react";
import { useGetAllCategories } from "@/api/category";

interface FormComboboxTargetProps {
  setCategory: React.Dispatch<React.SetStateAction<number | null>>;
  categoryId?: number | null | undefined; // Use this to look up the category ID if provided
}

const FormSelectCategory: React.FC<FormComboboxTargetProps> = ({
  setCategory,
  categoryId
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<number | string>();

  const { data, isLoading } = useGetAllCategories();

  // Determine the category name based on categoryId or value
  const selectedCategoryName =
    data?.find((category) => category.id === (categoryId ?? value))?.name ||
    "Select category...";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          role="combobox"
          aria-expanded={open}
          className="justify-between w-full bg-white rounded-full hover:bg-white text-dark"
        >
          {selectedCategoryName}
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
                    setCategory(category.id); // Sets selected category ID
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
