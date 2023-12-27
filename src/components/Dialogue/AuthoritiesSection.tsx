import ResponseCategory from "../custom/CategoryCard";

export default function AuthoritiesSection() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between text-lg">
        <p className="text-subtle_text">Categories</p>

        <p className="underline text-dark">See all</p>
      </div>

      <div className="flex flex-wrap gap-5">
        <ResponseCategory title="Accident" />
        <ResponseCategory title="Event" />
        <ResponseCategory title="Build" />
        <ResponseCategory title="Education" />
        <ResponseCategory title="French" />
        <ResponseCategory title="Chruch" />
      </div>
    </div>
  );
}
