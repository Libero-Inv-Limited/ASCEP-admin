import {
  DialogueActions,
  DialogueAnalytics,
  DialogueRequests,
} from "@/components/Dialogue";
import { useNavigationContext } from "@/contexts/NavigationContext";
import { useEffect } from "react";

export default function DialoguePage() {
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
    ]);
  }, [activeLink]);
  return (
    <div className="space-y-8 page-wrapper">
      <DialogueAnalytics />
      <DialogueActions />
      <DialogueRequests isSummary />
    </div>
  );
}

// const data: DialogueRequest[] = [
//   {
//     id: "728ed52f",
//     requestTitle: "Risk Management",
//     visibility: "Public",
//     request: "The shareing of paliatives",
//     date: "Jan 1st, 2022",
//     status: "published",
//     authority: "FRSC",
//     user: "John Doe",
//     location: "Umuleri, Anambra State",
//   },
//   {
//     id: "123ub8u1",
//     requestTitle: "Risk Management",
//     visibility: "Public",
//     request: "The shareing of paliatives",
//     date: "Jan 1st, 2022",
//     status: "pending",
//     authority: "High court",
//     user: "Emeka Ike",
//     location: "Umuleri, Anambra State",
//   },
//   {
//     id: "nw901",
//     requestTitle: "Risk Management",
//     visibility: "Private",
//     request: "The shareing of paliatives",
//     date: "Jan 1st, 2022",
//     status: "unavailable",
//     authority: "Police",
//     user: "Faith Ebenezer",
//     location: "Umuleri, Anambra State",
//   },
//   {
//     id: "12dcu1",
//     requestTitle: "Risk Management",
//     visibility: "Public",
//     request: "The shareing of paliatives",
//     date: "Jan 1st, 2022",
//     status: "published",
//     authority: "State Assembly",
//     user: "John Doe",
//     location: "Umuleri, Anambra State",
//   },
//   {
//     id: "xn180h2",
//     requestTitle: "Risk Management",
//     visibility: "Private",
//     request: "The shareing of paliatives",
//     date: "Jan 1st, 2022",
//     status: "published",
//     authority: "State Government",
//     user: "James Cameron",
//     location: "Umuleri, Anambra State",
//   },
// ];
