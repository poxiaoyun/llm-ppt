# llmgateway-ppt

This repository now has two explicit roles:

1. The repository root is the llmgateway example deck.
2. `.github/skills/xiaoshi-ppt-skill/` is the reusable template source and Copilot skill package.

## Use the Example Deck

- Open `index.html` directly in a browser.
- Edit `content/*.md` as the writing outline for the llmgateway deck.
- Keep repository-root slide layout changes limited to llmgateway-specific needs.

## Create a New Project

Use the starter script instead of copying root files by hand:

```bash
.github/skills/xiaoshi-ppt-skill/scripts/create-project.sh ~/Project/new-ppt \
  --brand-name "Northstar AI" \
  --deck-title "企业级 AI 平台方案" \
  --deck-subtitle "一句话价值主张" \
  --company-name "Northstar AI" \
  --presenter "姓名 / 职位"
```

The generated project includes a runnable starter deck, local skill copy, minimal content outline, and blueprint library.

## Install the Skill Globally

To make the skill available across repositories, install it into personal skill directories:

```bash
.github/skills/xiaoshi-ppt-skill/scripts/install-personal-skill.sh --target both
```

This syncs the skill to:

- `~/.copilot/skills/xiaoshi-ppt-skill`
- `~/.agents/skills/xiaoshi-ppt-skill`

## Maintenance Rule

- Shared template work starts in `.github/skills/xiaoshi-ppt-skill/`.
- Example-deck content work stays in the repository root.
- If a task changes both, update the skill first and then sync the minimum required changes into the example deck.