import { AnalysisResult } from '../types.js';

/**
 * Analyzes template content for tone, conciseness, and clarity
 */
export function analyzeContent(content: string): AnalysisResult {
  const issues: string[] = [];
  const suggestions: string[] = [];

  // Check tone
  if (content.toLowerCase().includes('you must') || content.toLowerCase().includes('you should')) {
    issues.push('Tone is too prescriptive');
    suggestions.push('Consider using more collaborative language');
  }

  // Check conciseness
  const avgWordsPerSentence = content.split(/[.!?]+/).map(s => s.trim().split(/\s+/).length).reduce((a, b) => a + b, 0) / content.split(/[.!?]+/).length;
  if (avgWordsPerSentence > 25) {
    issues.push('Sentences are too long');
    suggestions.push('Break down long sentences into smaller, clearer statements');
  }

  // Check clarity
  const complexWords = content.match(/\b\w{15,}\b/g);
  if (complexWords && complexWords.length > 0) {
    issues.push('Contains complex or technical jargon');
    suggestions.push('Consider using simpler, more accessible language');
  }

  // Check for vague language
  const vagueTerms = ['etc', 'and so on', 'things', 'stuff'];
  for (const term of vagueTerms) {
    if (content.toLowerCase().includes(term)) {
      issues.push(`Contains vague term: "${term}"`);
      suggestions.push('Be more specific and explicit');
    }
  }

  return {
    score: Math.max(0, 100 - (issues.length * 10)),
    issues,
    suggestions,
    details: {
      avgWordsPerSentence,
      complexWordCount: complexWords?.length || 0
    }
  };
}
