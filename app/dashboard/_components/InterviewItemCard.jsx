import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";

function InterviewItemCard({ interview }) {
  const router = useRouter();

  const onStart = () => {
    router.push(`/dashboard/interview/${interview?.mockInterviewId}`);
  };

  const onFeedback = () => {
    router.push(`/dashboard/interview/${interview?.mockInterviewId}/feedback`);
  };

  return (
    <div className="border shadow-sm rounded-lg p-3 ">
      {interview?.jobPosition && (
        <h2 className="text-xl font-semibold text-blue-500">
          {interview?.jobPosition}
        </h2>
      )}
      {interview?.jobExperience && (
        <h2 className="text-md  text-blue-800">
          Job Experience : {interview?.jobExperience}
        </h2>
      )}
      {interview?.createdAt && (
        <h2 className=" text-xs text-gray-500">
          Created at: {interview?.createdAt}
        </h2>
      )}
      <div className="flex gap-3 mt-5 justify-between">
        <button
          onClick={onFeedback}
          className="p-2 bg-blue-800 text-sm text-white hover:bg-blue-900 w-full  rounded-2xl "
        >
          Feedback
        </button>

        <button
          className="p-2 bg-blue-600 text-sm text-white hover:bg-blue-900 w-full  rounded-2xl "
          onClick={onStart}
        >
          Start Interview
        </button>
      </div>
    </div>
  );
}

export default InterviewItemCard;
