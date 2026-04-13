# Copilot Instructions

- Treat `.github/skills/xiaoshi-ppt-skill/` as the source of truth for shared PPT template assets, starter generation, and reusable slide blueprints.
- Treat the repository root as the llmgateway example deck. Root `index.html`, `content/*.md`, and project-only page refinements are example-specific unless the task explicitly says to generalize them.
- When a request touches shared shell, shared CSS, shared JS, shared templates, or new-project scaffolding, update the skill directory first.
- If the same task also needs the example deck updated, port only the necessary subset back into the repository root after the skill-side change is complete.
- For new projects, prefer `/xiaoshi-ppt-skill` or `.github/skills/xiaoshi-ppt-skill/scripts/create-project.sh` instead of manually copying files from the repository root.
- Do not create a second starter source outside `.github/skills/xiaoshi-ppt-skill/`.