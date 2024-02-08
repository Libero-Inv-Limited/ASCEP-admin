/* eslint-disable @typescript-eslint/no-unused-vars */
import { IconWrapper } from "../../custom";
import { Filter } from "iconsax-react";
import { Button } from "../../ui/button";
import {
  FilterButtons,
  FormCheckBoxSDG,
  FormInput,
  FormSelectTarget,
} from "..";
import { useState } from "react";
import { Form, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { filterSchema } from "@/schemas/GeneralSchema";
import * as z from "zod";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BiFilterAlt } from "react-icons/bi";

interface AdvancedSearchProps {
  filterButtonOptions: FilterButtonOptionsType[];

  filterByButton: (value: string) => void;
  filterOptions: z.infer<typeof filterSchema>;
  setFilterOptions: React.Dispatch<
    React.SetStateAction<z.infer<typeof filterSchema>>
  >;
  isSearching: boolean;
  defaultFilterButtonValue: string;
}

const InitiativesFilter: React.FC<AdvancedSearchProps> = ({
  filterButtonOptions,
  filterByButton,
  setFilterOptions,
  filterOptions,
  isSearching,
  defaultFilterButtonValue,
}) => {
  const [advanceSearch, setAdvanceSearch] = useState(false);

  const form = useForm<z.infer<typeof filterSchema>>({
    resolver: zodResolver(filterSchema),
    mode: "onChange",
    defaultValues: {
      sdgs: [],
      specificSDG: undefined,
      specificTarget: undefined,
      targets: [],
      tags: [],
      mostactive: false,
      text: "",
      highestrating: false,
      newest: false,
      datetimeSpecific: "",
    },
  });
  const { control, handleSubmit, reset } = form;

  // GET FILTER OBJECT WITH VALUES
  const getFiltersWithValues = (filters: any) => {
    const entries = Object.entries(filters);
    const filteredEntries = entries.filter(([_, value]) => {
      if (value) {
        if (Array.isArray(value)) {
          return value.length > 0;
        } else {
          return true;
        }
      } else {
        return false;
      }
    });
    const filteredObject = Object.fromEntries(filteredEntries);
    return filteredObject;
  };

  async function onSubmit(values: z.infer<typeof filterSchema>) {
    const filteredObject = getFiltersWithValues(filterOptions);
    let formattedDate;
    let numericFilterOptions;

    numericFilterOptions = { ...values };
    if (values.datetimeSpecific) {
      formattedDate = format(
        new Date(values?.datetimeSpecific),
        "yyyy-MM-dd HH:mm:ss.SSSxxx"
      );
      numericFilterOptions = {
        ...values,
        datetimeSpecific: formattedDate,
      };
    }
    numericFilterOptions = getFiltersWithValues(numericFilterOptions);
    setFilterOptions({ ...filteredObject, ...numericFilterOptions });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="rounded-[10px] h-7 ">
          <span className="sr-only">Open menu</span>
          <BiFilterAlt size={16} />
          <p className="text-xs font-semibold">Filter</p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[800px] max-w-[900px] p-8 rounded-2xl mx-12">
        <div className="pt-4">
          <div className="flex flex-wrap justify-between gap-2 mb-2">
            {/* Filter buttons */}
            <FilterButtons
              filterButtonOptions={filterButtonOptions}
              filterByButton={filterByButton}
              defaultFilterButtonValue={defaultFilterButtonValue}
            />

            <div className=" flex justify-between md:justify-end gap-[8px] items-center  mb-4">
              {!advanceSearch ? (
                <Button
                  className="p-0 text-lg text-right bg-transparent text-text font-400 md:w-fit hover:bg-transparent"
                  onClick={() => {
                    setAdvanceSearch(!advanceSearch);
                  }}
                >
                  Advanced Search
                </Button>
              ) : (
                <Button
                  className="p-0 text-lg text-right bg-transparent font-400 md:w-fit hover:bg-transparent text-text"
                  onClick={() => {
                    reset();
                    setAdvanceSearch(!advanceSearch);
                    setFilterOptions({ newest: true });
                  }}
                >
                  Reset Search
                </Button>
              )}
            </div>
          </div>

          {/* ADVANCED SEARCH */}
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className={`relative`}>
              <div
                className={`grid grid-cols-2  gap-8 duration-300 overflow-hidden ${
                  advanceSearch ? "max-h-[4000px]" : "h-0"
                }`}
              >
                {/* text */}
                <div className="col-span-3 md:grid-cols-3">
                  <FormInput name="text" control={control} label="By words" />
                </div>
                {/* date */}
                <div className="col-span-1">
                  <FormInput
                    name="datetimeSpecific"
                    control={control}
                    label="By date"
                    type="date"
                  />
                </div>
                {/* Target */}
                <div className="col-span-1">
                  <FormSelectTarget name="specificTarget" control={control} />
                </div>
                {/* SDG */}

                <div className="flex flex-col col-span-3">
                  <FormLabel className="mb-2">Select SDGs</FormLabel>
                  <FormCheckBoxSDG control={control} name="sdgs" />
                </div>

                <Button
                  type="submit"
                  className="w-[175px] col-span-2"
                  isLoading={isSearching}
                  disabled={isSearching}
                >
                  Filter
                  <IconWrapper className="bg-transparent">
                    <Filter size="25" color="#292925" variant="Bold" />
                  </IconWrapper>
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default InitiativesFilter;
