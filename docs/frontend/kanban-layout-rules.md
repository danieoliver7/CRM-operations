# Kanban Layout Rules

## Purpose

This document defines layout rules for the Kanban view.

The Kanban board is allowed to have horizontal scrolling because workflow columns naturally exceed the viewport.

The key requirement is that the scroll must be intentional, contained and usable.

---

# Current Problem

The current Kanban can visually cut cards and columns when the viewport is not wide enough.

This is not acceptable for an operational workflow surface.

Users must be able to access every workflow column and every card.

---

# Kanban Philosophy

Kanban should feel:

- operational
- navigable
- horizontally scrollable when needed
- stable
- readable

It should not feel:

- clipped
- broken
- dependent on ultra-wide screens
- like hidden content is inaccessible

---

# Board Scroll Rule

The Kanban board should own its horizontal scroll.

Do not rely on the browser body horizontal scroll.

The intended behavior is:

```txt
Page stays stable
Kanban board scrolls horizontally
Columns remain accessible
Cards are not clipped
```

---

# Column Rules

Columns should:

- use a consistent minimum width
- not shrink below readable card width
- stay reachable through the board scroll container
- keep card content inside the column

Columns should not:

- force body-level horizontal scroll
- clip cards without an intentional scroll container
- depend on ultra-wide desktop widths

---

# Card Rules

Cards should:

- use the full width of their column
- avoid content pushing outside the card
- truncate long text when necessary
- remain fully clickable and visible

Cards should not:

- overflow outside the column
- be cut by parent containers
- require global horizontal scroll

---

# Page Rules

Kanban page controls, filters and metrics should remain responsive.

Only the board should scroll horizontally.

The surrounding page should remain stable.

---

# Final Principle

Kanban horizontal scroll is allowed.

Global app horizontal overflow is not.
