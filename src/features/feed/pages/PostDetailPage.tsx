import { Link, useParams } from 'react-router';
import { PostArticle } from '../components/PostArticle';
import { usePost } from '../hooks/usePost';

export function PostDetailPage() {
  const { postId } = useParams();
  const post = usePost(Number(postId));

  return (
    <>
      <Link to="/feed">Back to feed</Link>
      {post ? <PostArticle post={post} /> : <p role="status">Loading post…</p>}
    </>
  );
}
