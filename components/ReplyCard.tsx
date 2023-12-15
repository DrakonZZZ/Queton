import { timeStamp } from '@/lib/timeformat';
import Link from 'next/link';

interface ReplyCardProp {
  id: number;
  clerkId?: string;
  question: {
    _id: string;
    title: string;
  };
  author: { clerkId: string; name: string; avatar: string };
  upvotes: number;
  createdAt: Date;
}

const ReplyCard = ({
  clerkId,
  id,
  question,
  author,
  upvotes,
  createdAt,
}: ReplyCardProp) => {
  console.log(timeStamp(createdAt));
  return (
    <Link href={`/question/${question._id}/#${id}`}>
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row border border-black/10 dark:border-white/20 rounded-md p-8 sm:px-10">
        <span className="subtle-regular line-clamp-1 flex">
          {timeStamp(createdAt)}
        </span>
        <h3 className="sm:h3-semibold base-semibold dark:bg-white dark:text-black line-clamp-1 flex-1">
          {question.title}
        </h3>
      </div>
    </Link>
  );
};

export default ReplyCard;
