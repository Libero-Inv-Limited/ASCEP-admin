import { FaSpinner } from "react-icons/fa";
import { Switch } from "../ui/switch";
import { useToggleModule } from "@/api/systemConfigurations";

export default function ModuleItem({ module }: { module: PlatformModuleItem }) {
  const { isLoading, mutate } = useToggleModule();
  const handleToggleModule = (e: boolean) => {
    mutate({ code: module.code, status: e });
  };

  return (
    <div className="flex justify-between py-4 border-b border-slate-200">
      <p>{module.name}</p>

      {isLoading ? (
        <FaSpinner className="animate-spin text-primary" />
      ) : (
        <Switch
          className="data-[state=checked]:bg-primary"
          id="airplane-mode"
          checked={module.enabled}
          onCheckedChange={handleToggleModule}
        />
      )}
    </div>
  );
}
