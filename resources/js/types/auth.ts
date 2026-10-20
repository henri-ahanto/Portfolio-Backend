export type User = {
    id: number;
    name: string;
    email: string;
    is_admin: boolean;
};

export type Auth = {
    user: User | null;
};
