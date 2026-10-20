import { useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import AdminLayout from '@/layouts/admin-layout';
import type { TimelineItem } from '@/types';
import {
    Button,
    CheckboxField,
    ErrorSummary,
    Field,
    LinkButton,
    SectionCard,
    Select,
    TextArea,
    TextInput,
} from '@/components/admin/ui';
import { ArrowLeftIcon } from '@/components/admin/icons';

type TimelineForm = {
    date: string;
    title: string;
    place: string;
    description: string;
    type: TimelineItem['type'];
    current: boolean;
    sort_order: number;
    published: boolean;
};

export default function TimelineFormPage({
    timelineItem,
}: {
    timelineItem?: TimelineItem;
}) {
    const { data, setData, post, put, processing, errors } =
        useForm<TimelineForm>({
            date: timelineItem?.date ?? '',
            title: timelineItem?.title ?? '',
            place: timelineItem?.place ?? '',
            description: timelineItem?.description ?? '',
            type: timelineItem?.type ?? 'work',
            current: timelineItem?.current ?? false,
            sort_order: timelineItem?.sort_order ?? 0,
            published: timelineItem?.published ?? true,
        });

    const errorBag = errors as Record<string, string | undefined>;
    const isEditing = Boolean(timelineItem);

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (timelineItem) {
            put(`/admin/timeline/${timelineItem.id}`, { preserveScroll: true });
        } else {
            post('/admin/timeline');
        }
    };

    return (
        <AdminLayout
            title={isEditing ? 'Modifier l’étape' : 'Nouvelle étape'}
            description={
                isEditing
                    ? 'Mettez à jour cette expérience ou formation dans la chronologie.'
                    : 'Ajoutez une expérience professionnelle ou une formation au parcours.'
            }
            active="timeline"
            actions={
                <>
                    <LinkButton href="/admin/timeline" variant="ghost">
                        <ArrowLeftIcon className="h-4 w-4" />
                        Annuler
                    </LinkButton>
                    <Button
                        type="submit"
                        form="timeline-form"
                        disabled={processing}
                    >
                        {processing
                            ? 'Enregistrement…'
                            : isEditing
                              ? 'Enregistrer'
                              : 'Créer l’étape'}
                    </Button>
                </>
            }
        >
            <form
                id="timeline-form"
                onSubmit={submit}
                className="grid gap-6 xl:grid-cols-[1.6fr_1fr]"
            >
                <div className="space-y-6">
                    <ErrorSummary errors={errorBag as Record<string, string>} />

                    <SectionCard
                        title="Informations"
                        description="La période, l’intitulé et le lieu affichés dans la chronologie."
                    >
                        <div className="space-y-5">
                            <div className="grid gap-5 sm:grid-cols-2">
                                <Field
                                    label="Période"
                                    htmlFor="date"
                                    error={errorBag.date}
                                    hint="Ex. Sept. 2026 — Aujourd’hui"
                                >
                                    <TextInput
                                        id="date"
                                        value={data.date}
                                        onChange={(event) =>
                                            setData('date', event.target.value)
                                        }
                                        placeholder="Sept. 2026 — Aujourd’hui"
                                        autoFocus
                                    />
                                </Field>
                                <Field
                                    label="Type"
                                    htmlFor="type"
                                    error={errorBag.type}
                                >
                                    <Select
                                        id="type"
                                        value={data.type}
                                        onChange={(event) =>
                                            setData(
                                                'type',
                                                event.target
                                                    .value as TimelineItem['type'],
                                            )
                                        }
                                    >
                                        <option value="work">
                                            Expérience professionnelle
                                        </option>
                                        <option value="education">
                                            Formation
                                        </option>
                                    </Select>
                                </Field>
                            </div>

                            <Field
                                label="Intitulé"
                                htmlFor="title"
                                error={errorBag.title}
                            >
                                <TextInput
                                    id="title"
                                    value={data.title}
                                    onChange={(event) =>
                                        setData('title', event.target.value)
                                    }
                                    placeholder="Stage professionnel"
                                />
                            </Field>

                            <Field
                                label="Lieu / établissement"
                                htmlFor="place"
                                error={errorBag.place}
                            >
                                <TextInput
                                    id="place"
                                    value={data.place}
                                    onChange={(event) =>
                                        setData('place', event.target.value)
                                    }
                                    placeholder="WaohDigital"
                                />
                            </Field>

                            <Field
                                label="Description"
                                htmlFor="description"
                                error={errorBag.description}
                                hint="Optionnelle. Une phrase suffit pour contextualiser l’étape."
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
                                    rows={4}
                                    placeholder="Missions, technologies ou enseignements marquants…"
                                />
                            </Field>
                        </div>
                    </SectionCard>
                </div>

                <div className="space-y-6">
                    <SectionCard
                        title="Publication"
                        description="Visibilité et position dans la chronologie."
                    >
                        <div className="space-y-5">
                            <CheckboxField
                                label="Publier l’étape"
                                description="Visible sur le portfolio et dans l’API publique."
                                checked={data.published}
                                onChange={(event) =>
                                    setData('published', event.target.checked)
                                }
                            />
                            <CheckboxField
                                label="Étape en cours"
                                description="Ajoute un indicateur « En cours » sur la chronologie."
                                checked={data.current}
                                onChange={(event) =>
                                    setData('current', event.target.checked)
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

                    <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4 text-xs leading-5 text-slate-500">
                        La chronologie est affichée de haut en bas selon l’ordre
                        défini. Gardez une période lisible et un intitulé concis
                        pour chaque étape.
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
