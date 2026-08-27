# Local project screenshot migration

This removes the paid `thum.io` screenshot dependency.

## Apply

Copy this package into the root of the Portfolio repository, then run:

```bash
node scripts/migrate-local-project-screenshots.mjs
git add .
git commit -m "feat: capture and serve local project screenshots"
git push origin feature/self-learning-chatbot
```

The push triggers `.github/workflows/project-screenshots.yml`.

The workflow:
1. installs Chromium via Playwright
2. opens each production storefront
3. captures desktop + iPhone screenshots
4. converts images to optimized WebP
5. commits them into `public/projects/`

You can also manually trigger **Capture project screenshots** from GitHub Actions.

## Verify

After the workflow completes:

```bash
git pull origin feature/self-learning-chatbot
find public/projects -type f | sort
npm run dev
```

There should be no `image.thum.io` reference:

```bash
grep -R "image.thum.io" app scripts public || true
```

## Refresh screenshots later

Run the GitHub Action manually whenever a project design changes.
