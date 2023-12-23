import {
  DialogueActions,
  DialogueFilter,
  DialogueRequests,
} from "@/components/Dialogue";
import { StatsCard } from "@/components/custom";
import { Messages1, Profile2User, TickSquare, User } from "iconsax-react";
import { Link } from "react-router-dom";

export default function DialoguePage() {
  return (
    <div className="space-y-8 page-wrapper">
      <div className="grid grid-cols-4 gap-6 ">
        <StatsCard icon={<User />} title="Total Requests" count={"32k"} />
        <StatsCard
          icon={<Messages1 />}
          title="Inactive Requests"
          count={"3.2k"}
        />
        <StatsCard
          icon={<Profile2User />}
          title="Active Requests"
          count={"1.2k"}
        />
        <StatsCard icon={<TickSquare />} title="Engagements" count={"1.9k"} />
      </div>

      <DialogueActions />

      {/* TABLE */}
      <div className="space-y-4">
        <div className="flex justify-between">
          <p className="text-lg text-subtle_text">Requests</p>
          <div className="flex items-center gap-3 ml-auto">
            <DialogueFilter />
            <Link to="/dialogue/view-all">
              <p className="underline text-dark">See all</p>
            </Link>
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
];
