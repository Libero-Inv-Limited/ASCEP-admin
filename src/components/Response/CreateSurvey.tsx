/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Form } from "../ui/form";
import { FormInput, SDGMultiSelect, SelectLocation } from "../custom";
import { createSurveySchema } from "@/schemas/userSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import FormTextArea from "../custom/FormTextArea";
import { useCreateSurvey } from "@/api/response";
import FormSelectCategory from "../Democracy/common/FormSelectCategories";
import { useNavigate } from "react-router-dom";

interface CreateSurveyProps {
  next: (data: any) => void;
}

export default function CreateSurvey({ next }: CreateSurveyProps) {
  const [category, setCategory] = useState<number | null>(null);
  const [selectedSDGs, setSelectedSDGs] = useState<SDGData[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<WardsType | null>(
    null
  );

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof createSurveySchema>>({
    resolver: zodResolver(createSurveySchema),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const { mutate, isLoading, data } = useCreateSurvey();

  // const { state } = useLocation();

  useEffect(() => {
    if (data && data.status === "success") {
      next(data);
      navigate("/response/create-survey", {
        state: { survey_id: data.data.id },
      });
    }
  }, [data, next]);

  const onSubmit = (data: z.infer<typeof createSurveySchema>) => {
    if (!selectedLocation) {
      //
      return;
    }
    if (!category) {
      //
      return;
    }
    const payload = {
      ...data,
      sdgs: selectedSDGs.map((sdg) => sdg.id),
      category: category,
      location_meta: selectedLocation?.ward,
      latitude: selectedLocation?.latitude,
      longitude: selectedLocation?.longitude,
    };

    mutate(payload);
    // next();
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
            <FormSelectCategory setCategory={setCategory} />
          </div>
        </div>
        <div className="flex items-center justify-between ">
          <p className="text-subtle_text">Location</p>
          <div className=" w-full max-w-[380px]">
            <SelectLocation
              className="bg-white"
              onSelect={setSelectedLocation}
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
          <p className="text-subtle_text">Start Date</p>
          <div className=" w-full max-w-[380px]">
            <FormInput
              control={control}
              name="start_date"
              placeholder="Title"
              errors={errors}
              type="date"
              isWhite
            />
          </div>
        </div>
        <div className="flex items-center justify-between ">
          <p className="text-subtle_text">End Date</p>
          <div className=" w-full max-w-[380px]">
            <FormInput
              control={control}
              name="end_date"
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
          <Button isLoading={isLoading} className="w-[175px]">
            Next
          </Button>
        </div>
      </form>
    </Form>
  );
}
