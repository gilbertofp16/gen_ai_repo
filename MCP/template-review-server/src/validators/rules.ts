import { z } from 'zod';

interface ValidationResult {
  isValid: boolean;
  violations: ValidationViolation[];
}

interface ValidationViolation {
  rule: string;
  message: string;
  severity: 'error' | 'warning';
}

// Schema for template structure
const templateSchema = z.object({
  content: z.string().min(1, 'Template content cannot be empty'),
});

export async function validateTemplate(content: string): Promise<ValidationResult> {
  const violations: ValidationViolation[] = [];

  // Basic schema validation
  try {
    templateSchema.parse({ content });
  } catch (error) {
    if (error instanceof z.ZodError) {
      violations.push({
        rule: 'schema',
        message: error.issues[0].message,
        severity: 'error',
      });
    }
  }

  // Structure validation
  validateStructure(content, violations);

  // Content validation
  validateContent(content, violations);

  // Variable validation
  validateVariables(content, violations);

  // Format validation
  validateFormat(content, violations);

  return {
    isValid: violations.length === 0,
    violations,
  };
}

function validateStructure(content: string, violations: ValidationViolation[]): void {
  // Check for required sections
  const sections = {
    role: /^ROLE:/im.test(content),
    context: /^CONTEXT:/im.test(content),
    task: /^TASK:/im.test(content),
    format: /^(FORMAT|OUTPUT):/im.test(content),
  };

  if (!sections.role) {
    violations.push({
      rule: 'required-sections',
      message: 'Missing ROLE section',
      severity: 'error',
    });
  }

  if (!sections.context) {
    violations.push({
      rule: 'required-sections',
      message: 'Missing CONTEXT section',
      severity: 'error',
    });
  }

  if (!sections.task) {
    violations.push({
      rule: 'required-sections',
      message: 'Missing TASK section',
      severity: 'error',
    });
  }

  if (!sections.format) {
    violations.push({
      rule: 'required-sections',
      message: 'Missing FORMAT/OUTPUT section',
      severity: 'warning',
    });
  }

  // Check section order
  const sectionOrder = ['ROLE', 'CONTEXT', 'TASK', 'FORMAT', 'OUTPUT'];
  const foundSections = content
    .split('\n')
    .map((line) => {
      const match = line.match(/^(ROLE|CONTEXT|TASK|FORMAT|OUTPUT):/i);
      return match ? match[1].toUpperCase() : null;
    })
    .filter((section): section is string => section !== null);

  let lastIndex = -1;
  foundSections.forEach((section) => {
    const currentIndex = sectionOrder.indexOf(section);
    if (currentIndex < lastIndex) {
      violations.push({
        rule: 'section-order',
        message: `Section ${section} is out of order. Expected order: ${sectionOrder.join(', ')}`,
        severity: 'warning',
      });
    }
    lastIndex = currentIndex;
  });
}

function validateContent(content: string, violations: ValidationViolation[]): void {
  // Check for overly long sentences
  const sentences = content.split(/[.!?]+/);
  sentences.forEach((sentence) => {
    if (sentence.trim().length > 150) {
      violations.push({
        rule: 'sentence-length',
        message: 'Sentence exceeds recommended length of 150 characters',
        severity: 'warning',
      });
    }
  });

  // Check for nested parentheses
  const nestedParens = /\([^()]*\([^()]*\)[^()]*\)/;
  if (nestedParens.test(content)) {
    violations.push({
      rule: 'nested-instructions',
      message: 'Avoid nested parentheses in instructions',
      severity: 'warning',
    });
  }

  // Check for ambiguous language
  const ambiguousTerms = ['maybe', 'probably', 'possibly', 'might', 'could', 'should', 'would'];
  ambiguousTerms.forEach((term) => {
    if (new RegExp(`\\b${term}\\b`, 'i').test(content)) {
      violations.push({
        rule: 'ambiguous-language',
        message: `Avoid ambiguous terms like "${term}"`,
        severity: 'warning',
      });
    }
  });
}

function validateVariables(content: string, violations: ValidationViolation[]): void {
  // Check for consistent variable format
  const variableFormats = [/{{[^}]+}}/g, /[[]\w-]+]/g, /\${[\w-]+}/g];

  const foundFormats = variableFormats
    .map((format) => (content.match(format) || []).length)
    .filter((count) => count > 0);

  if (foundFormats.length > 1) {
    violations.push({
      rule: 'variable-format',
      message: 'Inconsistent variable formats detected. Use {{variableName}} format consistently',
      severity: 'error',
    });
  }

  // Check for undefined variables
  const variables = content.match(/{{[^}]+}}/g) || [];
  const uniqueVars = new Set(variables.map((v) => v.toLowerCase()));

  variables.forEach((variable) => {
    if (!/^{{[\w-]+}}$/.test(variable)) {
      violations.push({
        rule: 'variable-naming',
        message: `Invalid variable format: ${variable}. Use alphanumeric characters and hyphens only`,
        severity: 'error',
      });
    }
  });

  // Check for unused variables
  if (uniqueVars.size === 0 && content.length > 500) {
    violations.push({
      rule: 'variable-usage',
      message: 'Consider using variables for dynamic content in longer templates',
      severity: 'warning',
    });
  }
}

function validateFormat(content: string, violations: ValidationViolation[]): void {
  // Check for consistent bullet point style
  const bulletStyles = new Set((content.match(/^[-*•]\s/gm) || []).map((bullet) => bullet[0]));

  if (bulletStyles.size > 1) {
    violations.push({
      rule: 'bullet-consistency',
      message: 'Use consistent bullet point style throughout the template',
      severity: 'warning',
    });
  }

  // Check for consistent capitalization in sections
  const sectionHeaders = content.match(/^(ROLE|CONTEXT|TASK|FORMAT|OUTPUT):/gim) || [];
  const inconsistentCase = sectionHeaders.some((header) => header !== header.toUpperCase());

  if (inconsistentCase) {
    violations.push({
      rule: 'section-case',
      message: 'Use consistent uppercase for section headers (ROLE:, CONTEXT:, etc.)',
      severity: 'warning',
    });
  }

  // Check for proper spacing between sections
  const sectionSpacing = content.match(/\n{3,}/g);
  if (sectionSpacing) {
    violations.push({
      rule: 'section-spacing',
      message: 'Use exactly one blank line between sections',
      severity: 'warning',
    });
  }

  // Check for trailing whitespace
  if (/[ \t]+$/m.test(content)) {
    violations.push({
      rule: 'trailing-whitespace',
      message: 'Remove trailing whitespace',
      severity: 'warning',
    });
  }
}
