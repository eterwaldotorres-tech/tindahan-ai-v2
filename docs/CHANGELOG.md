# Changelog
# Changelog

All notable changes to Tindahan AI are documented in this file.

---

## [Unreleased]

### Added

- Improved Dashboard loading and error handling.
- Added retry functionality when Dashboard data fails to load.
- Added Dashboard skeleton loading UI.
- Added Recent Sales section to the Dashboard.
- Added receipt viewing from recent Dashboard sales.
- Improved Sales History UI and functionality.
- Added loading states to Inventory.
- Added error handling and retry functionality to Inventory.
- Added saving states when adding or updating products.
- Added deleting states when removing products.
- Added improved empty states for Inventory search and product lists.
- Added accessible labels to Inventory search and action buttons.
- Added reusable ProductForm component.
- Added reusable ProductTable component.

### Changed

- Refactored Dashboard Firestore access into dedicated query functions.
- Refactored Dashboard calculations into reusable calculation utilities.
- Improved Dashboard component separation and maintainability.
- Improved Sales History integration with the reusable receipt system.
- Improved Inventory page architecture.
- Moved Inventory form UI into ProductForm.tsx.
- Moved Inventory table and search UI into ProductTable.tsx.
- Reused StockStatus.tsx inside ProductTable instead of duplicating stock status logic.
- Improved Inventory form labels and input accessibility.
- Improved button disabled states during save and delete operations.

### Refactored

#### Dashboard

Dashboard responsibilities are now separated into:

- `page.tsx` — state management and orchestration.
- `queries.ts` — Firestore data access.
- `calculations.ts` — Dashboard business calculations.
- `DashboardSkeleton.tsx` — loading UI.
- `RecentSales.tsx` — recent transaction display.

#### Inventory

Inventory responsibilities are now separated into:

- `page.tsx` — state management and CRUD orchestration.
- `ProductForm.tsx` — product add/edit form UI.
- `ProductTable.tsx` — product table and search UI.
- `StockStatus.tsx` — reusable inventory status display.
- `queries.ts` — Firestore access.
- `calculations.ts` — inventory business logic.

### Fixed

- Prevented duplicate Inventory form rendering during component extraction.
- Preserved stock status functionality while refactoring ProductTable.
- Preserved delete loading state after extracting ProductTable.
- Improved text visibility and contrast across Inventory UI components.
- Improved error recovery with retry buttons.

---

## Previous Features

### Reports Module

Completed reporting foundation including:

- Report period selector.
- Revenue summary cards.
- Transaction count.
- Items sold.
- Average transaction value.
- Sales trend chart using Recharts.
- Custom chart tooltip.
- Top selling products.
- Sales by day visualization.
- Inventory insights.
- Empty states for reports.
- Reports skeleton loading state.
- Reusable report calculations.
- Reusable report query functions.

### Dashboard

Completed Dashboard functionality including:

- Product count.
- Total sales count.
- Low stock count.
- Total revenue.
- Recent sales display.
- Dashboard loading states.
- Dashboard error states.
- Retry functionality.
- Receipt viewing.

### Inventory

Completed Inventory functionality including:

- Add product.
- Edit product.
- Delete product.
- Search products.
- Product quantity tracking.
- Low stock detection.
- Out of stock detection.
- Stock status indicators.
- Loading state.
- Error handling.
- Retry functionality.
- Save and delete loading states.

### Point of Sale

Completed POS functionality including:

- Product picker.
- Shopping cart.
- Cart summary.
- Cash payment handling.
- Automatic change calculation.
- Quick cash buttons.
- Exact amount functionality.
- Firestore transaction checkout.
- Automatic inventory deduction.
- Stock validation.
- Receipt generation.
- Receipt printing.

### Sales History

Completed Sales History functionality including:

- Transaction history.
- Sale records from Firestore.
- Receipt viewing.
- Reusable receipt mapping.
- Receipt printing.
- Sale item information.
- Transaction totals.
- Cash received.
- Change calculation.

### Authentication

Completed authentication functionality including:

- Google sign-in.
- Firebase Authentication integration.
- Protected application access.

---

## Technical Stack

Tindahan AI currently uses:

- Next.js 16
- React 19
- TypeScript
- Firebase Authentication
- Firebase Firestore
- Tailwind CSS
- Recharts
- React Icons
- Sonner notifications

---

## Development Philosophy

Tindahan AI follows these principles:

