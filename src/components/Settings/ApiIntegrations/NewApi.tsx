import { FormInput } from "@/components/custom";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { newApiSchema } from "@/schemas/SettingsSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface NewApiProps {
  setActiveIntegrationStep: React.Dispatch<
    React.SetStateAction<APIIntegrationOption>
  >;
}

type NewApiSchema = z.infer<typeof newApiSchema>;

export default function NewApi({ setActiveIntegrationStep }: NewApiProps) {
  const form = useForm<NewApiSchema>({
    resolver: zodResolver(newApiSchema),
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  const onSubmit = (data: NewApiSchema) => {
    console.log(data);
    console.log(setActiveIntegrationStep);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex items-center justify-between ">
          <p className="text-subtle_text">API Title</p>
          <div className=" w-full max-w-[350px]">
            <FormInput
              name="title"
              label="API Title"
              control={control}
              placeholder="Enter API Title"
              errors={errors}
            />
          </div>
        </div>
        <div className="flex items-center justify-between ">
          <p className="text-subtle_text">API Link</p>
          <div className=" w-full max-w-[350px]">
            <FormInput
              name="link"
              label="API Link"
              control={control}
              placeholder="Link Here"
              errors={errors}
            />
          </div>
        </div>

        <div className="flex items-center justify-end">
          <Button className="w-[175px]">Create API</Button>
        </div>
      </form>
    </Form>
  );
}
