# Development workflow

All website changes start on the `dev` branch.

1. Branch from `dev` for implementation when a separate working branch is useful.
2. Merge completed work back into `dev`.
3. Review and verify the Vercel preview deployment for `dev`.
4. Record the exact approved `dev` commit SHA.
5. Do not merge, promote, or deploy to `main` or production unless Manish explicitly says: **Approve for production.**
6. After approval, merge only the approved development commit into `main`.

The `main` branch is Vercel's production branch. All non-production branches produce preview deployments.
