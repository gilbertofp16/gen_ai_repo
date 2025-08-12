import { AnalysisResult, PatternMatch } from '../types.js';

/**
 * Common template anti-patterns to check for
 */
const ANTI_PATTERNS = [
  {
    pattern: /\{\{.*?\}\}/g,
    severity: 'error' as const,
    message: 'Mustache-style templating syntax detected - use proper TypeScript string interpolation'
  },
  {
    pattern: /\$\{[^}]+\}/g,
    severity: 'warning' as const,
    message: 'String interpolation should be used sparingly in templates'
  },
  {
    pattern: /\b(var|let)\b/g,
    severity: 'warning' as const,
    message: 'Prefer const for template variables unless reassignment is necessary'
  },
  {
    pattern: /\b(any)\b/g,
    severity: 'error' as const,
    message: 'Avoid using "any" type - specify proper types for template variables'
  },
  {
    pattern: /\bconsole\.(log|warn|error)\b/g,
    severity: 'warning' as const,
    message: 'Remove debug console statements from template'
  }
];

/**
 * Formatting patterns to enforce
 */
const FORMATTING_PATTERNS = [
  {
    pattern: /^\s*\n\s*\n\s*\n/gm,
    severity: 'warning' as const,
    message: 'Multiple consecutive blank lines detected'
  },
  {
    pattern: /\t/g,
    severity: 'warning' as const,
    message: 'Use spaces for indentation instead of tabs'
  },
  {
    pattern: /\s+$/gm,
    severity: 'info' as const,
    message: 'Trailing whitespace detected'
  },
  {
    pattern: /[^\n]\n?$/,
    severity: 'info' as const,
    message: 'File should end with a newline'
  }
];

/**
 * Analyzes template content for anti-patterns and formatting issues
 */
export function analyzePatterns(content: string): AnalysisResult {
  const issues: string[] = [];
  const suggestions: string[] = [];
  const matches: PatternMatch[] = [];

  // Check for anti-patterns
  for (const pattern of ANTI_PATTERNS) {
    let match;
    while ((match = pattern.pattern.exec(content)) !== null) {
      const lines = content.slice(0, match.index).split('\n');
      matches.push({
        pattern: pattern.pattern.toString(),
        line: lines.length,
        column: match.index - content.lastIndexOf('\n', match.index),
        severity: pattern.severity,
        message: pattern.message
      });
      
      if (!issues.includes(pattern.message)) {
        issues.push(pattern.message);
        suggestions.push(`Fix ${pattern.severity}: ${pattern.message}`);
      }
    }
  }

  // Check formatting
  for (const pattern of FORMATTING_PATTERNS) {
    let match;
    while ((match = pattern.pattern.exec(content)) !== null) {
      const lines = content.slice(0, match.index).split('\n');
      matches.push({
        pattern: pattern.pattern.toString(),
        line: lines.length,
        column: match.index - content.lastIndexOf('\n', match.index),
        severity: pattern.severity,
        message: pattern.message
      });

      if (!issues.includes(pattern.message)) {
        issues.push(pattern.message);
        suggestions.push(`Fix formatting: ${pattern.message}`);
      }
    }
  }

  return {
    score: Math.max(0, 100 - (matches.filter(m => m.severity === 'error').length * 15) - 
                          (matches.filter(m => m.severity === 'warning').length * 5) -
                          (matches.filter(m => m.severity === 'info').length * 2)),
    issues,
    suggestions,
    details: {
      patternMatches: matches
    }
  };
}
