import Filter from '@/components/Filter';
import Pagination from '@/components/Pagination';
import ParseHTML from '@/components/ParseHTML';
import Votes from '@/components/Votes';
import { ReplyFilters } from '@/constants/filters';
import { getAnswers } from '@/lib/actions/answer.action';
import { timeStamp } from '@/lib/timeformat';
import Image from 'next/image';
import Link from 'next/link';

interface AllRepliesProps {
  userId: string;
  questionId: string;
  totalReplies: number;
  page?: string;
  filter?: string;
}

const AllReplies = async ({
  userId,
  questionId,
  totalReplies,
  page,
  filter,
}: AllRepliesProps) => {
  const result = await getAnswers({
    questionId,
    page: page ? +page : 1,
    sortBy: filter,
  });

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between">
        <Filter
          options={ReplyFilters}
          addOnClasses="min-h-[40px] sm:min-w-[170px]"
        />
        <h3 className="font-semibold">{totalReplies} Comments</h3>
      </div>
      <div>
        {result.replies.map((reply) => {
          return (
            <div key={reply._id} className="py-10">
              <div className="flex items-center justify-between">
                <div className="mb-8 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
                  <Link
                    href={`/profile/${reply.author.clerkId}`}
                    className="flex flex-1 items-start gap-1 sm:items-center"
                  >
                    <Image
                      src={reply.author.avatar}
                      width={18}
                      height={18}
                      alt="profile picture"
                      className="rounded-full object-cover max-sm:mt-0.5"
                    />
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <p className="body-semibold text-dark-300_light-700">
                        {reply.author.name}
                      </p>
                      <p className="small-regular text-dark-300_light-700 mt-0.5 line-clamp-1">
                        <span className="max-sm:hidden"> - </span>
                        replied {timeStamp(reply.createdAt)}
                      </p>
                    </div>
                  </Link>
                </div>
                <div className="flex justify-end">
                  <Votes
                    type="Answer"
                    itemId={JSON.stringify(reply._id)}
                    userId={JSON.stringify(userId)}
                    upvotes={reply.upvotes.length}
                    hasupVoted={reply.upvotes.includes(userId)}
                    downvotes={reply.downvotes.length}
                    hasdownVoted={reply.downvotes.includes(userId)}
                  />
                </div>
              </div>
              <ParseHTML data={reply.content} />
            </div>
          );
        })}
      </div>
      <Pagination pageNumber={page ? +page : 1} nextPage={result.nextPage} />
    </div>
  );
};

export default AllReplies;
