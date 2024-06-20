"use client";
import React, { use } from "react";
import { useUser } from "@clerk/nextjs";
import { db } from "../../../utils/db";
import { MockInterview } from "../../../utils/schema";
import { desc, eq } from "drizzle-orm";
import { useEffect } from "react";
import InterviewItemCard from "./InterviewItemCard";

function InterviewsList() {
  const { user } = useUser();
  console.log(user, "user");
  const [interviewsList, setInterviewsList] = React.useState([]);

  const getInterviewsList = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(
        eq(MockInterview?.createdBy, user?.primaryEmailAddress?.emailAddress)
      )
      .orderBy(desc(MockInterview.id));

    console.log(result, "result");

    setInterviewsList(result);
  };

  useEffect(() => {
    getInterviewsList();
  }, [user]);
  return (
    <div>
      <h2 className="font-bold text-lg">Interviews</h2>
      <h3 className="text-sm text-gray-500">List of all interviews</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
        {interviewsList &&
          interviewsList.map((item, index) => (
            <InterviewItemCard key={index} interview={item} />
          ))}
      </div>
    </div>
  );
}

export default InterviewsList;
