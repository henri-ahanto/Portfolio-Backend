import type { TimelineItem } from '@/types';
import TimelineFormPage from './form';

export default function EditTimelineItem({
    timelineItem,
}: {
    timelineItem: TimelineItem;
}) {
    return <TimelineFormPage timelineItem={timelineItem} />;
}
