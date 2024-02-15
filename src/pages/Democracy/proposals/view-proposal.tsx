import { useGetProposalInfo } from "@/api/democracy/proposals";
import {
  DisplayDocuments,
  NotFound,
  ProposalCommentSection,
  ProposalInfo,
} from "@/components/Democracy";
import { PageLoader } from "@/components/custom";
import useScrollToComments from "@/hooks/useScrollToComments";
import { useParams } from "react-router-dom";

interface ViewProposaPagelProps {}
const ViewProposalPage: React.FC<ViewProposaPagelProps> = () => {
  const { commentsSectionRef, scrollToComments } = useScrollToComments();

  const { proposalId } = useParams();
  const {
    data: proposal,
    isLoading: isLoadingProposal,
    isError,
  } = useGetProposalInfo(proposalId!);

  return (
    <div className="page-wrapper">
      {/* LOADING */}
      {isLoadingProposal && <PageLoader />}

      {/* ERROR */}
      {isError && !proposal && <NotFound message="Proposal not found" />}

      {/* PROPOSAL INFO */}
      {proposal && (
        <div>
          <ProposalInfo
            scrollToComments={scrollToComments}
            proposal={proposal}
          />
        </div>
      )}

      {/* ***********************************RELATED CONTENT***************************************** */}
      {/* <div className="my-10 w-full max-w-[700px]">
        <RelatedDebates />
      </div> */}
      {/* DOCUMENTS */}
      <div className="pt-10">
        {proposal?.proposalDocuments.length !== 0 && (
          <>
            <h2 className="pb-2 pt-0 pl-0 border-b-4 text-[18px] font-medium border-primary w-fit mb-8">
              Documents ({proposal?.proposalDocuments.length})
            </h2>
            <div className="flex flex-wrap gap-4">
              {proposal?.proposalDocuments.map((doc, i) => (
                <DisplayDocuments doc={doc} key={i} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* COMMENT SECTION */}
      <div ref={commentsSectionRef} className="max-w-[900px] mt-10">
        <ProposalCommentSection />
      </div>
    </div>
  );
};

export default ViewProposalPage;
