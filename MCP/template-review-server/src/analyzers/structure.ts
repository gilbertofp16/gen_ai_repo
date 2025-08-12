interface TemplateAnalysis {
  structure: {
    hasRole: boolean;
    hasContext: boolean;
    hasTask: boolean;
    hasResponseFormat: boolean;
  };
  quality: {
    clarity: number;
    conciseness: number;
    consistency: number;
  };
  suggestions: string[];
}

interface TemplateMetadata {
  type?: string;
  version?: string;
  [key: string]: unknown;
}

export async function analyzeTemplate(
  content: string,
  metadata?: TemplateMetadata
): Promise<TemplateAnalysis> {
  const analysis: TemplateAnalysis = {
    structure: {
      hasRole: content.toLowerCase().includes('role:'),
      hasContext: content.toLowerCase().includes('context:'),
      hasTask: content.toLowerCase().includes('task:'),
      hasResponseFormat:
        content.toLowerCase().includes('format:') || content.toLowerCase().includes('output:'),
    },
    quality: {
      clarity: calculateClarity(content),
      conciseness: calculateConciseness(content),
      consistency: calculateConsistency(content),
    },
    suggestions: [],
  };

  // Add suggestions based on analysis
  if (!analysis.structure.hasRole) {
    analysis.suggestions.push('Add a clear role definition using "ROLE:" section');
  }
  if (!analysis.structure.hasContext) {
    analysis.suggestions.push('Include context information using "CONTEXT:" section');
  }
  if (!analysis.structure.hasTask) {
    analysis.suggestions.push('Specify the task using "TASK:" section');
  }
  if (!analysis.structure.hasResponseFormat) {
    analysis.suggestions.push(
      'Define expected response format using "FORMAT:" or "OUTPUT:" section'
    );
  }

  // Check for template variables
  const variables = content.match(/{{[^}]+}}/g);
  if (!variables) {
    analysis.suggestions.push(
      'Consider using template variables (e.g., {{variableName}}) for dynamic content'
    );
  }

  // Add metadata-specific suggestions
  if (metadata?.type === 'conversation') {
    analysis.suggestions.push(
      'For conversation templates, consider adding turn-taking markers or conversation flow indicators'
    );
  }

  return analysis;
}

function calculateClarity(content: string): number {
  let score = 1.0;

  // Penalize for very long sentences
  const sentences = content.split(/[.!?]+/);
  const avgSentenceLength = sentences.reduce((sum, s) => sum + s.length, 0) / sentences.length;
  if (avgSentenceLength > 100) score -= 0.2;
  if (avgSentenceLength > 150) score -= 0.3;

  // Penalize for nested instructions
  const nestedCount = (content.match(/\([^()]*\)/g) || []).length;
  score -= nestedCount * 0.1;

  // Reward clear section markers
  const hasMarkers = /^[A-Z]+:/m.test(content);
  if (hasMarkers) score += 0.2;

  return Math.max(0, Math.min(1, score));
}

function calculateConciseness(content: string): number {
  let score = 1.0;

  // Penalize for repetitive words
  const words = content.toLowerCase().split(/\s+/);
  const wordFreq = new Map<string, number>();
  words.forEach((word) => {
    wordFreq.set(word, (wordFreq.get(word) || 0) + 1);
  });
  const repetitiveWords = Array.from(wordFreq.values()).filter((freq) => freq > 3).length;
  score -= repetitiveWords * 0.1;

  // Penalize for very long content
  if (content.length > 500) score -= 0.2;
  if (content.length > 1000) score -= 0.3;

  return Math.max(0, Math.min(1, score));
}

function calculateConsistency(content: string): number {
  let score = 1.0;

  // Check for mixed tenses
  const presentTense = /\b(is|are|am)\b/g;
  const pastTense = /\b(was|were)\b/g;
  const presentCount = (content.match(presentTense) || []).length;
  const pastCount = (content.match(pastTense) || []).length;
  if (presentCount > 0 && pastCount > 0) score -= 0.2;

  // Check for consistent formatting
  const bulletStyles = new Set(content.match(/^[-*•]/gm));
  if (bulletStyles.size > 1) score -= 0.2;

  return Math.max(0, Math.min(1, score));
}
