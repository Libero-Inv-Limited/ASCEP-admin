import {
  // AdvancedSearch,
  DebatesCardViewCard,
  ListViewCard,
  PagesHeroSection,
  Pagination,
} from "@/components/Democracy";
import { IconWrapper } from "@/components/custom";
import { Button } from "@/components/ui/button";
import { useDebateContext } from "@/contexts/DebateContext";
import DemocracyLayout from "@/layouts/DemocracyLayout";
// import { debateFilterButtonOptions } from "@/utils/Democracy/Debates";
import ROUTES from "@/utils/routesNames";
import { Danger } from "iconsax-react";
import { FaSpinner } from "react-icons/fa";
import { Link } from "react-router-dom";

interface DebatesProps {}
const DebatesHomePage: React.FC<DebatesProps> = () => {
  const {
    view,
    // setView,
    fetchingDebates,
    fetchingDebatesError,
    fetchedDebatesData,
    refetchDebates,
    // filterByButton,
    getAllDebates,
    perPage,
    filterOptions,
  } = useDebateContext();
  const pageDescription =
    "Citizens' proposals are an opportunity for neighbours and collectives to decide directly how they want their city to be, after getting sufficient support and submitting to a citizens' vote.";

  return (
    <DemocracyLayout>
      {/* HEADING */}
      <PagesHeroSection title="debates" description={pageDescription} />
      <Link to={ROUTES.PUBLISH_DEBATE_ROUTE}>
        <Button className="w-[175px] mb-4">Start debate</Button>
      </Link>
      {/* ADVANCED SEARCH */}
      <div className="max-w-[1000px]">
        {/* <AdvancedSearch
          filterButtonOptions={debateFilterButtonOptions}
          setView={setView}
          view={view}
          filterByButton={filterByButton}
        /> */}

        {/* LIST VIEW */}
        {view === "list-view" && fetchedDebatesData && (
          <div className="grid grid-cols-1 my-10 gap-10 max-w-[700px]">
            {fetchedDebatesData.debates.map((debate: DebateType) => (
              <ListViewCard debate={debate} key={debate.id} />
            ))}
          </div>
        )}

        {/* CARD VIEW */}
        {fetchingDebates && (
          <div className="flex justify-center w-full">
            <IconWrapper className="h-full my-10 rounded-full  text-primary w-fit">
              <FaSpinner className="animate-spin text-[100px]" />
            </IconWrapper>
          </div>
        )}
        {view === "card-view" && fetchedDebatesData && (
          <div className="flex justify-start w-full">
            <div className="grid justify-start gap-10 my-10 grid-col-1 lg:grid-cols-2">
              {fetchedDebatesData.debates.map((debate: DebateType) => (
                <DebatesCardViewCard debate={debate} key={debate.id} />
              ))}
            </div>
          </div>
        )}

        {/* PAGINATION */}
        {fetchedDebatesData && (
          <Pagination
            meta={fetchedDebatesData?.meta}
            onPageChange={getAllDebates}
            filterOptions={filterOptions}
            perPage={perPage}
          />
        )}

        {fetchingDebatesError && (
          <div className="flex items-center flex-wrap justify-between border-2 border-primary rounded-md p-2 bg-[#F59E0B]/10 my-10">
            <div className="flex items-center justify-start gap-1">
              <IconWrapper className="rounded-full text-primary">
                <Danger size="32" />
              </IconWrapper>
              <p className="text-[16px]">Error fetching debates</p>
            </div>
            <Button className="w-fit h-fit" onClick={refetchDebates}>
              Retry
            </Button>
          </div>
        )}
      </div>
    </DemocracyLayout>
  );
};
export default DebatesHomePage;
