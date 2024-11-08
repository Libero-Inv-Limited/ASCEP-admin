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
import { IoClose } from "react-icons/io5";
import { useGetAllCategories } from "@/api/category";

// interface CategoryType {
//   id: number;
//   name: string;
//   description: string;
//   type: string;
// }

interface FormSelectCategoryProps {
  setCategory: React.Dispatch<React.SetStateAction<CategoryType[]>>;
  category?: CategoryType[];
  currentCategories?: any | undefined;
}

const FormSelectCategory: React.FC<FormSelectCategoryProps> = ({
  setCategory,
  category = [],
  currentCategories
}) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<CategoryType[]>(category);
  const { data: categories, isLoading } = useGetAllCategories();

  console.log(category);

  // Handler for selecting a category
  const handleSelect = (category: CategoryType) => {
    if (!selected.some((item) => item.id === category.id)) {
      const updatedSelected = [...selected, category];
      setSelected(updatedSelected);
      setCategory(updatedSelected);
      setOpen(false);
    }
  };

  // Handler for removing a selected category
  const handleRemove = (id: number) => {
    const updatedSelected = selected.filter((item) => item.id !== id);
    setSelected(updatedSelected);
    setCategory(updatedSelected);
  };

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            role="combobox"
            aria-expanded={open}
            className="justify-between w-full bg-white rounded-full hover:bg-white text-dark"
          >
            {selected.length > 0
              ? `Selected (${selected.length})`
              : `${currentCategories.categoryDetail.name}`}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search categories..." className="h-9" />
            <CommandEmpty>No categories found.</CommandEmpty>
            <CommandGroup>
              {isLoading ? (
                <p className="py-20 text-center text-dark">Loading Categories...</p>
              ) : (
                categories?.map((category) => (
                  <CommandItem
                    key={category.id}
                    value={category.name}
                    onSelect={() => handleSelect(category)}
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

      {/* Display selected categories */}
      <div className="flex flex-wrap gap-2 mt-2">
        {selected.map((item) => (
          <SelectedSdg
            item={item}
            key={item.id}
            handleRemove={() => handleRemove(item.id)}
          />
        ))}
      </div>
    </div>
  );
};

interface SelectedSdgProps {
  item: { id: number; name: string };
  handleRemove: () => void;
}

const SelectedSdg: React.FC<SelectedSdgProps> = ({ item, handleRemove }) => {
  return (
    <div className="top-0 left-0 z-10 flex h-full gap-1 p-1 px-2 text-xs text-white transition-all duration-300 ease-in-out rounded-lg bg-dark w-fit">
      {item.name}
      <IoClose className="text-base cursor-pointer" onClick={handleRemove} />
    </div>
  );
};

export default FormSelectCategory;
