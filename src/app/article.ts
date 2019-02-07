import { Commentaires } from './commentaires';
export interface Article {
    id: number;
    title: string;
    body: string;
  comments: Commentaires[];
 }
