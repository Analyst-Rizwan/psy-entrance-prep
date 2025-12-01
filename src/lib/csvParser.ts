// Utility to parse CSV and generate questions
export function parseCSV(csvContent: string) {
  const lines = csvContent.trim().split('\n');
  const questions = [];
  
  // Skip header
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;
    
    // Parse CSV line considering commas within quotes
    const parts = line.match(/(".*?"|[^,]+)(?=\s*,|\s*$)/g);
    if (!parts || parts.length < 6) continue;
    
    const question = parts[0].replace(/^"|"$/g, '').trim();
    const optionA = parts[1].replace(/^"|"$/g, '').trim();
    const optionB = parts[2].replace(/^"|"$/g, '').trim();
    const optionC = parts[3].replace(/^"|"$/g, '').trim();
    const optionD = parts[4].replace(/^"|"$/g, '').trim();
    const answer = parts[5].replace(/^"|"$/g, '').trim();
    
    const options = [optionA, optionB, optionC, optionD];
    const correctIndex = options.findIndex(opt => opt === answer);
    
    if (correctIndex === -1) {
      console.warn(`Could not find correct answer for question ${i}: ${question}`);
      continue;
    }
    
    questions.push({
      id: `q${i}`,
      subject: "Psychology",
      topic: "General",
      text: question,
      options,
      correctIndex,
      difficulty: "medium" as const,
      explanation: "Review the concepts related to this question for better understanding.",
      source: "Psychology MCQ Bank"
    });
  }
  
  return questions;
}
