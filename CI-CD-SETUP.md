# Hamsalekha Portfolio CI/CD

## Source Repository
https://github.com/hamsalekhaeventpro/hamsalekha_portfolio

## Production Branch
master

## CI
GitHub Actions

## CI Steps
1. Checkout source code
2. Set up Node.js version 20
3. `npm ci` (Install exact dependencies)
4. `npm run lint` (ESLint)
5. `npm run build` (Next.js production build)

## CD
Netlify Git Integration

## Preview Workflow
Pull Request → Netlify Deploy Preview
(Netlify automatically provisions a preview URL for any PR raised against `master` to allow for visual QA before merging).

## Production Workflow
Merge to `master` → GitHub Actions CI validation → Netlify Production Deployment

## Environment Variables
The following variables are required in the Netlify production and deploy-preview environments:
- `RESEND_API_KEY`
- `ENQUIRY_TO_EMAIL`
- `ENQUIRY_FROM_EMAIL`
- `TURNSTILE_SECRET_KEY`
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- `NEXT_PUBLIC_SITE_URL`

*Note: `.env` files are correctly excluded from Git. Do not add these to GitHub Actions secrets since Netlify handles the deployment natively.*

## Branching Strategy
- `master`: Production branch. Always stable.
- `feature/*`: For new additions (e.g. `feature/glass-house-page`).
- `fix/*`: For bug fixes.
- `chore/*`: For maintenance (e.g. `chore/update-dependencies`).

## Rollback Strategy
To roll back a bad deployment:
1. Revert the bad commit locally or via GitHub (`git revert <commit-hash>`).
2. Push the revert to `master`.
3. GitHub Actions CI will validate the reverted code.
4. Netlify will automatically redeploy the restored state.

*Netlify also maintains previous deploys in its dashboard, allowing you to instantly "publish" a previous successful build in an emergency.*

## Manual Deployment
Not used for normal production releases. Deployments are triggered exclusively via Git pushes to `master`.
