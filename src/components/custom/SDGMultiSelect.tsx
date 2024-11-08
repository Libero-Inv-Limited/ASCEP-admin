import * as React from "react";
import { ChevronsUpDown } from "lucide-react";
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
import { useAppContext } from "@/contexts/AppContext";
import { IoClose } from "react-icons/io5";

interface SDGMultiSelectProps {
  selected: SDGData[];
  setSelected: React.Dispatch<React.SetStateAction<SDGData[]>>;
  currentSDGs?: any;
  isWhite: boolean;
}

export default function SDGMultiSelect({
  selected,
  setSelected,
  currentSDGs,
  isWhite
}: SDGMultiSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [renderedItems, setRenderedItems] = React.useState<SDGData[]>([]);
  const { sdgData, fetchingSdgs } = useAppContext();

  React.useEffect(() => {
    if (selected.length === 0) {
      setRenderedItems(sdgData);
    }
  }, [sdgData, selected]);

  const handleSDGData = (): string => {
    const data = currentSDGs.map((sdg: any) => `${sdg.sdg.title},`);
    return data;
  };
  const sdg_data = handleSDGData();

  const handleSelect = (id: number) => {
    const selectedItem = renderedItems.find((item) => item.id === id);
    if (selectedItem) {
      setSelected([...selected, selectedItem]);
      setRenderedItems(renderedItems.filter((item) => item.id !== id));
    }
  };

  const handleRemove = (id: number) => {
    const removedItem = selected.find((item) => item.id === id);
    if (removedItem) {
      setRenderedItems([...renderedItems, removedItem]);
      setSelected(selected.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="relative w-full space-y-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            role="combobox"
            aria-expanded={open}
            className={` text-base text-text focus-visible:ring-0 focus-visible:ring-primary border-none focus:border-none focus-visible:ring-offset-0 rounded-[20px] h-[50px] placeholder:text-base placeholder:text-subtle_text/30 placeholder:font-medium w-full hover:bg-[#f5f5f5] justify-between ${
              isWhite ? "bg-white" : "bg-[#f5f5f5]"
            } `}
          >
            {fetchingSdgs && `Fetching SDGs...`}
            {selected.length > 0 ? `Selected (${selected.length})` : `${sdg_data}`}
            <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="p-0 max-h-[400px]">
          <Command>
            <CommandInput placeholder="Search SDGs..." />
            <CommandEmpty>No SDG found.</CommandEmpty>
            <CommandGroup className="h-full overflow-y-auto max-h-80">
              {renderedItems?.length > 0 &&
                renderedItems.map((renderedItem) => (
                  <CommandItem
                    key={renderedItem.id}
                    value={renderedItem.title}
                    onSelect={() => {
                      handleSelect(Number(renderedItem.id));
                      setOpen(false);
                    }}
                  >
                    {renderedItem.title}
                  </CommandItem>
                ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      <div className="flex gap-2 ">
        {selected?.length > 0 &&
          selected.map((item) => (
            <SelectedSdg
              item={item}
              key={item.id}
              handleRemove={handleRemove}
            />
          ))}
      </div>
    </div>
  );
}

interface SelectedSdgProps {
  item: SDGData;
  handleRemove: (id: number) => void;
}

const SelectedSdg = ({ item, handleRemove }: SelectedSdgProps) => {
  const [showClose, setShowClose] = React.useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowClose(true)}
      onMouseLeave={() => setShowClose(false)}
    >
      <img className="rounded-lg w-14 h-14" src={item.banner} />
      <div className="absolute top-0 left-0 z-10 flex justify-end w-full h-full p-1 text-base transition-all duration-300 ease-in-out rounded-lg hover:bg-black/10 ">
        {showClose && (
          <IoClose
            className="cursor-pointer"
            onClick={() => handleRemove(item.id)}
          />
        )}
      </div>
    </div>
  );
};
