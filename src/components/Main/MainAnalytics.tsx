import { Messages1 } from "iconsax-react";
import { StatsCard } from "@/components/custom";
import { useGetMainAnalytics } from "@/api/main";
import { Skeleton } from "../ui/skeleton";
import { LiaPollSolid } from "react-icons/lia";
import { IoDocumentTextOutline } from "react-icons/io5";
import { SiUnitednations } from "react-icons/si";
import { RiSurveyLine } from "react-icons/ri";
import { GoReport } from "react-icons/go";
import { HiOutlineLightBulb } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function MainAnalytics() {
  const { data, isLoading } = useGetMainAnalytics();

  return (
    <div className="grid grid-cols-4 gap-6 ">
      {isLoading
        ? Array.from({ length: 8 }).map((_, i) => (
          <Skeleton
            key={i}
            className="h-28 bg-slate-200 rounded-xl"
          ></Skeleton>
        ))
        : data && (
          <>
            <Link to='/response/reports'><StatsCard
              icon={<GoReport />}
              title="Govt. Reports"
              count={data?.reports}
            /></Link>
            <Link to='/democracy/debates'>
              <StatsCard
                icon={<Messages1 />}
                title="Total Debates"
                count={data?.debates}
              />
            </Link>
            <Link to='/democracy/initiatives'>
              <StatsCard
                icon={<HiOutlineLightBulb />}
                title="Total Initiatives "
                count={data?.initiatives}
              />
            </Link>
            <StatsCard
              icon={<LiaPollSolid />}
              title="Total Polls"
              count={data?.polls}
            />
            <Link to='/democracy/proposals'>
              <StatsCard
                icon={<IoDocumentTextOutline />}
                title="Total Proposals"
                count={data?.proposals}
              />
            </Link>
            <Link to='/democracy'>
              <StatsCard
                icon={<SiUnitednations />}
                title="Total SDGs"
                count={data?.sdgs}
              />
            </Link>
            <Link to='/response/all-surveys'>
              <StatsCard
                icon={<RiSurveyLine />}
                title="Total Surveys"
                count={data?.surveys}
              />
            </Link>

          </>
        )}
    </div>
  );
}
