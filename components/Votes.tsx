'use client';

import { abbreviateNumber } from '@/lib/abbreviateNumber';
import { upvoteQuestion } from '@/lib/actions/ask.actions';
import {
  BiUpvote,
  BiDownvote,
  BiSolidUpvote,
  BiSolidDownvote,
} from 'react-icons/bi';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';

interface VotesProps {
  type: string;
  itemId: string;
  userId: string;
  upvotes: number;
  hasupVoted: boolean;
  downvotes: number;
  hasdownVoted: boolean;
  hasSaved?: boolean;
}

const Votes = async ({
  type,
  itemId,
  userId,
  upvotes,
  hasupVoted,
  downvotes,
  hasdownVoted,
  hasSaved,
}: VotesProps) => {
  const handleSave = () => {};

  const handleVote = (action: string) => {};

  return (
    <div className="flex gap-5">
      <div className="flex-center gap-1">
        <div className="flex-center gap-1.5">
          {hasupVoted ? (
            <BiSolidUpvote size={14} />
          ) : (
            <BiUpvote
              size={14}
              className="cursor-pointer dark:text-white"
              onClick={() => {
                handlVote('upvote');
              }}
            />
          )}
        </div>
        <div className="flex-center  min-w-[18px] rounded-sm p-1">
          <p className="subtle-medium text-dark-400_light-900">
            {abbreviateNumber(upvotes)}
          </p>
        </div>
      </div>
      <div className="flex-center gap-1">
        <div className="flex-center gap-1.5">
          {hasdownVoted ? (
            <BiSolidDownvote size={14} />
          ) : (
            <BiDownvote
              size={14}
              className="cursor-pointer dark:text-white"
              onClick={() => {
                handlVote('downvote');
              }}
            />
          )}
        </div>
        <div className="flex-center  min-w-[18px] rounded-sm p-1">
          <p className="subtle-medium text-dark-400_light-900">
            {abbreviateNumber(downvotes)}
          </p>
        </div>
      </div>
      <div className="flex-center gap-1">
        <div className="flex-center gap-1.5">
          {hasSaved ? (
            <FaBookmark size={12} />
          ) : (
            <FaRegBookmark
              size={12}
              className="cursor-pointer dark:text-white"
              onClick={() => {
                handleSave();
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Votes;
