# Tindahan AI Developer Journal

---

# Version 0.1 - Foundation

## Goal
Create the project and connect Firebase Authentication.

## Features Completed
- Next.js project
- Firebase setup
- Google Sign-In

## What I Learned
- Firebase configuration
- Environment variables
- Authentication flow

## Challenges
- Popup blocked errors
- Firebase configuration mistakes

## Solution
- Added popup handling
- Fixed Firebase configuration

## Reflection
Authentication looked difficult at first, but understanding the flow made everything else easier.

---

# Version 0.2 - Dashboard

## Goal
Build a live dashboard.

## Features Completed
- Dashboard cards
- Sidebar
- Topbar
- Live Firebase counts

## What I Learned
- React Icons
- Firestore queries
- Reusable components

## Challenges
- Card alignment
- Icon sizing
- Dashboard layout

## Solution
Created a reusable DashboardCard component.

## Reflection
This was the first page that felt like a real application.

---

# Version 0.3 - Inventory CRUD

## Goal
Create a complete inventory management module.

## Features Completed
- Add Product
- Search Products
- Edit Product
- Delete Product
- Stock Status badges

## What I Learned
- CRUD operations
- updateDoc()
- deleteDoc()
- Filtering data with React
- Managing editing state

## Challenges
- Organizing large files
- Replacing code safely
- Keeping the UI consistent

## Solution
Started replacing complete files for larger features instead of editing many small snippets.

## Reflection
The Inventory module now feels production-ready and is a solid foundation for the Sales module.

---

# Upcoming

## Version 0.4
Sales / POS

### Planned Features
- Product selection
- Shopping cart
- Checkout
- Inventory deduction
- Revenue updates

### Learning Goals
- Transactions
- Cart state
- Firestore writes
- Data consistency

# Development Learning Log

## Date

June 30, 2026

## Focus

Refactoring the Sales module into a modular Point of Sale (POS) system.

## What I Learned

* Breaking large React pages into reusable components makes the application easier to maintain.
* Firestore transactions are the correct approach for updating inventory and recording sales atomically.
* Separating business logic (checkout) from UI components keeps code cleaner.
* Consistent data models are important. Using a single inventory field (`quantity`) prevents bugs caused by mismatched property names.
* Building and testing features incrementally is more reliable than attempting one large implementation.

## Challenges

* Large React files became difficult to manage.
* Response length limits required a more modular development workflow.
* Identified and fixed inconsistencies between inventory fields.

## Result

Successfully transformed the Sales page from a single-product sales recorder into the foundation of a complete POS system with shopping cart functionality and cash payment support.

# Development Learnings

## Session: Receipt Preview Refactor

### 1. Prefer a Single Source of Truth

Business values such as totals, change, receipt number, and timestamps should be calculated once.

Avoid recalculating the same information in multiple layers.

Good:

```text
checkout.ts
    calculates values once
        ↓
CheckoutResult
        ↓
Receipt Mapper
        ↓
Receipt UI
```

Bad:

```text
checkout.ts
    calculates total

mapper.ts
    calculates total again

Receipt
    displays total
```

---

## 2. Mappers Should Transform, Not Calculate

A mapper exists to convert one model into another.

It should avoid business rules whenever possible.

Good example:

```text
CheckoutResult
    ↓
ReceiptData
```

instead of

```text
Cart
    ↓
ReceiptData
```

because the checkout has already determined the authoritative values.

---

## 3. Separate Business Logic from UI

Business layer:

* Firestore transaction
* Inventory validation
* Stock deduction
* Sale creation

UI layer:

* Dialog
* Receipt layout
* Buttons
* User interaction

Keeping these separate makes both easier to test and maintain.

---

## 4. Reusable Components Reduce Future Work

The receipt system is designed to be reused by:

* Checkout
* Sales History
* Receipt Reprint

without duplicating UI or business logic.

---

## 5. Build Incrementally

Each feature should leave the project in a working state.

Small, complete steps are easier to test, review, and debug than large rewrites.

---

## Key Takeaway

A good architecture is not about having more files.

It is about giving each file a single responsibility and allowing features to be reused without duplication.
# Learning Notes

## Feature

Reusable Receipt Viewer for Sales History

---

## Goal

Allow historical sales to be displayed using the same receipt UI that is already used after Checkout.

Instead of creating another receipt component, reuse the existing presentation layer.

---

## Existing Receipt Architecture

```
CheckoutResult
      │
      ▼
mapper.ts
      │
      ▼
ReceiptData
      │
      ▼
ReceiptDialog
      │
      ▼
Receipt
```

The receipt components are intentionally presentation-only.

They render a `ReceiptData` object and have no knowledge of Checkout.

---

## Problem

Sales History stores data as `SaleDocument`.

```
SaleDocument
```

This is a completely different model from `CheckoutResult`.

Trying to extend the existing mapper would couple two unrelated domains.

---

## Solution

Create a second mapper.

```
SaleDocument
      │
      ▼
saleMapper.ts
      │
      ▼
ReceiptData
      │
      ▼
ReceiptDialog
```

Each domain owns its own mapping into the shared presentation model.

---

## Why Not Modify `mapper.ts`?

`mapper.ts` belongs to the Checkout domain.

It should only know how Checkout data becomes a receipt.

Adding Sales History logic would violate the Single Responsibility Principle and introduce unnecessary coupling.

Instead:

- Checkout → `mapper.ts`
- Sales History → `saleMapper.ts`

Both produce the same output model.

---

## Why Not Reuse `getTotalItems()`?

`getTotalItems()` belongs to the Cart domain.

Although the calculation is identical, importing it into Sales History would create an unnecessary dependency.

Instead:

```ts
const totalItems = sale.items.reduce(
    (sum, item) => sum + item.quantity,
    0
);
```

This keeps the Sales domain self-contained.

---

## Separation of Concerns

UI Components

- Receipt
- ReceiptDialog

Responsibilities

- Rendering
- Layout
- Printing

Business Logic

- mapper.ts
- saleMapper.ts

Responsibilities

- Data transformation
- Mapping domain models
- Computing derived values

This keeps React components simple and easy to maintain.

---

## Final Architecture

```
Checkout
    │
    ▼
CheckoutResult
    │
mapper.ts
    │
    ▼
ReceiptData
    │
    ▼
Receipt UI
```

```
Sales History
     │
     ▼
SaleDocument
     │
saleMapper.ts
     │
     ▼
ReceiptData
     │
     ▼
Receipt UI
```

The receipt components remain completely reusable because they only depend on `ReceiptData`.

---

## Lessons Learned

- A shared UI does not require a shared domain model.
- Mapping is an effective boundary between domains.
- Keep transformation logic outside React components.
- Avoid sharing utilities across domains unless they truly represent shared business logic.
- Duplicate small, domain-specific calculations when it prevents tighter coupling.
- A stable presentation model (`ReceiptData`) makes UI reuse straightforward while allowing each feature to evolve independently.