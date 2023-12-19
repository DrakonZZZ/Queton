import { timeStamp } from '@/lib/timeformat';
import Link from 'next/link';
import AvatarCard from './stats/AvatarCard';
import Metric from './stats/Metric';
import { BiComment, BiUpvote } from 'react-icons/bi';
import { AiOutlineEye } from 'react-icons/ai';
import { SignedIn } from '@clerk/nextjs';
import EditActions from './EditActions';

interface ReplyCardProp {
  id: number;
  clerkId?: string | null;
  question: {
    _id: string;
    title: string;
  };
  author: { clerkId: string; name: string; avatar: string };
  upvotes: number;
  createdAt: Date;
  view: number;
}

const ReplyCard = ({
  clerkId,
  id,
  question,
  author,
  upvotes,
  createdAt,
  view,
}: ReplyCardProp) => {
  const showActionsButtons = clerkId && clerkId === author.clerkId;
  return (
    <div className="flex flex-col-reverse items-center justify-between gap-5 sm:flex-row border border-black/10 dark:border-white/20 rounded-md p-6 sm:px-10">
      <AvatarCard
        imgSrc={author.avatar}
        author={author.name}
        isAuthor={true}
        href={`/profile/${author.clerkId}`}
        title={` - ${timeStamp(createdAt)}`}
      />
      <Link href={`/question/${question._id}/#${id}`}>
        <h3 className="sm:h4-semibold base-semibold dark:bg-white dark:text-black line-clamp-1 flex-1">
          {question.title}
        </h3>
      </Link>

      <SignedIn>
        {showActionsButtons && (
          <EditActions type="reply" itemId={JSON.stringify(id)} />
        )}
      </SignedIn>
    </div>
  );
};

export default ReplyCard;
