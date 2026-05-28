# Responsive Layout Rules

## Purpose

This document defines responsive layout rules for CRM Operations Platform.

The goal is to keep the product usable across desktop, laptop, tablet and smaller screens without redesigning the visual identity.

This document exists because layout stability is a product quality requirement before backend implementation.

---

# Current Phase

Frontend Responsiveness & Layout Stabilization

This is a stabilization sprint.

It should fix layout issues without adding new product features.

---

# Layout Philosophy

The interface should feel:

- premium
- operational
- stable
- readable
- usable at common viewport sizes

It should not feel:

- broken
- horizontally clipped
- dependent on very large screens
- difficult to navigate
- visually redesigned without purpose

---

# Global Layout Rules

Avoid global horizontal overflow.

The application shell should not force the entire page to scroll horizontally.

If a specific surface needs horizontal scroll, the scroll should be contained inside that surface.

Examples:

- Kanban board may scroll horizontally.
- The entire body should not scroll horizontally because of Kanban.
- Cards should not be cut off without an intentional scroll container.

---

# AppShell Rules

The AppShell should support:

- desktop layout with sidebar
- narrower desktop/laptop layout without broken content
- tablet-safe layout
- mobile-safe fallback

The sidebar should not force content to exceed the viewport.

Main content must use layout rules that allow shrinking:

- min-width: 0 where needed
- overflow control where needed
- flexible content containers

---

# Sidebar Rules

Desktop:

- sidebar may stay visible
- content should account for sidebar width

Tablet and smaller screens:

- sidebar should not break content width
- sidebar may collapse, become hidden, or become a compact navigation surface
- navigation must remain accessible

Do not redesign navigation completely during this sprint.

---

# Topbar Rules

Topbar should:

- remain usable on smaller widths
- avoid pushing content outside viewport
- keep primary actions accessible
- prevent theme controls/search/button groups from breaking layout

If needed, secondary actions can wrap, collapse or reduce spacing.

---

# Main Content Rules

Main content should:

- respect available viewport width
- avoid fixed widths that exceed container
- use max-width only when it does not create overflow
- use min-width: 0 inside grid/flex layouts
- preserve readable spacing

Avoid:

- w-screen inside nested layouts
- fixed pixel widths without overflow strategy
- nested grids that force viewport overflow
- layout containers that ignore sidebar width

---

# Card Grid Rules

Dashboard cards and workspace panels should:

- stack gracefully on smaller widths
- avoid being clipped
- preserve readable labels
- not require horizontal scroll unless intentionally designed

Use responsive grid behavior instead of fixed multi-column assumptions.

---

# Command Shortcut Rules

Floating shortcuts or command UI should:

- not cover critical content permanently
- stay within viewport
- adapt on smaller screens
- not create horizontal overflow

---

# Responsive Breakpoint Expectations

The product should be usable at:

- large desktop
- standard laptop
- tablet width
- narrow/mobile width

Mobile does not need to be perfect enterprise production UX yet.

But it must not be broken.

---

# What Not To Do

Do not:

- redesign the whole product
- change brand identity
- change visual theme
- add new features
- add backend
- add new routing model
- replace the AppShell entirely unless necessary
- introduce complex responsive framework abstractions
- create layout engines

---

# Validation Checklist

Validate:

- no unintended body-level horizontal scroll
- sidebar does not break content
- topbar remains usable
- dashboard cards do not overflow
- campaign list remains readable
- workspace remains usable
- kanban scroll is contained inside the board
- command shortcut does not block core actions

---

# Final Principle

Responsive layout should make the existing product stable.

It should not turn this sprint into a redesign.