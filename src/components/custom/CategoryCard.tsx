import CategoryDropdownMenu from "../Response/CategoryDropdownMenu";

export default function CategoryCard({ category }: { category: CategoryType }) {
  return (
    <div className="flex items-center justify-between w-full p-4 bg-white rounded-3xl">
      <p className="text-subtle_text ">{category?.name || ""}</p>
      <CategoryDropdownMenu />
    </div>
  );
}
