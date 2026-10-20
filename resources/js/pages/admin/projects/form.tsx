import { useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import AdminLayout from '@/layouts/admin-layout';
import type { Project } from '@/types';
import {
    Button,
    CheckboxField,
    ErrorSummary,
    Field,
    LinkButton,
    SectionCard,
    Select,
    StringListField,
    TextArea,
    TextInput,
} from '@/components/admin/ui';
import { ArrowLeftIcon } from '@/components/admin/icons';

type ProjectForm = {
    title: string;
    slug: string;
    description: string;
    tags: string[];
    kind: string;
    href: string;
    accent: Project['accent'];
    snippet: string;
    sort_order: number;
    published: boolean;
};

export default function ProjectFormPage({ project }: { project?: Project }) {
    const { data, setData, post, put, processing, errors } =
        useForm<ProjectForm>({
            title: project?.title ?? '',
            slug: project?.slug ?? '',
            description: project?.description ?? '',
            tags: project?.tags.length ? project.tags : [''],
            kind: project?.kind ?? 'Application web',
            href: project?.href ?? '',
            accent: project?.accent ?? 'laravel',
            snippet: project?.snippet ?? '$ php artisan serve',
            sort_order: project?.sort_order ?? 0,
            published: project?.published ?? true,
        });

    const errorBag = errors as Record<string, string | undefined>;
    const isEditing = Boolean(project);

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (project) {
            put(`/admin/projects/${project.id}`, { preserveScroll: true });
        } else {
            post('/admin/projects');
        }
    };

    return (
        <AdminLayout
            title={isEditing ? 'Modifier le projet' : 'Nouveau projet'}
            description={
                isEditing
                    ? 'Mettez à jour la fiche du projet. Les changements seront visibles après enregistrement.'
                    : 'Ajoutez une réalisation à votre portfolio. Vous pourrez la publier immédiatement ou la garder masquée.'
            }
            active="projects"
            actions={
                <>
                    <LinkButton href="/admin/projects" variant="ghost">
                        <ArrowLeftIcon className="h-4 w-4" />
                        Annuler
                    </LinkButton>
                    <Button
                        type="submit"
                        form="project-form"
                        disabled={processing}
                    >
                        {processing
                            ? 'Enregistrement…'
                            : isEditing
                              ? 'Enregistrer'
                              : 'Créer le projet'}
                    </Button>
                </>
            }
        >
            <form
                id="project-form"
                onSubmit={submit}
                className="grid gap-6 xl:grid-cols-[1.6fr_1fr]"
            >
                <div className="space-y-6">
                    <ErrorSummary errors={errorBag as Record<string, string>} />

                    <SectionCard
                        title="Informations générales"
                        description="Le contenu principal de la carte projet sur le portfolio."
                    >
                        <div className="space-y-5">
                            <Field
                                label="Titre"
                                htmlFor="title"
                                error={errorBag.title}
                            >
                                <TextInput
                                    id="title"
                                    value={data.title}
                                    onChange={(event) =>
                                        setData('title', event.target.value)
                                    }
                                    placeholder="Gestion des ventes"
                                    autoFocus
                                />
                            </Field>

                            <Field
                                label="Slug"
                                htmlFor="slug"
                                error={errorBag.slug}
                                hint="Laissez vide pour générer automatiquement depuis le titre."
                            >
                                <TextInput
                                    id="slug"
                                    value={data.slug}
                                    onChange={(event) =>
                                        setData('slug', event.target.value)
                                    }
                                    placeholder="gestion-des-ventes"
                                />
                            </Field>

                            <Field
                                label="Description"
                                htmlFor="description"
                                error={errorBag.description}
                            >
                                <TextArea
                                    id="description"
                                    value={data.description}
                                    onChange={(event) =>
                                        setData(
                                            'description',
                                            event.target.value,
                                        )
                                    }
                                    rows={5}
                                    placeholder="Présentez le contexte, les fonctionnalités et les choix techniques…"
                                />
                            </Field>

                            <div className="grid gap-5 sm:grid-cols-2">
                                <Field
                                    label="Type de projet"
                                    htmlFor="kind"
                                    error={errorBag.kind}
                                >
                                    <TextInput
                                        id="kind"
                                        value={data.kind}
                                        onChange={(event) =>
                                            setData('kind', event.target.value)
                                        }
                                        placeholder="Application web"
                                    />
                                </Field>
                                <Field
                                    label="Lien externe"
                                    htmlFor="href"
                                    error={errorBag.href}
                                    hint="GitHub, démo ou site du projet."
                                >
                                    <TextInput
                                        id="href"
                                        value={data.href}
                                        onChange={(event) =>
                                            setData('href', event.target.value)
                                        }
                                        placeholder="https://…"
                                    />
                                </Field>
                            </div>
                        </div>
                    </SectionCard>

                    <SectionCard
                        title="Présentation technique"
                        description="Les éléments affichés dans la partie terminal de la carte projet."
                    >
                        <div className="space-y-5">
                            <Field
                                label="Extrait de commande"
                                htmlFor="snippet"
                                error={errorBag.snippet}
                                hint="Une courte ligne monospace, par exemple une commande ou un composant."
                            >
                                <TextInput
                                    id="snippet"
                                    value={data.snippet}
                                    onChange={(event) =>
                                        setData('snippet', event.target.value)
                                    }
                                    placeholder="$ php artisan serve"
                                    className="font-mono"
                                />
                            </Field>

                            <StringListField
                                label="Tags"
                                values={data.tags}
                                onChange={(values) => setData('tags', values)}
                                placeholder="Laravel"
                                error={errorBag.tags}
                                addLabel="Ajouter un tag"
                            />
                        </div>
                    </SectionCard>
                </div>

                <div className="space-y-6">
                    <SectionCard
                        title="Publication"
                        description="Contrôlez la visibilité et l’ordre d’affichage."
                    >
                        <div className="space-y-5">
                            <CheckboxField
                                label="Publier le projet"
                                description="Visible sur le portfolio et dans l’API publique."
                                checked={data.published}
                                onChange={(event) =>
                                    setData('published', event.target.checked)
                                }
                            />

                            <Field
                                label="Ordre d’affichage"
                                htmlFor="sort_order"
                                error={errorBag.sort_order}
                                hint="Les nombres les plus petits apparaissent en premier."
                            >
                                <TextInput
                                    id="sort_order"
                                    type="number"
                                    min={0}
                                    value={data.sort_order}
                                    onChange={(event) =>
                                        setData(
                                            'sort_order',
                                            Number(event.target.value),
                                        )
                                    }
                                />
                            </Field>
                        </div>
                    </SectionCard>

                    <SectionCard
                        title="Accent visuel"
                        description="La couleur utilisée par la carte du projet."
                    >
                        <Field
                            label="Couleur"
                            htmlFor="accent"
                            error={errorBag.accent}
                        >
                            <Select
                                id="accent"
                                value={data.accent}
                                onChange={(event) =>
                                    setData(
                                        'accent',
                                        event.target.value as Project['accent'],
                                    )
                                }
                            >
                                <option value="laravel">Laravel · rose</option>
                                <option value="python">Python · cyan</option>
                                <option value="php">PHP · indigo</option>
                                <option value="yellow">Jaune · ambre</option>
                            </Select>
                        </Field>
                        <div className="mt-4 flex gap-2">
                            {(
                                ['laravel', 'python', 'php', 'yellow'] as const
                            ).map((accent) => (
                                <button
                                    key={accent}
                                    type="button"
                                    onClick={() => setData('accent', accent)}
                                    className={`h-8 flex-1 rounded-lg border transition ${
                                        data.accent === accent
                                            ? 'border-white/40 ring-2 ring-white/10'
                                            : 'border-white/10 opacity-70 hover:opacity-100'
                                    } ${accentPreview[accent]}`}
                                    aria-label={`Choisir l’accent ${accent}`}
                                />
                            ))}
                        </div>
                    </SectionCard>

                    {isEditing && (
                        <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4 text-xs leading-5 text-slate-500">
                            Dernière modification :{' '}
                            <span className="text-slate-400">
                                {new Date(project!.updated_at).toLocaleString(
                                    'fr-FR',
                                )}
                            </span>
                        </div>
                    )}
                </div>
            </form>
        </AdminLayout>
    );
}

const accentPreview: Record<Project['accent'], string> = {
    laravel: 'bg-rose-400/80',
    python: 'bg-cyan-400/80',
    php: 'bg-indigo-400/80',
    yellow: 'bg-amber-300/80',
};
