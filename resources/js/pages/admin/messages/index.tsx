import { Link, router } from '@inertiajs/react';
import { useState } from 'react';
import type { FormEvent } from 'react';
import AdminLayout from '@/layouts/admin-layout';
import type { ContactMessage, Paginated } from '@/types';
import { cn } from '@/lib/utils';
import { excerpt, formatDate } from '@/lib/format';
import {
    Badge,
    Card,
    EmptyState,
    LinkButton,
    Pagination,
    TextInput,
} from '@/components/admin/ui';
import { ArrowRightIcon, MailIcon, SearchIcon } from '@/components/admin/icons';

type MessageFilters = {
    status: 'all' | 'unread' | 'read';
    search: string;
};

export default function MessagesIndex({
    messages,
    filters,
    unreadCount,
}: {
    messages: Paginated<ContactMessage>;
    filters: MessageFilters;
    unreadCount: number;
}) {
    const [search, setSearch] = useState(filters.search);

    const submitSearch = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        router.get(
            '/admin/messages',
            {
                status: filters.status,
                search: search.trim() || undefined,
            },
            { preserveState: true, preserveScroll: true, replace: true },
        );
    };

    const filterHref = (status: MessageFilters['status']) => {
        const params = new URLSearchParams();

        if (status !== 'all') {
            params.set('status', status);
        }

        if (filters.search) {
            params.set('search', filters.search);
        }

        const query = params.toString();

        return query ? `/admin/messages?${query}` : '/admin/messages';
    };

    return (
        <AdminLayout
            title="Messages"
            description="Les demandes envoyées depuis le formulaire de contact du portfolio."
            active="messages"
            actions={
                <Badge variant={unreadCount > 0 ? 'success' : 'neutral'}>
                    <MailIcon className="h-3.5 w-3.5" />
                    {unreadCount} non lu{unreadCount > 1 ? 's' : ''}
                </Badge>
            }
        >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="inline-flex w-fit items-center gap-1 rounded-xl border border-white/10 bg-[#0b1220] p-1">
                    {(
                        [
                            { key: 'all', label: 'Tous' },
                            { key: 'unread', label: 'Non lus' },
                            { key: 'read', label: 'Lus' },
                        ] as const
                    ).map((filter) => (
                        <Link
                            key={filter.key}
                            href={filterHref(filter.key)}
                            preserveScroll
                            className={cn(
                                'rounded-lg px-3.5 py-2 text-xs font-medium transition',
                                filters.status === filter.key
                                    ? 'bg-emerald-400/15 text-emerald-200'
                                    : 'text-slate-500 hover:bg-white/[0.05] hover:text-slate-300',
                            )}
                        >
                            {filter.label}
                            {filter.key === 'unread' && unreadCount > 0 && (
                                <span className="ml-1.5 text-[10px] text-emerald-300">
                                    {unreadCount}
                                </span>
                            )}
                        </Link>
                    ))}
                </div>

                <form
                    onSubmit={submitSearch}
                    className="flex w-full max-w-sm items-center gap-2"
                >
                    <div className="relative flex-1">
                        <SearchIcon className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-600" />
                        <TextInput
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Rechercher un nom, un email…"
                            className="pl-9"
                            aria-label="Rechercher dans les messages"
                        />
                    </div>
                    <button
                        type="submit"
                        className="rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-xs font-medium text-slate-300 transition hover:bg-white/[0.08] hover:text-white"
                    >
                        Chercher
                    </button>
                </form>
            </div>

            <Card className="mt-5">
                {messages.data.length === 0 ? (
                    <EmptyState
                        icon={<MailIcon className="h-6 w-6" />}
                        title="Aucun message"
                        description={
                            filters.search
                                ? 'Aucun message ne correspond à votre recherche.'
                                : 'Les demandes envoyées depuis le formulaire de contact apparaîtront ici.'
                        }
                        action={
                            filters.search || filters.status !== 'all' ? (
                                <LinkButton
                                    href="/admin/messages"
                                    variant="secondary"
                                >
                                    Réinitialiser les filtres
                                </LinkButton>
                            ) : undefined
                        }
                    />
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[860px] text-left text-sm">
                            <thead>
                                <tr className="border-b border-white/10 text-[11px] tracking-wider text-slate-500 uppercase">
                                    <th className="px-5 py-3 font-medium">
                                        Expéditeur
                                    </th>
                                    <th className="px-5 py-3 font-medium">
                                        Message
                                    </th>
                                    <th className="px-5 py-3 font-medium">
                                        Reçu le
                                    </th>
                                    <th className="px-5 py-3 font-medium">
                                        Statut
                                    </th>
                                    <th className="px-5 py-3 text-right font-medium">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/[0.06]">
                                {messages.data.map((message) => (
                                    <tr
                                        key={message.id}
                                        className={cn(
                                            'group transition hover:bg-white/[0.02]',
                                            message.read_at === null &&
                                                'bg-emerald-400/[0.015]',
                                        )}
                                    >
                                        <td className="px-5 py-4">
                                            <div className="flex items-start gap-3">
                                                <span
                                                    className={cn(
                                                        'mt-1.5 h-2 w-2 shrink-0 rounded-full',
                                                        message.read_at === null
                                                            ? 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]'
                                                            : 'bg-slate-700',
                                                    )}
                                                />
                                                <div>
                                                    <p className="font-medium text-slate-200">
                                                        {message.name}
                                                    </p>
                                                    <a
                                                        href={`mailto:${message.email}`}
                                                        className="mt-0.5 block text-[11px] text-slate-500 transition hover:text-emerald-300"
                                                    >
                                                        {message.email}
                                                    </a>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="max-w-md px-5 py-4">
                                            <p className="line-clamp-2 text-xs leading-5 text-slate-400">
                                                {excerpt(message.message, 180)}
                                            </p>
                                        </td>
                                        <td className="px-5 py-4 text-xs whitespace-nowrap text-slate-500">
                                            {formatDate(message.created_at)}
                                        </td>
                                        <td className="px-5 py-4">
                                            <Badge
                                                variant={
                                                    message.read_at === null
                                                        ? 'success'
                                                        : 'neutral'
                                                }
                                            >
                                                {message.read_at === null
                                                    ? 'Non lu'
                                                    : 'Lu'}
                                            </Badge>
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex justify-end">
                                                <Link
                                                    href={`/admin/messages/${message.id}`}
                                                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-medium text-slate-300 transition hover:border-emerald-400/30 hover:bg-emerald-400/10 hover:text-emerald-200"
                                                >
                                                    Ouvrir
                                                    <ArrowRightIcon className="h-3.5 w-3.5" />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                <Pagination paginator={messages} />
            </Card>
        </AdminLayout>
    );
}
