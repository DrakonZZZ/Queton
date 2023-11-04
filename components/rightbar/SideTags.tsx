import Link from 'next/link';

interface SideTageProps {
  _id: number;
  title: string;
  topicCount?: boolean;
  totlaQuestions?: number;
}

const SideTags = ({
  _id,
  title,
  topicCount,
  totlaQuestions,
}: SideTageProps) => {
  return (
    <Link
      href={`/tags/${_id}`}
      className="flex flex-row justify-between items-center flex-wrap gap-2 px-6"
    >
      <div className="text-sm font-bold text-justify p-2 rounded-lg text-zinc-500">
        <span>#</span> {title}
      </div>
      {topicCount && (
        <span className="dark:text-white/70 text-sm">{totlaQuestions}</span>
      )}
    </Link>
  );
};

export default SideTags;
