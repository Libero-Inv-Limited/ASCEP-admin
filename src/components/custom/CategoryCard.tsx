import CategoryDropdownMenu from "../Response/CategoryDropdownMenu";

export default function CategoryCard({ title }: { title: string }) {
  return (
    <div className="w-full max-w-[210px] p-4 bg-white rounded-3xl space-y-[10px]">
      <div className="flex items-center justify-between">
        <p className="text-subtle_text ">{title}</p>

        <CategoryDropdownMenu />
      </div>

      <div className="flex gap-1">
        <img src="/images/SDG/image 19.png" className="w-7" alt="" />
        <img src="/images/SDG/image 20.png" className="w-7" alt="" />
        <img src="/images/SDG/image 21.png" className="w-7" alt="" />
        <img src="/images/SDG/image 22.png" className="w-7" alt="" />
        <div className="flex items-center justify-center text-dark bg-[#FD9D24] w-7 h-7 rounded ">
          +2
        </div>
      </div>
    </div>
  );
}
