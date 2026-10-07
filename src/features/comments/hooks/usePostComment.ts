import { useSendComment } from './useSendComment';

export function usePostComment(): (text: string) => void {
  const sendComment = useSendComment();
  return (text) => sendComment({ clientId: crypto.randomUUID(), text, createdAt: new Date().toISOString() });
}
