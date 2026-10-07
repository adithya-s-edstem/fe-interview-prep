import type { PostDetail } from '../domain/PostDetail';
import styles from './PostArticle.module.css';

type PostArticleProps = {
  post: PostDetail;
};

export function PostArticle({ post }: PostArticleProps) {
  return (
    <article>
      <h1>{post.title}</h1>
      <p className={styles.body}>{post.body}</p>
      <ul aria-label="Tags" className={styles.tags}>
        {post.tags.map((tag) => (
          <li key={tag} className={styles.tag}>
            {tag}
          </li>
        ))}
      </ul>
      <p className={styles.stats}>
        <span>{post.views} views</span>
        <span>{post.reactions.likes} likes</span>
        <span>{post.reactions.dislikes} dislikes</span>
      </p>
    </article>
  );
}
