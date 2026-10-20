import type { SkillCategory } from '@/types';
import SkillFormPage from './form';

export default function EditSkillCategory({
    skillCategory,
}: {
    skillCategory: SkillCategory;
}) {
    return <SkillFormPage skillCategory={skillCategory} />;
}
