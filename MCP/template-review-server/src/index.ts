import { analyzeTemplate } from './analyzers/structure.js';
import { analyzeContent } from './analyzers/content.js';
import { analyzePatterns } from './analyzers/patterns.js';
import { enhanceTemplate } from './enhancers/optimizer.js';
import { validateTemplate } from './validators/rules.js';

async function readStdin(): Promise<string> {
  return new Promise((resolve) => {
    let input = '';
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (chunk) => (input += chunk));
    process.stdin.on('end', () => resolve(input));
  });
}

async function main() {
  const mode = process.argv[2];

  if (!mode) {
    console.error('Error: No command provided. Expected one of: analyze_template, enhance_template, validate_template');
    process.exit(1);
  }

  try {
    const inputString = await readStdin();
    const input = JSON.parse(inputString);

    if (!input.template || typeof input.template !== 'string') {
      throw new Error('Invalid input: expected JSON with a "template" field');
    }

    let result;

    switch (mode) {
      case 'analyze_template':
        const structureAnalysis = await analyzeTemplate(input.template);
        const contentAnalysis = analyzeContent(input.template);
        const patternAnalysis = analyzePatterns(input.template);
        
        result = {
          ...structureAnalysis,
          content: contentAnalysis,
          patterns: patternAnalysis
        };
        break;
      case 'enhance_template':
        result = await enhanceTemplate(input.template);
        break;
      case 'validate_template':
        result = await validateTemplate(input.template);
        break;
      default:
        throw new Error(`Unknown command: ${mode}`);
    }

    process.stdout.write(JSON.stringify(result, null, 2));
  } catch (err: any) {
    process.stderr.write(`MCP Error: ${err.message}\n`);
    process.exit(1);
  }
}

main();
