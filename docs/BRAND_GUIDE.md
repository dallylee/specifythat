# SpecifyThat Brand Guide

## Overview
This brand refresh creates a more **premium, confident, and developer-focused** identity that matches the logo's sophisticated navy color and the app's positioning as providing "top 0.1% thinking."

---

## Color Palette

### Primary Colors (From Logo)
- **Navy Primary**: `#0A2540` - Deep, trustworthy navy (main text, headings)
- **Navy Deep**: `#061829` - Darker variant (code blocks, accents)
- **Blue Accent**: `#1E4D8B` - Rich blue (gradients, secondary elements)
- **Blue Bright**: `#3B82F6` - Vibrant blue (CTAs, highlights)

### Secondary Colors
- **Purple AI**: `#7C3AED` - For AI-related features ("I don't know" button, AI suggestions)
- **Emerald**: `#059669` - Success states
- **Emerald Light**: `#10B981` - Lighter success variant

### Neutrals
- Warmer grays (#FAFAFA → #171717) for better readability
- White backgrounds with subtle colored gradients

---

## Typography

### Fonts
- **Primary**: Geist Sans (Next.js default, but with bolder weights)
  - Weights used: 400, 500, 600, 700, 800
  - Better font loading with `display: "swap"`
  
- **Monospace**: Geist Mono (for code blocks, technical elements)
  - Weights used: 400, 500, 600, 700

### Typography Scale
- **Hero Headlines**: 5xl-7xl (text-5xl to text-7xl)
- **Section Headlines**: 3xl-4xl (text-3xl to text-4xl)
- **Body Large**: xl-2xl (text-xl to text-2xl)
- **Body**: base-lg (text-base to text-lg)

### Typography Treatment
- **Font weights**: Bold (700) to Extra Bold (800) for headlines
- **Letter spacing**: Tight tracking (-0.025em) for headlines
- **Line height**: Tighter (1.2) for headlines, relaxed (1.5-1.75) for body

---

## Visual Style

### Rounded Corners
- Small elements: `rounded-xl` (12px)
- Cards/buttons: `rounded-2xl` (16px)
- Large containers: `rounded-3xl` (24px)

### Shadows
- Subtle elevation: `shadow-lg shadow-gray-200/50`
- Colored shadows on CTAs: `shadow-xl shadow-blue-500/30`
- Dramatic shadows: `shadow-2xl`

### Gradients
- **Primary gradient**: `from-[#1E4D8B] to-[#3B82F6]` (blue gradient for CTAs)
- **Dark gradient**: `from-[#0A2540] to-[#1E4D8B]` (navy gradient for sections)
- **Purple gradient**: `from-purple-500 to-purple-600` (AI features)
- **Emerald gradient**: `from-emerald-500 to-emerald-600` (success states)
- **Background gradient**: `from-gray-50 via-white to-blue-50/30` (page backgrounds)

### Borders
- Thicker borders: `border-2` instead of `border`
- Subtle colors: `border-gray-100` or `border-gray-200`
- Colored accents: `border-blue-200`, `border-purple-300`

---

## Component Patterns

### Buttons

#### Primary CTA
```css
bg-gradient-to-r from-[#1E4D8B] to-[#3B82F6]
text-white rounded-2xl font-bold
hover:shadow-2xl hover:shadow-blue-500/30 hover:-translate-y-0.5
```

#### Secondary Button
```css
text-[#0A2540] border-2 border-gray-300 rounded-2xl font-bold
hover:bg-gray-50 hover:border-gray-400
```

#### AI Feature Button
```css
bg-gradient-to-r from-purple-500 to-purple-600
text-white rounded-xl font-bold
hover:shadow-xl hover:shadow-purple-500/30
```

### Cards
```css
bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100
p-8 md:p-10
```

### Input Fields
```css
border-2 border-gray-200 rounded-xl
focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6]
px-5 py-4 font-medium
```

### Step Indicators
```css
w-16 h-16 rounded-2xl
bg-gradient-to-br from-blue-500 to-blue-600
shadow-lg shadow-blue-500/25
group-hover:scale-110
```

---

## Micro-interactions

### Hover Effects
- **Buttons**: `-translate-y-0.5` (lift up slightly)
- **Cards**: `scale-110` on step indicators
- **Text**: Color transitions from gray to navy primary

### Transitions
- Duration: `200ms` for most interactions
- Easing: `cubic-bezier(0.4, 0, 0.2, 1)` (default)
- Properties: color, background-color, border-color, transform, shadow

### Animations
- **Arrow on hover**: `translate-x-1` (slide right on CTA arrows)
- **Loading dots**: Staggered bounce animation
- **Progress bar**: 500ms ease-out transition

---

## Key Changes from Original

### Before
- Generic bright blue (#2563eb)
- Thin rounded corners (rounded-lg)
- Light shadows
- Regular font weights
- Plain borders
- Standard spacing

### After
- Sophisticated navy (#0A2540) + rich blue (#1E4D8B)
- Bold rounded corners (rounded-2xl, rounded-3xl)
- Dramatic colored shadows
- Bold to extra-bold font weights
- Thicker, subtler borders
- More generous spacing
- Gradient backgrounds and buttons
- Micro-interactions and animations

---

## Accessibility Notes

- Navy primary (#0A2540) maintains WCAG AAA contrast on white
- Blue bright (#3B82F6) on white meets WCAG AA for large text
- Font sizes are generous (base 16px+)
- Interactive elements have visible hover/focus states
- Semantic HTML maintained
- Color is not the only indicator (text labels + icons)

---

## Usage Guidelines

### Do's
✅ Use navy (#0A2540) for headlines and primary text
✅ Use gradients for CTAs to create visual hierarchy
✅ Add colored shadows to elevated elements
✅ Use bold font weights (700-800) for emphasis
✅ Include hover animations on interactive elements
✅ Use purple gradients for AI-specific features

### Don'ts
❌ Don't use the old bright blue (#2563eb)
❌ Don't use thin borders (border instead of border-2)
❌ Don't use small rounded corners (rounded-lg) on major elements
❌ Don't use regular font weights for headlines
❌ Don't mix the old gray (#6B7280) with new navy
❌ Don't create buttons without hover effects

---

## File Reference

All brand changes implemented in:
- `src/app/globals.css` - CSS variables, typography, transitions
- `src/app/layout.tsx` - Font configuration, metadata
- `src/app/page.tsx` - Homepage styling
- `src/app/interview/page.tsx` - Interview flow styling
- `src/components/QuestionCard.tsx` - Question display
- `src/components/AnswerInput.tsx` - Answer input form
- `src/components/ProgressBar.tsx` - Progress indicator
- `src/components/SpecDisplay.tsx` - Spec output display
- `src/components/LoadingSpinner.tsx` - Loading states