- Build features incrementally.
- Keep the application compiling after each change.
- Prefer modular architecture.
- Keep UI components focused on presentation.
- Move business logic into reusable utility modules.
- Keep Firestore access separated from UI components.
- Avoid unnecessary abstractions.
- Prefer production-quality code.
- Improve features without breaking existing functionality.
# Tindahan AI Changelog

## Reports Module — Sales Trend Chart

### Overview

This development session focused on completing the first interactive analytics visualization for the Reports module.

The existing reporting pipeline was already verified:

Firestore
↓
queries.ts
↓
ReportsPage
↓
filterSalesByDateRange()
├── calculateReportSummary()
└── getSalesTrendData()
↓
SalesTrendChart

The objective was to replace the temporary JSON output with a production-quality Recharts visualization while preserving the existing architecture.

---

## Added

### Recharts

Installed Recharts for analytics visualizations.

```bash
npm install recharts
```

---

### SalesTrendChart

Replaced the temporary JSON output with a responsive line chart.

Implemented:

- ResponsiveContainer
- LineChart
- CartesianGrid
- XAxis
- YAxis
- Tooltip
- Line

The chart consumes:

```ts
SalesTrendPoint[]
```

making it a purely presentational component.

No business logic or Firestore access was introduced into the chart.

---

### Currency Formatting

Added currency formatting using:

```ts
const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(value);
```

Applied to:

- Y-axis labels
- Tooltip values

This improves readability and aligns analytics with how store owners naturally interpret sales data.

---

### Chart Polish

Improved the visual quality of the chart by adding:

- Custom chart margins
- Softer grid styling
- Horizontal grid emphasis
- Active hover dot
- Smooth line animation

These changes improved readability without affecting the reporting pipeline.

---

## Architecture

The Reports architecture remains unchanged.

Firestore
↓
queries.ts
↓
ReportsPage
↓
filterSalesByDateRange()
├── calculateReportSummary()
└── getSalesTrendData()
↓
SalesTrendChart

Responsibilities remain clearly separated:

- Firestore access → queries.ts
- Business calculations → calculations.ts
- UI rendering → SalesTrendChart
- Page orchestration → ReportsPage

---

## Design System

Continued establishing the Tindahan AI analytics design language.

Current standards:

- rounded-2xl
- border-gray-200
- shadow-sm
- subtle hover interactions
- responsive layouts
- blue primary accent
- consistent typography
- clean KPI cards
- modern analytics presentation

---

## Progress Made

Completed:

- Verified the full reporting data pipeline.
- Installed Recharts.
- Replaced temporary JSON output with a responsive line chart.
- Added currency formatting using `Intl.NumberFormat`.
- Improved chart spacing with custom margins.
- Softened the chart grid for better readability.
- Added active hover dots.
- Added smooth line animation.
- Confirmed responsive behavior across the Reports page.

The Reports page now contains Tindahan AI's first interactive analytics visualization.

---

## Next Steps

Planned improvements:

- Build a reusable custom chart tooltip.
- Create shared chart formatting utilities.
- Add an empty chart state.
- Weekly trend aggregation.
- Monthly trend aggregation.
- Top Selling Products analytics.
- Sales by Day analytics.
- Inventory insights.
- AI-powered business insights.

## Sales History Receipt Viewer

### Added

- Added reusable receipt viewing from the Sales History module.
- Introduced `receipt/saleMapper.ts` to map `SaleDocument` into the shared `ReceiptData` model.
- Added "View Receipt" action to Sales History.
- Reused the existing `ReceiptDialog` and `Receipt` components for displaying historical receipts.

### Architecture

- Preserved separation between Checkout and Sales History.
- Kept the existing `receipt/mapper.ts` unchanged.
- Introduced a dedicated mapper for the Sales domain instead of expanding the Checkout mapper.
- Maintained `ReceiptData` as the shared presentation model for receipt rendering.

### Design Decisions

- Did **not** reuse `getTotalItems()` because it belongs to the Cart domain.
- Calculated `totalItems` inside `saleMapper.ts` using `Array.reduce()`, keeping Sales History independent from Checkout and Cart logic.
- Kept React components focused on rendering while placing transformation logic in reusable modules.

### Benefits

- Receipt UI can now be reused by multiple domains.
- Checkout and Sales History remain loosely coupled.
- Additional domains (Refunds, Returns, Archived Sales, etc.) can reuse the receipt system by providing their own mapper to `ReceiptData`.
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