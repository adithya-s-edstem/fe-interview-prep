import { FeedStatusRow } from '../components/FeedStatusRow';
import { PostList } from '../components/PostList';
import { useFeed } from '../hooks/useFeed';
import { useLoadWhenNearBottom } from '../hooks/useLoadWhenNearBottom';

export function FeedPage() {
  const { posts, status, loadNextPage, retry } = useFeed();
  const bottomRef = useLoadWhenNearBottom({ loadedCount: posts.length, loadNextPage });

  return (
    <section>
      <h1>Infinite Feed</h1>
      <PostList posts={posts} />
      <FeedStatusRow ref={bottomRef} status={status} onRetry={retry} />
    </section>
  );
}
