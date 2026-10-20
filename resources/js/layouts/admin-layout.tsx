import { Head, Link, router, usePage } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { initials } from '@/lib/format';
import type { SharedData } from '@/types';
import {
    CloseIcon,
    DashboardIcon,
    ExternalLinkIcon,
    FolderIcon,
    LayersIcon,
    LogoutIcon,
    MailIcon,
    MenuIcon,
    RouteIcon,
    ShieldIcon,
    UserIcon,
} from '@/components/admin/icons';
import { Alert } from '@/components/admin/ui';

export type AdminSection =
    | 'dashboard'
    | 'profile'
    | 'projects'
    | 'skills'
    | 'timeline'
    | 'messages';

const navigation = [
    {
        key: 'dashboard',
        label: 'Vue d’ensemble',
        href: '/admin',
        icon: DashboardIcon,
    },
    { key: 'profile', label: 'Profil', href: '/admin/profile', icon: UserIcon },
    {
        key: 'projects',
        label: 'Projets',
        href: '/admin/projects',
        icon: FolderIcon,
    },
    {
        key: 'skills',
        label: 'Compétences',
        href: '/admin/skills',
        icon: LayersIcon,
    },
    {
        key: 'timeline',
        label: 'Parcours',
        href: '/admin/timeline',
        icon: RouteIcon,
    },
    {
        key: 'messages',
        label: 'Messages',
        href: '/admin/messages',
        icon: MailIcon,
    },
] as const;

