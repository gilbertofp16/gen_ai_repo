interface EnhancementResult {
  enhancedContent: string;
  changes: string[];
  originalContent: string;
}

export async function enhanceTemplate(content: string): Promise<EnhancementResult> {
  const originalContent = content;
  let enhancedContent = content;
  const changes: string[] = [];

  // Add missing sections
  const sections = identifySections(content);
  enhancedContent = addMissingSections(enhancedContent, sections, changes);

  // Format template variables
  enhancedContent = formatTemplateVariables(enhancedContent, changes);

  // Improve formatting
  enhancedContent = improveFormatting(enhancedContent, changes);

  // Remove redundancies
  enhancedContent = removeRedundancies(enhancedContent, changes);

  return {
    enhancedContent,
    changes,
    originalContent,
  };
}

interface Sections {
  role: boolean;
  context: boolean;
  task: boolean;
  format: boolean;
}

function identifySections(content: string): Sections {
  return {
    role: /^ROLE:/im.test(content),
    context: /^CONTEXT:/im.test(content),
    task: /^TASK:/im.test(content),
    format: /^(FORMAT|OUTPUT):/im.test(content),
  };
}

function addMissingSections(content: string, sections: Sections, changes: string[]): string {
  let enhanced = content;

  // Add template if completely unstructured
  if (!sections.role && !sections.context && !sections.task && !sections.format) {
    const lines = content.trim().split('\n');
    enhanced =
      `ROLE: You are an AI assistant tasked with ${inferRole(lines[0])}\n\n` +
      `CONTEXT: ${lines.slice(0, Math.min(3, lines.length)).join(' ')}\n\n` +
      `TASK: ${lines.slice(Math.min(3, lines.length)).join(' ')}\n\n` +
      'FORMAT: Provide your response in a clear, structured manner.';
    changes.push('Added basic template structure (ROLE, CONTEXT, TASK, FORMAT sections)');
    return enhanced;
  }

  // Add individual missing sections
  if (!sections.role) {
    enhanced = `ROLE: You are an AI assistant tasked with ${inferRole(content)}\n\n${enhanced}`;
    changes.push('Added missing ROLE section');
  }

  if (!sections.context) {
    const insertion = 'CONTEXT: Working with the following information and requirements.\n\n';
    enhanced = insertAfterSection(enhanced, 'ROLE:', insertion);
    changes.push('Added missing CONTEXT section');
  }

  if (!sections.task) {
    enhanced = enhanced.trim() + '\n\nTASK: Complete the following objectives.\n';
    changes.push('Added missing TASK section');
  }

  if (!sections.format) {
    enhanced =
      enhanced.trim() + '\n\nFORMAT: Provide your response in a clear, structured manner.\n';
    changes.push('Added missing FORMAT section');
  }

  return enhanced;
}

function formatTemplateVariables(content: string, changes: string[]): string {
  // Find inconsistent variable formats
  const variables = content.match(/{{[^}]+}}|\[[\w-]+]|\${[\w-]+}/g) || [];
  if (variables.length === 0) return content;

  let enhanced = content;
  const normalized = new Map<string, string>();

  // Normalize to {{variableName}} format
  variables.forEach((variable) => {
    const cleanName = variable
      // eslint-disable-next-line no-useless-escape
      .replace(/[{}\[\]$]/g, '')
      .trim()
      .replace(/\s+/g, '_');
    const normalizedVar = `{{${cleanName}}}`;
    if (variable !== normalizedVar) {
      enhanced = enhanced.replace(variable, normalizedVar);
      normalized.set(variable, normalizedVar);
    }
  });

  if (normalized.size > 0) {
    changes.push(
      `Normalized variable format to {{variableName}} style: ${Array.from(normalized.entries())
        .map(([from, to]) => `${from} → ${to}`)
        .join(', ')}`
    );
  }

  return enhanced;
}

function improveFormatting(content: string, changes: string[]): string {
  let enhanced = content;

  // Ensure consistent section capitalization
  enhanced = enhanced.replace(/^(role|context|task|format|output):/gim, (match) =>
    match.toUpperCase()
  );

  // Ensure double newlines between sections
  enhanced = enhanced.replace(/([^\n])\n(ROLE|CONTEXT|TASK|FORMAT|OUTPUT):/g, '$1\n\n$2:');

  // Standardize bullet points
  const hasBullets = /^[-*•]/m.test(enhanced);
  if (hasBullets) {
    enhanced = enhanced.replace(/^[-*•]\s*/gm, '- ');
    changes.push('Standardized bullet point format to "-"');
  }

  // Remove trailing whitespace
  const trimmed = enhanced.replace(/[ \t]+$/gm, '');
  if (trimmed !== enhanced) {
    enhanced = trimmed;
    changes.push('Removed trailing whitespace');
  }

  return enhanced;
}

function removeRedundancies(content: string, changes: string[]): string {
  let enhanced = content;

  // Remove duplicate instructions
  const lines = enhanced.split('\n');
  const uniqueLines = new Set<string>();
  const duplicates = new Set<string>();

  const filtered = lines.filter((line) => {
    const normalized = line.trim().toLowerCase();
    if (!normalized || normalized.match(/^(ROLE|CONTEXT|TASK|FORMAT|OUTPUT):/i)) {
      return true;
    }
    if (uniqueLines.has(normalized)) {
      duplicates.add(normalized);
      return false;
    }
    uniqueLines.add(normalized);
    return true;
  });

  if (duplicates.size > 0) {
    enhanced = filtered.join('\n');
    changes.push(`Removed ${duplicates.size} duplicate instruction(s)`);
  }

  return enhanced;
}

function inferRole(content: string): string {
  const text = content.toLowerCase();

  if (text.includes('review') || text.includes('analyze')) {
    return 'reviewing and analyzing content';
  }
  if (text.includes('create') || text.includes('generate')) {
    return 'creating and generating content';
  }
  if (text.includes('improve') || text.includes('enhance')) {
    return 'improving and enhancing content';
  }
  if (text.includes('explain') || text.includes('teach')) {
    return 'explaining concepts and teaching';
  }

  return 'assisting with the specified task';
}

function insertAfterSection(content: string, section: string, insertion: string): string {
  const regex = new RegExp(`(^${section}.*?\n)`, 'm');
  const match = content.match(regex);

  if (match) {
    return content.replace(regex, `$1\n${insertion}`);
  }

  return content;
}
