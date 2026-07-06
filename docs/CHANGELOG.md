# Changelog


## Session: Receipt Preview Architecture

### Added

* Introduced a reusable `ReceiptDialog` component.
* Added receipt preview flow after a successful checkout.
* Added `CheckoutResult` as the domain result of a completed checkout.
* Added receipt dialog state (`receiptOpen`, `receiptData`) to the Sales page.

### Refactored

* Refactored `checkoutCart()` to return a `CheckoutResult` instead of `void`.
* Moved the Firestore `saleRef` outside the transaction so the generated sale ID can be returned.
* Refactored the receipt mapper:

  * Replaced `mapCartToReceipt()` with `mapCheckoutToReceipt()`.
  * Removed duplicate calculations for totals and change.
  * Removed generated receipt number and timestamp.
  * Receipt data now uses the actual `saleId` and `createdAt` from the checkout result.

### Architecture Improvements

Current checkout flow:

```text
Cart
    ↓
checkoutCart()
    ↓
CheckoutResult
    ↓
mapCheckoutToReceipt()
    ↓
ReceiptData
    ↓
ReceiptDialog
    ↓
Receipt
```

Responsibilities are now clearly separated:

* `checkout.ts` — Business logic and Firestore transaction.
* `checkout.types.ts` — Checkout domain model.
* `receipt/mapper.ts` — Converts checkout data into receipt data.
* `ReceiptDialog.tsx` — Reusable modal container.
* `Receipt.tsx` — Receipt presentation only.
* `page.tsx` — Coordinates application state.

### Tested

* Product checkout
* Inventory deduction
* Receipt preview opens after successful checkout
* Receipt dialog closes correctly
* Failed checkout does not open the dialog
* Cart resets after successful checkout

### Status

Receipt Preview feature is complete.

Next milestone:

* Sales History
* Receipt reprint
* Printing support (`print.ts`)


## Version 0.2.0 - POS Foundation

### Added

* Shopping cart
* Product picker component
* Cart component
* Order summary component
* Checkout helper using Firestore transactions
* Cash payment input
* Live change calculation
* Checkout validation
* Automatic inventory deduction
* Sales recording
* Modular Sales architecture

### Improved

* Refactored Sales page into reusable components
* Standardized inventory handling using `quantity`
* Cleaner POS interface
* Better checkout workflow

### Fixed

* Inventory field inconsistency (`stock` → `quantity`)
* Improved maintainability through component separation

# Changelog

## v0.3.0

### Added
- Inventory search
- Product editing
- Product deletion
- Stock status badges

### Improved
- Inventory UI
- Dashboard styling
- Sidebar consistency

### Fixed
- Dashboard alignment
- Product refresh after updates

---

## v0.2.0

### Added
- Dashboard
- Sidebar
- Topbar

---

## v0.1.0

### Added
- Firebase Authentication
- Project setup