import { useUserSettingsContext } from "@/providers/UserSettingsProvider";
import { ArrowRight2 } from "iconsax-react";

export default function UserSettingsOptions() {
  const { activeOption, setActiveOption } = useUserSettingsContext();

  return (
    <div className="col-span-4 sticky top-0 left-0 z-10 bg-white p-6 rounded-[40px] h-fit">
      {options?.map((option) => (
        <div
          key={option.title}
          className={`flex cursor-pointer items-center justify-between py-4 border-b border-[#F0F0F0] ${
            activeOption === option.title ? "opacity-100" : "opacity-30"
          } `}
          onClick={() => setActiveOption(option.title)}
        >
          <div className=" spacey-y-8">
            <p className="text-sm font-bold text-dark">{option.title}</p>
            <p className="text-[12px] text-dark/40">{option.subtitle}</p>
          </div>
          {activeOption === option.title && <ArrowRight2 size={16} />}
        </div>
      ))}
    </div>
  );
}

const options: UserSettingsOptionObj[] = [
  {
    title: "User Profile",
    subtitle: "View Profile",
  },
  {
    title: "Permissions",
    subtitle: "Modify User’s permissions",
  },
  {
    title: "Posts",
    subtitle: "See users posts",
  },
  {
    title: "Device Log",
    subtitle: "Devices used by Admin",
  },
  {
    title: "User’s Activity",
    subtitle: "Monitor admin’s activity",
  },
];
