import { useEffect, useState } from "react";

interface ResponseFilter {
  location: string | null;
  start_date: string | null;
  category: string | null;
}

const filtersDefault: ResponseFilter = {
  location: null,
  start_date: null,
  category: null,
};

const useResponseFilters = () => {
  const [filters, setFilters] = useState(filtersDefault);
  const [filtersString, setFiltersString] = useState("");

  useEffect(() => {
    // Create an array of key-value pairs for non-null filter properties
    const filterEntries = Object.entries(filters).filter(
      ([, value]) => value !== null
    );

    // Construct the filtersString by joining key-value pairs with '&'
    const newFiltersString = filterEntries
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

    // Update the state with the new filtersString
    setFiltersString(newFiltersString ? `?${newFiltersString}` : "");
  }, [filters]);

  const clearFilter = () => {
    setFilters(filtersDefault);
  };
  const filterDate = (arg: string | null) => {
    setFilters({ ...filters, start_date: arg });
  };

  const filterLocation = (arg: string | null) => {
    setFilters({ ...filters, location: arg });
  };

  const filterCategory = (arg: string | null) => {
    setFilters({ ...filters, category: arg });
  };

  return {
    filtersString,
    clearFilter,
    filterDate,
    filterLocation,
    filterCategory,
  };
};

export default useResponseFilters;
