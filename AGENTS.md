# Expo HAS CHANGED

Read the exact versioned docs at https://docs.expo.dev/versions/v54.0.0/ before writing any code.

# SmartDough Project Rules

## Tech Stack

- React Native
- Expo
- TypeScript
- Zustand
- React Navigation
- AsyncStorage

---

# Code Principles

- Follow Clean Code.
- Prefer composition over duplication.
- Keep code readable.
- Keep code maintainable.
- Keep files small.
- Avoid unnecessary abstraction.

---

# Folder Structure

src/

components/
hooks/
navigation/
screens/
store/
styles/
constants/
utils/
types/

Do not create new folders unless necessary.

---

# Components

Components should:

- Have a single responsibility.
- Be reusable.
- Avoid business logic.
- Receive data via props.
- Avoid unnecessary state.

Large screens should be split into components.

---

# Screens

Screens should:

- Render UI.
- Call hooks.
- Navigate.
- Avoid business logic.

Business logic belongs in hooks.

---

# Hooks

Hooks contain:

- filtering
- searching
- sorting
- statistics
- calculations

Hooks should return only what UI needs.

---

# Store

Zustand store should only contain:

- application state
- CRUD actions

Avoid:

- formatting
- filtering
- sorting
- UI state

Derived data belongs in hooks.

---

# Utils

Put reusable logic here.

Examples:

- formatCurrency()
- formatDate()
- sortTransactions()
- filterTransactions()

Avoid duplicated helper functions.

---

# Constants

Store:

- colors
- spacing
- typography
- sort options
- category constants

Avoid hardcoded values.

---

# Styles

Prefer centralized design tokens.

Examples:

colors.ts

spacing.ts

typography.ts

shadows.ts

---

# TypeScript

Never use:

any

Prefer:

interfaces
readonly
union types

Always type props.

---

# Performance

Prefer:

useMemo
useCallback
React.memo

Avoid unnecessary rerenders.

Never mutate arrays.

---

# Naming

Components

PascalCase

Hooks

useSomething

Utils

camelCase

Constants

UPPER_CASE

Interfaces

PascalCase

---

# UI Rules

Use:

16px spacing system

Rounded corners

Consistent shadows

Consistent typography

Primary color:

#2563eb

Background:

#f8fafc

Cards:

white

---

# State

UI State

local component

Business State

Zustand

Derived State

custom hooks

---

# Clean Code

Prefer:

Early return

Small functions

Reusable components

Readable variable names

Avoid:

Nested ternary

Magic numbers

Duplicated code

Huge files

---

# Refactoring

Always preserve functionality.

Improve:

readability

maintainability

performance

consistency

Never introduce breaking changes.

---

# Documentation

Whenever adding a new feature:

- Explain why.
- Explain architecture.
- Explain folder placement.