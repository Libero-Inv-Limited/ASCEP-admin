import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isFetching?: boolean;
}

const ReportsPagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  isFetching,
}) => {
  const handlePrevPage = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <Pagination className="relative mt-2">
      <PaginationContent className="list-none flex justify-between w-full items-center flex-wrap">
        {/* Current page and total pages */}
        <p className="text-text text-base">
          Page {currentPage} of {totalPages}
        </p>

        <div className="flex items-center gap-3">
          {/* Dropdown to select page */}
          <p className="text-text text-sm">Go to page</p>
          <Select
            value={currentPage}
            onValueChange={(value: number) => onPageChange(value)}
          >
            <SelectTrigger className="w-fit flex gap-3 font-bold text-[#71bb61] ring-0 focus:ring-4 rounded-2xl focus:ring-offset-0 focus:ring-[#DFDFDF]">
              <SelectValue placeholder={currentPage} />
            </SelectTrigger>
            <SelectContent sideOffset={0} align="center" className="min-w-fit">
              <SelectGroup className="m-0 p-0">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <SelectItem
                    value={i + 1}
                    className="text-sm flex justify-center w-fit"
                    key={i}
                  >
                    {i + 1}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* Previous button */}
          <PaginationItem className="h-fit flex items-center">
            <Button
              className="h-fit w-fit p-0 rounded-lg text-dark bg-transparent text-2xl"
              isLoading={isFetching}
              disabled={isFetching || currentPage === 1}
              onClick={handlePrevPage}
            >
              <IoIosArrowBack />
            </Button>
          </PaginationItem>

          {/* Next button */}
          <PaginationItem className="h-fit flex items-center">
            <Button
              className="h-fit w-fit rounded-lg text-dark bg-transparent text-2xl p-0"
              isLoading={isFetching}
              disabled={isFetching || currentPage === totalPages}
              onClick={handleNextPage}
            >
              <IoIosArrowForward />
            </Button>
          </PaginationItem>
        </div>
      </PaginationContent>
    </Pagination>
  );
};

export default ReportsPagination;
