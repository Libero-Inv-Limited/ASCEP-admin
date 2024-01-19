import { format, parseISO } from "date-fns";

// Convert date string
export const formattedDate = (dateString: string) => {
  const date = parseISO(dateString);
  const formattedDate = format(date, "yyyy-MM-dd");
  return formattedDate;
};

export function getPastDays(days: number) {
  const today = new Date();
  const lastWeek = new Date(today);
  lastWeek.setDate(today.getDate() - days);

  // Format the date to ISO 8601 format
  const isoDate = lastWeek.toISOString().split("T")[0];

  return isoDate;
}

export interface SelectedOption {
  alphabet: string;
  option: string;
}

export function generateSelectedOptionsWithAlphabet(
  options: string[],
  selectedOptions: string[]
): SelectedOption[] {
  return selectedOptions.map((selected) => {
    const index = options.indexOf(selected);
    const alphabet =
      index > -1 ? String.fromCharCode("A".charCodeAt(0) + index) : "";

    return {
      alphabet,
      option: selected,
    };
  });
}
