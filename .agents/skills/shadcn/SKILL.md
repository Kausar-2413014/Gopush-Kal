---
name: shadcn
description: Guidance for using shadcn/ui components in this Next.js project. Covers component patterns, installation, customization, and project-specific conventions.
---

# shadcn/ui

This project uses shadcn/ui v4 with the **radix-nova** style, **neutral** base color, and CSS variables enabled.

## Project Configuration

- **Style**: `radix-nova`
- **Base Color**: `neutral`
- **CSS Variables**: enabled
- **Icon Library**: `lucide`
- **RSC**: enabled
- **Aliases**: `@/components/ui` for UI components, `@/lib/utils` for utilities

## Adding New Components

Use the shadcn CLI to add components:

```bash
npx shadcn@latest add <component-name>
```

This installs the component to `components/ui/` and any required dependencies.

## Component Patterns

All shadcn/ui components in this project follow these conventions:

### File Structure
- Components live in `components/ui/`
- Use `cn()` from `@/lib/utils` for class merging
- Use `class-variance-authority` (cva) for variant definitions

### Component API
- Export both the component and its variant function (e.g., `Button` and `buttonVariants`)
- Use `data-slot` attribute for component identification
- Use `data-variant` and `data-size` for variant state
- Support `asChild` prop via `Slot.Root` from `radix-ui` for composition

### Styling
- Use Tailwind CSS utility classes
- Reference CSS variables for colors: `bg-primary`, `text-muted-foreground`, `border-border`, etc.
- Use `focus-visible:` for keyboard focus states
- Use `aria-*` selectors for state-based styling (e.g., `aria-invalid:border-destructive`)
- Use `[&_svg]` selectors for icon sizing within buttons

### Variant Examples (from Button)
```tsx
const variants = {
  default: "bg-primary text-primary-foreground hover:bg-primary/80",
  outline: "border-border bg-background hover:bg-muted",
  secondary: "bg-secondary text-secondary-foreground",
  ghost: "hover:bg-muted hover:text-foreground",
  destructive: "bg-destructive/10 text-destructive hover:bg-destructive/20",
  link: "text-primary underline-offset-4 hover:underline",
}
```

## Customizing Components

After adding a component, you may need to:

1. **Adjust colors**: Modify the CSS variables in `app/globals.css`
2. **Add variants**: Extend the `variants` object in the component file
3. **Change defaults**: Update `defaultVariants` in the cva definition

## Usage Pattern

```tsx
import { Button } from "@/components/ui/button"

<Button variant="outline" size="lg">
  Click me
</Button>
```

## Common Commands

```bash
# Add a component
npx shadcn@latest add dialog

# Add multiple components
npx shadcn@latest add dialog sheet popover

# List available components
npx shadcn@latest add --help
```
