import { Breadcrumb } from "../custom";
import { useNavigationContext } from "@/contexts/NavigationContext";
import UserDropdown from "./UserDropdown";

const Header = () => {
  const { activeModule, breadcrumbs, activeLink } = useNavigationContext();

  return (
    <div className="sticky top-0 z-10 items-center justify-between hidden px-8 py-4 md:flex bg-light">
      <div>
        {activeModule === "main" ? (
          <h2 className="text-2xl font-bold">Dashboard</h2>
        ) : (
          <h2 className="text-2xl font-bold capitalize">{activeModule}</h2>
        )}
        <p className="text-lg text-subtle_text">
          {activeModule === "main" ? (
            "Hi Admin, lets get you rolling"
          ) : (
            <Breadcrumb
              breadcrumbs={breadcrumbs}
              currentPage={activeLink || activeModule}
            />
          )}
        </p>
      </div>

      <UserDropdown />
    </div>
  );
};

export default Header;
