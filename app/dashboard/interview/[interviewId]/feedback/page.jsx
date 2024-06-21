"use client";
import React, { useEffect } from "react";
import { db } from "../../../../../utils/db";
import { UserAnswer } from "../../../../../utils/schema";
import { eq, desc } from "drizzle-orm";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../../../../@/components/ui/collapsible";
import { ChevronDown, ChevronsUpDown, Link } from "lucide-react";
import { useRouter } from "next/navigation";

function Feedback({ params }) {
  const [feedbackList, setFeedbackList] = React.useState([]);
  const router = useRouter();

  useEffect(() => {
    getFeedback();
  }, []);

  const getFeedback = async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params.interviewId))
      .orderBy(desc(UserAnswer.id));
    console.log(result, "result");
    setFeedbackList(result);
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold text-green-500">Congratulation</h2>
      <h2 className="text-lg font-semibold text-green-500">
        Here is your feed back
      </h2>

      {feedbackList.length === 0 && (
        <h2 className="text-lg font-semibold text-red-500 my-3 ">
          No feedback available
        </h2>
      )}

      {feedbackList.length > 0 && (
        <>
          <h2 className="text-lg font-semibold text-red-500 my-3 ">
            Your overall interview rating :{" "}
            <strong>
              {(() => {
                let sum = 0;
                feedbackList.forEach((item) => {
                  sum += item.rating / 5;
                });
                return (sum / feedbackList.length).toFixed(2); // Assuming you want to format the average to 2 decimal places
              })()}
            </strong>
            /5
          </h2>

          <h2 className="test-sm text-stone-500">
            Find below interview question with correct answer, your answer and
            feedback for improvement
          </h2>
          {feedbackList &&
            feedbackList.map((item, index) => (
              <Collapsible key={index} className="mt-7">
                <CollapsibleTrigger className="p-2 bg-gray-200 rounded-lg my-2 text-left flex justify-between text-sm gap-2 w-full">
                  <h2>
                    <strong>Question: </strong>
                    {item.question || item.Question}{" "}
                    <span> {"(" + item.createdAt + ")"}</span>
                  </h2>
                  <ChevronsUpDown className="h-5 w-5" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-red-500 p-2 border rounded-lg">
                      <strong>Rating: </strong>
                      {item.rating}
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-yellow-100 text-yellow-800">
                      <strong>Your Answer: </strong>
                      {item.userAnswer}
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-green-100 text-green-800">
                      <strong>Correct Answer: </strong>
                      {item.correctAnswer}
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-red-100 text-red-800">
                      <strong>Feedback: </strong>
                      {item.feedback}
                    </h2>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
        </>
      )}

      <button
        onClick={() => router.replace("/dashboard")}
        className="p-2 bg-blue-500 text-white hover:bg-blue-900  rounded-2xl "
      >
        Go Home
      </button>
    </div>
  );
}

export default Feedback;
