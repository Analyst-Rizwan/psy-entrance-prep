import * as fs from 'fs';
import * as path from 'path';

const csvPath = path.join(__dirname, '../src/data/psychology_mcq_1000.csv');
const outputPath = path.join(__dirname, '../src/data/questions.ts');

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

function generateQuestions() {
  const csvContent = fs.readFileSync(csvPath, 'utf-8');
  const lines = csvContent.trim().split('\n');
  
  let output = `export interface Question {
  id: string;
  subject: string;
  topic: string;
  text: string;
  options: string[];
  correctIndex: number;
  difficulty: "easy" | "medium" | "hard";
  explanation: string;
  source: string;
}

export const QUESTION_POOL: Question[] = [\n`;
  
  for (let i = 1; i < lines.length; i++) {
    const parts = parseCSVLine(lines[i]);
    if (parts.length < 6) continue;
    
    const question = parts[0];
    const optionA = parts[1];
    const optionB = parts[2];
    const optionC = parts[3];
    const optionD = parts[4];
    const answer = parts[5];
    
    const options = [optionA, optionB, optionC, optionD];
    const correctIndex = options.findIndex(opt => opt === answer);
    
    if (correctIndex === -1) {
      console.warn(`Could not find correct answer for line ${i + 1}`);
      continue;
    }
    
    output += `  {\n`;
    output += `    id: "q${i}",\n`;
    output += `    subject: "Psychology",\n`;
    output += `    topic: "General",\n`;
    output += `    text: ${JSON.stringify(question)},\n`;
    output += `    options: ${JSON.stringify(options)},\n`;
    output += `    correctIndex: ${correctIndex},\n`;
    output += `    difficulty: "medium",\n`;
    output += `    explanation: "Review the concepts related to this question for better understanding.",\n`;
    output += `    source: "Psychology MCQ Bank"\n`;
    output += `  }${i < lines.length - 1 ? ',' : ''}\n`;
  }
  
  output += `];\n`;
  
  fs.writeFileSync(outputPath, output, 'utf-8');
  console.log(`Generated ${lines.length - 1} questions in ${outputPath}`);
}

generateQuestions();
