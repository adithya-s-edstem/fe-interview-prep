export const columnIds = ['todo', 'inProgress', 'done'] as const;

export type ColumnId = (typeof columnIds)[number];
