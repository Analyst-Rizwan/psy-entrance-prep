import csvData from "@/data/psychology_mcq_1000.csv?raw";
import { Question } from "@/data/questions";

let cachedQuestions: Question[] | null = null;

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current.trim());
  return result;
}

export function loadAllQuestions(): Question[] {
  if (cachedQuestions) {
    return cachedQuestions;
  }
  
  const lines = csvData.trim().split('\n');
  const questions: Question[] = [];
  
  // Skip header line
  for (let i = 1; i < lines.length; i++) {
    const parts = parseCSVLine(lines[i]);
    if (parts.length < 6) continue;
    
    const questionText = parts[0];
    const optionA = parts[1];
    const optionB = parts[2];
    const optionC = parts[3];
    const optionD = parts[4];
    const answer = parts[5];
    
    const options = [optionA, optionB, optionC, optionD];
    const correctIndex = options.findIndex(opt => opt === answer);
    
    if (correctIndex === -1) {
      console.warn(`Could not find correct answer for question ${i}: ${questionText}`);
      continue;
    }
    
    questions.push({
      id: `q${i}`,
      subject: "Psychology",
      topic: "General",
      text: questionText,
      options,
      correctIndex,
      difficulty: "medium",
      explanation: "Review the concepts related to this question for better understanding.",
      source: "Psychology MCQ Bank"
    });
  }
  
  cachedQuestions = questions;
  return questions;
}
