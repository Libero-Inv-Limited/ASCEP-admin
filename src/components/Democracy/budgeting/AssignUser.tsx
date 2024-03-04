import { useAssignProject } from "@/api/democracy/budgeting";
import { useSearchUser } from "@/api/user";
import { EmptyState, FormInput } from "@/components/custom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import useDisclosure from "@/hooks/useDisclosure";
import { SearchUserSchema, searchUserSchema } from "@/schemas/budgetingSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface AssignUserProps {
  id: number;
}

export default function AssignUser({ id }: AssignUserProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  const form = useForm<SearchUserSchema>({
    resolver: zodResolver(searchUserSchema),
  });

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = form;

  const { data, isLoading } = useSearchUser(searchTerm);

  const onSubmit = (data: SearchUserSchema) => {
    setSearchTerm(data.search);
  };

  const { mutate, isLoading: assigning, isSuccess } = useAssignProject();

  useEffect(() => {
    isSuccess && onClose();
  }, [isSuccess]);

  const handleAssign = () =>
    mutate({
      project_proposal: id,
      user_id: selected as number,
    });

  return (
    <div>
      <Button onClick={onOpen} size="sm" variant="outline-primary">
        Assign User
      </Button>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent
          className="min-w-[600px]"
          style={{ borderRadius: 40, padding: 32 }}
        >
          <h4 className="pb-3 border-b border-dark/10 ">Assign User</h4>

          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex items-center justify-between ">
                <p className="text-subtle_text">Title</p>
                <div className=" w-full max-w-[350px]">
                  <FormInput
                    name="search"
                    label="Search User"
                    control={control}
                    placeholder="Enter user's name"
                    errors={errors}
                    rightElement={
                      <Button
                        type="submit"
                        isLoading={isLoading}
                        className="absolute top-0 right-0 h-12"
                      >
                        Search
                      </Button>
                    }
                  />
                </div>
              </div>
            </form>
          </Form>

          {data && (
            <div className="space-y-2">
              {data?.length > 0 ? (
                data?.map((user) => (
                  <div className="flex items-center justify-between px-2 py-2 bg-gray-100 rounded ">
                    <p>
                      {user.firstname} {user.lastname}
                    </p>

                    <Button
                      size="sm"
                      variant={
                        user.id === selected ? "outline-primary" : "primary"
                      }
                      onClick={() => setSelected(user.id)}
                    >
                      Select
                    </Button>
                  </div>
                ))
              ) : (
                <EmptyState
                  height={200}
                  size={30}
                  text="No user found with this name"
                />
              )}
            </div>
          )}

          {selected && (
            <div className="flex justify-end">
              <Button isLoading={assigning} onClick={handleAssign}>
                Assign
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
