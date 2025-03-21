export interface Task {
    id?: string;
    content?: string;
    completed?: string;
}

export interface Kategori {
    id?: string;
    baslik?: string;
}

export interface Note {
    id?: string;
    title?: string;
    content?: string;
    tasks?: Task[];
    image?: string | null;
    labels?: Kategori[];
    archived?: boolean;
    createdAt?: string;
    updatedAt?: string | null;
}
