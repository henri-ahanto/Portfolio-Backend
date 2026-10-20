import { Link } from '@inertiajs/react';
import type {
    ButtonHTMLAttributes,
    InputHTMLAttributes,
    ReactNode,
    SelectHTMLAttributes,
    TextareaHTMLAttributes,
} from 'react';
import { cn } from '@/lib/utils';
import type { Paginated } from '@/types';
import {
    AlertIcon,
    ArrowRightIcon,
    CheckIcon,
    PlusIcon,
    TrashIcon,
} from './icons';

export type ButtonVariant =
    | 'primary'
    | 'secondary'
    | 'ghost'
    | 'danger'
    | 'subtle';
export type ButtonSize = 'sm' | 'md';

export const inputClass =
    'w-full rounded-xl border border-white/10 bg-[#080e18] px-3.5 py-2.5 text-sm text-slate-100 shadow-sm outline-none transition placeholder:text-slate-600 focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/15 disabled:cursor-not-allowed disabled:opacity-60';

export const textareaClass = cn(inputClass, 'min-h-28 resize-y leading-6');

export function buttonClasses(
    variant: ButtonVariant = 'primary',
    size: ButtonSize = 'md',
    className?: string,
): string {
    const variants: Record<ButtonVariant, string> = {
        primary:
            'border-emerald-400/40 bg-emerald-400 text-slate-950 shadow-[0_10px_30px_-12px_rgba(52,211,153,0.8)] hover:bg-emerald-300',
        secondary:
            'border-white/10 bg-white/[0.04] text-slate-100 hover:border-white/20 hover:bg-white/[0.08]',
        ghost: 'border-transparent bg-transparent text-slate-300 hover:bg-white/[0.06] hover:text-white',
        danger: 'border-rose-400/30 bg-rose-500/10 text-rose-200 hover:border-rose-400/50 hover:bg-rose-500/20',
        subtle: 'border-cyan-400/25 bg-cyan-400/10 text-cyan-200 hover:border-cyan-300/40 hover:bg-cyan-400/15',
    };

    return cn(
        'inline-flex items-center justify-center gap-2 rounded-xl border font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40 disabled:cursor-not-allowed disabled:opacity-60',
        size === 'sm' ? 'px-3 py-2 text-xs' : 'px-4 py-2.5 text-sm',
        variants[variant],
        className,
    );
}

export function Button({
    variant = 'primary',
    size = 'md',
    className,
    type = 'button',
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    size?: ButtonSize;
}) {
    return (
        <button
            type={type}
            className={buttonClasses(variant, size, className)}
            {...props}
        />
    );
}

export function LinkButton({
    href,
    variant = 'secondary',
    size = 'md',
    className,
    children,
}: {
    href: string;
    variant?: ButtonVariant;
    size?: ButtonSize;
    className?: string;
    children: ReactNode;
}) {
    return (
        <Link href={href} className={buttonClasses(variant, size, className)}>
            {children}
        </Link>
    );
}

export function IconButton({
    label,
    tone = 'neutral',
    className,
    children,
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
    label: string;
    tone?: 'neutral' | 'danger';
}) {
    return (
        <button
            type="button"
            aria-label={label}
            title={label}
            className={cn(
                'inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-slate-400 transition hover:bg-white/[0.08] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40',
                tone === 'danger' &&
                    'hover:border-rose-400/40 hover:bg-rose-500/10 hover:text-rose-300',
                className,
            )}
            {...props}
        >
            {children}
        </button>
    );
}

export function Field({
    label,
    htmlFor,
    error,
    hint,
    className,
    children,
}: {
    label?: string;
    htmlFor?: string;
    error?: string;
    hint?: string;
    className?: string;
    children: ReactNode;
}) {
    return (
        <div className={cn('space-y-2', className)}>
            {label && (
                <label
                    htmlFor={htmlFor}
                    className="block text-sm font-medium text-slate-300"
                >
                    {label}
                </label>
            )}
            {children}
            {hint && <p className="text-xs leading-5 text-slate-500">{hint}</p>}
            {error && (
                <p className="text-xs font-medium text-rose-300">{error}</p>
            )}
        </div>
    );
}

export function TextInput({
    className,
    ...props
}: InputHTMLAttributes<HTMLInputElement>) {
    return <input className={cn(inputClass, className)} {...props} />;
}

