import { ArrowDown2, ArrowLeft2, ArrowRight2 } from "iconsax-react";

export default function TablePagination() {
  return (
    <div className="flex justify-between px-6 font-medium">
      <p className="text-sm">1 - 32 pages</p>

      <div className="flex items-center gap-6">
        <p>The page you’re on</p>
        <div className="border-[2px] rounded-lg py-1 px-2 text-xs flex items-center gap-2  border-black/10">
          <p>1</p>

          <ArrowDown2 size={12} className="text-dark" />
        </div>

        <div className="flex items-center gap-2">
          <ArrowLeft2 size={18} className="cursor-pointer" />
          <ArrowRight2 size={18} className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
