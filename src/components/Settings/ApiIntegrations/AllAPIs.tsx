import { useSettingsContext } from "@/providers/SettingsProvider";
import { useEffect } from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";

interface AllAPIsProps {
  setActiveIntegrationStep: React.Dispatch<
    React.SetStateAction<APIIntegrationOption>
  >;
}

export default function AllAPIs({ setActiveIntegrationStep }: AllAPIsProps) {
  const { setActionButton, setActiveTitle } = useSettingsContext();

  useEffect(() => {
    setActionButton({
      text: "+ New API",
      function: () => {
        setActiveTitle("API Integration");
        setActiveIntegrationStep("New API");
      },
    });

    return () => setActionButton(null);
  }, []);
  return (
    <div>
      {apis.map((api) => (
        <div
          className="flex items-center justify-between py-5 border-b border-slate-200"
          key={api}
        >
          <div>
            <p className="mb-1 font-medium text-text">{api}</p>
            <p className="text-xs text-subtle_text">API.link</p>
          </div>

          <BiDotsHorizontalRounded size={24} />
        </div>
      ))}
    </div>
  );
}

const apis = [
  "States in Nigeria integration",
  "Dynamic Languages",
  "3rd Party Support Chat",
];
