import { link } from 'fs';
import Link from 'next/link';
import SideTags from './rightbar/SideTags';
import Metric from './stats/Metric';
import { BiUpvote, BiComment } from 'react-icons/bi';
import { AiOutlineEye } from 'react-icons/ai';
import AvatarCard from './stats/AvatarCard';
import { timeStamp } from '@/lib/timeformat';

interface QuestionProps {
  id: number;
  title: string;
  author: { id: number; name: string; imgSrc: string };
  upvotes: number;
  view: number;
  createAt: Date;
  tags: { id: number; tagName: string }[];
}

const QuestionCard = ({
  id,
  title,
  author,
  upvotes,
  view,
  createAt,
  tags,
}: QuestionProps) => {
  return (
    <div className="border border-black/10 dark:border-white/20 rounded-md p-8 sm:px-10">
      <div className="flex flex-col-reverse items-start justify-between gap-2 ">
        <span className="md:hidden subtle-regular text-dark-400_light-700 line-clamp-1">
          {timeStamp(createAt)}
        </span>
        <Link href={`/question/${id}`}>
          <h3 className="h3-semibold base-semibold text-dark-200_light-900 line-clamp-1 flex-1">
            {title}
          </h3>
        </Link>
      </div>
      {/* Editable button if signed in */}

      <div className="mt-3.5 flex flex-wrap gap-1">
        {tags.map((tag) => {
          const { id, tagName } = tag;
          return (
            <SideTags
              key={id}
              id={tagName}
              title={tagName}
              addonClasses="text-sm"
            />
          );
        })}
      </div>
      <div className="w-full flex-between flex-wrap mt-6">
        <AvatarCard
          imgSrc="/assets/icons/avatar.svg"
          author={author.name}
          isAuthor={true}
          href={`/profile/${author.id}`}
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
            value={upvotes}
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
