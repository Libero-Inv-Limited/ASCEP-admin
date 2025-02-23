import { useGetAuthorityInfo } from "@/api/authorities";
import GoBackButton from "@/components/custom/GoBackButton";
import { AddDialogueModerator } from "@/components/Dialogue";
import AddAuthority from "@/components/Dialogue/AddAuthority";
import DialogeAuthorityModeratorTable from "@/components/Dialogue/DialogueAuthorityModeratorsTable";
import { Button } from "@/components/ui/button";
import { useNavigationContext } from "@/contexts/NavigationContext";
import useDisclosure from "@/hooks/useDisclosure";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "@/contexts/AppContext";

export default function ViewAuthorityPage() {
  const { setBreadcrumbs, activeLink, setActiveLink, SetTopBarComponents } =
    useNavigationContext();
  const { authorityId } = useParams();
  const { data, isLoading } = useGetAuthorityInfo(authorityId!);
  const { user } = useAppContext();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    setActiveLink(`/dialogue/authorities/${authorityId}`);

    SetTopBarComponents(
      data && (
        <div className="flex gap-4">
          {
            user?.permissions && user?.permissions?.some((perm) => perm.trim() === 'edit authority') &&
            (<Button onClick={onOpen} variant={"outline-primary"}>
              Edit Authority
            </Button>)
          }
          {
            user?.permissions && user?.permissions?.some((perm) => perm.trim() === 'add authority moderator') &&
            (<AddDialogueModerator authorityId={authorityId} />)
          }

        </div>
      )
    );

    return () => SetTopBarComponents(null);
  }, [authorityId, data]);

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
        label: `Authority - ${authorityId}`,
        link: `/dialogue/authorities/${authorityId}`,
      },
    ]);
  }, [activeLink]);

  return (
    <div className="space-y-3 page-wrapper">
      <GoBackButton link="/dialogue" />
      <h3>{data?.information.name}</h3>
      <p>{data?.information.description}</p>

      <div className="font-semibold text-xl">Moderators</div>

      <DialogeAuthorityModeratorTable
        data={data?.moderators}
        isLoading={isLoading}
        authorityId={data?.information.id}
      />

      {data && (
        <AddAuthority
          authority={data?.information}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </div>
  );
}
