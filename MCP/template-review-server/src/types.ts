export interface AnalysisResult {
  score: number;
  issues: string[];
  suggestions: string[];
  details: Record<string, any>;
}

export interface PatternMatch {
  pattern: string;
  line: number;
  column: number;
  severity: 'error' | 'warning' | 'info';
  message: string;
}
