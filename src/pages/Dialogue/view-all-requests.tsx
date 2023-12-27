import { DialogueFilter, DialogueRequests } from "@/components/Dialogue";
import { useNavigationContext } from "@/contexts/NavigationContext";
import { useEffect } from "react";

export default function ViewAllRequestsPage() {
  const { setBreadcrumbs, activeLink } = useNavigationContext();

  useEffect(() => {
    setBreadcrumbs([
      {
        label: "main",
        link: "/main",
      },
      {
        label: "dialogue",
        link: "/dialogue",
      },
      {
        label: "view all",
        link: "/dialogue/view-all",
      },
    ]);
  }, [activeLink]);
  return (
    <div className="page-wrapper">
      <div className="space-y-4">
        <div className="flex justify-between">
          <p className="text-lg text-subtle_text">Requests</p>
          <div className="flex items-center gap-3 ml-auto">
            <DialogueFilter />
          </div>
        </div>

        <DialogueRequests data={data} />
      </div>
    </div>
  );
}

const data: DialogueRequest[] = [
  {
    id: "728ed52f",
    requestTitle: "Risk Management",
    visibility: "Public",
    request: "The shareing of paliatives",
    date: "Jan 1st, 2022",
    status: "published",
    authority: "FRSC",
    user: "John Doe",
    location: "Umuleri, Anambra State",
  },
  {
    id: "123ub8u1",
    requestTitle: "Risk Management",
    visibility: "Public",
    request: "The shareing of paliatives",
    date: "Jan 1st, 2022",
    status: "pending",
    authority: "High court",
    user: "Emeka Ike",
    location: "Umuleri, Anambra State",
  },
  {
    id: "nw901",
    requestTitle: "Risk Management",
    visibility: "Private",
    request: "The shareing of paliatives",
    date: "Jan 1st, 2022",
    status: "unavailable",
    authority: "Police",
    user: "Faith Ebenezer",
    location: "Umuleri, Anambra State",
  },
  {
    id: "12dcu1",
    requestTitle: "Risk Management",
    visibility: "Public",
    request: "The shareing of paliatives",
    date: "Jan 1st, 2022",
    status: "published",
    authority: "State Assembly",
    user: "John Doe",
    location: "Umuleri, Anambra State",
  },
  {
    id: "xn180h2",
    requestTitle: "Risk Management",
    visibility: "Private",
    request: "The shareing of paliatives",
    date: "Jan 1st, 2022",
    status: "published",
    authority: "State Government",
    user: "James Cameron",
    location: "Umuleri, Anambra State",
  },

  {
    id: "728ed52f",
    requestTitle: "Risk Management",
    visibility: "Public",
    request: "The shareing of paliatives",
    date: "Jan 1st, 2022",
    status: "published",
    authority: "FRSC",
    user: "John Doe",
    location: "Umuleri, Anambra State",
  },
  {
    id: "123ub8u1",
    requestTitle: "Risk Management",
    visibility: "Public",
    request: "The shareing of paliatives",
    date: "Jan 1st, 2022",
    status: "pending",
    authority: "High court",
    user: "Emeka Ike",
    location: "Umuleri, Anambra State",
  },
  {
    id: "nw901",
    requestTitle: "Risk Management",
    visibility: "Private",
    request: "The shareing of paliatives",
    date: "Jan 1st, 2022",
    status: "unavailable",
    authority: "Police",
    user: "Faith Ebenezer",
    location: "Umuleri, Anambra State",
  },
  {
    id: "12dcu1",
    requestTitle: "Risk Management",
    visibility: "Public",
    request: "The shareing of paliatives",
    date: "Jan 1st, 2022",
    status: "published",
    authority: "State Assembly",
    user: "John Doe",
    location: "Umuleri, Anambra State",
  },
  {
    id: "xn180h2",
    requestTitle: "Risk Management",
    visibility: "Private",
    request: "The shareing of paliatives",
    date: "Jan 1st, 2022",
    status: "published",
    authority: "State Government",
    user: "James Cameron",
    location: "Umuleri, Anambra State",
  },

  {
    id: "8jenr",
    requestTitle: "Risk Management",
    visibility: "Public",
    request: "The shareing of paliatives",
    date: "Jan 1st, 2022",
    status: "published",
    authority: "FRSC",
    user: "John Doe",
    location: "Umuleri, Anambra State",
  },
  {
    id: "9h8nph3",
    requestTitle: "Risk Management",
    visibility: "Public",
    request: "The shareing of paliatives",
    date: "Jan 1st, 2022",
    status: "pending",
    authority: "High court",
    user: "Emeka Ike",
    location: "Umuleri, Anambra State",
  },
  {
    id: "2rn08",
    requestTitle: "Risk Management",
    visibility: "Private",
    request: "The shareing of paliatives",
    date: "Jan 1st, 2022",
    status: "unavailable",
    authority: "Police",
    user: "Faith Ebenezer",
    location: "Umuleri, Anambra State",
  },
  {
    id: "98h9y2h",
    requestTitle: "Risk Management",
    visibility: "Public",
    request: "The shareing of paliatives",
    date: "Jan 1st, 2022",
    status: "published",
    authority: "State Assembly",
    user: "John Doe",
    location: "Umuleri, Anambra State",
  },
  {
    id: "78g2b38",
    requestTitle: "Risk Management",
    visibility: "Private",
    request: "The shareing of paliatives",
    date: "Jan 1st, 2022",
    status: "published",
    authority: "State Government",
    user: "James Cameron",
    location: "Umuleri, Anambra State",
  },
];
