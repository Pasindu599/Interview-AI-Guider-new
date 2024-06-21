"use client";
import React, { use, useEffect } from "react";
import Webcam from "react-webcam";
import Image from "next/image";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic2, StopCircle } from "lucide-react";
import { is } from "drizzle-orm";
import { chatSession } from "../../../../../../utils/GeminiAIModel";
import { db } from "../../../../../../utils/db";
import { UserAnswer } from "../../../../../../utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { toast } from "sonner";

function RecordAnsSection({
  interviewQuestions,
  activeQuestion,
  interviewData,
}) {
  const [userAnswer, setUserAnswer] = React.useState("");
  const { user } = useUser();
  const [loading, setLoading] = React.useState(false);
  const [feedback, setFeedback] = React.useState([]);
  const [resultsList, setResultsList] = React.useState([]);
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
    onResult: (result) => setResultsList((prev) => [...prev, result]),
  });

  const updateUserAnswer = async () => {
    setLoading(true);
    const feedbackPrompt =
      "Question :" +
      interviewQuestions[activeQuestion]?.Question +
      ", Answer : " +
      userAnswer +
      ", Depending on question and user answer for give interview question please give us  rating for and feedback as area of imporvement if any in just three to five lines to imporve it in only JSON format with rating field and feedback field.As like this {ratings : 2 , feedback: You are good.}. Only give json formal answer.";
    const result = await chatSession.sendMessage(feedbackPrompt);
    const mockJsonResponse = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");
    console.log(mockJsonResponse, "mockJsonResponse");

    const jsonFeeedbackResponse = JSON.parse(mockJsonResponse);
    setFeedback(jsonFeeedbackResponse);
    console.log(feedback, "feedback");

    const res = await db.insert(UserAnswer).values({
      question:
        interviewQuestions[activeQuestion]?.question ||
        interviewQuestions[activeQuestion]?.Question,
      userAnswer: userAnswer,
      correctAnswer:
        interviewQuestions[activeQuestion]?.Answer ||
        interviewQuestions[activeQuestion]?.answer,
      feedback: jsonFeeedbackResponse?.feedback,
      rating: jsonFeeedbackResponse?.ratings,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      createdAt: moment().format("YYYY-MM-DD"),
      mockIdRef: interviewData?.mockInterviewId,
    });

    toast.success("Answer recorded successfully. Click next question");
    setUserAnswer("");
    setLoading(false);
  };

  const startStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
      setResultsList([]);
    } else {
      await startSpeechToText();
      console.log(userAnswer, "userAnswer in startStopRecording");
      toast("Recording started");
    }
  };

  useEffect(() => {
    results.map((result) => {
      setUserAnswer((prev) => prev + result.transcript);
    });
    console.log(results, "results");
    console.log(userAnswer, "userAnswer");
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer) {
      updateUserAnswer();
    }
  }, [userAnswer]);

  return (
    <div className="flex flex-col  items-center justify-center">
      <div className="flex flex-col justify-center  items-center bg-blue-100    rounded-lg p-5 mt-20 ">
        <Image
          src={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYnOmiQJzDK75wrB7lGxgoIQb439CFESXM3Q&s"
          }
          width={200}
          height={200}
          className="absolute z-0"
        />
        <Webcam
          mirrored={true}
          style={{
            height: 300,
            width: "100%",
            zIndex: 10,
          }}
        />
      </div>
      <button
        className="bg-blue-900 text-white mt-10 p-3 rounded-lg hover:bg-slate-500 "
        onClick={startStopRecording}
      >
        {isRecording ? (
          <h2 className="flex gap-2 text-red-500">
            <StopCircle />
            Stop Recording...
          </h2>
        ) : (
          "Record Answer"
        )}
      </button>
      <h2 className="text-red-800 bg-red-200 p-2 mt-1 rounded-md border font-bold text-sm">
        After recording your answer, click on next question button to stop
        recording and get feedback. Go throught all questions to complete the
        mock.
      </h2>
    </div>
  );
}

export default RecordAnsSection;
