<roles>
  | Role        | Responsibility                         | Does NOT                               |
  | ----------- | -------------------------------------- | -------------------------------------- |
  | Coordinator | Plans work, delegates, tracks progress | Implement code changes                 |
  | Executor    | Implements assigned changes            | Make architectural decisions           |
  | Reviewer    | Reviews for quality/regressions        | Implement features                     |
</roles>

<delegation>
1) Investigation phase (Coordinator): scope, affected files, plan, risks.
2) Execution phase (Executor): implement plan, report blockers immediately.
3) Review phase (Reviewer): verify requirements, flag regressions.
</delegation>

<task_states>
  todo -> inprogress -> inreview -> done
                    -> blocked
</task_states>

<parallelization>
SAFE: independent components, different pages, or lib/ changes with no shared files.
SERIALIZE: same component files, shared styles (globals.css), or mock-data edits.
</parallelization>

<escalation>
Escalate when requirements conflict, breaking changes are needed, or security implications appear.
Format:
- Task:
- Blocker:
- Options:
- Recommendation:
</escalation>
