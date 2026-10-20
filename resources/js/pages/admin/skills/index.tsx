import { Link, router } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import type { Paginated, SkillCategory } from '@/types';
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
    LayersIcon,
    PencilIcon,
    PlusIcon,
    TrashIcon,
} from '@/components/admin/icons';

export default function SkillsIndex({
    skillCategories,
}: {
    skillCategories: Paginated<SkillCategory>;
}) {
    const destroy = (category: SkillCategory) => {
        if (window.confirm(`Supprimer la catégorie « ${category.title} » ?`)) {
            router.delete(`/admin/skills/${category.id}`, {
                preserveScroll: true,
            });
        }
    };

    return (
        <AdminLayout
            title="Compétences"
            description="Organisez les catégories et les technologies affichées dans la section compétences."
            active="skills"
            actions={
                <LinkButton href="/admin/skills/create" variant="primary">
                    <PlusIcon className="h-4 w-4" />
                    Nouvelle catégorie
                </LinkButton>
            }
        >
            <Card>
                {skillCategories.data.length === 0 ? (
                    <EmptyState
                        icon={<LayersIcon className="h-6 w-6" />}
                        title="Aucune catégorie"
                        description="Créez une première catégorie pour présenter vos compétences."
                        action={
                            <LinkButton
                                href="/admin/skills/create"
                                variant="primary"
                            >
                                <PlusIcon className="h-4 w-4" />
                                Créer une catégorie
                            </LinkButton>
                        }
                    />
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[760px] text-left text-sm">
                            <thead>
                                <tr className="border-b border-white/10 text-[11px] tracking-wider text-slate-500 uppercase">
                                    <th className="px-5 py-3 font-medium">
                                        Ordre
                                    </th>
                                    <th className="px-5 py-3 font-medium">
                                        Catégorie
                                    </th>
                                    <th className="px-5 py-3 font-medium">
                                        Compétences
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
                                {skillCategories.data.map((category) => (
                                    <tr
                                        key={category.id}
                                        className="group transition hover:bg-white/[0.02]"
                                    >
                                        <td className="px-5 py-4 text-xs text-slate-500">
                                            {category.sort_order}
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-start gap-3">
                                                <span
                                                    className={cn(
                                                        'mt-1 h-2.5 w-2.5 shrink-0 rounded-full',
                                                        accentDot[
                                                            category.accent
                                                        ],
                                                    )}
                                                />
                                                <div>
                                                    <p className="font-medium text-slate-200">
                                                        {category.title}
                                                    </p>
                                                    <p className="mt-0.5 text-[11px] text-slate-600">
                                                        {
                                                            iconLabels[
                                                                category.icon
                                                            ]
                                                        }{' '}
                                                        ·{' '}
                                                        {category.skills.length}{' '}
                                                        compétence
                                                        {category.skills
                                                            .length > 1
                                                            ? 's'
                                                            : ''}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex max-w-lg flex-wrap gap-1">
                                                {category.skills
                                                    .slice(0, 5)
                                                    .map((skill) => (
                                                        <Badge
                                                            key={skill}
                                                            variant="neutral"
                                                        >
                                                            {skill}
                                                        </Badge>
                                                    ))}
                                                {category.skills.length > 5 && (
                                                    <Badge variant="neutral">
                                                        +
                                                        {category.skills
                                                            .length - 5}
                                                    </Badge>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-5 py-4">
                                            <Badge
                                                variant={
                                                    category.published
                                                        ? 'success'
                                                        : 'warning'
                                                }
                                            >
                                                <span
                                                    className={cn(
                                                        'h-1.5 w-1.5 rounded-full',
                                                        category.published
                                                            ? 'bg-emerald-400'
                                                            : 'bg-amber-300',
                                                    )}
                                                />
                                                {category.published
                                                    ? 'Publiée'
                                                    : 'Masquée'}
                                            </Badge>
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center justify-end gap-1.5">
                                                <Link
                                                    href={`/admin/skills/${category.id}/edit`}
                                                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-slate-400 transition hover:bg-white/[0.08] hover:text-white"
                                                    aria-label={`Modifier ${category.title}`}
                                                    title="Modifier"
                                                >
                                                    <PencilIcon className="h-4 w-4" />
                                                </Link>
                                                <IconButton
                                                    label={`Supprimer ${category.title}`}
                                                    tone="danger"
                                                    onClick={() =>
                                                        destroy(category)
                                                    }
                                                >
                                                    <TrashIcon className="h-4 w-4" />
                                                </IconButton>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                <Pagination paginator={skillCategories} />
            </Card>
        </AdminLayout>
    );
}

const accentDot: Record<SkillCategory['accent'], string> = {
    python: 'bg-cyan-400',
    laravel: 'bg-rose-400',
    php: 'bg-indigo-400',
    yellow: 'bg-amber-300',
};

const iconLabels: Record<SkillCategory['icon'], string> = {
    palette: 'Design',
    code: 'Code',
    layers: 'Frameworks',
    brain: 'IA / Data',
    database: 'Bases de données',
    boxes: 'Architecture',
};