export default function AdminLayout({
    title,
    description,
    active,
    actions,
    children,
}: {
    title: string;
    description?: string;
    active: AdminSection;
    actions?: ReactNode;
    children: ReactNode;
}) {
    const { auth, flash, admin, siteUrl } = usePage<SharedData>().props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const user = auth.user;

    const logout = () => {
        router.post('/admin/logout');
    };

    const nav = (
        <nav className="mt-8 space-y-1">
            <p className="px-3 pb-2 text-[10px] font-semibold tracking-[0.18em] text-slate-600 uppercase">
                Administration
            </p>
            {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = active === item.key;

                return (
                    <Link
                        key={item.key}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                            'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition',
                            isActive
                                ? 'bg-emerald-400/10 font-medium text-emerald-200'
                                : 'text-slate-400 hover:bg-white/[0.05] hover:text-white',
                        )}
                    >
                        <Icon
                            className={cn(
                                'h-[18px] w-[18px]',
                                isActive
                                    ? 'text-emerald-300'
                                    : 'text-slate-500 group-hover:text-slate-300',
                            )}
                        />
                        <span className="flex-1">{item.label}</span>
                        {item.key === 'messages' &&
                            admin.unreadMessages > 0 && (
                                <span className="flex min-w-5 items-center justify-center rounded-full bg-emerald-400 px-1.5 py-0.5 text-[10px] font-semibold text-slate-950">
                                    {admin.unreadMessages}
                                </span>
                            )}
                    </Link>
                );
            })}
        </nav>
    );

    const sidebar = (
        <div className="flex h-full flex-col">
            <div className="flex items-center justify-between px-5 pt-6">
                <Link
                    href="/admin"
                    className="flex items-center gap-3"
                    onClick={() => setMobileOpen(false)}
                >
                    <span className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-400/30 bg-emerald-400/10 text-sm font-semibold text-emerald-300">
                        HS
                        <span className="absolute -right-0.5 -bottom-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#080d17] bg-emerald-400" />
                    </span>
                    <span>
                        <span className="block text-sm font-semibold tracking-tight text-white">
                            AHANTO Henri
                        </span>
                        <span className="block text-[11px] text-slate-500">
                            Portfolio · administration
                        </span>
                    </span>
                </Link>
                <button
                    type="button"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg p-2 text-slate-500 hover:bg-white/5 hover:text-white lg:hidden"
                    aria-label="Fermer le menu"
                >
                    <CloseIcon className="h-5 w-5" />
                </button>
            </div>

            <div className="flex-1 px-3">{nav}</div>

            <div className="space-y-3 p-3">
                <a
                    href={siteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-slate-400 transition hover:border-white/20 hover:text-white"
                >
                    <ExternalLinkIcon className="h-[18px] w-[18px] text-slate-500" />
                    <span className="flex-1">Voir le portfolio</span>
                    <ArrowUpRight />
                </a>

                <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-3">
                    <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-emerald-300 to-cyan-400 text-xs font-bold text-slate-950">
                            {initials(user?.name ?? 'Administrateur')}
                        </span>
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-white">
                                {user?.name}
                            </p>
                            <p className="truncate text-[11px] text-slate-500">
                                {user?.email}
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={logout}
                            className="rounded-lg p-2 text-slate-500 transition hover:bg-rose-500/10 hover:text-rose-300"
                            aria-label="Se déconnecter"
                            title="Se déconnecter"
                        >
                            <LogoutIcon className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#060a12] text-slate-100">
            <Head title={`${title} · Administration`} />

            {mobileOpen && (
                <button
                    type="button"
                    aria-label="Fermer le menu"
                    className="fixed inset-0 z-30 bg-slate-950/80 backdrop-blur-sm lg:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            <aside
                className={cn(
                    'fixed inset-y-0 left-0 z-40 w-72 border-r border-white/10 bg-[#080d17] transition-transform duration-200 lg:translate-x-0',
                    mobileOpen ? 'translate-x-0' : '-translate-x-full',
                )}
            >
                {sidebar}
            </aside>

            <div className="lg:pl-72">
                <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-white/10 bg-[#060a12]/85 px-4 backdrop-blur-xl sm:px-6 lg:px-10">
                    <button
                        type="button"
                        onClick={() => setMobileOpen(true)}
                        className="rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white lg:hidden"
                        aria-label="Ouvrir le menu"
                    >
                        <MenuIcon className="h-5 w-5" />
                    </button>

                    <div className="flex min-w-0 items-center gap-2 text-xs text-slate-500">
                        <span className="hidden sm:inline">Administration</span>
                        <span className="hidden text-slate-700 sm:inline">
                            /
                        </span>
                        <span className="truncate font-medium text-slate-300">
                            {title}
                        </span>
                    </div>

                    <div className="ml-auto flex items-center gap-3">
                        <a
                            href="/api/v1/portfolio"
                            target="_blank"
                            rel="noreferrer"
                            className="hidden items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-3 py-1.5 text-[11px] font-medium text-emerald-300 transition hover:bg-emerald-400/10 sm:flex"
                        >
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
                            API en ligne
                        </a>
                        <span className="hidden h-6 w-px bg-white/10 sm:block" />
                        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[10px] font-semibold text-slate-300 sm:hidden">
                            {initials(user?.name ?? 'Admin')}
                        </span>
                        <span className="hidden items-center gap-2 sm:flex">
                            <ShieldIcon className="h-4 w-4 text-slate-500" />
                            <span className="text-xs text-slate-400">
                                {user?.name}
                            </span>
                        </span>
                    </div>
                </header>

                <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="text-[10px] font-semibold tracking-[0.2em] text-emerald-400 uppercase">
                                Espace protégé
                            </p>
                            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                                {title}
                            </h1>
                            {description && (
                                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                                    {description}
                                </p>
                            )}
                        </div>
                        {actions && (
                            <div className="flex flex-wrap items-center gap-2">
                                {actions}
                            </div>
                        )}
                    </div>

                    {(flash.success || flash.error) && (
                        <div className="mt-6 space-y-3">
                            {flash.success && (
                                <Alert
                                    variant="success"
                                    title="C’est enregistré."
                                >
                                    {flash.success}
                                </Alert>
                            )}
                            {flash.error && (
                                <Alert
                                    variant="error"
                                    title="Une erreur est survenue."
                                >
                                    {flash.error}
                                </Alert>
                            )}
                        </div>
                    )}

                    <div className="mt-8">{children}</div>
                </main>
            </div>
        </div>
    );
}

function ArrowUpRight() {
    return <ExternalLinkIcon className="h-3.5 w-3.5" />;
}
