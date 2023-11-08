import Link from 'next/link';

interface SideTageProps {
  id: string;
  title: string;
  topicCount?: boolean;
  totlaQuestions?: number;
  addonClasses: string;
}

const SideTags = ({
  id,
  title,
  topicCount,
  totlaQuestions,
  addonClasses,
}: SideTageProps) => {
  return (
    <Link
      href={`/tags/${id}`}
      className="flex flex-row justify-between items-center flex-wrap gap-2 "
    >
      <div
        className={`${addonClasses} font-semibold text-justify p-2 rounded-lg text-black/60 dark:text-white/60`}
      >
        <span>#</span> {title}
      </div>
      {topicCount && (
        <span className="dark:text-white/70 text-sm">{totlaQuestions}</span>
      )}
    </Link>
  );
};

export default SideTags;
