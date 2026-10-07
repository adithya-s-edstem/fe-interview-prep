import { useId } from 'react';
import { BackToTopButton } from '../components/BackToTopButton';
import { FeedStatusRow } from '../components/FeedStatusRow';
import { PostList } from '../components/PostList';
import { useBackToTop } from '../hooks/useBackToTop';
import { useFeed } from '../hooks/useFeed';
import { useLoadWhenNearBottom } from '../hooks/useLoadWhenNearBottom';
import { usePullToRefresh } from '../hooks/usePullToRefresh';

export function FeedPage() {
  const headingId = useId();
  const { posts, status, loadNextPage, retry, refresh } = useFeed();
  const bottomRef = useLoadWhenNearBottom({ loadedCount: posts.length, loadNextPage });
  const pullToRefreshHandlers = usePullToRefresh(refresh);
  const { topRef, isBackToTopVisible, scrollToTop } = useBackToTop();

  return (
    <section aria-labelledby={headingId} {...pullToRefreshHandlers}>
      <h1 id={headingId} ref={topRef}>
        Infinite Feed
      </h1>
      <PostList posts={posts} />
      <FeedStatusRow ref={bottomRef} status={status} onRetry={retry} />
      {isBackToTopVisible && <BackToTopButton onClick={scrollToTop} />}
    </section>
  );
}
