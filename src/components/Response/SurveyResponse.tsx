import {
  SelectedOption,
  generateSelectedOptionsWithAlphabet,
} from "@/utils/helper";
import { useEffect, useState } from "react";

interface SurveyResponseProps {
  response: SurveyResponseItem;
  options: string[] | undefined;
}

export default function SurveyResponse({
  response,
  options,
}: SurveyResponseProps) {
  const [selectedOptions, setSelectedOptions] = useState<
    SelectedOption[] | null
  >(null);

  useEffect(() => {
    if (typeof response.response_text !== "string" && options)
      setSelectedOptions(
        generateSelectedOptionsWithAlphabet(options, response.response_text)
      );
  }, [response, options]);

  return (
    <div className="bg-white rounded-[24px] space-y-4 shadow-sm p-8">
      <div className="flex items-center gap-[6px]">
        <img
          src={response.user.profile_picture}
          alt="profile photo"
          className="object-cover w-10 h-10 rounded-full"
        />

        <p className="text-sm font-bold text-dark">
          {response.user?.firstname} {response?.user?.lastname}
        </p>

        <p className="ml-auto text-xs text-subtle_text">
          {new Date(response.createdAt).toDateString()}
        </p>
      </div>

      {typeof response.response_text === "string" ? (
        <p className="text-sm text-dark">{response.response_text}</p>
      ) : (
        selectedOptions &&
        selectedOptions.map((option) => (
          <div key={option.option} className="flex items-center gap-2 text-sm ">
            <p className="text-primary">{option.alphabet}.</p>
            <p className="text-dark">{option.option}</p>
          </div>
        ))
      )}
    </div>
  );
}
