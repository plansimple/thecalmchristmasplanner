# The Calm Christmas Planner sales page

## Goals
- Build the requested single-page, mobile-first product sales experience around the supplied planner and checkout brief.
- Focus page content on the actual provided 30-page planner, price, checkout link, accessibility, and conversion flow; do not invent reviews, a refund policy, or contact details.

## Page and interactions
- Replace the template home screen with a polished sales page and add unique page-specific search/social metadata.
- Add a real December 25 countdown, same-tab Gumroad purchase links, the uploaded cover, product sections, planner contents, interactive page previews, FAQ, and a mobile purchase bar that appears after the opening section.
- Use semantic, accessible controls, support reduced motion, and keep the design usable on mobile and desktop.
- Include the 2026 date on the existing December calendar description and clearly explain that the remaining planner pages are undated.

## Visual system
- Apply the supplied forest, sage, berry, gold, and cream palette with Lora headings and Lato body text. Reuse the uploaded cover and show accurate, close-up printable page previews derived from the uploaded PDF.

## Technical notes
- Implement the storefront in the existing TanStack Start `/` page; no extra routes, accounts, or carts.
- Add app-local visual styles and load the specified fonts through the root route head. Add the Gumroad overlay script while keeping checkout links functional if the overlay is unavailable.
- Add targeted automated tests for the live date countdown and post-Christmas behavior.
- Validate the page and shopping links in the browser, run the focused tests, review build diagnostics, and commit all request changes.