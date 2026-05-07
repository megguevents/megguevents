# MeGGu Luxury Event Management Website

Cinematic luxury event management one-page website built with HTML, Tailwind CSS (CDN), GSAP animations, and premium black/gold visual direction.

## Live Deployment (GitHub Pages)

1. Create a new GitHub repository (example: `meggu-events`).
2. Push this project to `main` branch.
3. Enable GitHub Pages from `main` branch root.

Your site URL will be:

`https://YOUR_USERNAME.github.io/meggu-events/`

## Push Commands

Run these from this folder:

```powershell
git init
git add .
git commit -m "Initial website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/meggu-events.git
git push -u origin main
```

If `origin` already exists:

```powershell
git remote set-url origin https://github.com/YOUR_USERNAME/meggu-events.git
git push -u origin main
```

## Enable GitHub Pages

1. Open repo on GitHub.
2. Go to **Settings** > **Pages**.
3. Under **Build and deployment**:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/ (root)`
4. Click **Save**.

## Project Files

- `index.html`: Main page structure
- `styles.css`: Luxury styling and effects
- `main.js`: GSAP animation + form behaviors + WhatsApp submit
- `assets-profile.jpg`: Profile image

## Contact Form Behavior

- Preferred date requires calendar selection.
- Minimum date is 4 days from current date.
- Customer phone must match `+201XXXXXXXXX` format.
- Submit button opens WhatsApp with prefilled inquiry to `+201026455592`.
