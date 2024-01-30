import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import { FormInput } from "../custom";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateConfigSchema } from "@/schemas/SettingsSchema";
import { z } from "zod";
import { Switch } from "../ui/switch";
import { useUpdateConfig } from "@/api/systemConfigurations";
import { useEffect } from "react";

type UpdateConfigSchema = z.infer<typeof updateConfigSchema>;

interface UpdateConfigProps {
  isOpen: boolean;
  onClose: () => void;
  config: SystemConfigItem;
}

export default function UpdateConfig({
  isOpen,
  onClose,
  config,
}: UpdateConfigProps) {
  const form = useForm<UpdateConfigSchema>({
    resolver: zodResolver(updateConfigSchema),
    defaultValues: {
      // @
      config_value:
        config.input_field === "checkbox"
          ? config.config_value === "true"
          : config.config_value,
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  const { mutate, isLoading, data } = useUpdateConfig();

  useEffect(() => {
    if (data) onClose();
  }, [data]);

  const onSubmit = (data: UpdateConfigSchema) => {
    if (config.input_field === "checkbox") {
      const payload = {
        slug: config.slug,
        config_value: data.config_value ? "true" : "false",
      };
      mutate(payload);
    } else {
      const payload = {
        slug: config.slug,
        config_value: data.config_value as string,
      };
      mutate(payload);
    }
  };

  return (
    <Dialog modal open={isOpen} onOpenChange={onClose}>
      <DialogContent
        style={{
          borderRadius: 40,
        }}
        className="p-8 !w-[700px]"
      >
        <p className="mb-4 text-xl font-bold text-text">
          Update {config.config_key}
        </p>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex items-center justify-between ">
              <p className="text-sm text-subtle_text">{config.config_key}</p>
              <div className=" w-full max-w-[200px] flex flex-col">
                {config.input_field === "checkbox" ? (
                  <FormField
                    control={control}
                    name={"config_value"}
                    render={({ field }) => (
                      <FormControl>
                        <Switch
                          checked={!!field.value}
                          onCheckedChange={field.onChange}
                          className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-slate-300 ml-auto"
                        />
                      </FormControl>
                    )}
                  />
                ) : (
                  <FormInput
                    name="config_value"
                    label="Value"
                    control={control}
                    placeholder="Config Value"
                    type={config.input_field}
                    errors={errors}
                  />
                )}
              </div>
            </div>

            <div className="flex items-center justify-end">
              <Button isLoading={isLoading} className="w-[170px]">
                Update
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
