# My Portfolio

## 1. Edit your content
Open `content.js` and replace the placeholders: your name, projects, what you're learning, timeline, contact links.
Nothing else needs to change. To add a résumé, drop `resume.pdf` in this folder and set `resumeUrl: "resume.pdf"`.

## 2. Put it online (free) — pick one

### Option A: Netlify Drop (easiest, ~2 minutes)
1. Go to https://app.netlify.com/drop
2. Drag this whole `portfolio` folder onto the page.
3. Sign up (free) so the site stays up, then under **Site configuration → Change site name** pick something like `yourname.netlify.app`.
4. To update later: **Deploys → drag the folder again**.

### Option B: GitHub Pages (good if you want a GitHub profile too)
1. Create a free GitHub account, then a new **public** repository named `yourusername.github.io`.
2. Click **Add file → Upload files**, upload everything in this folder, commit.
3. After a minute your site is live at `https://yourusername.github.io`.

(Optional) Buy a custom domain like `yourname.com` (~$10/yr) and connect it in Netlify or GitHub Pages settings.

## 3. Connect Google Analytics
1. Go to https://analytics.google.com and sign in with your Google account.
2. **Admin → Create → Property** → name it "Portfolio", pick your timezone.
3. Choose **Web** as the platform, enter your live site URL (from step 2).
4. Copy the **Measurement ID** — it looks like `G-ABC123XYZ`.
5. In `content.js`, set:
   ```js
   const GA_MEASUREMENT_ID = "G-ABC123XYZ";
   ```
6. Re-upload the site. Open it, then check **Reports → Realtime** in Analytics — you should see yourself within a minute.

The site also sends click events (e.g. `cta_view_projects`, `project_code`, `contact_linkedin`) so you can see in **Reports → Engagement → Events** which projects and links people click.

> Tip: if visitors are in the EU/UK, consider adding a cookie-consent banner, since Google Analytics sets cookies.
