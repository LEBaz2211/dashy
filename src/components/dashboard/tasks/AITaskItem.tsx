import React, { useState } from "react";

type AITaskItemProps = {
  aiTask: {
    id: number;
    task_type: string;
    ai_output: string;
    created_at: Date;
  };
  userId: string;
};

export default function AITaskItem({ aiTask, userId }: AITaskItemProps) {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [expanded, setExpanded] = useState(false);

  const handleFeedbackSubmit = async () => {
    setSubmitting(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/feedback/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          task_type: aiTask.task_type,
          ai_task_id: aiTask.id,
          user_id: userId,
          feedback,
          rating,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to auto-tag task");
      }

      setMessage("Feedback submitted successfully");
      setFeedback("");
      setRating(0);
    } catch (err) {
      console.error("Failed to submit feedback:", err);
      setMessage("Failed to submit feedback");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow mb-2 cursor-pointer">
      <div
        className="flex justify-between items-center"
        onClick={() => setExpanded(!expanded)}
      >
        <p>Created: {new Date(aiTask.created_at).toLocaleDateString()}</p>
        <span className="text-gray-500">{expanded ? "▲" : "▼"}</span>
      </div>
      {expanded && (
        <>
          <div className="mt-2">
            <strong>Type:</strong> {aiTask.task_type}
            <p>
              <strong>Output:</strong> {aiTask.ai_output}
            </p>
          </div>
          <textarea
            className="w-full p-2 border rounded mt-2"
            placeholder="Enter your feedback..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
          <div className="flex space-x-2 my-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                className={`px-2 py-1 rounded ${rating >= num ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                onClick={() => setRating(num)}
              >
                {num}
              </button>
            ))}
          </div>
          <button
            onClick={handleFeedbackSubmit}
            disabled={submitting}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit Feedback
          </button>
          {message && <p className="text-sm mt-2 text-green-500">{message}</p>}
        </>
      )}
    </div>
  );
}
