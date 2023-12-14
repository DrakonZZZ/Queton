import { getQuestionsById } from '@/lib/actions/ask.actions';
import Image from 'next/image';
import Link from 'next/link';
import Metric from '@/components/stats/Metric';
import { WiTime1 } from 'react-icons/wi';
import { BiComment } from 'react-icons/bi';
import { AiOutlineEye } from 'react-icons/ai';
import { timeStamp } from '@/lib/timeformat';
import { abbreviateNumber } from '@/lib/abbreviateNumber';
import ParseHTML from '@/components/ParseHTML';
import Tag from '@/components/Tag';
import { Answer } from './components/Answer';
import { auth } from '@clerk/nextjs';
import { getUserById } from '@/lib/actions/user.action';
import AllReplies from './components/AllReplies';
import Votes from '@/components/Votes';
import { URLProps } from '@/types';

const page = async ({ params, searchParams }: URLProps) => {
  const result = await getQuestionsById({ questionId: params.id });
  const { userId: clerkId } = auth();

  let dbUser;
  if (clerkId) {
    dbUser = await getUserById({ userId: clerkId });
  }

  return (
    <>
      <div className="w-full border border-black/10  dark:border-white/30 p-6 rounded-sm">
        <div className="w-full flex-start flex-col">
          <div className="w-full flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
            <Link
              href={`/profile/${result.author.clerkId}`}
              className="flex items-center justify-start gap-3"
            >
              <Image
                src={result?.author.avatar}
                alt="profile picture"
                width={32}
                height={32}
                className="rounded-full"
              />
              <p className="paragraph-semibold text-dark-200_light-800">
                {result?.author.name}
              </p>
            </Link>
            <div className="flex justify-end">
              <Votes
                type="Question"
                itemId={JSON.stringify(result._id)}
                userId={JSON.stringify(dbUser._id)}
                upvotes={result.upvotes.length}
                hasupVoted={result.upvotes.includes(dbUser._id)}
                downvotes={result.downvotes.length}
                hasdownVoted={result.downvotes.includes(dbUser._id)}
                hasSaved={dbUser?.saved.includes(result._id)}
              />
            </div>
          </div>

          <h2 className="w-full h2-semibold text-dark-200_light-800 mt-3.5 capitalize">
            {result.title}
          </h2>
        </div>
        <div className="mb-8 mt-5 flex flex-wrap gap-4">
          <Metric
            icon={<WiTime1 size={15} className="text-dark-400_light-800" />}
            value={`asked ${timeStamp(result.createdAt)}`}
            addonTextStyle="small-medium text-dark-400_light-800"
          />
          <Metric
            icon={<BiComment size={15} className="text-dark-400_light-800" />}
            value={abbreviateNumber(result.replies.length)}
            title="Comments"
            addonTextStyle="small-medium text-dark-400_light-800"
          />
          <Metric
            icon={
              <AiOutlineEye size={15} className="text-dark-400_light-800" />
            }
            value={result.view}
            title="views"
            addonTextStyle="small-medium text-dark-400_light-800"
          />
        </div>

        <ParseHTML data={result.content} />
        <div className="flex flex-wrap gap-2  dark:border-white/30 pt-4 mt-4">
          {result.tags.map((tag: any) => {
            return (
              <Tag
                key={tag._id}
                title={tag.name}
                addonClasses="text-xs flex bg-black/80 text-white dark:bg-white dark:text-black px-[8px] py-[6px]"
              />
            );
          })}
        </div>
      </div>
      <Answer
        authorId={JSON.stringify(dbUser)}
        question={result.content}
        questionId={JSON.stringify(result._id)}
      />
      <AllReplies
        userId={dbUser._id}
        questionId={result._id}
        totalReplies={result.replies.length}
      />
    </>
  );
};

export default page;
