import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { changeRoleSchema } from "@/schemas/userSchemas";
import FormSelect from "../Democracy/common/FormSelect";
import { useGetAllRoles } from "@/api/roles";
import { useUserSettingsContext } from "@/providers/UserSettingsProvider";
import { FaSpinner } from "react-icons/fa";
import { SelectItem } from "../ui/select";
import { Button } from "../ui/button";

export default function AssignPermssion() {
  const { userObj, fetchingUserObj } = useUserSettingsContext();
  const form = useForm<z.infer<typeof changeRoleSchema>>({
    resolver: zodResolver(changeRoleSchema),
    defaultValues: {
      roleId: userObj?.role.toString(),
    },
  });

  const { data, isLoading } = useGetAllRoles();
  console.log(data);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = () => {};
  return (
    <div className="min-h-[200px]">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {isLoading || fetchingUserObj ? (
            <div className="h-[200px] flex justify-center items-center">
              <FaSpinner className="text-[40px] animate-spin text-primary" />
            </div>
          ) : (
            data && (
              <div className="flex items-center justify-between ">
                <p className="text-subtle_text">Role Title</p>
                <div className=" w-full max-w-[350px]">
                  <FormSelect
                    name="roleId"
                    control={control}
                    placeholder="Update"
                    errors={errors}
                  >
                    {data?.map((role) => (
                      <SelectItem value={role.id.toString()}>
                        {role.name}
                      </SelectItem>
                    ))}
                  </FormSelect>
                </div>
              </div>
            )
          )}

          <div className="flex justify-end">
            <Button className="">Update Role</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
