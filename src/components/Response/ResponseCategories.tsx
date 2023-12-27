import { CategoryCard } from "../custom";

export default function ResponseCategories() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between text-lg">
        <p className="text-subtle_text">Categories</p>

        <p className="underline text-dark">See all</p>
      </div>

      <div className="flex flex-wrap gap-5">
        <CategoryCard title="Accident" />
        <CategoryCard title="Event" />
        <CategoryCard title="Build" />
        <CategoryCard title="Education" />
        <CategoryCard title="French" />
        <CategoryCard title="Chruch" />
      </div>
    </div>
  );
}
