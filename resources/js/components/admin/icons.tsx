import type { ReactNode, SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

function Icon({
    children,
    className = 'h-5 w-5',
    ...props
}: IconProps & { children: ReactNode }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.7}
            stroke="currentColor"
            aria-hidden="true"
            {...props}
            className={className}
        >
            {children}
        </svg>
    );
}

export function DashboardIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <rect x="3" y="3" width="7" height="7" rx="1.5" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" />
            <rect x="14" y="14" width="7" height="7" rx="1.5" />
        </Icon>
    );
}

export function UserIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <circle cx="12" cy="8" r="3.5" />
            <path d="M5 20c.8-3.4 3.4-5 7-5s6.2 1.6 7 5" />
        </Icon>
    );
}

export function FolderIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <path d="M3.5 6.5A1.5 1.5 0 0 1 5 5h4l2 2h8a1.5 1.5 0 0 1 1.5 1.5v9A1.5 1.5 0 0 1 19 19H5a1.5 1.5 0 0 1-1.5-1.5v-11Z" />
        </Icon>
    );
}

export function LayersIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <path d="m12 3 8.5 4.5L12 12 3.5 7.5 12 3Z" />
            <path d="m4 12 8 4.3 8-4.3" />
            <path d="m4 16.5 8 4.3 8-4.3" />
        </Icon>
    );
}

export function RouteIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <circle cx="6" cy="5" r="2" />
            <circle cx="18" cy="19" r="2" />
            <path d="M8 5h4a4 4 0 0 1 0 8h-1a4 4 0 0 0 0 8h5" />
        </Icon>
    );
}

export function MailIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m4 7 8 6 8-6" />
        </Icon>
    );
}

export function LogoutIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3" />
            <path d="M10 8l-4 4 4 4" />
            <path d="M6 12h10" />
        </Icon>
    );
}

export function MenuIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <path d="M4 7h16M4 12h16M4 17h16" />
        </Icon>
    );
}

export function CloseIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <path d="m6 6 12 12M18 6 6 18" />
        </Icon>
    );
}

export function PlusIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <path d="M12 5v14M5 12h14" />
        </Icon>
    );
}

export function PencilIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <path d="m4 20 4.5-1 10-10a2.1 2.1 0 0 0-3-3l-10 10L4 20Z" />
            <path d="m13.5 5.5 3 3" />
        </Icon>
    );
}

export function TrashIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <path d="M4 7h16" />
            <path d="M9 7V5h6v2" />
            <path d="m6 7 1 13h10l1-13" />
            <path d="M10 11v5M14 11v5" />
        </Icon>
    );
}

export function CheckIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <path d="m5 12.5 4.5 4.5L19 6.5" />
        </Icon>
    );
}

export function AlertIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <path d="M12 4 3 20h18L12 4Z" />
            <path d="M12 9v5M12 17h.01" />
        </Icon>
    );
}

export function EyeIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
            <circle cx="12" cy="12" r="2.5" />
        </Icon>
    );
}

export function ArrowLeftIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <path d="M19 12H5M11 6l-6 6 6 6" />
        </Icon>
    );
}

export function ArrowRightIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <path d="M5 12h14M13 6l6 6-6 6" />
        </Icon>
    );
}

export function ExternalLinkIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <path d="M14 4h6v6M20 4l-9 9" />
            <path d="M18 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5" />
        </Icon>
    );
}

export function SearchIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <circle cx="11" cy="11" r="6.5" />
            <path d="m16 16 4 4" />
        </Icon>
    );
}

export function ShieldIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <path d="M12 3 5 6v5c0 4.5 2.8 8 7 10 4.2-2 7-5.5 7-10V6l-7-3Z" />
            <path d="m9 12 2 2 4-4" />
        </Icon>
    );
}

export function SparklesIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <path d="m12 3 1.4 4.1L17.5 8.5l-4.1 1.4L12 14l-1.4-4.1-4.1-1.4 4.1-1.4L12 3Z" />
            <path d="m18.5 14 .8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2Z" />
            <path d="m5 15 .7 1.8 1.8.7-1.8.7L5 20l-.7-1.8-1.8-.7 1.8-.7L5 15Z" />
        </Icon>
    );
}

export function ClockIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <circle cx="12" cy="12" r="8.5" />
            <path d="M12 7v5l3.5 2" />
        </Icon>
    );
}

export function GlobeIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <circle cx="12" cy="12" r="8.5" />
            <path d="M3.5 12h17M12 3.5c2.4 2.4 3.5 5.2 3.5 8.5s-1.1 6.1-3.5 8.5c-2.4-2.4-3.5-5.2-3.5-8.5S9.6 5.9 12 3.5Z" />
        </Icon>
    );
}

export function LockIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <rect x="5" y="10" width="14" height="10" rx="2" />
            <path d="M8 10V7a4 4 0 0 1 8 0v3" />
            <path d="M12 14v2" />
        </Icon>
    );
}

export function CalendarIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <rect x="3.5" y="5" width="17" height="15" rx="2" />
            <path d="M7.5 3v4M16.5 3v4M3.5 9.5h17" />
        </Icon>
    );
}

export function BriefcaseIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <rect x="3" y="7" width="18" height="12" rx="2" />
            <path d="M9 7V5h6v2M3 12h18" />
        </Icon>
    );
}

export function GraduationIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <path d="m3 9 9-4 9 4-9 4-9-4Z" />
            <path d="M7 11v4c0 1.7 2.2 3 5 3s5-1.3 5-3v-4" />
            <path d="M21 9v5" />
        </Icon>
    );
}

export function TagIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <path d="M4 4h6l10 10-6 6L4 10V4Z" />
            <circle cx="8" cy="8" r="1" />
        </Icon>
    );
}

export function ChevronRightIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <path d="m9 5 7 7-7 7" />
        </Icon>
    );
}
