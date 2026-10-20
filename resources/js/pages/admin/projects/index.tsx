import { Link, router } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import type { Paginated, Project } from '@/types';
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
    ExternalLinkIcon,
    FolderIcon,
    PencilIcon,
    PlusIcon,
    TrashIcon,
} from '@/components/admin/icons';

export default function ProjectsIndex({
    projects,
}: {
    projects: Paginated<Project>;
}) {
    const destroy = (project: Project) => {
        if (window.confirm(`Supprimer le projet « ${project.title} » ?`)) {
            router.delete(`/admin/projects/${project.id}`, {
                preserveScroll: true,
            });
        }
    };

    return (
        <AdminLayout
            title="Projets"
            description="Gérez les réalisations présentées sur le portfolio et leur visibilité dans l’API publique."
            active="projects"
            actions={
                <LinkButton href="/admin/projects/create" variant="primary">
                    <PlusIcon className="h-4 w-4" />
                    Nouveau projet
                </LinkButton>
            }
        >
            <Card>
                {projects.data.length === 0 ? (
                    <EmptyState
                        icon={<FolderIcon className="h-6 w-6" />}
                        title="Aucun projet"
                        description="Ajoutez votre première réalisation pour l’afficher sur le portfolio."
                        action={
                            <LinkButton
                                href="/admin/projects/create"
                                variant="primary"
                            >
                                <PlusIcon className="h-4 w-4" />
                                Créer un projet
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
                                        Projet
                                    </th>
                                    <th className="px-5 py-3 font-medium">
                                        Type
                                    </th>
                                    <th className="px-5 py-3 font-medium">
                                        Tags
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
                                {projects.data.map((project) => (
                                    <tr
                                        key={project.id}
                                        className="group transition hover:bg-white/[0.02]"
                                    >
                                        <td className="px-5 py-4 text-xs text-slate-500">
                                            {project.sort_order}
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-start gap-3">
                                                <span
                                                    className={cn(
                                                        'mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full',
                                                        accentDot[
                                                            project.accent
                                                        ],
                                                    )}
                                                />
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <p className="font-medium text-slate-200">
                                                            {project.title}
                                                        </p>
                                                        {project.href && (
                                                            <a
                                                                href={
                                                                    project.href
                                                                }
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                className="text-slate-600 transition hover:text-emerald-300"
                                                                aria-label="Ouvrir le projet"
                                                            >
                                                                <ExternalLinkIcon className="h-3.5 w-3.5" />
                                                            </a>
                                                        )}
                                                    </div>
                                                    <p className="mt-0.5 font-mono text-[11px] text-slate-600">
                                                        /{project.slug}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4 text-xs text-slate-400">
                                            {project.kind}
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex max-w-xs flex-wrap gap-1">
                                                {project.tags
                                                    .slice(0, 3)
                                                    .map((tag) => (
                                                        <Badge
                                                            key={tag}
                                                            variant="neutral"
                                                        >
                                                            {tag}
                                                        </Badge>
                                                    ))}
                                                {project.tags.length > 3 && (
                                                    <Badge variant="neutral">
                                                        +
                                                        {project.tags.length -
                                                            3}
                                                    </Badge>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-5 py-4">
                                            <Badge
                                                variant={
                                                    project.published
                                                        ? 'success'
                                                        : 'warning'
                                                }
                                            >
                                                <span
                                                    className={cn(
                                                        'h-1.5 w-1.5 rounded-full',
                                                        project.published
                                                            ? 'bg-emerald-400'
                                                            : 'bg-amber-300',
                                                    )}
                                                />
                                                {project.published
                                                    ? 'Publié'
                                                    : 'Masqué'}
                                            </Badge>
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center justify-end gap-1.5">
                                                <Link
                                                    href={`/admin/projects/${project.id}/edit`}
                                                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-slate-400 transition hover:bg-white/[0.08] hover:text-white"
                                                    aria-label={`Modifier ${project.title}`}
                                                    title="Modifier"
                                                >
                                                    <PencilIcon className="h-4 w-4" />
                                                </Link>
                                                <IconButton
                                                    label={`Supprimer ${project.title}`}
                                                    tone="danger"
                                                    onClick={() =>
                                                        destroy(project)
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
                <Pagination paginator={projects} />
            </Card>
        </AdminLayout>
    );
}

const accentDot: Record<Project['accent'], string> = {
    python: 'bg-cyan-400',
    laravel: 'bg-rose-400',
    php: 'bg-indigo-400',
    yellow: 'bg-amber-300',
};
