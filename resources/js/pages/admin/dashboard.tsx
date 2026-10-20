import { Link, usePage } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import type { ContactMessage, DashboardStats, SharedData } from '@/types';
import { excerpt, formatDate, formatLongDate } from '@/lib/format';
import {
    Badge,
    Card,
    EmptyState,
    LinkButton,
    SectionCard,
    StatCard,
} from '@/components/admin/ui';
import {
    ArrowRightIcon,
    BriefcaseIcon,
    ClockIcon,
    FolderIcon,
    GlobeIcon,
    LayersIcon,
    MailIcon,
    PlusIcon,
    RouteIcon,
    SparklesIcon,
    UserIcon,
} from '@/components/admin/icons';

export default function Dashboard({
    stats,
    latestMessages,
}: {
    stats: DashboardStats;
    latestMessages: ContactMessage[];
}) {
    const { auth } = usePage<SharedData>().props;
    const firstName = auth.user?.name?.split(' ')[0] ?? 'Henri';

    return (
        <AdminLayout
            title="Tableau de bord"
            description={`Bonjour ${firstName}. Voici l’état de votre portfolio au ${formatLongDate()}.`}
            active="dashboard"
            actions={
                <LinkButton href="/admin/projects/create" variant="primary">
                    <PlusIcon className="h-4 w-4" />
                    Nouveau projet
                </LinkButton>
            }
        >
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard
                    label="Projets"
                    value={stats.projects.total}
                    detail={`${stats.projects.published} publié${stats.projects.published > 1 ? 's' : ''}`}
                    icon={<FolderIcon className="h-5 w-5" />}
                    href="/admin/projects"
                />
                <StatCard
                    label="Compétences"
                    value={stats.skills.total}
                    detail={`${stats.skills.published} catégorie${stats.skills.published > 1 ? 's' : ''} visible${stats.skills.published > 1 ? 's' : ''}`}
                    icon={<LayersIcon className="h-5 w-5" />}
                    href="/admin/skills"
                    accent="cyan"
                />
                <StatCard
                    label="Étapes du parcours"
                    value={stats.timeline.total}
                    detail={`${stats.timeline.published} publiée${stats.timeline.published > 1 ? 's' : ''}`}
                    icon={<RouteIcon className="h-5 w-5" />}
                    href="/admin/timeline"
                    accent="amber"
                />
                <StatCard
                    label="Messages reçus"
                    value={stats.messages.total}
                    detail={`${stats.messages.unread} non lu${stats.messages.unread > 1 ? 's' : ''}`}
                    icon={<MailIcon className="h-5 w-5" />}
                    href="/admin/messages"
                    accent="rose"
                />
            </div>

            <div className="mt-6 grid gap-6 xl:grid-cols-[1.6fr_1fr]">
                <SectionCard
                    title="Derniers messages"
                    description="Les cinq demandes les plus récentes reçues via le formulaire de contact."
                    action={
                        <Link
                            href="/admin/messages"
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-300 transition hover:text-emerald-200"
                        >
                            Tout voir
                            <ArrowRightIcon className="h-3.5 w-3.5" />
                        </Link>
                    }
                >
                    {latestMessages.length === 0 ? (
                        <EmptyState
                            icon={<MailIcon className="h-6 w-6" />}
                            title="Aucun message pour le moment"
                            description="Les messages envoyés depuis votre formulaire de contact apparaîtront ici."
                        />
                    ) : (
                        <div className="divide-y divide-white/[0.06]">
                            {latestMessages.map((message) => (
                                <Link
                                    key={message.id}
                                    href={`/admin/messages/${message.id}`}
                                    className="group flex items-start gap-4 py-4 first:pt-0 last:pb-0"
                                >
                                    <span
                                        className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                                            message.read_at === null
                                                ? 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]'
                                                : 'bg-slate-700'
                                        }`}
                                    />
                                    <div className="min-w-0 flex-1">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <p className="text-sm font-medium text-slate-200 group-hover:text-white">
                                                {message.name}
                                            </p>
                                            {message.read_at === null && (
                                                <Badge variant="success">
                                                    Non lu
                                                </Badge>
                                            )}
                                        </div>
                                        <p className="mt-1 text-xs text-slate-500">
                                            {message.email}
                                        </p>
                                        <p className="mt-2 line-clamp-1 text-sm text-slate-400">
                                            {excerpt(message.message, 150)}
                                        </p>
                                    </div>
                                    <div className="shrink-0 text-right">
                                        <p className="text-[11px] text-slate-500">
                                            {formatDate(message.created_at)}
                                        </p>
                                        <ArrowRightIcon className="mt-2 ml-auto h-4 w-4 text-slate-700 transition group-hover:translate-x-0.5 group-hover:text-slate-300" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </SectionCard>

                <div className="space-y-6">
                    <SectionCard
                        title="Actions rapides"
                        description="Les raccourcis les plus utiles au quotidien."
                    >
                        <div className="grid gap-2">
                            <QuickAction
                                href="/admin/profile"
                                icon={<UserIcon className="h-4 w-4" />}
                                label="Modifier le profil"
                                description="Identité, bio et coordonnées"
                            />
                            <QuickAction
                                href="/admin/projects/create"
                                icon={<FolderIcon className="h-4 w-4" />}
                                label="Ajouter un projet"
                                description="Publier une nouvelle réalisation"
                            />
                            <QuickAction
                                href="/admin/skills/create"
                                icon={<LayersIcon className="h-4 w-4" />}
                                label="Ajouter une compétence"
                                description="Créer une catégorie de skills"
                            />
                            <QuickAction
                                href="/admin/timeline/create"
                                icon={<RouteIcon className="h-4 w-4" />}
                                label="Ajouter une étape"
                                description="Expérience ou formation"
                            />
                        </div>
                    </SectionCard>

                    <Card className="relative overflow-hidden p-5">
                        <div className="pointer-events-none absolute -top-14 -right-14 h-36 w-36 rounded-full bg-emerald-400/[0.08] blur-2xl" />
                        <div className="flex items-center gap-2 text-xs font-medium text-emerald-300">
                            <SparklesIcon className="h-4 w-4" />
                            État de l’API publique
                        </div>
                        <p className="mt-3 text-sm leading-6 text-slate-400">
                            Seuls les contenus{' '}
                            <strong className="font-medium text-slate-200">
                                publiés
                            </strong>{' '}
                            sont exposés sur{' '}
                            <code className="text-[11px] text-slate-300">
                                /api/v1/portfolio
                            </code>
                            . Le cache est renouvelé automatiquement à chaque
                            modification.
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                            <Badge variant="success">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                API opérationnelle
                            </Badge>
                            <Badge variant="neutral">
                                <ClockIcon className="h-3 w-3" />
                                Cache 10 min
                            </Badge>
                        </div>
                        <a
                            href="/api/v1/portfolio"
                            target="_blank"
                            rel="noreferrer"
                            className="mt-5 inline-flex items-center gap-2 text-xs font-medium text-emerald-300 hover:text-emerald-200"
                        >
                            <GlobeIcon className="h-3.5 w-3.5" />
                            Ouvrir la réponse JSON
                        </a>
                    </Card>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-2xl border border-white/10 bg-[#0b1220] p-4">
                            <BriefcaseIcon className="h-4 w-4 text-slate-500" />
                            <p className="mt-3 text-xl font-semibold text-white">
                                {stats.projects.published}
                            </p>
                            <p className="mt-0.5 text-[11px] text-slate-500">
                                projets visibles
                            </p>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-[#0b1220] p-4">
                            <MailIcon className="h-4 w-4 text-slate-500" />
                            <p className="mt-3 text-xl font-semibold text-white">
                                {stats.messages.unread}
                            </p>
                            <p className="mt-0.5 text-[11px] text-slate-500">
                                messages à lire
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

function QuickAction({
    href,
    icon,
    label,
    description,
}: {
    href: string;
    icon: React.ReactNode;
    label: string;
    description: string;
}) {
    return (
        <Link
            href={href}
            className="group flex items-center gap-3 rounded-xl border border-transparent px-2 py-2.5 transition hover:border-white/10 hover:bg-white/[0.04]"
        >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-slate-400 transition group-hover:text-emerald-300">
                {icon}
            </span>
            <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium text-slate-200">
                    {label}
                </span>
                <span className="block text-[11px] text-slate-500">
                    {description}
                </span>
            </span>
            <ArrowRightIcon className="h-4 w-4 text-slate-700 transition group-hover:translate-x-0.5 group-hover:text-slate-300" />
        </Link>
    );
}
