export interface Question {
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

export const QUESTION_POOL: Question[] = [
  {
    id: "q1",
    subject: "Social Psychology",
    topic: "Group Processes",
    text: "Which of the following is most likely to occur when individual group members realize they will not be held individually accountable for task performance?",
    options: ["Increased motivation", "Social facilitation", "Social loafing", "Groupthink"],
    correctIndex: 2,
    difficulty: "medium",
    explanation:
      "Social loafing refers to reduced individual effort when people work in groups and feel their contributions are less identifiable. When accountability is low, members may unconsciously reduce their effort. This contrasts with social facilitation, which predicts improved performance on well-learned tasks in the presence of others. Groupthink is about defective decision-making for consensus, not effort reduction.",
    source: "Adapted from CUET-style social psychology MCQs."
  },
  {
    id: "q2",
    subject: "Social Psychology",
    topic: "Norms",
    text: "Norms in a group are best defined as:",
    options: [
      "Unexpected standards of behavior and beliefs",
      "Legal rules enforced by authorities",
      "Expected standards of behavior and beliefs established and enforced by group members",
      "Individual preferences unrelated to the group"
    ],
    correctIndex: 2,
    difficulty: "easy",
    explanation:
      "Norms are shared expectations within a group about appropriate behavior and beliefs. They are enforced informally through approval, disapproval, rewards and sanctions. Unlike laws, norms are not necessarily codified but are powerful regulators of group behavior.",
    source: "Standard social psychology definitions (group norms, roles, status)."
  },
  {
    id: "q3",
    subject: "Abnormal Psychology",
    topic: "Psychoanalytic Theory",
    text: "According to psychoanalytic/dynamic theorists, people commonly use which of the following to reduce anxiety and guilt?",
    options: ["Conscious problem solving", "Defence mechanisms", "Dream analysis only", "Traits"],
    correctIndex: 1,
    difficulty: "medium",
    explanation:
      "Defense mechanisms are unconscious strategies that protect the ego from anxiety and conflict. Examples include repression, projection, denial and rationalization. They distort reality in subtle ways so that threatening impulses or feelings are kept out of awareness.",
    source: "Classic psychodynamic theory (Freud, Neo-Freudians)."
  },
  {
    id: "q4",
    subject: "Social Psychology",
    topic: "Cohesiveness",
    text: "Which statement best describes 'cohesiveness' in groups?",
    options: [
      "The degree of conflict among group members",
      "Togetherness, binding or mutual attraction among group members",
      "Formal rules governing group operations",
      "Formal status hierarchy"
    ],
    correctIndex: 1,
    difficulty: "easy",
    explanation:
      "Cohesiveness is the extent to which members are attracted to the group and want to remain in it. High cohesion often increases conformity to group norms and feelings of belonging. However, excessive cohesion can contribute to groupthink if critical evaluation is suppressed.",
    source: "Social psychology group processes chapters."
  },
  {
    id: "q5",
    subject: "Research Methods & Statistics",
    topic: "Item Formats",
    text: "An Assertion–Reason item in entrance tests typically asks the examinee to:",
    options: [
      "Choose the single word that completes a sentence",
      "Judge whether a statement and a reason are true and whether the reason explains the statement",
      "Identify multiple correct options out of five",
      "Fill in numerical values to complete a data table"
    ],
    correctIndex: 1,
    difficulty: "easy",
    explanation:
      "Assertion–Reason items present an Assertion (A) and a Reason (R), and the examinee must determine whether each is true and whether R explains A. This format simultaneously assesses factual knowledge and causal understanding. It is common in Indian entrance and competitive examinations.",
    source: "Entrance-test design references."
  },
  {
    id: "q6",
    subject: "Social Psychology",
    topic: "Norms & Cohesion",
    text: "Which of the following statements about norms and cohesiveness is most accurate?",
    options: [
      "Norms are identical to group cohesiveness",
      "Norms only exist in low-cohesion groups",
      "Cohesive groups often show stronger enforcement of group norms",
      "Cohesiveness eliminates the need for norms"
    ],
    correctIndex: 2,
    difficulty: "medium",
    explanation:
      "Norms and cohesiveness are distinct but related. When cohesion is high, members strongly identify with the group, so there is more pressure to conform to its norms. This can increase coordination but can also discourage dissent if norms discourage disagreement.",
    source: "Standard group dynamics literature."
  },
  {
    id: "q7",
    subject: "Social Psychology",
    topic: "Social Facilitation",
    text: "Social facilitation refers to:",
    options: [
      "Improved performance on simple or well-practiced tasks in the presence of others",
      "Reduced performance on all tasks in the presence of others",
      "No change in performance across situations",
      "Improved performance only in solitary settings"
    ],
    correctIndex: 0,
    difficulty: "easy",
    explanation:
      "Social facilitation theories propose that the presence of others increases physiological arousal. On simple or well-learned tasks, this arousal enhances dominant responses, improving performance. On complex or new tasks, however, it may impair performance.",
    source: "Social psychology classic experiments (Zajonc, etc.)."
  },
  {
    id: "q8",
    subject: "Social Psychology",
    topic: "Groupthink",
    text: "A common consequence of groupthink is:",
    options: [
      "Increased consideration of diverse viewpoints",
      "Suppression of dissent and defective decision-making",
      "Greater individual accountability",
      "More accurate risk estimates"
    ],
    correctIndex: 1,
    difficulty: "medium",
    explanation:
      "Groupthink occurs when a highly cohesive group values consensus more than realistic appraisal of alternatives. Symptoms include self-censorship, illusions of unanimity and pressure on dissenters. This pattern often leads to poor, risky decisions.",
    source: "Janis' theory of groupthink."
  },
  {
    id: "q9",
    subject: "Social Psychology",
    topic: "Basic Concepts",
    text: "Which term best fits the definition: 'Shared expectations about appropriate behavior within a group'?",
    options: ["Role", "Norm", "Status", "Leadership"],
    correctIndex: 1,
    difficulty: "easy",
    explanation:
      "Norms are shared rules or expectations about how group members should behave. Roles specify behavior tied to a particular position, and status refers to social rank. Leadership is about influence and direction, not simply shared expectations.",
    source: "Basic social psychology definitions."
  },
  {
    id: "q10",
    subject: "Abnormal Psychology",
    topic: "Defence Mechanisms",
    text: "Which of the following best illustrates a psychoanalytic defence mechanism?",
    options: [
      "Using graded exposure to reduce phobic fear",
      "Unconsciously denying painful aspects of reality",
      "Rewarding desired behavior in a child",
      "Practicing a task repeatedly to improve performance"
    ],
    correctIndex: 1,
    difficulty: "easy",
    explanation:
      "Defense mechanisms operate unconsciously to protect the individual from anxiety or guilt. Denial, repression and projection are examples. They differ from conscious coping strategies or behavioral techniques like reinforcement and exposure.",
    source: "Psychodynamic models of personality and psychopathology."
  }
];
