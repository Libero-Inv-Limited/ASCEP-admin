import { useGetPlatformModules } from "@/api/systemConfigurations";
import { Skeleton } from "../ui/skeleton";
import ModuleItem from "./ModuleItem";

export default function ManageModules() {
  const { data, isLoading } = useGetPlatformModules();

  return (
    <div>
      {isLoading
        ? Array.from({ length: 10 }).map((_, i) => (
            <div className="flex justify-between py-3" key={i}>
              <Skeleton className="w-3/5 h-8 rounded-xl bg-slate-200" />

              <Skeleton className="bg-slate-200 rounded-xl h-8 w-[70px]" />
            </div>
          ))
        : !!data?.length &&
          data.map((module) => <ModuleItem key={module.id} module={module} />)}
    </div>
  );
}
