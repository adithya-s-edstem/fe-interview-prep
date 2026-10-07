export type CommentContent = {
  clientId: string;
  text: string;
  createdAt: string;
};

export type CommentStatus = 'queued' | 'sending' | 'sent' | 'failed';

export type ThreadComment = {
  content: CommentContent;
  status: CommentStatus;
};

export type SendAttempt = {
  content: CommentContent;
  status: 'idle' | 'pending' | 'success' | 'error';
  isPaused: boolean;
};

export type EditedTextByClientId = Readonly<Record<string, string>>;
