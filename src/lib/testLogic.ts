import { Question } from "@/data/questions";

const STORAGE_KEY = "psy_mcq_question_history_v1";

interface UserHistory {
  usedIds: string[];
}

interface History {
  [userId: string]: UserHistory;
}

function loadHistory(): History {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function saveHistory(history: History): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch {
    // ignore quota/private modes
  }
}

function getUserHistory(userId: string): UserHistory {
  const history = loadHistory();
  if (!history[userId]) {
    history[userId] = { usedIds: [] };
    saveHistory(history);
  }
  return history[userId];
}

function updateUserHistory(userId: string, newUsedIds: string[]): void {
  const history = loadHistory();
  history[userId] = { usedIds: newUsedIds };
  saveHistory(history);
}

function shuffleInPlace<T>(arr: T[]): void {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function chooseQuestionsWithNoRepeat(
  userId: string,
  pool: Question[],
  count: number
): Question[] {
  const userHistory = getUserHistory(userId);
  const usedSet = new Set(userHistory.usedIds);
  const fresh = pool.filter((q) => !usedSet.has(q.id));

  let chosen: Question[] = [];
  if (fresh.length >= count) {
    shuffleInPlace(fresh);
    chosen = fresh.slice(0, count);
  } else {
    chosen = [...fresh];
    const remaining = count - chosen.length;

    const resetPool = pool.slice();
    shuffleInPlace(resetPool);
    const usedInTest = new Set(chosen.map((q) => q.id));
    for (const q of resetPool) {
      if (usedInTest.size >= count) break;
      if (!usedInTest.has(q.id)) {
        chosen.push(q);
        usedInTest.add(q.id);
      }
      if (chosen.length >= count) break;
    }
  }

  const newUsedIds = Array.from(
    new Set([...userHistory.usedIds, ...chosen.map((q) => q.id)])
  );
  updateUserHistory(userId, newUsedIds);

  return chosen;
}

export interface TestMode {
  type: "full" | "subject" | "topic";
  subject?: string;
  topic?: string;
  count?: number;
}

export interface TestSession {
  testId: string;
  questions: Question[];
  modeConfig: TestMode;
}

export function generateTestForMode(
  mode: TestMode,
  allQuestions: Question[],
  userId: string
): TestSession {
  const testId = `test-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

  let questions: Question[] = [];

  if (mode.type === "full") {
    const TOTAL_COUNT = mode.count || 120;
    const chosen = chooseQuestionsWithNoRepeat(userId, allQuestions, TOTAL_COUNT);
    questions = questions.concat(chosen);
  } else if (mode.type === "subject") {
    const pool = allQuestions.filter((q) => q.subject === mode.subject);
    const count = mode.count || 20;
    const chosen = chooseQuestionsWithNoRepeat(userId, pool, count);
    questions = questions.concat(chosen);
  } else if (mode.type === "topic") {
    const pool = allQuestions.filter((q) =>
      q.topic.toLowerCase().includes((mode.topic || "").toLowerCase())
    );
    const count = mode.count || 10;
    const chosen = chooseQuestionsWithNoRepeat(userId, pool, count);
    questions = questions.concat(chosen);
  }

  shuffleInPlace(questions);

  return { testId, questions, modeConfig: mode };
}

export interface QuestionReview {
  id: string;
  text: string;
  options: string[];
  correct_index: number;
  chosen_index: number | null;
  status: "correct" | "wrong" | "omitted";
  explanation: string;
  source: string;
  subject: string;
  topic: string;
}

export interface TestResult {
  testId: string;
  rawScore: number;
  percent: number;
  review: QuestionReview[];
}

export function gradeTest(
  testId: string,
  questions: Question[],
  answers: Record<string, number | null>
): TestResult {
  let raw = 0;
  const review: QuestionReview[] = [];

  questions.forEach((q) => {
    const chosenIndex = answers[q.id] ?? null;

    let status: "correct" | "wrong" | "omitted" = "omitted";
    if (chosenIndex === null || chosenIndex === undefined) {
      status = "omitted";
    } else if (chosenIndex === q.correctIndex) {
      raw += 1;
      status = "correct";
    } else {
      raw -= 0.5;
      status = "wrong";
    }

    review.push({
      id: q.id,
      text: q.text,
      options: q.options,
      correct_index: q.correctIndex,
      chosen_index: chosenIndex,
      status,
      explanation: q.explanation,
      source: q.source,
      subject: q.subject,
      topic: q.topic
    });
  });

  const total = questions.length || 1;
  const percent = Math.max(0, (raw / total) * 100);

  return {
    testId,
    rawScore: Number(raw.toFixed(2)),
    percent: Number(percent.toFixed(2)),
    review
  };
}
