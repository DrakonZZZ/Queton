import { abbreviateNumber } from '@/lib/abbreviateNumber';
import StatsBadge from './StatsBadge';
import { LevelRange } from '@/types';

interface StatProp {
  totalQuestions: number;
  totalReplies: number;
  levelCount: LevelRange;
}

const Stats = ({ totalQuestions, totalReplies, levelCount }: StatProp) => {
  return (
    <div className="mt-10">
      <div className="mt-5 grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-4">
        <div className="flex flex-wrap items-center gap-4 bg-black/90 dark:bg-white rounded-md p-6 shadow-light300 dark:shadow-dark-200">
          <div className="paragraph-semibold dark:text-black text-white">
            <p>{abbreviateNumber(totalQuestions)}</p>
            <p className="body-medium dark:text-black/50 text-white/70">
              Question
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-4  bg-black/90 dark:bg-white  rounded-md p-6 shadow-light300 dark:shadow-dark-200">
          <div className="paragraph-semibold dark:text-black text-white">
            <p>{abbreviateNumber(totalReplies)}</p>
            <p className="body-medium dark:text-black/50 text-white/70">
              Replies
            </p>
          </div>
        </div>
        <StatsBadge
          imgUrl="/assets/icons/gold-medal.svg"
          value={levelCount.GOLD}
          title="Gold Level"
        />
        <StatsBadge
          imgUrl="/assets/icons/silver-medal.svg"
          value={levelCount.SILVER}
          title="Gold Level"
        />
        <StatsBadge
          imgUrl="/assets/icons/bronze-medal.svg"
          value={levelCount.BRONZE}
          title="Bronze Level"
        />
      </div>
    </div>
  );
};

export default Stats;
