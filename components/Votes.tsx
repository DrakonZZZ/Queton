'use client';

import { abbreviateNumber } from '@/lib/abbreviateNumber';
import { downvoteAnswer, upvoteAnswer } from '@/lib/actions/answer.action';
import { downvoteQuestion, upvoteQuestion } from '@/lib/actions/ask.actions';
import { savedQuestion } from '@/lib/actions/user.action';
import { usePathname, useRouter } from 'next/navigation';
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

const Votes = ({
  type,
  itemId,
  userId,
  upvotes,
  hasupVoted,
  downvotes,
  hasdownVoted,
  hasSaved,
}: VotesProps) => {
  const pathname = usePathname();
  // const router = useRouter();

  const handleSave = async () => {
    await savedQuestion({
      userId: JSON.parse(userId),
      questionId: JSON.parse(itemId),
      path: pathname,
    });
  };

  console.log(hasSaved);
  const handleVote = async (action: string) => {
    if (!userId) {
      return;
    }

    if (action === 'upvote') {
      if (type === 'Question') {
        await upvoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted,
          hasdownVoted,
          path: pathname,
        });
      } else if (type === 'Answer') {
        await upvoteAnswer({
          replyId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted,
          hasdownVoted,
          path: pathname,
        });
      }
      //display notif
      return;
    }

    if (action === 'downvote') {
      if (type === 'Question') {
        await downvoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted,
          hasdownVoted,
          path: pathname,
        });
      } else if (type === 'Answer') {
        await downvoteAnswer({
          replyId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted,
          hasdownVoted,
          path: pathname,
        });
      }
      //display notif
      return;
    }
  };

  return (
    <div className="flex gap-5">
      <div className="flex-center gap-1">
        <div
          className="flex-center gap-1.5 cursor-pointer dark:text-white"
          onClick={() => {
            handleVote('upvote');
          }}
        >
          {hasupVoted ? <BiSolidUpvote size={14} /> : <BiUpvote size={14} />}
        </div>
        <div className="flex-center  min-w-[18px] rounded-sm p-1">
          <p className="subtle-medium text-dark-400_light-900">
            {abbreviateNumber(upvotes)}
          </p>
        </div>
      </div>
      <div className="flex-center gap-1">
        <div
          className="flex-center gap-1.5 cursor-pointer dark:text-white"
          onClick={() => {
            handleVote('downvote');
          }}
        >
          {hasdownVoted ? (
            <BiSolidDownvote size={14} />
          ) : (
            <BiDownvote size={14} />
          )}
        </div>
        <div className="flex-center  min-w-[18px] rounded-sm p-1">
          <p className="subtle-medium text-dark-400_light-900">
            {abbreviateNumber(downvotes)}
          </p>
        </div>
      </div>
      {type === 'Question' && (
        <div className="flex-center gap-1">
          <div
            className="flex-center gap-1.5 cursor-pointer dark:text-white"
            onClick={() => {
              handleSave();
            }}
          >
            {hasSaved ? <FaBookmark size={12} /> : <FaRegBookmark size={12} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default Votes;