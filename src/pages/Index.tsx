import { useState } from "react";
import ModeSelector from "@/components/ModeSelector";
import TestRunner from "@/components/TestRunner";
import Review from "@/components/Review";
import { QUESTION_POOL } from "@/data/questions";
import { generateTestForMode, TestMode, TestSession, TestResult } from "@/lib/testLogic";
import { Button } from "@/components/ui/button";

type Screen = "home" | "test" | "review";

export default function Index() {
  const [screen, setScreen] = useState<Screen>("home");
  const [testSession, setTestSession] = useState<TestSession | null>(null);
  const [reviewData, setReviewData] = useState<TestResult | null>(null);

  const handleStart = (modeConfig: TestMode) => {
    const session = generateTestForMode(modeConfig, QUESTION_POOL, "local-user");
    setTestSession(session);
    setReviewData(null);
    setScreen("test");
  };

  const handleFinish = (result: TestResult) => {
    setReviewData(result);
    setTestSession(null);
    setScreen("review");
  };

  const handleBackHome = () => {
    setScreen("home");
    setTestSession(null);
    setReviewData(null);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Gradient Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary/30 via-background to-accent/30 opacity-50 blur-3xl pointer-events-none" />
      
      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-8 px-6 py-3 rounded-full bg-card/80 backdrop-blur-md border border-border/50 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-secondary to-primary shadow-lg shadow-secondary/50" />
            <span className="font-semibold tracking-wide">PsyEntrance MCQ Lab</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBackHome}
          >
            Home
          </Button>
        </header>

        {/* Main Screen */}
        <main className="mb-8">
          {screen === "home" && <ModeSelector onStart={handleStart} />}
          {screen === "test" && testSession && (
            <TestRunner
              testSession={testSession}
              onFinish={handleFinish}
              onExit={handleBackHome}
            />
          )}
          {screen === "review" && reviewData && (
            <Review
              data={reviewData}
              onBackHome={handleBackHome}
              onRetake={handleBackHome}
            />
          )}
        </main>

        {/* Footer */}
        <footer className="text-center text-sm text-muted-foreground">
          <p>Scoring: +1 for correct · −0.5 for wrong · 0 for skipped.</p>
        </footer>
      </div>
    </div>
  );
}
