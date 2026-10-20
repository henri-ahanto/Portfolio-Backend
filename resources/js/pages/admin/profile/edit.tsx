import { useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import AdminLayout from '@/layouts/admin-layout';
import type { Profile } from '@/types';
import {
    Button,
    ErrorSummary,
    Field,
    SectionCard,
    StringListField,
    TextArea,
    TextInput,
    IconButton,
} from '@/components/admin/ui';
import { PlusIcon, TrashIcon } from '@/components/admin/icons';

type ProfileForm = {
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
        github: string;
        youtube: string;
        portfolio: string;
        cv: string;
    };
    languages: string[];
    stats: {
        value: number;
        suffix: string;
        label: string;
    }[];
    diplomas: {
        year: string;
        title: string;
        place: string;
    }[];
};

export default function EditProfile({ profile }: { profile: Profile }) {
    const { data, setData, put, processing, errors } = useForm<ProfileForm>({
        name: profile.name,
        first_name: profile.first_name,
        last_name: profile.last_name,
        handle: profile.handle,
        role: profile.role,
        roles: profile.roles,
        tagline: profile.tagline,
        location: profile.location,
        email: profile.email,
        phones: profile.phones,
        availability: profile.availability,
        bio: profile.bio,
        links: {
            github: profile.links.github ?? '',
            youtube: profile.links.youtube ?? '',
            portfolio: profile.links.portfolio ?? '',
            cv: profile.links.cv ?? '',
        },
        languages: profile.languages,
        stats: profile.stats.map((stat) => ({
            value: stat.value,
            suffix: stat.suffix ?? '',
            label: stat.label,
        })),
        diplomas: profile.diplomas,
    });

    const errorBag = errors as Record<string, string | undefined>;

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        put('/admin/profile', { preserveScroll: true });
    };

    const addStat = () => {
        setData('stats', [...data.stats, { value: 0, suffix: '', label: '' }]);
    };

    const updateStat = (
        index: number,
        key: keyof ProfileForm['stats'][number],
        value: string | number,
    ) => {
        setData(
            'stats',
            data.stats.map((stat, statIndex) =>
                statIndex === index ? { ...stat, [key]: value } : stat,
            ),
        );
    };

    const removeStat = (index: number) => {
        setData(
            'stats',
            data.stats.filter((_, statIndex) => statIndex !== index),
        );
    };

    const addDiploma = () => {
        setData('diplomas', [
            ...data.diplomas,
            { year: '', title: '', place: '' },
        ]);
    };

    const updateDiploma = (
        index: number,
        key: keyof ProfileForm['diplomas'][number],
        value: string,
    ) => {
        setData(
            'diplomas',
            data.diplomas.map((diploma, diplomaIndex) =>
                diplomaIndex === index ? { ...diploma, [key]: value } : diploma,
            ),
        );
    };

    const removeDiploma = (index: number) => {
        setData(
            'diplomas',
            data.diplomas.filter((_, diplomaIndex) => diplomaIndex !== index),
        );
    };

    return (
        <AdminLayout
            title="Profil"
            description="Les informations présentées dans le hero, la section à propos et les coordonnées publiques."
            active="profile"
            actions={
                <Button type="submit" form="profile-form" disabled={processing}>
                    {processing ? 'Enregistrement…' : 'Enregistrer'}
                </Button>
            }
        >
            <form id="profile-form" onSubmit={submit} className="space-y-6">
                <ErrorSummary errors={errorBag as Record<string, string>} />

                <div className="grid gap-6 xl:grid-cols-[1.55fr_1fr]">
                    <div className="space-y-6">
                        <SectionCard
                            title="Identité"
                            description="Les informations principales affichées sur le portfolio."
                        >
                            <div className="grid gap-5 sm:grid-cols-2">
                                <Field
                                    label="Nom complet"
                                    htmlFor="name"
                                    error={errorBag.name}
                                >
                                    <TextInput
                                        id="name"
                                        value={data.name}
                                        onChange={(event) =>
                                            setData('name', event.target.value)
                                        }
                                    />
                                </Field>
                                <Field
                                    label="Identifiant public"
                                    htmlFor="handle"
                                    error={errorBag.handle}
                                    hint="Sans espaces, avec tirets si besoin."
                                >
                                    <TextInput
                                        id="handle"
                                        value={data.handle}
                                        onChange={(event) =>
                                            setData(
                                                'handle',
                                                event.target.value,
                                            )
                                        }
                                    />
                                </Field>
                                <Field
                                    label="Prénom"
                                    htmlFor="first_name"
                                    error={errorBag.first_name}
                                >
                                    <TextInput
                                        id="first_name"
                                        value={data.first_name}
                                        onChange={(event) =>
                                            setData(
                                                'first_name',
                                                event.target.value,
                                            )
                                        }
                                    />
                                </Field>
                                <Field
                                    label="Nom"
                                    htmlFor="last_name"
                                    error={errorBag.last_name}
                                >
                                    <TextInput
                                        id="last_name"
                                        value={data.last_name}
                                        onChange={(event) =>
                                            setData(
                                                'last_name',
                                                event.target.value,
                                            )
                                        }
                                    />
                                </Field>
                                <Field
                                    label="Rôle principal"
                                    htmlFor="role"
                                    error={errorBag.role}
                                    className="sm:col-span-2"
                                >
                                    <TextInput
                                        id="role"
                                        value={data.role}
                                        onChange={(event) =>
                                            setData('role', event.target.value)
                                        }
                                    />
                                </Field>
                                <Field
                                    label="Accroche"
                                    htmlFor="tagline"
                                    error={errorBag.tagline}
                                    className="sm:col-span-2"
                                >
                                    <TextArea
                                        id="tagline"
                                        value={data.tagline}
                                        onChange={(event) =>
                                            setData(
                                                'tagline',
                                                event.target.value,
                                            )
                                        }
                                        rows={3}
                                    />
                                </Field>
                                <Field
                                    label="Localisation"
                                    htmlFor="location"
                                    error={errorBag.location}
                                >
                                    <TextInput
                                        id="location"
                                        value={data.location}
                                        onChange={(event) =>
                                            setData(
                                                'location',
                                                event.target.value,
                                            )
                                        }
                                    />
                                </Field>
                                <Field
                                    label="Email public"
                                    htmlFor="email"
                                    error={errorBag.email}
                                >
                                    <TextInput
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(event) =>
                                            setData('email', event.target.value)
                                        }
                                    />
                                </Field>
                                <Field
                                    label="Disponibilité"
                                    htmlFor="availability"
                                    error={errorBag.availability}
                                    className="sm:col-span-2"
                                >
                                    <TextInput
                                        id="availability"
                                        value={data.availability}
                                        onChange={(event) =>
                                            setData(
                                                'availability',
                                                event.target.value,
                                            )
                                        }
                                    />
                                </Field>
                            </div>
                        </SectionCard>

                        <SectionCard
                            title="Présentation"
                            description="Les rôles affichés dans le hero et les paragraphes de la section à propos."
                        >
                            <div className="space-y-6">
                                <StringListField
                                    label="Rôles"
                                    values={data.roles}
                                    onChange={(values) =>
                                        setData('roles', values)
                                    }
                                    placeholder="Ex. Développeur Web Fullstack"
                                    error={errorBag.roles}
                                    addLabel="Ajouter un rôle"
                                />
                                <StringListField
                                    label="Biographie"
                                    values={data.bio}
                                    onChange={(values) =>
                                        setData('bio', values)
                                    }
                                    placeholder="Un paragraphe de présentation…"
                                    error={errorBag.bio}
                                    multiline
                                    addLabel="Ajouter un paragraphe"
                                />
                            </div>
                        </SectionCard>
                    </div>

                    <div className="space-y-6">
                        <SectionCard
                            title="Coordonnées"
                            description="Téléphones et liens utilisés par les boutons du portfolio."
                        >
                            <div className="space-y-6">
                                <StringListField
                                    label="Téléphones"
                                    values={data.phones}
                                    onChange={(values) =>
                                        setData('phones', values)
                                    }
                                    placeholder="+229 …"
                                    error={errorBag.phones}
                                    addLabel="Ajouter un téléphone"
                                />

                                <div className="space-y-4 border-t border-white/10 pt-5">
                                    <Field
                                        label="GitHub"
                                        htmlFor="github"
                                        error={errorBag['links.github']}
                                    >
                                        <TextInput
                                            id="github"
                                            value={data.links.github}
                                            onChange={(event) =>
                                                setData('links', {
                                                    ...data.links,
                                                    github: event.target.value,
                                                })
                                            }
                                            placeholder="https://github.com/…"
                                        />
                                    </Field>
                                    <Field
                                        label="YouTube"
                                        htmlFor="youtube"
                                        error={errorBag['links.youtube']}
                                    >
                                        <TextInput
                                            id="youtube"
                                            value={data.links.youtube}
                                            onChange={(event) =>
                                                setData('links', {
                                                    ...data.links,
                                                    youtube: event.target.value,
                                                })
                                            }
                                            placeholder="https://youtube.com/@…"
                                        />
                                    </Field>
                                    <Field
                                        label="Portfolio"
                                        htmlFor="portfolio"
                                        error={errorBag['links.portfolio']}
                                    >
                                        <TextInput
                                            id="portfolio"
                                            value={data.links.portfolio}
                                            onChange={(event) =>
                                                setData('links', {
                                                    ...data.links,
                                                    portfolio:
                                                        event.target.value,
                                                })
                                            }
                                            placeholder="https://…"
                                        />
                                    </Field>
                                    <Field
                                        label="CV"
                                        htmlFor="cv"
                                        error={errorBag['links.cv']}
                                    >
                                        <TextInput
                                            id="cv"
                                            value={data.links.cv}
                                            onChange={(event) =>
                                                setData('links', {
                                                    ...data.links,
                                                    cv: event.target.value,
                                                })
                                            }
                                            placeholder="/CV.pdf"
                                        />
                                    </Field>
                                </div>
                            </div>
                        </SectionCard>

                        <SectionCard
                            title="Langues"
                            description="Les langues parlées, affichées dans la section à propos."
                        >
                            <StringListField
                                label="Langues"
                                values={data.languages}
                                onChange={(values) =>
                                    setData('languages', values)
                                }
                                placeholder="Ex. Français"
                                error={errorBag.languages}
                                addLabel="Ajouter une langue"
                            />
                        </SectionCard>
                    </div>
                </div>

                <SectionCard
                    title="Statistiques"
                    description="Les chiffres clés affichés sous le hero."
                    action={
                        <Button variant="secondary" size="sm" onClick={addStat}>
                            <PlusIcon className="h-4 w-4" />
                            Ajouter
                        </Button>
                    }
                >
                    {errorBag.stats && (
                        <p className="mb-3 text-xs font-medium text-rose-300">
                            {errorBag.stats}
                        </p>
                    )}
                    <div className="space-y-3">
                        {data.stats.map((stat, index) => (
                            <div
                                key={index}
                                className="grid gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-3 sm:grid-cols-[120px_110px_1fr_auto]"
                            >
                                <Field
                                    label="Valeur"
                                    error={errorBag[`stats.${index}.value`]}
                                >
                                    <TextInput
                                        type="number"
                                        min={0}
                                        value={stat.value}
                                        onChange={(event) =>
                                            updateStat(
                                                index,
                                                'value',
                                                Number(event.target.value),
                                            )
                                        }
                                    />
                                </Field>
                                <Field
                                    label="Suffixe"
                                    error={errorBag[`stats.${index}.suffix`]}
                                >
                                    <TextInput
                                        value={stat.suffix}
                                        onChange={(event) =>
                                            updateStat(
                                                index,
                                                'suffix',
                                                event.target.value,
                                            )
                                        }
                                        placeholder="+"
                                    />
                                </Field>
                                <Field
                                    label="Libellé"
                                    error={errorBag[`stats.${index}.label`]}
                                >
                                    <TextInput
                                        value={stat.label}
                                        onChange={(event) =>
                                            updateStat(
                                                index,
                                                'label',
                                                event.target.value,
                                            )
                                        }
                                        placeholder="Projets réalisés"
                                    />
                                </Field>
                                <div className="flex items-end">
                                    <IconButton
                                        label="Supprimer cette statistique"
                                        tone="danger"
                                        onClick={() => removeStat(index)}
                                        disabled={data.stats.length <= 1}
                                    >
                                        <TrashIcon className="h-4 w-4" />
                                    </IconButton>
                                </div>
                            </div>
                        ))}
                    </div>
                </SectionCard>

                <SectionCard
                    title="Diplômes"
                    description="Le parcours académique affiché dans la section à propos."
                    action={
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={addDiploma}
                        >
                            <PlusIcon className="h-4 w-4" />
                            Ajouter
                        </Button>
                    }
                >
                    {errorBag.diplomas && (
                        <p className="mb-3 text-xs font-medium text-rose-300">
                            {errorBag.diplomas}
                        </p>
                    )}
                    <div className="space-y-3">
                        {data.diplomas.map((diploma, index) => (
                            <div
                                key={index}
                                className="grid gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-3 sm:grid-cols-[100px_1fr_1fr_auto]"
                            >
                                <Field
                                    label="Année"
                                    error={errorBag[`diplomas.${index}.year`]}
                                >
                                    <TextInput
                                        value={diploma.year}
                                        onChange={(event) =>
                                            updateDiploma(
                                                index,
                                                'year',
                                                event.target.value,
                                            )
                                        }
                                        placeholder="2026"
                                    />
                                </Field>
                                <Field
                                    label="Diplôme"
                                    error={errorBag[`diplomas.${index}.title`]}
                                >
                                    <TextInput
                                        value={diploma.title}
                                        onChange={(event) =>
                                            updateDiploma(
                                                index,
                                                'title',
                                                event.target.value,
                                            )
                                        }
                                        placeholder="Licence…"
                                    />
                                </Field>
                                <Field
                                    label="Établissement"
                                    error={errorBag[`diplomas.${index}.place`]}
                                >
                                    <TextInput
                                        value={diploma.place}
                                        onChange={(event) =>
                                            updateDiploma(
                                                index,
                                                'place',
                                                event.target.value,
                                            )
                                        }
                                        placeholder="INSTI, Lokossa"
                                    />
                                </Field>
                                <div className="flex items-end">
                                    <IconButton
                                        label="Supprimer ce diplôme"
                                        tone="danger"
                                        onClick={() => removeDiploma(index)}
                                        disabled={data.diplomas.length <= 1}
                                    >
                                        <TrashIcon className="h-4 w-4" />
                                    </IconButton>
                                </div>
                            </div>
                        ))}
                    </div>
                </SectionCard>

                <div className="flex justify-end border-t border-white/10 pt-6">
                    <Button type="submit" disabled={processing}>
                        {processing
                            ? 'Enregistrement…'
                            : 'Enregistrer les modifications'}
                    </Button>
                </div>
            </form>
        </AdminLayout>
    );
}
