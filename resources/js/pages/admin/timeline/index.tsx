import { Link, router } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import type { Paginated, TimelineItem } from '@/types';
import { cn } from '@/lib/utils';
import {
    Badge,
    Card,
    EmptyState,
    IconButton,
    LinkButton,
    Pagination,
} from '@/components/admin/ui';
import {
    BriefcaseIcon,
    GraduationIcon,
    PencilIcon,
    PlusIcon,
    RouteIcon,
    TrashIcon,
} from '@/components/admin/icons';

export default function TimelineIndex({
    timelineItems,
}: {
    timelineItems: Paginated<TimelineItem>;
}) {
    const destroy = (item: TimelineItem) => {
        if (window.confirm(`Supprimer l’étape « ${item.title} » ?`)) {
            router.delete(`/admin/timeline/${item.id}`, {
                preserveScroll: true,
            });
        }
    };

    return (
        <AdminLayout
            title="Parcours"
            description="Expériences professionnelles et formations affichées dans la chronologie du portfolio."
            active="timeline"
            actions={
                <LinkButton href="/admin/timeline/create" variant="primary">
                    <PlusIcon className="h-4 w-4" />
                    Nouvelle étape
                </LinkButton>
            }
        >
            <Card>
                {timelineItems.data.length === 0 ? (
                    <EmptyState
                        icon={<RouteIcon className="h-6 w-6" />}
                        title="Aucune étape"
                        description="Ajoutez une expérience ou une formation pour construire votre parcours."
                        action={
                            <LinkButton
                                href="/admin/timeline/create"
                                variant="primary"
                            >
                                <PlusIcon className="h-4 w-4" />
                                Créer une étape
                            </LinkButton>
                        }
                    />
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[820px] text-left text-sm">
                            <thead>
                                <tr className="border-b border-white/10 text-[11px] tracking-wider text-slate-500 uppercase">
                                    <th className="px-5 py-3 font-medium">
                                        Ordre
                                    </th>
                                    <th className="px-5 py-3 font-medium">
                                        Période
                                    </th>
                                    <th className="px-5 py-3 font-medium">
                                        Étape
                                    </th>
                                    <th className="px-5 py-3 font-medium">
                                        Type
                                    </th>
                                    <th className="px-5 py-3 font-medium">
                                        Statut
                                    </th>
                                    <th className="px-5 py-3 text-right font-medium">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/[0.06]">
                                {timelineItems.data.map((item) => {
                                    const TypeIcon =
                                        item.type === 'work'
                                            ? BriefcaseIcon
                                            : GraduationIcon;

                                    return (
                                        <tr
                                            key={item.id}
                                            className="group transition hover:bg-white/[0.02]"
                                        >
                                            <td className="px-5 py-4 text-xs text-slate-500">
                                                {item.sort_order}
                                            </td>
                                            <td className="px-5 py-4">
                                                <p className="text-xs text-slate-400">
                                                    {item.date}
                                                </p>
                                                {item.current && (
                                                    <Badge
                                                        variant="info"
                                                        className="mt-1.5"
                                                    >
                                                        En cours
                                                    </Badge>
                                                )}
                                            </td>
                                            <td className="px-5 py-4">
                                                <p className="font-medium text-slate-200">
                                                    {item.title}
                                                </p>
                                                <p className="mt-0.5 text-[11px] text-slate-600">
                                                    {item.place}
                                                </p>
                                            </td>
                                            <td className="px-5 py-4">
                                                <Badge
                                                    variant={
                                                        item.type === 'work'
                                                            ? 'info'
                                                            : 'neutral'
                                                    }
                                                >
                                                    <TypeIcon className="h-3 w-3" />
                                                    {item.type === 'work'
                                                        ? 'Expérience'
                                                        : 'Formation'}
                                                </Badge>
                                            </td>
                                            <td className="px-5 py-4">
                                                <Badge
                                                    variant={
                                                        item.published
                                                            ? 'success'
                                                            : 'warning'
                                                    }
                                                >
                                                    <span
                                                        className={cn(
                                                            'h-1.5 w-1.5 rounded-full',
                                                            item.published
                                                                ? 'bg-emerald-400'
                                                                : 'bg-amber-300',
                                                        )}
                                                    />
                                                    {item.published
                                                        ? 'Publiée'
                                                        : 'Masquée'}
                                                </Badge>
                                            </td>
                                            <td className="px-5 py-4">
                                                <div className="flex items-center justify-end gap-1.5">
                                                    <Link
                                                        href={`/admin/timeline/${item.id}/edit`}
                                                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-slate-400 transition hover:bg-white/[0.08] hover:text-white"
                                                        aria-label={`Modifier ${item.title}`}
                                                        title="Modifier"
                                                    >
                                                        <PencilIcon className="h-4 w-4" />
                                                    </Link>
                                                    <IconButton
                                                        label={`Supprimer ${item.title}`}
                                                        tone="danger"
                                                        onClick={() =>
                                                            destroy(item)
                                                        }
                                                    >
                                                        <TrashIcon className="h-4 w-4" />
                                                    </IconButton>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
                <Pagination paginator={timelineItems} />
            </Card>
        </AdminLayout>
    );
}
