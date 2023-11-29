import { getQuestionsById } from '@/lib/actions/ask.actions';
import Image from 'next/image';
import Link from 'next/link';
import Metric from '@/components/stats/Metric';
import { WiTime1 } from 'react-icons/wi';
import { BiComment } from 'react-icons/bi';
import { AiOutlineEye } from 'react-icons/ai';
import { timeStamp } from '@/lib/timeformat';
import { abbreviateNumber } from '@/lib/abbreviateNumber';

const page = async ({ params, searchParams }) => {
  const result = await getQuestionsById({ questionId: params.id });
  return (
    <>
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
            <p className="paragraph-semibold">{result?.author.name}</p>
          </Link>
          <div className="flex justify-end">Voting</div>
        </div>

        <h2 className="w-full h2-semibold text-dark_200-light-800 mt-3.5 capitalize">
          {result.title}
        </h2>
      </div>
      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <Metric
          icon={<WiTime1 size={15} className="text-dark-400_light-800" />}
          value={`asked ${timeStamp(result.createdAt)}`}
          title="Votes"
          addonTextStyle="small-medium text-dark-400_light-800"
        />
        <Metric
          icon={<BiComment size={15} className="text-dark-400_light-800" />}
          value={abbreviateNumber(result.replies.length)}
          title="Comments"
          addonTextStyle="small-medium text-dark-400_light-800"
        />
        <Metric
          icon={<AiOutlineEye size={15} className="text-dark-400_light-800" />}
          value={0}
          title="views"
          addonTextStyle="small-medium text-dark-400_light-800"
        />
      </div>
    </>
  );
};

export default page;