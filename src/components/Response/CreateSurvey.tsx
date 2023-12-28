import { Form } from "../ui/form";
import { CategoriesMultiSelect, FormInput, SDGMultiSelect } from "../custom";
import { createSurveySchema } from "@/schemas/userSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { useState } from "react";
import FormTextArea from "../custom/FormTextArea";

interface CreateSurveyProps {
  next: () => void;
}

export default function CreateSurvey({ next }: CreateSurveyProps) {
  const [selectedCategories, setSelectedCategories] = useState<
    CollectionData[]
  >([]);
  const [selectedSDGs, setSelectedSDGs] = useState<SDGData[]>([]);

  const form = useForm<z.infer<typeof createSurveySchema>>({
    resolver: zodResolver(createSurveySchema),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = () => {
    next();
  };
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-[670px]">
        <div className="flex items-center justify-between ">
          <p className="text-subtle_text">Title</p>
          <div className=" w-full max-w-[380px]">
            <FormInput
              control={control}
              name="title"
              label="Title"
              placeholder="Title"
              errors={errors}
              isWhite
            />
          </div>
        </div>
        <div className="flex items-center justify-between ">
          <p className="text-subtle_text">Category</p>
          <div className=" w-full max-w-[380px]">
            <CategoriesMultiSelect
              selected={selectedCategories}
              setSelected={setSelectedCategories}
              isWhite
            />
          </div>
        </div>
        <div className="flex items-center justify-between ">
          <p className="text-subtle_text">Link to SDG (Optional)</p>
          <div className=" w-full max-w-[380px]">
            <SDGMultiSelect
              selected={selectedSDGs}
              setSelected={setSelectedSDGs}
              isWhite
            />
          </div>
        </div>

        <div className="flex items-center justify-between ">
          <p className="text-subtle_text">Description</p>
          <div className=" w-full max-w-[380px]">
            <FormTextArea
              control={control}
              name="description"
              placeholder="Title"
              errors={errors}
              isWhite
            />
          </div>
        </div>
        <div className="flex items-center justify-between ">
          <p className="text-subtle_text">Start - End Date</p>
          <div className=" w-full max-w-[380px]">
            <FormInput
              control={control}
              name="dateRange"
              placeholder="Title"
              errors={errors}
              type="date"
              isWhite
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-4">
          <Button variant="outline-primary" className="w-[175px]">
            Save as draft
          </Button>
          <Button className="w-[175px]">Next</Button>
        </div>
      </form>
    </Form>
  );
}
