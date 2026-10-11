# GreenKart Storefront Test Plan

## Application Overview

Functional test plan for the GreenKart vegetables and fruits storefront at https://rahulshettyacademy.com/seleniumPractise/#/. Covers product discovery, cart quantities and totals, the Top Deals data table, promo codes, country/terms checkout, and order completion. Start each scenario from a fresh catalog state with an empty cart unless a test explicitly builds its own cart; use the default browser locale/date and avoid relying on fixed calendar dates.

## Test Scenarios

### 1. Catalog, Search, and Cart

**Seed:** `tests/seed.spec.ts`

#### 1.1. Catalog loads products and starts with an empty cart

**File:** `tests/catalog/catalog-basics.spec.ts`

**Steps:**
  1. Open https://rahulshettyacademy.com/seleniumPractise/#/ in a fresh browser state.
    - expect: The GreenKart catalog is displayed with product names, prices, quantity controls, and ADD TO CART buttons.
    - expect: The catalog contains the available products (31 were present during exploration).
    - expect: The cart summary shows Items: 0 and Price: 0; checkout is unavailable while the cart is empty.
  2. Scroll through the catalog to its final products and footer.
    - expect: Products remain usable through the end of the list and the footer is reachable without a broken or empty catalog state.

#### 1.2. Add products with selected quantities and verify cart calculations

**File:** `tests/catalog/product-quantity-cart.spec.ts`

**Steps:**
  1. From a fresh catalog, increase Brocolli - 1 Kg from quantity 1 to 2 using its plus control, then add it to the cart.
    - expect: The selected quantity is reflected in the cart.
    - expect: The header item count is 1 product line and the price is ₹240 (2 × ₹120).
  2. Add one Tomato - 1 Kg at its default quantity, then open the cart preview.
    - expect: The cart preview lists Brocolli and Tomato with the correct quantities and unit prices.
    - expect: The header item count is 2 product lines and the total price is ₹256 (₹240 + ₹16).
  3. Use a minus control to reduce a selected quantity and check its value before adding another product.
    - expect: Quantity changes by one per step and the displayed cart totals stay consistent with the quantity actually added.

#### 1.3. Remove cart items and return to the empty-cart state

**File:** `tests/catalog/cart-removal.spec.ts`

**Steps:**
  1. From a fresh catalog, add two different products and open the cart preview.
    - expect: Both products are listed and cart item count and total equal the sum of the selected quantities and prices.
  2. Remove one product using its remove (×) control.
    - expect: Only the selected product is removed and the cart count and total recalculate correctly.
  3. Remove the last product and inspect the cart and checkout control.
    - expect: The cart returns to zero items and zero price.
    - expect: Checkout is disabled or otherwise cannot proceed with an empty cart.

#### 1.4. Search matching products and recover from no results

**File:** `tests/catalog/product-search.spec.ts`

**Steps:**
  1. From a fresh catalog, enter "apple" in Search for Vegetables and Fruits.
    - expect: The catalog filters to the matching Apple - 1 Kg product without requiring a page reload.
  2. Replace the query with a term that cannot match a product, such as "zzzznotfood".
    - expect: A clear no-products-matched message is shown.
    - expect: No catalog product is presented as a match.
  3. Clear the search field.
    - expect: The full product catalog is restored and the cart state remains unchanged.

### 2. Top Deals

**Seed:** `tests/seed.spec.ts`

#### 2.1. Search, sort, resize, and paginate the Top Deals table

**File:** `tests/offers/table-controls.spec.ts`

