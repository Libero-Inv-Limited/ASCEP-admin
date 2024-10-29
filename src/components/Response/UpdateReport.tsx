import { Form } from "../ui/form";
import { FormInput, SDGMultiSelect } from "../custom";
import { updateReportSchema } from "@/schemas/userSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import FormTextArea from "../custom/FormTextArea";
import { useUpdateReport } from "@/api/response";
import FormSelectCategory from "../Democracy/common/FormSelectCategories";
import { useNavigate } from "react-router-dom";

interface UpdateReportProps {
  reportData: ReportData; // Updated to directly hold the data
}

const UpdateReport: React.FC<UpdateReportProps> = ({ reportData }) => {
  const [category, setCategory] = useState<number | null>(reportData.reportCategory.category_id);
  const [selectedSDGs, setSelectedSDGs] = useState<SDGData[]>([]);

  const navigate = useNavigate();

  // Initialize form with default values from reportData
  const form = useForm<z.infer<typeof updateReportSchema>>({
    resolver: zodResolver(updateReportSchema),
    defaultValues: {
      title: reportData.title || "",
      description: reportData.description.replace(/<\/?p>/g, '') || "",
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const { mutate, isLoading, data } = useUpdateReport();

  console.log(reportData.reportSDGs);

  useEffect(() => {
    if (data && data.status === "success") {
      navigate(`/response/reports/${data.data.id}`);
    }
  }, [data, navigate]);

  const onSubmit = (data: z.infer<typeof updateReportSchema>) => {
    if (!category) return;

    const sdgObjects = selectedSDGs.map((sdg) => ({ id: sdg.id }));

    const payload = {
      ...data,
      sdgs: sdgObjects,
      categories: category,
      report_id: reportData.id, // Include report ID if needed in mutation
    };

    mutate(payload);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-[670px]">
        <div className="flex items-center justify-between ">
          <p className="text-subtle_text">Title (Optional)</p>
          <div className="w-full max-w-[380px]">
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
          <p className="text-subtle_text">Category (Optional)</p>
          <div className="w-full max-w-[380px]">
            <FormSelectCategory setCategory={setCategory} categoryId={category} />
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
          <p className="text-subtle_text">Description (Optional)</p>
          <div className="w-full max-w-[380px]">
            <FormTextArea
              control={control}
              name="description"
              placeholder="Description"
              errors={errors}
              isWhite
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-4">
          <Button isLoading={isLoading} className="w-[175px]">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UpdateReport;
