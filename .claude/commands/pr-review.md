# Code Review

Perform a comprehensive code review of the current branch changes, focusing on:

## 1. Pattern Compliance (AGENTS.md)

Review all changes against patterns and rules in AGENTS.md:

### Critical Rules
- Check for any edits to `app/services/openapi/` (forbidden - auto-generated)
- Verify strict TypeScript compliance (no `any` types)
- Confirm all user-facing strings use translation keys from `app/i18n/keys.ts`
- Verify typed navigation params (no `any` or unsafe casts)

### Architecture Patterns
- **Data Fetching**: Confirm TanStack Query is used for all server state (not `useState`/`useEffect`)
- **ListView Pattern**: Verify list screens use the ListView component with proper DataSource adapters
- **Client-side Search**: Ensure search/filtering operates on cached data, not new API calls
- **Navigation**: Check for type-safe navigation with proper param list types

### File Organization
- Verify files are organized by module first, then by type
- Check components are in correct location (root `app/components/` for shared, `app/components/{module}/` for module-specific)
- Ensure tests are co-located with their subjects

### Code Style
- Check for path aliases (`@/`) instead of relative imports for multi-level navigation
- Check naming conventions (PascalCase, camelCase, UPPER_SNAKE_CASE)
- **Do NOT flag issues automatically handled by ESLint or Prettier** (e.g., import ordering, formatting, whitespace) - these are enforced by automated tooling

### Component Best Practices
- Verify functional components with hooks (no class components)
- Check for proper memoization (`useMemo`, `useCallback`, `memo`)
- Ensure `useEffect` is not used for data fetching
- Verify stable keys for list items (not array indices)

### TypeScript Best Practices
- Check for proper interface vs type usage
- Verify no `as any` assertions
- Check for proper null/undefined handling
- Ensure OpenAPI types are used (not recreated)

### Testing
- Verify tests are co-located with components/hooks
- Check tests follow Arrange-Act-Assert pattern
- Ensure tests cover edge cases (empty data, null values, etc.)
- **CRITICAL: Perform deep test quality analysis** - see "Test anti-patterns to avoid" section in AGENTS.md
- Look for smoke tests, coverage chasing, mock-testing-mock, redundant tests, and memoization tests
- Flag tests that only assert `UNSAFE_root.toBeTruthy()` or `expect(true).toBeTruthy()`

## 2. Blitzy Duplication Check

Compare current branch changes against Blitzy-generated code to identify duplication:

1. Read `blitzy/documentation/Project Guide.md` to understand what Blitzy has already implemented
2. Check if any modified/added files overlap with Blitzy's work
3. Identify any reimplementation of features Blitzy already completed
4. Suggest leveraging existing Blitzy code where applicable

## 3. Code Quality

- Check for proper error handling
- Verify accessibility props on interactive elements
- Look for performance issues (unnecessary re-renders, missing optimizations)
- Check for security issues or exposed sensitive data

## Output Format

Provide feedback in this structure:

### Summary
Brief overview of changes reviewed and overall assessment.

### Pattern Violations
List any violations of AGENTS.md patterns with:
- File and line number
- Pattern violated
- Suggested fix

### Blitzy Duplication
List any overlaps with Blitzy's work:
- What was duplicated
- Where Blitzy's implementation exists
- Recommendation (use Blitzy's code, merge approaches, etc.)

### Code Quality Issues
List any quality, performance, or security concerns.

### Test Quality Issues
**If test files are included in changes, perform deep test quality analysis:**
- List low-value tests (smoke tests, mock-testing-mock, coverage chasing)
- Identify redundant tests covering the same code paths
- Flag tests that assert nothing meaningful (`expect(true).toBeTruthy()`, `expect(UNSAFE_root).toBeTruthy()`)
- Note missing behavioral assertions
- Estimate percentage of valuable vs low-value tests
- Provide specific line numbers and test names for removal candidates

### Positive Observations
Highlight good patterns and practices followed.

### Recommendations
Prioritized list of changes to make.

---

Begin the review by running `git diff main...HEAD` to see all changes in the current branch.