import { Skeleton } from "../ui/skeleton";

export default function TableSkeleton({ count }: { count?: number }) {
  return (
    <div className="grid grid-cols-5 gap-6">
      {Array.from({ length: count || 60 }).map((_, i) => (
        <Skeleton key={i} className="h-6 rounded-lg bg-slate-200" />
      ))}
    </div>
  );
}
