import { useGetAllCategories } from "@/api/category";
import { CategoryCard } from "../custom";
import { Skeleton } from "../ui/skeleton";

export default function DemocracyDebateCategories() {
  const { data, isLoading } = useGetAllCategories();
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between text-lg">
        <p className="text-subtle_text">Debate Categories</p>

        <p className="underline text-dark">See all</p>
      </div>
      <div className="grid grid-cols-5 gap-5">
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-32 bg-slate-200" />
            ))
          : data &&
            data?.map((category) => <CategoryCard category={category} />)}
      </div>
    </div>
  );
}
