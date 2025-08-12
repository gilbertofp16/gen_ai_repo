# ✅ Template Review MCP Server Development Plan (Revised)

## Overview
Develop a reusable MCP server for use within cline that reviews, validates, and enhances LLM prompt templates according to defined best practices. The goal is to ensure prompt quality, improve outcomes, and enable consistent standards across multiple projects.

## Implementation Approach

### 1. Server Structure
- Initialize a new TypeScript MCP server using @modelcontextprotocol/create-server
- Target location: `/Users/Gilbert.Pochet/Documents/Cline/MCP/template-review-server`
- Use ES modules
- Stateless, synchronous, CLI-first design for universal use across cline projects

### 2. Core CLI Tools

#### analyze_template
- Purpose: Analyze structure, content, and quality of a prompt template
- Input: Template text and optional metadata (stdin, JSON)
- Output: JSON report with analysis summary and improvement suggestions

#### enhance_template
- Purpose: Automatically rewrite/improve prompt templates based on best practices
- Input: Template text
- Output: Enhanced template + explanation of changes (as patch or full diff)

#### validate_template
- Purpose: Check templates against configurable rules
- Input: Template text
- Output: Pass/fail report with violations list

### 3. Best Practices Coverage

#### Structure Rules
- Clear role assignment
- Separation of context, task, and response format
- Task specificity and constraints
- Basic error-handling or fallback expectations

#### Quality Checks
- Clarity and conciseness
- Instruction consistency
- Named parameters (e.g. {{customerName}})
- Avoid unnecessary nesting or vague language
- Optional: Format adherence (e.g. bullet points, sections)

### 4. Technical Design

#### Dependencies
```json
{
  "dependencies": {
    "@modelcontextprotocol/sdk": "latest",
    "zod": "^3.x",
    "typescript": "^5.x"
  },
  "devDependencies": {
    "eslint": "^8.x",
    "prettier": "^3.x",
    "jest": "^29.x"
  }
}
```

#### File Structure
```
template-review-server/
├── src/
│   ├── index.ts              # CLI entry: routes to tool by argv
│   ├── analyzers/
│   │   ├── structure.ts      # Analyzes prompt parts (role, context, etc.)
│   │   ├── content.ts        # Checks tone, conciseness, clarity
│   │   └── patterns.ts       # Detects anti-patterns or formatting issues
│   ├── enhancers/
│   │   ├── optimizer.ts      # Improves formatting and guidance
│   │   └── patcher.ts        # Returns diff or patch (optional)
│   ├── validators/
│   │   ├── rules.ts          # Core rule engine
│   │   └── schema.ts         # Zod schema for inputs
│   ├── config/
│   │   └── default-rules.json # Shared default rules
│   └── utils/
│       ├── parser.ts         # Extracts template tokens/structure
│       └── iostream.ts       # Handles CLI stdin/stdout I/O
└── tests/
    ├── unit/
    └── integration/
```

### 5. Testing Strategy

#### Unit Tests
- Token/variable extraction
- Rule engine
- Enhancement transformations
- Output diff generation (if used)

#### Integration Tests
- Full CLI simulation using sample inputs
- Cross-tool workflows (e.g., analyze → enhance → validate)
- Edge case templates

#### Fixtures
Real-world and synthetic template examples:
- Minimal valid prompts
- Overly verbose or vague prompts
- Missing structure markers (e.g., no role/task separation)

### 6. Success Criteria

#### Accuracy
- ≥90% correct issue detection
- ≥85% useful enhancement suggestions
- ≤5% false positives on validations

#### Performance
- Analysis: ≤2s
- Enhancement: ≤3s
- Validation: ≤1s

#### Usability
- Output is JSON by default, with optional plaintext summaries
- Suggestions are actionable, short, and clear
- Can be chained in shell scripts or cline workflows

### CLI Integration

#### MCP Server Config
```json
{
  "mcpServers": {
    "template-review": {
      "disabled": false,
      "autoApprove": [],
      "command": "node",
      "args": [
        "/Users/Gilbert.Pochet/Documents/Cline/MCP/template-review-server/dist/index.js",
        "analyze_template"
      ],
      "transportType": "stdio"
    }
  }
}
```

#### CLI Execution
Allow CLI routing via index.ts:

```typescript
const mode = process.argv[2];
const input = await readFromStdin();

switch (mode) {
  case 'analyze_template':
    process.stdout.write(JSON.stringify(analyzeTemplate(input)));
    break;
  case 'validate_template':
    process.stdout.write(JSON.stringify(validateTemplate(input)));
    break;
  case 'enhance_template':
    process.stdout.write(JSON.stringify(enhanceTemplate(input)));
    break;
  default:
    console.error("Invalid tool name");
    process.exit(1);
}
```

### Constraints & Assumptions

#### Constraints
- Works with any Cline-compatible text-based prompt templates
- No async operations or remote calls
- Must execute as part of synchronous cline command chains

#### Assumptions
- Templates follow a tokenized format (e.g., {{ variable }})
- Users have LLM/prompting context
- Templates are single-document, not conversational chains

### Implementation Steps

#### Day 1: Setup
- Initialize TypeScript project
- Add linting and Prettier
- Configure jest for testing
- Bootstrap CLI logic

#### Days 2–4: Core Feature Build
- Build template parser
- Implement analyzer and validator engines
- Create enhancement module
- Add rule config system

#### Days 5–6: Testing & Hardening
- Unit test each tool
- Create fixtures and golden tests
- Optimize startup time

#### Day 7: Finalization
- Add usage examples
- Write API + CLI docs
- Integrate with Cline
