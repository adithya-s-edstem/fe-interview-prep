import { Link } from 'react-router';
import type { Post } from '../domain/Post';
import styles from './PostListItem.module.css';

type PostListItemProps = {
  post: Post;
};

export function PostListItem({ post }: PostListItemProps) {
  return (
    <li className={styles.item}>
      <article>
        <h2 className={styles.title}>
          <Link to={`/feed/${post.id}`} className={styles.link}>
            {post.title}
          </Link>
        </h2>
        <p className={styles.body}>{post.body}</p>
      </article>
    </li>
  );
}
