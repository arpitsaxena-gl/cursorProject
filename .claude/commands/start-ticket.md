# Start Ticket

Analyze a new ticket against Blitzy-generated code to determine what work has already been done and what gaps need to be filled.

## Usage

```
/start-ticket [context-folder]
```

- `context-folder`: Optional path to folder containing screenshots, designs, or additional context

## Process

---
🛑 **STOP HERE FIRST - READ THIS BEFORE DOING ANYTHING ELSE** 🛑

Before reading ANY files, doing ANY analysis, or proceeding to ANY numbered steps below, you MUST do this:

**Ask the user this question**: "Is the ticket description and requirements already in the context folder `[folder-path]`, or would you like to provide the ticket details now?"

Wait for their response. Do not proceed until they answer.

- If they say it's in the context folder → Go to step 2
- If they will provide details → Wait for them to give you the ticket description, requirements, acceptance criteria, and technical constraints

**DO NOT skip this. DO NOT assume. DO NOT proceed without asking.**

---

### 1. Gather Ticket Information

(This information should have been gathered in the STOP step above)

Document what the user provided:
- Ticket description/requirements
- Any acceptance criteria
- Technical constraints or notes

### 2. Review Additional Context

If a context folder is provided:
- Read all files in the folder (screenshots, markdown files, design specs, etc.)
- Analyze screenshots to understand UI requirements
- Extract additional requirements from context files
- Summarize key insights

### 3. Analyze Blitzy Implementation

Review `blitzy/documentation/Project Guide.md` to understand what Blitzy generated:

**Identify overlap:**
- Does Blitzy's work cover this ticket partially or fully?
- Which specific features/screens/components did Blitzy implement that relate to this ticket?
- What files did Blitzy generate that are relevant?

**Assess completion:**
- Is Blitzy's implementation complete for this ticket's requirements?
- What functionality is present vs. missing?
- Are there UI/UX differences from the requirements?

### 4. Identify Gaps

Categorize gaps in Blitzy's implementation:

**Known gaps** (documented in Project Guide):
- Gaps explicitly mentioned in Blitzy's documentation
- Features marked as TODO or incomplete
- Known limitations

**Unknown gaps** (discovered by analysis):
- Missing functionality not documented as a gap
- Incomplete implementations
- Edge cases not handled
- Integration points not wired up
- Missing validations or error handling
- UI polish or styling issues
- Incorrect/Hallucinated data transformations. (Doesn't match reference swift code)

### 5. Determine Work Required

Based on the analysis:

**If Blitzy fully implemented this:**
- Confirm what files/features already exist
- Note any testing or verification needed
- Suggest minimal additional work

**If Blitzy partially implemented this:**
- List what's already done (can be leveraged)
- List what needs to be added/completed
- Suggest integration approach

**If Blitzy did a mistake:**
- List where the mistake was made in the source code as a code snippet.
- List what the correct implementation should be and a reference to the reference/ios code snippet.
- Suggest changes to be made as a diff.

**If Blitzy didn't implement this:**
- Confirm this is net-new work
- Suggest similar patterns from Blitzy code to follow
- Note any Blitzy components that can be reused

## Output Format

### Ticket Requirements Summary
Concise restatement of what needs to be delivered.

### Context Analysis
Key insights from screenshots, designs, or additional context (if provided).

### Blitzy Implementation Analysis

#### What Blitzy Implemented
- **Feature/Screen**: {name}
  - Files: {list of generated files}
  - Functionality: {what it does}
  - Status: {complete/partial/incomplete}

#### Coverage Assessment
- **Fully covered**: {features that are done}
- **Partially covered**: {features that are started but incomplete}
- **Not covered**: {features that don't exist}

### Gap Analysis

#### Known Gaps (from Blitzy documentation)
1. **Gap**: {description}
   - Documented in: {section of Project Guide}
   - Impact on ticket: {how it affects this work}

#### Unknown Gaps (discovered)
1. **Gap**: {description}
   - Current state: {what exists}
   - Expected state: {what should exist}
   - Impact on ticket: {how it affects this work}

### Work Required

#### Can Leverage from Blitzy
- {Component/hook/screen}: {what it provides}
- {Component/hook/screen}: {what it provides}

#### Needs to be Built/Fixed
1. **Task**: {description}
   - Type: {new feature / bug fix / enhancement / integration}
   - Files: {files to create or modify}
   - Depends on: {Blitzy components to use}

2. **Task**: {description}
   - Type: {type}
   - Files: {files}
   - Depends on: {dependencies}

### Recommendations

**Approach**: {suggested implementation approach}

**Priority order**:
1. {highest priority task}
2. {next priority task}

**Risks/Considerations**:
- {potential issue or thing to watch out for}

---

**Next steps**: Review this analysis and let me know if you'd like to proceed with implementation or need any clarifications.