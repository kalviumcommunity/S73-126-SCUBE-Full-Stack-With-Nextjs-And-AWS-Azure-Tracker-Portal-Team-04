## Code Review Checklist

Before approving a pull request, reviewers should ensure:

- Code follows naming conventions and project structure
- Feature works as expected when tested locally
- No console errors or warnings
- ESLint and Prettier checks pass
- Code is readable and well-documented
- No sensitive data (keys, secrets) is exposed
- Changes are scoped only to the PR purpose

## Collaboration Workflow

### Branching Strategy
We follow a structured branching convention:
- feature/<feature-name>
- fix/<bug-name>
- chore/<task-name>
- docs/<update-name>

### Pull Request Process
All changes must go through pull requests using a standardized PR template.

### Code Review Guidelines
Every PR is reviewed using a shared checklist to ensure code quality and security.

### Branch Protection
The main branch is protected to prevent direct pushes and enforce review and CI checks.

### Reflection
This workflow improves collaboration, prevents accidental bugs, enforces quality checks, and ensures consistent code delivery.
