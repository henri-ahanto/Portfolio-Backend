export function formatDate(value: string, withTime = true): string {
    return new Intl.DateTimeFormat('fr-FR', {
        dateStyle: 'medium',
        ...(withTime ? { timeStyle: 'short' } : {}),
    }).format(new Date(value));
}

export function formatLongDate(value = new Date()): string {
    return new Intl.DateTimeFormat('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(value);
}

export function initials(name: string): string {
    return name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part.charAt(0).toUpperCase())
        .join('');
}

export function excerpt(value: string, length = 120): string {
    const clean = value.replace(/\s+/g, ' ').trim();

    return clean.length > length
        ? `${clean.slice(0, length).trimEnd()}…`
        : clean;
}
