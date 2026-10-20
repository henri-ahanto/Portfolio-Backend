import { useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import AdminLayout from '@/layouts/admin-layout';
import type { SkillCategory } from '@/types';
import {
    Button,
    CheckboxField,
    ErrorSummary,
    Field,
    LinkButton,
    SectionCard,
    Select,
    StringListField,
    TextInput,
} from '@/components/admin/ui';
import { ArrowLeftIcon } from '@/components/admin/icons';

type SkillForm = {
    title: string;
    icon: SkillCategory['icon'];
    accent: SkillCategory['accent'];
    skills: string[];
    sort_order: number;
    published: boolean;
};

export default function SkillFormPage({
    skillCategory,
}: {
    skillCategory?: SkillCategory;
}) {
    const { data, setData, post, put, processing, errors } = useForm<SkillForm>(
        {
            title: skillCategory?.title ?? '',
            icon: skillCategory?.icon ?? 'code',
            accent: skillCategory?.accent ?? 'laravel',
            skills: skillCategory?.skills.length ? skillCategory.skills : [''],
            sort_order: skillCategory?.sort_order ?? 0,
            published: skillCategory?.published ?? true,
        },
    );

    const errorBag = errors as Record<string, string | undefined>;
    const isEditing = Boolean(skillCategory);

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (skillCategory) {
            put(`/admin/skills/${skillCategory.id}`, { preserveScroll: true });
        } else {
            post('/admin/skills');
        }
    };

    return (
        <AdminLayout
            title={isEditing ? 'Modifier la catégorie' : 'Nouvelle catégorie'}
            description={
                isEditing
                    ? 'Mettez à jour les technologies et l’apparence de cette catégorie.'
                    : 'Regroupez des technologies cohérentes pour structurer la section compétences.'
            }
            active="skills"
            actions={
                <>
                    <LinkButton href="/admin/skills" variant="ghost">
                        <ArrowLeftIcon className="h-4 w-4" />
                        Annuler
                    </LinkButton>
                    <Button
                        type="submit"
                        form="skill-form"
                        disabled={processing}
                    >
                        {processing
                            ? 'Enregistrement…'
                            : isEditing
                              ? 'Enregistrer'
                              : 'Créer la catégorie'}
                    </Button>
                </>
            }
        >
            <form
                id="skill-form"
                onSubmit={submit}
                className="grid gap-6 xl:grid-cols-[1.6fr_1fr]"
            >
                <div className="space-y-6">
                    <ErrorSummary errors={errorBag as Record<string, string>} />

                    <SectionCard
                        title="Informations"
                        description="Le titre, l’icône et les compétences de la catégorie."
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
                                    placeholder="Frameworks"
                                    autoFocus
                                />
                            </Field>

                            <Field
                                label="Icône"
                                htmlFor="icon"
                                error={errorBag.icon}
                            >
                                <Select
                                    id="icon"
                                    value={data.icon}
                                    onChange={(event) =>
                                        setData(
                                            'icon',
                                            event.target
                                                .value as SkillCategory['icon'],
                                        )
                                    }
                                >
                                    <option value="code">Code</option>
                                    <option value="layers">Frameworks</option>
                                    <option value="brain">IA / Data</option>
                                    <option value="database">
                                        Bases de données
                                    </option>
                                    <option value="boxes">Architecture</option>
                                    <option value="palette">Design</option>
                                </Select>
                            </Field>

                            <StringListField
                                label="Compétences"
                                values={data.skills}
                                onChange={(values) => setData('skills', values)}
                                placeholder="Laravel"
                                error={errorBag.skills}
                                addLabel="Ajouter une compétence"
                            />
                        </div>
                    </SectionCard>
                </div>

                <div className="space-y-6">
                    <SectionCard
                        title="Publication"
                        description="Visibilité et position dans la section."
                    >
                        <div className="space-y-5">
                            <CheckboxField
                                label="Publier la catégorie"
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
                        description="La couleur d’accompagnement de la catégorie."
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
                                        event.target
                                            .value as SkillCategory['accent'],
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

                    <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4 text-xs leading-5 text-slate-500">
                        Les catégories sont affichées dans l’ordre défini ici.
                        Utilisez des libellés courts et cohérents pour faciliter
                        la lecture.
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}

const accentPreview: Record<SkillCategory['accent'], string> = {
    laravel: 'bg-rose-400/80',
    python: 'bg-cyan-400/80',
    php: 'bg-indigo-400/80',
    yellow: 'bg-amber-300/80',
};