export function TextArea({
    className,
    ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
    return <textarea className={cn(textareaClass, className)} {...props} />;
}

export function Select({
    className,
    children,
    ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
    return (
        <select
            className={cn(inputClass, 'appearance-none', className)}
            {...props}
        >
            {children}
        </select>
    );
}

export function CheckboxField({
    label,
    description,
    className,
    ...props
}: InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    description?: string;
    className?: string;
}) {
    return (
        <label
            className={cn(
                'flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3.5 transition hover:border-white/20 hover:bg-white/[0.05]',
                className,
            )}
        >
            <input
                type="checkbox"
                className="mt-0.5 h-4 w-4 shrink-0 accent-emerald-400"
                {...props}
            />
            <span>
                <span className="block text-sm font-medium text-slate-200">
                    {label}
                </span>
                {description && (
                    <span className="mt-0.5 block text-xs text-slate-500">
                        {description}
                    </span>
                )}
            </span>
        </label>
    );
}

export function Card({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <div
            className={cn(
                'overflow-hidden rounded-2xl border border-white/10 bg-[#0b1220] shadow-[0_24px_80px_-48px_rgba(0,0,0,0.95)]',
                className,
            )}
        >
            {children}
        </div>
    );
}

export function SectionCard({
    title,
    description,
    action,
    children,
    className,
}: {
    title: string;
    description?: string;
    action?: ReactNode;
    children: ReactNode;
    className?: string;
}) {
    return (
        <Card className={className}>
            <div className="flex flex-col gap-2 border-b border-white/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-sm font-semibold text-white">
                        {title}
                    </h2>
                    {description && (
                        <p className="mt-1 text-xs leading-5 text-slate-500">
                            {description}
                        </p>
                    )}
                </div>
                {action}
            </div>
            <div className="p-5">{children}</div>
        </Card>
    );
}

export function Badge({
    variant = 'neutral',
    className,
    children,
}: {
    variant?: 'success' | 'warning' | 'danger' | 'neutral' | 'info';
    className?: string;
    children: ReactNode;
}) {
    const variants = {
        success: 'border-emerald-400/25 bg-emerald-400/10 text-emerald-300',
        warning: 'border-amber-400/25 bg-amber-400/10 text-amber-300',
        danger: 'border-rose-400/25 bg-rose-400/10 text-rose-300',
        neutral: 'border-white/10 bg-white/[0.04] text-slate-400',
        info: 'border-cyan-400/25 bg-cyan-400/10 text-cyan-300',
    };

    return (
        <span
            className={cn(
                'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium',
                variants[variant],
                className,
            )}
        >
            {children}
        </span>
    );
}

export function Alert({
    variant = 'success',
    title,
    children,
}: {
    variant?: 'success' | 'error';
    title?: string;
    children: ReactNode;
}) {
    const isSuccess = variant === 'success';

    return (
        <div
            className={cn(
                'flex items-start gap-3 rounded-2xl border p-4 text-sm',
                isSuccess
                    ? 'border-emerald-400/20 bg-emerald-400/[0.07] text-emerald-100'
                    : 'border-rose-400/20 bg-rose-500/[0.08] text-rose-100',
            )}
        >
            <span
                className={cn(
                    'mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full',
                    isSuccess
                        ? 'bg-emerald-400/15 text-emerald-300'
                        : 'bg-rose-400/15 text-rose-300',
                )}
            >
                {isSuccess ? (
                    <CheckIcon className="h-4 w-4" />
                ) : (
                    <AlertIcon className="h-4 w-4" />
                )}
            </span>
            <div>
                {title && <p className="font-medium">{title}</p>}
                <div className={cn(title && 'mt-1', 'opacity-80')}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export function ErrorSummary({ errors }: { errors: Record<string, string> }) {
    const entries = Object.entries(errors);

    if (entries.length === 0) {
        return null;
    }

    return (
        <Alert variant="error" title="Certains champs doivent être corrigés.">
            <ul className="list-inside list-disc space-y-1 text-xs">
                {entries.map(([key, message]) => (
                    <li key={key}>{message}</li>
                ))}
            </ul>
        </Alert>
    );
}

export function StringListField({
    label,
    values,
    onChange,
    placeholder,
    hint,
    error,
    addLabel = 'Ajouter une ligne',
    multiline = false,
}: {
    label: string;
    values: string[];
    onChange: (values: string[]) => void;
    placeholder?: string;
    hint?: string;
    error?: string;
    addLabel?: string;
    multiline?: boolean;
}) {
    const update = (index: number, value: string) => {
        onChange(
            values.map((item, itemIndex) =>
                itemIndex === index ? value : item,
            ),
        );
    };

    const remove = (index: number) => {
        onChange(values.filter((_, itemIndex) => itemIndex !== index));
    };

    return (
        <Field label={label} hint={hint} error={error}>
            <div className="space-y-2">
                {values.map((value, index) => (
                    <div key={index} className="flex items-start gap-2">
                        {multiline ? (
                            <TextArea
                                value={value}
                                onChange={(event) =>
                                    update(index, event.target.value)
                                }
                                placeholder={placeholder}
                                rows={3}
                            />
                        ) : (
                            <TextInput
                                value={value}
                                onChange={(event) =>
                                    update(index, event.target.value)
                                }
                                placeholder={placeholder}
                            />
                        )}
                        <IconButton
                            label="Supprimer cette ligne"
                            tone="danger"
                            onClick={() => remove(index)}
                            disabled={values.length <= 1}
                            className="mt-0.5 shrink-0"
                        >
                            <TrashIcon className="h-4 w-4" />
                        </IconButton>
                    </div>
                ))}
            </div>
            <Button
                variant="ghost"
                size="sm"
                className="mt-3"
                onClick={() => onChange([...values, ''])}
            >
                <PlusIcon className="h-4 w-4" />
                {addLabel}
            </Button>
        </Field>
    );
}

export function EmptyState({
    icon,
    title,
    description,
    action,
}: {
    icon: ReactNode;
    title: string;
    description: string;
    action?: ReactNode;
}) {
    return (
        <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-slate-400">
                {icon}
            </div>
            <h3 className="mt-5 text-base font-semibold text-white">{title}</h3>
            <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                {description}
            </p>
            {action && <div className="mt-6">{action}</div>}
        </div>
    );
}

export function StatCard({
    label,
    value,
    detail,
    icon,
    href,
    accent = 'emerald',
}: {
    label: string;
    value: number;
    detail: string;
    icon: ReactNode;
    href: string;
    accent?: 'emerald' | 'cyan' | 'amber' | 'rose';
}) {
    const accents = {
        emerald: 'bg-emerald-400/10 text-emerald-300 border-emerald-400/20',
        cyan: 'bg-cyan-400/10 text-cyan-300 border-cyan-400/20',
        amber: 'bg-amber-400/10 text-amber-300 border-amber-400/20',
        rose: 'bg-rose-400/10 text-rose-300 border-rose-400/20',
    };

    return (
        <Link
            href={href}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b1220] p-5 transition hover:border-white/20 hover:bg-[#0d1626]"
        >
            <div className="pointer-events-none absolute -top-16 -right-16 h-32 w-32 rounded-full bg-emerald-400/[0.04] blur-2xl transition group-hover:bg-emerald-400/[0.08]" />
            <div className="flex items-start justify-between">
                <span
                    className={cn(
                        'flex h-10 w-10 items-center justify-center rounded-xl border',
                        accents[accent],
                    )}
                >
                    {icon}
                </span>
                <ArrowRightIcon className="h-4 w-4 text-slate-600 transition group-hover:translate-x-0.5 group-hover:text-slate-300" />
            </div>
            <p className="mt-5 text-3xl font-semibold tracking-tight text-white">
                {value}
            </p>
            <p className="mt-1 text-sm font-medium text-slate-300">{label}</p>
            <p className="mt-1 text-xs text-slate-500">{detail}</p>
        </Link>
    );
}

export function Pagination({ paginator }: { paginator: Paginated<unknown> }) {
    if (paginator.last_page <= 1) {
        return null;
    }

    const label = (value: string) =>
        value
            .replace('&laquo;', '«')
            .replace('&raquo;', '»')
            .replace('Previous', 'Précédent')
            .replace('Next', 'Suivant');

    return (
        <div className="flex flex-col gap-4 border-t border-white/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-slate-500">
                {paginator.from ?? 0}–{paginator.to ?? 0} sur {paginator.total}{' '}
                résultat
                {paginator.total > 1 ? 's' : ''}
            </p>
            <div className="flex flex-wrap items-center gap-1">
                {paginator.links.map((link, index) =>
                    link.url ? (
                        <Link
                            key={`${link.label}-${index}`}
                            href={link.url}
                            preserveScroll
                            className={cn(
                                'inline-flex min-w-9 items-center justify-center rounded-lg border px-3 py-1.5 text-xs font-medium transition',
                                link.active
                                    ? 'border-emerald-400/40 bg-emerald-400/15 text-emerald-200'
                                    : 'border-white/10 bg-white/[0.03] text-slate-400 hover:bg-white/[0.07] hover:text-white',
                            )}
                        >
                            {label(link.label)}
                        </Link>
                    ) : (
                        <span
                            key={`${link.label}-${index}`}
                            className="inline-flex min-w-9 items-center justify-center px-2 py-1.5 text-xs text-slate-600"
                        >
                            {label(link.label)}
                        </span>
                    ),
                )}
            </div>
        </div>
    );
}
