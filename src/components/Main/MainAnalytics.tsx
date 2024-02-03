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
              <StatsCard
                icon={<GoReport />}
                title="Govt. Reports"
                count={data?.reports}
              />
              <StatsCard
                icon={<Messages1 />}
                title="Total Debates"
                count={data?.debates}
              />
              <StatsCard
                icon={<HiOutlineLightBulb />}
                title="Total Initiatives "
                count={data?.initiatives}
              />
              <StatsCard
                icon={<LiaPollSolid />}
                title="Total Polls"
                count={data?.polls}
              />
              <StatsCard
                icon={<IoDocumentTextOutline />}
                title="Total Proposals"
                count={data?.proposals}
              />
              <StatsCard
                icon={<SiUnitednations />}
                title="Total SDGs"
                count={data?.sdgs}
              />
              <StatsCard
                icon={<RiSurveyLine />}
                title="Total Surveys"
                count={data?.surveys}
              />
            </>
          )}
    </div>
  );
}
