import React from "react";
import { Breadcrumb } from "../custom";
import { useNavigationContext } from "@/contexts/NavigationContext";
import UserDropdown from "./UserDropdown";
import { useAppContext } from "@/contexts/AppContext";

const Header = () => {
  const { activeModule, breadcrumbs, activeLink, topBarComponents } =
    useNavigationContext();
  const { user } = useAppContext();

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
            "Hi Admin, let's get you rolling"
          ) : (
            <Breadcrumb
              breadcrumbs={breadcrumbs}
              currentPage={activeLink || activeModule}
            />
          )}
        </p>
      </div>

      <div className="flex items-center gap-6">
        {user && topBarComponents}
        <UserDropdown />
      </div>
    </div>
  );
};

export default Header;
