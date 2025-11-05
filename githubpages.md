```markdown
# ☁️ Cloudscape DevOps Glow

A sleek, animated DevOps portfolio built with **Vite**, **React**, **TypeScript**, **shadcn/ui**, and **Tailwind CSS**.  
🌐 **Live Site:** [https://vijayb-aiops.github.io/cloudscape-devops-glow/](https://vijayb-aiops.github.io/cloudscape-devops-glow/)

---

## 🚀 Deploy to GitHub Pages (via `docs/` folder)

This project deploys from the `docs/` folder on the `main` branch.

![Deploy Instructions](b56031a0-d2f7-4a6c-a395-5d5058fe9419.png)

1. Build the static site:
   npm run build

2. Copy the `dist/` output to `docs/`:
   rm -rf docs && cp -r dist docs

3. Commit and push:
   git add docs
   git commit -m "chore: update GitHub Pages build"
   git push origin main

4. Ensure GitHub Pages is configured:
   - Go to Settings → Pages
   - Set Branch: main, Folder: /docs
   - Save

---

## 🛠️ Development

git clone https://github.com/vijayb-aiops/cloudscape-devops-glow.git
cd cloudscape-devops-glow
npm install
npm run dev
```
