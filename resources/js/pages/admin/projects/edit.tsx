import type { Project } from '@/types';
import ProjectFormPage from './form';

export default function EditProject({ project }: { project: Project }) {
    return <ProjectFormPage project={project} />;
}
