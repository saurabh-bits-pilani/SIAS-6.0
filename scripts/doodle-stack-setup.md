# Doodle Stack Setup — Claude Code Brief

## Goal
Install framer-motion and vite-plugin-svgr, wire svgr into vite.config.ts,
create the doodle component folder, and build 4 starter doodle components.

---

## Step 1 — Install Packages

```bash
npm install framer-motion
npm install vite-plugin-svgr
```

---

## Step 2 — Wire vite-plugin-svgr into vite.config.ts

Open `vite.config.ts`. Add the svgr import and plugin:

```ts
import svgr from 'vite-plugin-svgr'
```

Find the `plugins: []` array and add `svgr()` after the existing `react()` plugin:

```ts
plugins: [
  react(),
  svgr(),  // add this line only — do not remove or reorder existing plugins
],
```

Do not change anything else in vite.config.ts.

---

## Step 3 — Create Folder Structure

```bash
mkdir -p src/components/doodles
mkdir -p src/assets/doodles
```

---

## Step 4 — Create 4 Starter Doodle Components

Create each file exactly as specified below.
No extra imports. No changes to existing files.

### src/components/doodles/HighlightStroke.tsx
```tsx
import { RoughNotation } from 'react-rough-notation'

interface Props {
  children: React.ReactNode
  color?: string
  show?: boolean
}

export default function HighlightStroke({
  children,
  color = '#C9A84C',
  show = true,
}: Props) {
  return (
    <RoughNotation type="highlight" color={color} show={show} animationDelay={300}>
      {children}
    </RoughNotation>
  )
}
```

### src/components/doodles/UnderlineScribble.tsx
```tsx
import { RoughNotation } from 'react-rough-notation'

interface Props {
  children: React.ReactNode
  color?: string
  show?: boolean
}

export default function UnderlineScribble({
  children,
  color = '#C9A84C',
  show = true,
}: Props) {
  return (
    <RoughNotation
      type="underline"
      color={color}
      show={show}
      strokeWidth={2}
      animationDelay={400}
    >
      {children}
    </RoughNotation>
  )
}
```

### src/components/doodles/CircleCallout.tsx
```tsx
import { RoughNotation } from 'react-rough-notation'

interface Props {
  children: React.ReactNode
  color?: string
  show?: boolean
}

export default function CircleCallout({
  children,
  color = '#C9A84C',
  show = true,
}: Props) {
  return (
    <RoughNotation
      type="circle"
      color={color}
      show={show}
      strokeWidth={2}
      animationDelay={500}
    >
      {children}
    </RoughNotation>
  )
}
```

### src/components/doodles/CornerSpark.tsx
```tsx
export default function CornerSpark({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M16 2 L17.5 14 L28 8 L18.5 16 L28 24 L17.5 18 L16 30 L14.5 18 L4 24 L13.5 16 L4 8 L14.5 14 Z"
        fill="#C9A84C"
        opacity="0.8"
      />
    </svg>
  )
}
```

---

## Step 5 — Validation

```bash
npm run build
npm run build:prerender
```

Both must pass zero errors and 53 prerendered routes.

Also verify:
```bash
grep -n "fetchPriority" src/pages/planets/SunPage.tsx  # must return empty
grep -n "—" src/pages/planets/SunPage.tsx              # must return empty
```

---

## Step 6 — Commit and Push

```bash
git add vite.config.ts package.json package-lock.json src/components/doodles/ src/assets/doodles/
git commit -m "chore: install framer-motion, vite-plugin-svgr, create doodle component starters"
git push origin main
```

Push directly to main. No new branch needed for this chore.

---

## What is NOT in scope

- Do not use any of these components yet in any page file
- Do not modify SunPage.tsx or any other page
- Do not install any other packages
- Do not create more than these 4 components

---

## Next Step (after this is merged and green)

The first use will be in SunPage.tsx hero section:
- Wrap "soul" with HighlightStroke
- Wrap "vitality" with UnderlineScribble  
- Wrap "purpose" with CircleCallout

That is a separate brief. Do not do it now.
