import type { Post } from '../domain/Post';
import styles from './PostList.module.css';
import { PostListItem } from './PostListItem';

type PostListProps = {
  posts: Post[];
};

export function PostList({ posts }: PostListProps) {
  return (
    <ul aria-label="Posts" className={styles.list}>
      {posts.map((post) => (
        <PostListItem key={post.id} post={post} />
      ))}
    </ul>
  );
}
