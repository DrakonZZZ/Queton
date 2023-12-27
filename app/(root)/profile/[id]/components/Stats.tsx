import { abbreviateNumber } from '@/lib/abbreviateNumber';
import StatsBadge from './StatsBadge';
import { LevelRange } from '@/types';

interface StatProp {
  totalQuestions: number;
  totalReplies: number;
  level: number;
  levelCount: LevelRange;
}

const Stats = ({
  totalQuestions,
  totalReplies,
  level,
  levelCount,
}: StatProp) => {
  return (
    <div className="mt-10">
      <h4 className="font-extrabold text-black dark:text-white text-right">
        Level {level}
      </h4>
      <div className="mt-5 grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-4">
        <div className="flex flex-wrap items-center gap-4 border border-black/10 dark:border-white/20 rounded-md p-6 shadow-light300 dark:shadow-dark-200">
          <div className="paragraph-semibold text-black dark:text-white">
            <p>{abbreviateNumber(totalQuestions)}</p>
            <p className="body-medium text-black/60 dark:text-white">
              Question
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-4 border border-black/10 dark:border-white/20 rounded-md p-6 shadow-light300 dark:shadow-dark-200">
          <div className="paragraph-semibold text-black dark:text-white">
            <p>{abbreviateNumber(totalReplies)}</p>
            <p className="body-medium text-black/60 dark:text-white">Replies</p>
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
