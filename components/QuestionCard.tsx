import { link } from 'fs';
import Link from 'next/link';
import SideTags from './rightbar/SideTags';
import Metric from './stats/Metric';
import { BiUpvote, BiComment } from 'react-icons/bi';
import { AiOutlineEye } from 'react-icons/ai';
import AvatarCard from './stats/AvatarCard';
import { timeStamp } from '@/lib/timeformat';
import { SignedIn, auth } from '@clerk/nextjs';
import EditActions from './EditActions';

interface QuestionProps {
  id: number;
  clerkId?: string | null;
  title: string;
  author: { clerkId: string; name: string; avatar: string };
  upvotes: number;
  replies: number;
  view: number;
  createAt: Date;
  tags: { id: number; name: string; _id: string }[];
}

const QuestionCard = ({
  id,
  clerkId,
  title,
  author,
  upvotes,
  replies,
  view,
  createAt,
  tags,
}: QuestionProps) => {
  const showActionsButtons = clerkId && clerkId === author.clerkId;
  return (
    <div className="border border-black/10 dark:border-white/20 rounded-md p-8 sm:px-10">
      <div className="flex items-center justify-between  gap-2 ">
        <span className="md:hidden subtle-regular text-dark-400_light-700 line-clamp-1">
          {timeStamp(createAt)}
        </span>
        <Link href={`/question/${id}`}>
          <h3 className="h3-semibold base-semibold text-dark-200_light-900 line-clamp-1 flex-1">
            {title}
          </h3>
        </Link>
        <SignedIn>
          {showActionsButtons && (
            <EditActions type="post" itemId={JSON.stringify(id)} />
          )}
        </SignedIn>
      </div>

      <div className="mt-3.5 flex flex-wrap gap-1">
        {tags.map((tag) => {
          const { id, _id, name } = tag;
          return (
            <SideTags key={id} _id={_id} title={name} addonClasses="text-sm" />
          );
        })}
      </div>
      <div className="w-full flex-between flex-wrap mt-6">
        <AvatarCard
          imgSrc={author.avatar}
          author={author.name}
          isAuthor={true}
          href={`/profile/${author.clerkId}`}
          title={`- asked ${timeStamp(createAt)}`}
        />
        <div className="flex gap-3">
          <Metric
            icon={<BiUpvote size={15} className="text-dark-400_light-800" />}
            value={upvotes}
            title="Votes"
            addonTextStyle="small-medium text-dark-400_light-800"
          />
          <Metric
            icon={<BiComment size={15} className="text-dark-400_light-800" />}
            value={replies}
            title="Comments"
            addonTextStyle="small-medium text-dark-400_light-800"
          />
          <Metric
            icon={
              <AiOutlineEye size={15} className="text-dark-400_light-800" />
            }
            value={view}
            title="views"
            addonTextStyle="small-medium text-dark-400_light-800"
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