**Steps:**
  1. Open the Top Deals link from a fresh storefront (or navigate to https://rahulshettyacademy.com/seleniumPractise/#/offers).
    - expect: The offers table displays Veg/fruit name, Price, and Discount price columns.
    - expect: The page-size control offers 5, 10, and 20 rows; initial view shows 5 rows and pagination controls.
  2. Change page size to 10, then use Next and Previous; also try First and Last where enabled.
    - expect: The table shows up to the selected number of rows (the final page may contain fewer).
    - expect: The active page updates and the correct rows are displayed.
    - expect: First/Previous are unavailable on the first page and Next/Last are unavailable on the last page.
  3. Activate the Price column header twice, then activate another sortable column.
    - expect: The table announces the active sort order and the row values sort in ascending then descending order as the header is toggled.
    - expect: Sorting another column updates the active sort indicator and displayed ordering.
  4. Search for an offer name known to be in the table, then enter a query with no matches and clear the search.
    - expect: Matching rows are filtered by the search query.
    - expect: An empty-result state is clear when no rows match.
    - expect: Clearing the query restores the offer rows and valid pagination.

#### 2.2. Choose and clear a delivery date

**File:** `tests/offers/delivery-date.spec.ts`

**Steps:**
  1. Open Top Deals and note the date displayed in the Delivery Date control.
    - expect: The date control displays a valid date using the browser's current date context, not a hard-coded test date.
  2. Open the calendar, navigate between months, and choose an available date.
    - expect: The selected day is reflected in the month/day/year fields and the calendar closes or updates consistently.
  3. Use the date control's clear button, then reopen the calendar.
    - expect: The selected date is cleared from the input fields.
    - expect: The calendar remains usable after clearing.

### 3. Checkout and Order Completion

**Seed:** `tests/seed.spec.ts`

#### 3.1. Apply a valid promo code and verify the discounted total

**File:** `tests/checkout/promo-code.spec.ts`

**Steps:**
  1. From a fresh catalog, add Brocolli - 1 Kg and Tomato - 1 Kg at quantity 1, open the cart, and proceed to checkout.
    - expect: The checkout summary contains both items, the item count is 2, and the total amount is ₹136.
  2. Enter "rahulshettyacademy" in Enter promo code and click Apply; wait for the application result.
    - expect: The page displays "Code applied ..!".
    - expect: Discount is 10% and Total After Discount is 90% of the order total (₹122.4 for this cart).
    - expect: Item rows and the pre-discount amount remain unchanged.

#### 3.2. Reject an invalid promo code without changing the order total

**File:** `tests/checkout/invalid-promo-code.spec.ts`

**Steps:**
  1. From a fresh catalog, add one or more products, open checkout, and record the displayed amount.
    - expect: The order summary and initial discount are displayed correctly.
  2. Enter "NOT-A-VALID-CODE" in the promo field and click Apply; wait for validation to finish.
    - expect: The page displays "Invalid code ..!".
    - expect: The discount remains 0% and the total after discount remains equal to the original total.
    - expect: The cart items and quantities are unchanged.

#### 3.3. Require terms acceptance and complete an order

**File:** `tests/checkout/terms-and-order.spec.ts`

**Steps:**
  1. From a fresh catalog, add a product and proceed through the cart to Place Order.
    - expect: The country step is displayed with a country selector, an unchecked Terms & Conditions checkbox, a Terms & Conditions link, and a Proceed button.
  2. Leave the checkbox unchecked and click Proceed.
    - expect: The page stays on the country step and displays the terms-required validation message (observed: "Please accept Terms & Conditions - Required").
  3. Select India, check Terms & Conditions, and click Proceed.
    - expect: The app returns to the catalog route.
    - expect: The cart is cleared and the header shows zero items and zero price.

#### 3.4. Confirm behavior when no country is selected

**File:** `tests/checkout/country-requirement-exploration.spec.ts`

**Steps:**
  1. From a fresh checkout country step, leave the selector at Select, check Terms & Conditions, and click Proceed.
    - expect: Record whether the app blocks the transition or returns to the catalog. During exploration, the app proceeded without a country selection once terms were accepted; confirm whether this remains the intended behavior.
    - expect: If country selection is required by product requirements, the app should remain on the country step and provide a country-required message; otherwise document that only terms acceptance is enforced.
