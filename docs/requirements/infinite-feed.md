# Q2 — Infinite Feed

Build a feed of posts that loads more as the user scrolls. Branch `feature/q2-feed`. Suggested time: 15 minutes.

## Requirements

- **Q2-R1 Paging** — Load posts from `https://dummyjson.com/posts`, 10 at a time.
- **Q2-R2 Auto-load** — Load the next page automatically when the user nears the bottom.
- **Q2-R3 No duplicates** — Scrolling fast must never load the same page twice or show duplicate posts.
- **Q2-R4 States** — Show loading, error (with retry) and "You've reached the end" states.
- **Q2-R5 Detail page** — Clicking a post opens its detail page.
- **Q2-R6 Scroll restoration** — Going back from the detail page returns the user to the same scroll position.

## Acceptance criteria

- **Q2-AC1** Each request asks for 10 posts (`limit=10`) with the correct offset for the page.
- **Q2-AC2** Reaching the bottom of the list triggers the next page without a click.
- **Q2-AC3** Scrolling quickly to the bottom several times produces no duplicate requests or posts (each page is
  requested at most once; each post id appears once in the list).
- **Q2-AC4** A loading indicator shows while a page is in flight.
- **Q2-AC5** A failed page shows an error with a retry control; retry requests that same page and continues the feed.
- **Q2-AC6** When all posts are loaded the feed shows "You've reached the end" and makes no further requests.
- **Q2-AC7** Clicking a post navigates to a detail route for that post.
- **Q2-AC8** Browser Back from the detail page restores the previous scroll position with the already-loaded posts.
- **Q2-AC9** At least one automated test.

## Optional

Not required; only after all 5 core questions are done.

- **Q2-O1** A "back to top" button.
- **Q2-O2** Pull-to-refresh.
