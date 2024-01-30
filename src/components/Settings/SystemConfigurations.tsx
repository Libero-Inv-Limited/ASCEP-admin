import { useGetAllConfigurations } from "@/api/systemConfigurations";
import React from "react";
import { Skeleton } from "../ui/skeleton";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import UpdateConfig from "./UpdateConfig";

export default function SystemConfigurations() {
  const { data, isLoading } = useGetAllConfigurations();
  const [selectedConfig, setSelectedConfig] =
    React.useState<SystemConfigItem | null>(null);

  const handleClose = () => {
    setSelectedConfig(null);
  };

  const handleSelect = (config: SystemConfigItem) => {
    setSelectedConfig(config);
  };

  return (
    <div className="space-y-3">
      {isLoading
        ? Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-8 my-3 rounded-lg bg-slate-200" />
          ))
        : data &&
          data.map((config) => (
            <div
              key={config.id}
              className="flex justify-between py-4 border-b border-slate-200"
            >
              <div>
                <p className="text-text">{config.config_key}</p>
                <p className="text-xs text-subtle_text">
                  value: {config.config_value}
                </p>
              </div>

              <BiDotsHorizontalRounded
                onClick={() => handleSelect(config)}
                className="text-2xl cursor-pointer"
              />
            </div>
          ))}

      {selectedConfig && (
        <UpdateConfig
          isOpen={!!selectedConfig}
          onClose={handleClose}
          config={selectedConfig}
        />
      )}
    </div>
  );
}
