import { useState } from "react";
import { TestMode } from "@/lib/testLogic";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const SUBJECTS = [
  "Social Psychology",
  "Abnormal Psychology",
  "Research Methods & Statistics"
];

interface ModeSelectorProps {
  onStart: (mode: TestMode) => void;
}

export default function ModeSelector({ onStart }: ModeSelectorProps) {
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [topic, setTopic] = useState("Group");
  const [miniCount, setMiniCount] = useState(10);

  return (
    <div className="animate-fade-in-up space-y-6">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-3">
          Practice smarter for your MSc Psychology entrance.
        </h1>
        <p className="text-muted-foreground text-base">
          Exam-style MCQs, negative marking, instant explanations, and a clean, focused interface.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Full Mock Test */}
        <Card className="p-6 space-y-4 bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/70 transition-all animate-float">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
            Exam Mode
          </Badge>
          <h2 className="text-xl font-semibold">Full Mock Test</h2>
          <p className="text-sm text-muted-foreground">
            Simulate the real paper with a balanced mix of subjects. Use this when you want
            to test stamina, time management and overall readiness.
          </p>
          <ul className="text-xs text-muted-foreground space-y-1.5 list-disc list-inside">
            <li>Draws questions from all available subjects</li>
            <li>Random order, no repeats until pool is exhausted</li>
            <li>Negative marking: −0.5 for wrong answers</li>
          </ul>
          <Button
            onClick={() => onStart({ type: "full", count: 2 })}
            className="w-full bg-gradient-primary shadow-glow-primary hover:opacity-90"
          >
            Start Full Mock
          </Button>
        </Card>

        {/* Subject Mock */}
        <Card className="p-6 space-y-4 bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/70 transition-all animate-float-delay-1">
          <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/30">
            Focus Mode
          </Badge>
          <h2 className="text-xl font-semibold">Subject Mock</h2>
          <p className="text-sm text-muted-foreground">
            Concentrate on one subject at a time. Great for focused revision in the last
            few days before the exam.
          </p>
          
          <div className="space-y-2">
            <Label htmlFor="subject-select" className="text-xs uppercase tracking-wider text-muted-foreground">
              Subject
            </Label>
            <Select value={subject} onValueChange={setSubject}>
              <SelectTrigger id="subject-select" className="bg-background/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SUBJECTS.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={() => onStart({ type: "subject", subject, count: 10 })}
            variant="outline"
            className="w-full border-secondary/50 text-secondary hover:bg-secondary/10"
          >
            Start {subject.split(" ")[0]} Mock
          </Button>
        </Card>

        {/* Topic Mini Test */}
        <Card className="p-6 space-y-4 bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/70 transition-all animate-float-delay-2">
          <Badge variant="outline" className="bg-accent/10 text-accent border-accent/30">
            Quick Drill
          </Badge>
          <h2 className="text-xl font-semibold">Topic Mini Test</h2>
          <p className="text-sm text-muted-foreground">
            Short bursts of practice on a specific topic. Perfect for spaced repetition
            and last-day fine-tuning.
          </p>

          <div className="space-y-2">
            <Label htmlFor="topic-input" className="text-xs uppercase tracking-wider text-muted-foreground">
              Topic keyword
            </Label>
            <Input
              id="topic-input"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Group, Defence, Norms"
              className="bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="count-input" className="text-xs uppercase tracking-wider text-muted-foreground">
              Number of questions
            </Label>
            <Input
              id="count-input"
              type="number"
              min="5"
              max="40"
              value={miniCount}
              onChange={(e) => setMiniCount(Number(e.target.value) || 5)}
              className="bg-background/50"
            />
          </div>

          <Button
            onClick={() => onStart({ type: "topic", topic, count: miniCount })}
            variant="outline"
            className="w-full border-accent/50 text-accent hover:bg-accent/10"
          >
            Start {miniCount}-Q Mini Test
          </Button>
        </Card>
      </div>
    </div>
  );
}
