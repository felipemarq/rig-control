export type OccurrenceAction = {
  id: string;
  occurrenceId: string;
  title: string;
  dueDate: string;
  responsible: string;
  description: string;
  isFinished: boolean;
  createdAt: string;
  responsibleEmail: string;
  files: [] | { path: string }[];
};
