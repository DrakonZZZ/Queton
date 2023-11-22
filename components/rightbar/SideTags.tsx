import Link from 'next/link';
import Tag from '../Tag';

interface SideTageProps {
  _id: string | number;
  title: string;
  topicCount?: boolean;
  totlaQuestions?: number;
  addonClasses?: string;
}

const SideTags = ({
  _id,
  title,
  topicCount,
  totlaQuestions,
  addonClasses,
}: SideTageProps) => {
  return (
    <Link
      href={`/tags/${_id}`}
      className="flex flex-row justify-between items-center flex-wrap gap-2 "
    >
      <Tag addonClasses={addonClasses} title={title} />
      {topicCount && (
        <span className="dark:text-white/70 text-sm">{totlaQuestions}</span>
      )}
    </Link>
  );
};

export default SideTags;
