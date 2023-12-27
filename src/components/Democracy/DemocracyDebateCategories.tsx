import { CategoryCard } from "../custom";

export default function DemocracyDebateCategories() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between text-lg">
        <p className="text-subtle_text">Debate Categories</p>

        <p className="underline text-dark">See all</p>
      </div>

      <div className="flex flex-wrap gap-5">
        <CategoryCard title="State Government" />
        <CategoryCard title="State Assembly" />
        <CategoryCard title="NDLEA" />
        <CategoryCard title="High court" />
        <CategoryCard title="Police" />
        <CategoryCard title="Chruch" />
      </div>
    </div>
  );
}
