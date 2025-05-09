
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Play, Send, Mic } from "lucide-react";
import { toast } from "sonner";

const SAMPLE_QUESTIONS = {
  "general": [
    "Tell me about yourself and your background.",
    "What are your greatest strengths and weaknesses?",
    "Where do you see yourself in five years?",
    "Why did you leave your last position?",
    "Why should we hire you for this position?"
  ],
  "technical": [
    "Can you explain your approach to solving complex technical problems?",
    "Describe a challenging project you worked on and how you overcame obstacles.",
    "What programming languages are you most comfortable with?",
    "How do you stay updated on the latest technological trends?",
    "Explain a technical concept you understand well to someone who is non-technical."
  ],
  "behavioral": [
    "Tell me about a time when you had to deal with a difficult team member.",
    "Describe a situation where you had to meet a tight deadline.",
    "Give an example of a time when you showed leadership skills.",
    "Tell me about a time when you failed and what you learned from it.",
    "How do you handle stress and pressure in the workplace?"
  ]
};

export function InterviewAssistantTool() {
  const [questionType, setQuestionType] = useState<string>("general");
  const [currentQuestion, setCurrentQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAnswering, setIsAnswering] = useState<boolean>(false);
  const [jobTitle, setJobTitle] = useState<string>("");

  const handleGenerateQuestion = () => {
    const questions = SAMPLE_QUESTIONS[questionType as keyof typeof SAMPLE_QUESTIONS];
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    setCurrentQuestion(randomQuestion);
    setAnswer("");
    setFeedback("");
  };

  const handleSubmitAnswer = async () => {
    if (!answer.trim()) {
      toast.error("Please provide an answer first");
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate an API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate mock feedback based on answer length and keywords
      let feedbackText = "";
      const answerWords = answer.split(" ");
      
      // Content-based feedback
      if (answerWords.length < 20) {
        feedbackText += "Your answer is quite brief. Consider providing more details and examples to fully address the question.\n\n";
      } else if (answerWords.length > 150) {
        feedbackText += "Your answer is comprehensive, but consider being more concise to maintain the interviewer's attention.\n\n";
      } else {
        feedbackText += "Your answer has a good length that balances detail with conciseness.\n\n";
      }
      
      // Structure feedback
      feedbackText += "Structure: ";
      if (answer.includes("example") || answer.includes("instance") || answer.includes("situation")) {
        feedbackText += "Good use of examples to illustrate your points. ";
      } else {
        feedbackText += "Consider including specific examples to support your statements. ";
      }
      
      // Content feedback based on question type
      feedbackText += "\n\nContent: ";
      if (questionType === "general") {
        if (answer.includes("I") && answer.includes("my") && (answer.includes("experience") || answer.includes("skill"))) {
          feedbackText += "You've appropriately focused on your personal qualifications and experiences.";
        } else {
          feedbackText += "Try to relate the answer more directly to your experiences and qualifications.";
        }
      } else if (questionType === "technical") {
        if (answer.includes("approach") || answer.includes("method") || answer.includes("technique") || answer.includes("technology")) {
          feedbackText += "Good technical explanation with appropriate terminology.";
        } else {
          feedbackText += "Consider using more technical vocabulary relevant to your field.";
        }
      } else if (questionType === "behavioral") {
        if (answer.includes("situation") || answer.includes("task") || answer.includes("action") || answer.includes("result")) {
          feedbackText += "Excellent use of the STAR method (Situation, Task, Action, Result) to structure your response.";
        } else {
          feedbackText += "Consider using the STAR method (Situation, Task, Action, Result) to better structure your response.";
        }
      }
      
      // Overall impression
      feedbackText += "\n\nOverall impression: ";
      const overallScore = Math.floor(Math.random() * 3); // 0, 1, or 2
      if (overallScore === 0) {
        feedbackText += "Your answer demonstrates solid understanding but could benefit from additional specificity and structure.";
      } else if (overallScore === 1) {
        feedbackText += "This is a strong response that showcases your qualifications well.";
      } else {
        feedbackText += "Excellent response that effectively addresses the question and highlights your relevant strengths.";
      }
      
      setFeedback(feedbackText);
    } catch (error) {
      toast.error("Error generating feedback. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAnswering = () => {
    if (!currentQuestion) {
      toast.error("Please generate a question first");
      return;
    }
    
    setIsAnswering(!isAnswering);
    if (!isAnswering) {
      setAnswer("");
      setFeedback("");
      toast.info("Recording started", { description: "Answer the question clearly. Click Stop when finished." });
    } else {
      toast.success("Recording stopped");
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="job-title">Target Job Position (Optional)</Label>
        <Input 
          id="job-title" 
          placeholder="e.g., Front-end Developer, Marketing Manager"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="question-type">Question Type</Label>
        <Select value={questionType} onValueChange={setQuestionType}>
          <SelectTrigger>
            <SelectValue placeholder="Select question type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="general">General</SelectItem>
            <SelectItem value="technical">Technical</SelectItem>
            <SelectItem value="behavioral">Behavioral</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Button 
        onClick={handleGenerateQuestion} 
        className="w-full"
      >
        Generate Interview Question
      </Button>

      {currentQuestion && (
        <div className="space-y-4 mt-4">
          <div className="p-4 border rounded-md bg-muted/20">
            <Label className="font-medium">Question:</Label>
            <p className="mt-1">{currentQuestion}</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="answer">Your Answer</Label>
              <Button 
                variant={isAnswering ? "destructive" : "outline"} 
                size="sm"
                onClick={toggleAnswering}
              >
                {isAnswering ? (
                  <>Stop</>
                ) : (
                  <>
                    <Mic className="w-4 h-4 mr-1" />
                    Record
                  </>
                )}
              </Button>
            </div>
            <Textarea
              id="answer"
              placeholder="Type or record your answer here..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              rows={5}
            />
          </div>

          <Button 
            onClick={handleSubmitAnswer} 
            disabled={isLoading || !answer.trim()} 
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Get Feedback
              </>
            )}
          </Button>

          {feedback && (
            <div className="mt-4 space-y-2">
              <Label>AI Feedback</Label>
              <div className="border p-4 rounded-md bg-muted/20 whitespace-pre-line">
                {feedback}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
