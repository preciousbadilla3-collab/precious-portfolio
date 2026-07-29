PRECIOUS PORTFOLIO - MOBILE FIX PACKAGE

Main fixes included:
- Removed the horizontal mobile overflow that forced sideways sliding/unzooming.
- Replaced the crowded phone navbar with a compact logo + hamburger menu.
- Reworked the phone portfolio carousel into one complete vertical project card at a time.
- Replaced the unreliable embedded mobile PDF preview with a rendered resume image.
- Made the full resume preview image-based so it does not appear as a black PDF box.
- Rebuilt the phone chat as a viewport-safe panel and set the input to 16px to prevent browser auto-zoom.
- Prevented chat auto-scroll from moving the whole page.
- Reduced mobile blur, 3D, parallax, glow, and repeating animation work.
- Skipped the cinematic intro on touch/mobile devices and after it has been viewed once.
- Kept the richer desktop design intact.

Files added:
- src/MobileOptimizations.css
- public/resume-preview/page-1.png

Files updated:
- src/main.jsx
- src/App.jsx
- src/components/Navbar.jsx
- src/components/Projects.jsx
- src/components/Process.jsx
- src/components/FloatingChat.jsx

After replacing your local project:
1. Open the project folder in VS Code.
2. Run: npm run build
3. Test: npm run dev
4. Push the update:
   git add .
   git commit -m "Improve mobile layout and performance"
   git push

Vercel should automatically redeploy the same public link.
