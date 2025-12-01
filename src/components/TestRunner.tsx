import { useEffect, useState } from "react";
import { TestSession, gradeTest, TestResult } from "@/lib/testLogic";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface TestRunnerProps {
  testSession: TestSession;
  onFinish: (result: TestResult) => void;
  onExit: () => void;
}

export default function TestRunner({ testSession, onFinish, onExit }: TestRunnerProps) {
  const { testId, questions } = testSession;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number | null>>({});

  const total = questions.length;
  const currentQuestion = questions[currentIndex];
  const progressPercent = ((currentIndex + 1) / total) * 100;

  const handleSelect = (qid: string, idx: number) => {
    setAnswers((prev) => ({
      ...prev,
      [qid]: idx
    }));
  };

  const handleFinish = () => {
    const graded = gradeTest(testId, questions, answers);
    onFinish(graded);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Badge variant="secondary" className="mb-2">
            Test ID: {testId.slice(0, 8)}
          </Badge>
          <h2 className="text-2xl font-bold">Mock Test In Progress</h2>
        </div>
        <Button variant="ghost" size="sm" onClick={onExit}>
          Exit
        </Button>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <Progress value={progressPercent} className="h-2" />
        <p className="text-sm text-muted-foreground">
          Question {currentIndex + 1} of {total}
        </p>
      </div>

      {/* Question Card */}
      <Card className="p-6 space-y-6 bg-gradient-to-br from-primary/5 via-card to-accent/5 border-primary/20">
        <div className="text-lg leading-relaxed">
          {currentQuestion.text}
        </div>

        <div className="space-y-3">
          {currentQuestion.options.map((opt, idx) => {
            const chosen = answers[currentQuestion.id] === idx;
            return (
              <button
                key={idx}
                className={`w-full text-left p-4 rounded-full border transition-all flex items-center gap-3 ${
                  chosen
                    ? "bg-primary/20 border-primary shadow-lg shadow-primary/30"
                    : "bg-card/50 border-border hover:border-primary/50 hover:bg-card/70"
                }`}
                onClick={() => handleSelect(currentQuestion.id, idx)}
              >
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-background/50 border border-border flex items-center justify-center text-xs font-semibold">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="text-sm">{opt}</span>
              </button>
            );
          })}
        </div>
      </Card>

      {/* Footer Navigation */}
      <div className="flex items-center justify-between gap-4">
        <Button
          variant="ghost"
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
        >
          Previous
        </Button>
        
        <div className="flex gap-2">
          <Button
            variant="ghost"
            disabled={currentIndex === total - 1}
            onClick={() => setCurrentIndex((i) => Math.min(total - 1, i + 1))}
          >
            Next
          </Button>
          <Button
            onClick={handleFinish}
            className="bg-gradient-success shadow-glow-success hover:opacity-90"
          >
            Finish &amp; Review
          </Button>
        </div>
      </div>
    </div>
  );
}
