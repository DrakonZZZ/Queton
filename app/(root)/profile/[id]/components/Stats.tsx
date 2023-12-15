import { abbreviateNumber } from '@/lib/abbreviateNumber';
import StatsBadge from './StatsBadge';

interface StatProp {
  totalQuestions: number;
  totalReplies: number;
}

const Stats = ({ totalQuestions, totalReplies }: StatProp) => {
  return (
    <div className="mt-10">
      <h4 className="hs-semibold text-black dark:text-white">Stats</h4>
      <div className="mt-5 grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-4">
        <div className="flex flex-wrap items-center justify-evenly gap-4 border border-black/10 dark:border-white/20 rounded-md p-6 shadow-light300 dark:shadow-dark-200">
          <div className="paragraph-semibold text-black dark:text-white">
            <p>{abbreviateNumber(totalQuestions)}</p>
            <p className="body-medium text-black/60 dark:text-white">
              Question
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-evenly gap-4 border border-black/10 dark:border-white/20 rounded-md p-6 shadow-light300 dark:shadow-dark-200">
          <div className="paragraph-semibold text-black dark:text-white">
            <p>{abbreviateNumber(totalReplies)}</p>
            <p className="body-medium text-black/60 dark:text-white">Replies</p>
          </div>
        </div>
        <StatsBadge
          imgUrl="/assets/icons/gold-medal.svg"
          value={0}
          title="Gold Badge"
        />
        <StatsBadge
          imgUrl="/assets/icons/silver-medal.svg"
          value={0}
          title="Gold Badge"
        />
        <StatsBadge
          imgUrl="/assets/icons/bronze-medal.svg"
          value={0}
          title="Bronze Badge"
        />
      </div>
    </div>
  );
};

export default Stats;
