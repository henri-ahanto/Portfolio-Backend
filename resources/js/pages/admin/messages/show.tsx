import { router } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import type { ContactMessage } from '@/types';
import { formatDate, initials } from '@/lib/format';
import {
    Badge,
    Button,
    Card,
    IconButton,
    LinkButton,
    SectionCard,
    buttonClasses,
} from '@/components/admin/ui';
import {
    AlertIcon,
    ArrowLeftIcon,
    ClockIcon,
    GlobeIcon,
    MailIcon,
    ShieldIcon,
    TrashIcon,
} from '@/components/admin/icons';

export default function MessageShow({ message }: { message: ContactMessage }) {
    const isUnread = message.read_at === null;
    const mailto = `mailto:${message.email}?subject=${encodeURIComponent(
        'Réponse à votre message — AHANTO Henri Sylvain',
    )}`;

    const toggleRead = () => {
        router.patch(
            `/admin/messages/${message.id}/read`,
            {},
            { preserveScroll: true },
        );
    };

    const destroy = () => {
        if (window.confirm(`Supprimer le message de ${message.name} ?`)) {
            router.delete(`/admin/messages/${message.id}`);
        }
    };

    return (
        <AdminLayout
            title={`Message de ${message.name}`}
            description={`Reçu le ${formatDate(message.created_at)} via le formulaire de contact.`}
            active="messages"
            actions={
                <>
                    <LinkButton href="/admin/messages" variant="ghost">
                        <ArrowLeftIcon className="h-4 w-4" />
                        Retour
                    </LinkButton>
                    <Button variant="secondary" onClick={toggleRead}>
                        {isUnread ? 'Marquer comme lu' : 'Marquer comme non lu'}
                    </Button>
                    <a href={mailto} className={buttonClasses('primary')}>
                        <MailIcon className="h-4 w-4" />
                        Répondre par email
                    </a>
                    <IconButton
                        label="Supprimer le message"
                        tone="danger"
                        onClick={destroy}
                    >
                        <TrashIcon className="h-4 w-4" />
                    </IconButton>
                </>
            }
        >
            <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
                <Card>
                    <div className="flex flex-col gap-4 border-b border-white/10 p-5 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-4">
                            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-300 to-cyan-400 text-sm font-bold text-slate-950">
                                {initials(message.name)}
                            </span>
                            <div>
                                <p className="font-medium text-white">
                                    {message.name}
                                </p>
                                <a
                                    href={`mailto:${message.email}`}
                                    className="text-xs text-slate-500 transition hover:text-emerald-300"
                                >
                                    {message.email}
                                </a>
                            </div>
                        </div>
                        <Badge variant={isUnread ? 'success' : 'neutral'}>
                            {isUnread ? 'Non lu' : 'Lu'}
                        </Badge>
                    </div>

                    <div className="p-5 sm:p-6">
                        <div className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.18em] text-slate-600 uppercase">
                            <MailIcon className="h-3.5 w-3.5" />
                            Message
                        </div>
                        <div className="mt-4 text-[15px] leading-8 break-words whitespace-pre-wrap text-slate-300">
                            {message.message}
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 border-t border-white/10 bg-white/[0.02] p-5 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-xs text-slate-500">
                            Une réponse par email ouvrira votre client de
                            messagerie.
                        </p>
                        <a
                            href={mailto}
                            className={buttonClasses('primary', 'sm')}
                        >
                            <MailIcon className="h-4 w-4" />
                            Répondre à {message.name.split(' ')[0]}
                        </a>
                    </div>
                </Card>

                <div className="space-y-6">
                    <SectionCard
                        title="Détails"
                        description="Métadonnées de réception du message."
                    >
                        <dl className="space-y-4 text-sm">
                            <div className="flex items-start gap-3">
                                <ClockIcon className="mt-0.5 h-4 w-4 shrink-0 text-slate-600" />
                                <div>
                                    <dt className="text-[11px] text-slate-500">
                                        Reçu le
                                    </dt>
                                    <dd className="mt-0.5 text-slate-300">
                                        {formatDate(message.created_at)}
                                    </dd>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-slate-600" />
                                <div className="min-w-0">
                                    <dt className="text-[11px] text-slate-500">
                                        Adresse email
                                    </dt>
                                    <dd className="mt-0.5 truncate text-slate-300">
                                        {message.email}
                                    </dd>
                                </div>
                            </div>
                            {message.ip_address && (
                                <div className="flex items-start gap-3">
                                    <GlobeIcon className="mt-0.5 h-4 w-4 shrink-0 text-slate-600" />
                                    <div>
                                        <dt className="text-[11px] text-slate-500">
                                            Adresse IP
                                        </dt>
                                        <dd className="mt-0.5 font-mono text-xs text-slate-400">
                                            {message.ip_address}
                                        </dd>
                                    </div>
                                </div>
                            )}
                            <div className="flex items-start gap-3">
                                <ShieldIcon className="mt-0.5 h-4 w-4 shrink-0 text-slate-600" />
                                <div>
                                    <dt className="text-[11px] text-slate-500">
                                        Statut
                                    </dt>
                                    <dd className="mt-0.5">
                                        <Badge
                                            variant={
                                                isUnread ? 'success' : 'neutral'
                                            }
                                        >
                                            {isUnread ? 'Non lu' : 'Lu'}
                                        </Badge>
                                    </dd>
                                </div>
                            </div>
                        </dl>

                        {message.user_agent && (
                            <div className="mt-5 border-t border-white/10 pt-4">
                                <p className="text-[11px] text-slate-500">
                                    Navigateur / client
                                </p>
                                <p className="mt-1 font-mono text-[10px] leading-5 break-words text-slate-600">
                                    {message.user_agent}
                                </p>
                            </div>
                        )}
                    </SectionCard>

                    <div className="rounded-2xl border border-amber-400/15 bg-amber-400/[0.04] p-4">
                        <div className="flex items-center gap-2 text-xs font-medium text-amber-200">
                            <AlertIcon className="h-4 w-4" />
                            Suppression définitive
                        </div>
                        <p className="mt-2 text-xs leading-5 text-slate-500">
                            La suppression retire définitivement ce message de
                            la boîte de réception.
                        </p>
                        <button
                            type="button"
                            onClick={destroy}
                            className="mt-3 inline-flex items-center gap-2 text-xs font-medium text-rose-300 transition hover:text-rose-200"
                        >
                            <TrashIcon className="h-3.5 w-3.5" />
                            Supprimer ce message
                        </button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
