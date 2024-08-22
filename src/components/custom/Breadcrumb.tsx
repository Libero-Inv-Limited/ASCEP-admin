import React from "react";
import { Link } from "react-router-dom";

interface BreadcrumbProps {
  breadcrumbs: { label: string; link?: string }[];
  currentPage?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  breadcrumbs,
  currentPage,
}) => {
  return (
    <nav className="text-sm" aria-label="Breadcrumb">
      <ol className="inline-flex p-0 list-none">
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={index} className="flex items-center capitalize">
            {breadcrumb.link ? (
              <Link
                to={breadcrumb.link}
                className={`${
                  currentPage === breadcrumb.link
                    ? "text-dark"
                    : "text-subtle_text"
                } hover:underline`}
              >
                {breadcrumb.label === "main" ? "Dashboard" : breadcrumb.label}
              </Link>
            ) : (
              <span
                className={`text-gray-500 ${
                  currentPage === breadcrumb.label && "font-bold"
                }`}
              >
                {breadcrumb.label}
              </span>
            )}

            {index < breadcrumbs.length - 1 && <div className="mx-3">-</div>}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
