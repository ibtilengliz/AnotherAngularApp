import { Commentaires } from './commentaires';
export interface Article {
    id: number;
    titre: string;
    contenu: string;
commentaires: Commentaires[];
 }
