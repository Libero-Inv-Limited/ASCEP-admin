import { useGetAuthorityInfo } from "@/api/authorities";
import { AddDialogueModerator } from "@/components/Dialogue";
import AddAuthority from "@/components/Dialogue/AddAuthority";
import DialogeAuthorityModeratorTable from "@/components/Dialogue/DialogueAuthorityModeratorsTable";
import { Button } from "@/components/ui/button";
import { useNavigationContext } from "@/contexts/NavigationContext";
import useDisclosure from "@/hooks/useDisclosure";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ViewAuthorityPage() {
  const { setBreadcrumbs, activeLink, setActiveLink, SetTopBarComponents } =
    useNavigationContext();
  const { authorityId } = useParams();
  const { data, isLoading } = useGetAuthorityInfo(authorityId!);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    setActiveLink(`/dialogue/authorities/${authorityId}`);

    SetTopBarComponents(
      data && (
        <div className="flex gap-4">
          <Button onClick={onOpen} variant={"outline-primary"}>
            Edit Authority
          </Button>
          <AddDialogueModerator authorityId={authorityId} />
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
    <div className="space-y-8 page-wrapper">
      <h3>{data?.information.name}</h3>
      <p>{data?.information.description}</p>

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
