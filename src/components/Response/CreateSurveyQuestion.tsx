/* eslint-disable @typescript-eslint/ban-ts-comment */
import { questionSchema } from "@/schemas/democracySchema";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";

type Question = z.infer<typeof questionSchema>;

const defaultValues: Question = {
  question: "",
  answerType: "Text",
  options: null,
};

interface FormData {
  questions: Question[];
}

const CreateSurveyQuestion: React.FC = () => {
  const { handleSubmit, register, setValue, watch } = useForm<FormData>({
    defaultValues: {
      questions: [defaultValues],
    },
  });

  const questions = watch("questions");

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("Submitted data:", data);
  };

  const handleAnswerTypeChange = (index: number, value: "Text" | "Option") => {
    setValue(`questions.${index}.answerType`, value);
    if (value === "Option") {
      setValue(`questions.${index}.options`, [""]); // Add an initial option
    } else {
      setValue(`questions.${index}.options`, null);
    }
  };

  const handleAddOption = (index: number) => {
    setValue(`questions.${index}.options`, [
      ...(questions[index]?.options || []),
      "",
    ]);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto mt-8">
      {questions.map((question, index) => (
        <div key={index} className="mb-4">
          <input
            {...register(`questions.${index}.question`, { required: true })}
            placeholder="Question"
            className="p-2 mb-2 border"
          />
          <select
            {...register(`questions.${index}.answerType`, { required: true })}
            //   @ts-ignore
            onChange={(e) => handleAnswerTypeChange(index, e.target.value)}
            className="p-2 mb-2 border"
          >
            <option value="Text">Text</option>
            <option value="Option">Option</option>
          </select>
          {question.answerType === "Option" && (
            <div>
              {question.options?.map((option, optionIndex) => (
                <div key={optionIndex} className="mb-2">
                  <input
                    {...register(`questions.${index}.options.${optionIndex}`, {
                      required: true,
                    })}
                    placeholder={`Option ${optionIndex + 1}`}
                    className="p-2 border"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddOption(index)}
                className="mb-2"
              >
                Add Option
              </button>
            </div>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={() => setValue("questions", [...questions, defaultValues])}
        className="mb-4"
      >
        Add Question
      </button>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateSurveyQuestion;
