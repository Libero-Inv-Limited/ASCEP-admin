import { useGetBudgetInfo } from "@/api/democracy/budgeting";
import { BudgetingPhasesTable } from "@/components/Democracy";
import EditBudget from "@/components/Democracy/budgeting/EditBudget";
import { PageLoader } from "@/components/custom";
import { useNavigationContext } from "@/contexts/NavigationContext";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ViewBudgetPage() {
  const { budgetId } = useParams();
  const { setBreadcrumbs, activeLink } = useNavigationContext();

  const { data, isLoading } = useGetBudgetInfo(budgetId as string);

  useEffect(() => {
    setBreadcrumbs([
      {
        label: "main",
        link: "/main",
      },
      {
        label: "democracy",
        link: "/democracy",
      },
      {
        label: `budgeting - ${budgetId}`,
        link: `/democracy/budgeting/${budgetId}`,
      },
    ]);
  }, [activeLink, budgetId]);

  if (isLoading) return <PageLoader />;

  if (data)
    return (
      <div className="space-y-6 page-wrapper">
        <h5 className="font-medium text-text">Budget Details</h5>
        <div className="flex items-center justify-between">
          <h2>{data.title}</h2>

          <div className="flex items-center gap-4">
            <div
              className={`px-6 py-1 rounded-full text-sm font-medium capitalize ${
                data.status === "approved"
                  ? "bg-green-200 text-green-500"
                  : data.status === "current"
                  ? "bg-blue-100 text-blue-500"
                  : data.status === "rejected"
                  ? "bg-red-100 text-red-500"
                  : "bg-yellow-200 text-yellow-500"
              } `}
            >
              {data.status}
            </div>
            <EditBudget budget={data} />
          </div>
        </div>
        <div className="flex gap-2">
          <p>Fiscal Year:</p>
          <p>{data.fiscal_year}</p>
        </div>
        <div className="flex gap-2">
          <p>Total Amount:</p>
          <p>{data.total_amount}</p>
        </div>
        <div className="flex gap-2">
          <p>From: </p>
          <p>{new Date(data.start_date).toDateString()} - </p>
          <p>{new Date(data.end_date).toDateString()}:</p>
        </div>
        <p>{data.description}</p>

        <BudgetingPhasesTable budget={data} />
        {/* <ProjectProposals /> */}
      </div>
    );
}
