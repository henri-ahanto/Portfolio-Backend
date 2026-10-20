import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import {
    ArrowLeftIcon,
    ArrowRightIcon,
    CheckIcon,
    LockIcon,
    ShieldIcon,
} from '@/components/admin/icons';
import { Alert, Button, Field, TextInput } from '@/components/admin/ui';

export default function AdminLogin({ status }: { status?: string | null }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        post('/admin/login', {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-[#05080f] text-slate-100">
            <Head title="Connexion · Administration" />

            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-40 -left-40 h-[32rem] w-[32rem] rounded-full bg-emerald-400/[0.07] blur-3xl" />
                <div className="absolute top-1/3 -right-52 h-[36rem] w-[36rem] rounded-full bg-cyan-400/[0.05] blur-3xl" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)] bg-[size:64px_64px]" />
            </div>

            <div className="relative mx-auto grid min-h-screen max-w-7xl lg:grid-cols-[1.05fr_0.95fr]">
                <section className="hidden flex-col justify-between border-r border-white/10 p-12 lg:flex xl:p-16">
                    <Link href="/" className="flex w-fit items-center gap-3">
                        <span className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-400/30 bg-emerald-400/10 text-sm font-semibold text-emerald-300">
                            HS
                            <span className="absolute -right-0.5 -bottom-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#05080f] bg-emerald-400" />
                        </span>
                        <span>
                            <span className="block text-sm font-semibold tracking-tight text-white">
                                AHANTO Henri Sylvain
                            </span>
                            <span className="block text-[11px] text-slate-500">
                                Développeur fullstack
                            </span>
                        </span>
                    </Link>

                    <div className="max-w-xl">
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] font-medium text-slate-400">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                            Espace d’administration
                        </span>
                        <h1 className="mt-7 text-5xl leading-[1.08] font-semibold tracking-[-0.04em] text-white xl:text-6xl">
                            Pilotez votre
                            <span className="block bg-gradient-to-r from-emerald-300 via-emerald-200 to-cyan-300 bg-clip-text text-transparent">
                                présence en ligne.
                            </span>
                        </h1>
                        <p className="mt-6 max-w-lg text-base leading-7 text-slate-400">
                            Gérez le contenu de votre portfolio, publiez vos
                            projets et répondez aux messages depuis un espace
                            unique.
                        </p>

                        <ul className="mt-9 space-y-3.5">
                            {[
                                'Contenu publié ou masqué en un clic',
                                'Messages centralisés dans une boîte de réception',
                                'API publique mise à jour automatiquement',
                            ].map((item) => (
                                <li
                                    key={item}
                                    className="flex items-center gap-3 text-sm text-slate-300"
                                >
                                    <span className="flex h-6 w-6 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/10 text-emerald-300">
                                        <CheckIcon className="h-3.5 w-3.5" />
                                    </span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <p className="text-xs text-slate-600">
                        © {new Date().getFullYear()} AHANTO Henri Sylvain ·
                        Administration sécurisée
                    </p>
                </section>

                <section className="flex items-center justify-center p-5 sm:p-8 lg:p-12">
                    <div className="w-full max-w-md">
                        <Link
                            href="/"
                            className="mb-8 flex w-fit items-center gap-3 lg:hidden"
                        >
                            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-400/30 bg-emerald-400/10 text-sm font-semibold text-emerald-300">
                                HS
                            </span>
                            <span className="text-sm font-semibold text-white">
                                AHANTO Henri
                            </span>
                        </Link>

                        <div className="rounded-3xl border border-white/10 bg-[#0a101b]/90 p-6 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.95)] backdrop-blur-xl sm:p-8">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-300">
                                <LockIcon className="h-5 w-5" />
                            </div>
                            <h2 className="mt-5 text-2xl font-semibold tracking-tight text-white">
                                Connexion administrateur
                            </h2>
                            <p className="mt-2 text-sm leading-6 text-slate-400">
                                Accédez au back-office avec le compte créé via{' '}
                                <code className="rounded bg-white/[0.06] px-1.5 py-0.5 text-[11px] text-slate-300">
                                    php artisan admin:create
                                </code>
                                .
                            </p>

                            {status && (
                                <div className="mt-5">
                                    <Alert variant="success">{status}</Alert>
                                </div>
                            )}

                            <form onSubmit={submit} className="mt-7 space-y-5">
                                <Field
                                    label="Adresse email"
                                    htmlFor="email"
                                    error={errors.email}
                                >
                                    <TextInput
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(event) =>
                                            setData('email', event.target.value)
                                        }
                                        autoComplete="username"
                                        autoFocus
                                        placeholder="vous@exemple.com"
                                        required
                                    />
                                </Field>

                                <Field
                                    label="Mot de passe"
                                    htmlFor="password"
                                    error={errors.password}
                                >
                                    <TextInput
                                        id="password"
                                        type="password"
                                        value={data.password}
                                        onChange={(event) =>
                                            setData(
                                                'password',
                                                event.target.value,
                                            )
                                        }
                                        autoComplete="current-password"
                                        placeholder="••••••••••••"
                                        required
                                    />
                                </Field>

                                <label className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-400">
                                    <input
                                        type="checkbox"
                                        checked={data.remember}
                                        onChange={(event) =>
                                            setData(
                                                'remember',
                                                event.target.checked,
                                            )
                                        }
                                        className="h-4 w-4 rounded accent-emerald-400"
                                    />
                                    Rester connecté sur cet appareil
                                </label>

                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full"
                                >
                                    {processing ? 'Connexion…' : 'Se connecter'}
                                    {!processing && (
                                        <ArrowRightIcon className="h-4 w-4" />
                                    )}
                                </Button>
                            </form>

                            <div className="mt-6 flex items-center justify-center gap-2 border-t border-white/10 pt-5 text-xs text-slate-500">
                                <ShieldIcon className="h-3.5 w-3.5" />
                                Session protégée · Aucune inscription publique
                            </div>
                        </div>

                        <div className="mt-6 text-center">
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 text-xs font-medium text-slate-500 transition hover:text-slate-300"
                            >
                                <ArrowLeftIcon className="h-3.5 w-3.5" />
                                Retour au portfolio
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
