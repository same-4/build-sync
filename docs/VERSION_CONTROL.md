# VERSION CONTROL

## Usage
- Git used
- Main branch stable

## Feature branches:
- `feature/calculation-engine`
- `feature/auth-system`

## Practices:
- Descriptive commit messages
- Weekly merge reviews

---

## 🔀 Trunk-Based Principles & DevOps Hygiene

### Branching Architecture
Engineering velocity and code quality are intrinsically tied to Git management. The described structure utilizes a rudimentary Git Flow. To maintain the `Main` branch's stability, standard professional environments employ **Trunk-Based Development** variants combined with strict **Pull Request (PR)** lifecycle rules.
- **Protection Rules:** Direct commits to `main` are cryptographically barred. Every feature branch requires approval reviews, resolving code review comments, and successfully passing automated checks.
- **Branch Naming Standardizations:** To augment build tooling, branches are frequently named predictably, tying into ticketing metrics (e.g., `feat/ISSUE-142-calc-engine` or `hotfix/calc-zero-bug`), streamlining semantic versioning releases.

### Pipeline Integration Automation
"Weekly merge reviews" is a dangerous manual bottleneck prone to human fatigue. Industry standards inject Continuous Integration (CI). We introduce **GitHub Actions** or **Jenkins CI** to fire automatically on active `feature/*` commits:
1. **Lint/Format Pass (Prettier/ESLint):** Rejects non-conformant code, eliminating bikeshedding during code review.
2. **Build and Test Trigger:** Recommends running the Jest testing suites.
If these pipelines fail, the PR is physically blocked from merging, maintaining absolute assurance over the main branch's artifact stability.
