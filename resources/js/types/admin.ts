import type { Auth } from './auth';

export type Flash = {
    success: string | null;
    error: string | null;
};

export type AdminShared = {
    unreadMessages: number;
};

export type SharedData = {
    name: string;
    siteUrl: string;
    auth: Auth;
    flash: Flash;
    admin: AdminShared;
    [key: string]: unknown;
};

export type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

export type Paginated<T> = {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number | null;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number | null;
    total: number;
};

export type Accent = 'python' | 'laravel' | 'php' | 'yellow';

export type SkillIcon =
    | 'palette'
    | 'code'
    | 'layers'
    | 'brain'
    | 'database'
    | 'boxes';

export type TimelineType = 'work' | 'education';

export type Profile = {
    id: number;
    name: string;
    first_name: string;
    last_name: string;
    handle: string;
    role: string;
    roles: string[];
    tagline: string;
    location: string;
    email: string;
    phones: string[];
    availability: string;
    bio: string[];
    links: {
        github: string | null;
        youtube: string | null;
        portfolio: string | null;
        cv: string | null;
    };
    languages: string[];
    stats: {
        value: number;
        suffix: string | null;
        label: string;
    }[];
    diplomas: {
        year: string;
        title: string;
        place: string;
    }[];
    created_at: string;
    updated_at: string;
};

export type Project = {
    id: number;
    title: string;
    slug: string;
    description: string;
    tags: string[];
    kind: string;
    href: string | null;
    accent: Accent;
    snippet: string;
    sort_order: number;
    published: boolean;
    created_at: string;
    updated_at: string;
};

export type SkillCategory = {
    id: number;
    title: string;
    icon: SkillIcon;
    accent: Accent;
    skills: string[];
    sort_order: number;
    published: boolean;
    created_at: string;
    updated_at: string;
};

export type TimelineItem = {
    id: number;
    date: string;
    title: string;
    place: string;
    description: string | null;
    type: TimelineType;
    current: boolean;
    sort_order: number;
    published: boolean;
    created_at: string;
    updated_at: string;
};

export type ContactMessage = {
    id: number;
    name: string;
    email: string;
    message: string;
    ip_address: string | null;
    user_agent: string | null;
    read_at: string | null;
    created_at: string;
    updated_at: string;
};

export type DashboardStats = {
    projects: { total: number; published: number };
    skills: { total: number; published: number };
    timeline: { total: number; published: number };
    messages: { total: number; unread: number };
};
