import { TestResult } from "@/lib/testLogic";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ReviewProps {
  data: TestResult;
  onBackHome: () => void;
  onRetake: () => void;
}

export default function Review({ data, onBackHome, onRetake }: ReviewProps) {
  const { review, rawScore, percent } = data;

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in-up">
      {/* Header with Score */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2">Review &amp; Explanations</h2>
          <p className="text-muted-foreground">
            See what you got right, what needs work, and read brief explanations.
          </p>
        </div>
        <div className="text-center px-6 py-4 rounded-2xl bg-gradient-to-br from-secondary/20 to-secondary/5 border border-secondary/30">
          <div className="text-3xl font-bold text-secondary">{rawScore}</div>
          <div className="text-sm text-muted-foreground">{Math.round(percent)}%</div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button variant="ghost" onClick={onBackHome}>
          Back to Home
        </Button>
        <Button variant="outline" onClick={onRetake}>
          Try another test
        </Button>
      </div>

      {/* Review List */}
      <ScrollArea className="h-[60vh] pr-4">
        <div className="space-y-4">
          {review.map((q, idx) => (
            <Card
              key={q.id}
              className={`p-5 space-y-4 border-l-4 ${
                q.status === "correct"
                  ? "border-l-secondary bg-secondary/5"
                  : q.status === "wrong"
                  ? "border-l-destructive bg-destructive/5"
                  : "border-l-warning bg-warning/5"
              }`}
            >
              {/* Question Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <span className="font-semibold">Q{idx + 1}.</span> {q.text}
                </div>
                <Badge
                  variant={q.status === "correct" ? "default" : "destructive"}
                  className={
                    q.status === "correct"
                      ? "bg-secondary"
                      : q.status === "omitted"
                      ? "bg-warning"
                      : ""
                  }
                >
                  {q.status.toUpperCase()}
                </Badge>
              </div>

              {/* Options */}
              <div className="space-y-2">
                {q.options.map((opt, i) => {
                  const isCorrect = i === q.correct_index;
                  const isChosen = i === q.chosen_index;
                  return (
                    <div
                      key={i}
                      className={`flex items-center gap-2 text-sm p-3 rounded-full ${
                        isCorrect
                          ? "bg-secondary/20 border border-secondary/50"
                          : isChosen && !isCorrect
                          ? "bg-destructive/20 border border-destructive/50"
                          : "bg-muted/30 border border-transparent"
                      }`}
                    >
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-background/50 border flex items-center justify-center text-xs font-semibold">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span>{opt}</span>
                    </div>
                  );
                })}
              </div>

              {/* Explanation */}
              <div className="text-sm space-y-1 pt-2 border-t border-border/50">
                <p>
                  <strong>Explanation:</strong> {q.explanation}
                </p>
                <p className="text-xs text-muted-foreground">
                  <strong>Source:</strong> {q.source}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
