# Main Promote Now — Production Push

Goal: promote current staging branch (which contains PRs #3, #4, #5, #6 merged) to main so the post goes live on www.soulinfinity.space immediately.

Saurabh has accepted the duplicate CTA visible bug. Will be fixed in a follow-up v6 PR after this promote completes.

Autonomous. Halt only on hard failures. Status doc: append to scripts/staging-and-main-promote-status.md (do not overwrite — append a new "Phase 5 — Main promote" section).

## Phase 5 — Main promote

1. Verify current staging branch state:
   - git fetch origin
   - git log origin/staging --oneline -8
   - Confirm staging contains the 4 merge commits from earlier today: f159a31 (PR #3), 52a239e (PR #4), f7521b9 (PR #5), ef6d7d3 (PR #6), plus the docs commits

2. Open a PR from staging to main:
   - gh pr create --base main --head staging --title "Promote: blog detail magazine redesign + first post live" --body "Promotes the blog detail page redesign stack (PR #3 hero/sidebar, PR #4 v2 full-bleed hero + Caveat + magazine intro, PR #5 v3 questions section, PR #6 v4 closing + FAQ + final CTA) from staging to main.

   Result: first blog post 'How to Find a Genuine Vedic Astrologer in Ahmedabad' goes live at https://www.soulinfinity.space/blog/finding-a-vedic-astrologer-in-ahmedabad with full magazine treatment.

   Known issue: duplicate CTA banner at bottom of post (old inline banner + new FinalCTA from ClosingSection). Will be fixed in v6 PR immediately after this promote."

3. Capture the new staging-to-main PR number and report.

4. Merge it: gh pr merge <new PR number> --merge --delete-branch=false

5. Verify main advanced:
   - git fetch origin
   - git log origin/main --oneline -3
   - Confirm the merge commit is on main

6. Wait for Vercel production build:
   - Sleep 90 seconds
   - Then poll https://www.soulinfinity.space/ for HTTP 200
   - If still building, sleep another 60 seconds and retry up to 5 times
   - If still not 200 after 5 minutes, STOP and report

7. Verify the post is live on production:
   - curl -I https://www.soulinfinity.space/blog/finding-a-vedic-astrologer-in-ahmedabad
   - Must return HTTP 200
   - Capture the response headers (especially x-vercel-cache, content-type)

8. Verify schemas are present in production HTML:
   - curl -s https://www.soulinfinity.space/blog/finding-a-vedic-astrologer-in-ahmedabad | grep -c '"@type":"BlogPosting"' must be ≥ 1
   - Same for "@type":"FAQPage" and "@type":"Person"

## Phase 5 status report

Append to scripts/staging-and-main-promote-status.md:

### Phase 5 — Main promote (executed [timestamp])
- Staging-to-main PR number + URL
- Merge commit hash on main
- Production deployment timestamp
- HTTP 200 verification for homepage and post URL
- Schema verification counts (BlogPosting, FAQPage, Person)
- Known issue carried into production: duplicate CTA banner at bottom of post (will be addressed in v6 PR)
- Production post URL: https://www.soulinfinity.space/blog/finding-a-vedic-astrologer-in-ahmedabad

## After Phase 5

STOP. Do not start v6 fix in the same execution. Wait for Saurabh to send the v6 brief separately.