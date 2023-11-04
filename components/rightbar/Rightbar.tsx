import Link from 'next/link';
import { RiArrowRightSLine } from 'react-icons/ri';
import SideTags from './SideTags';

const Rightbar = () => {
  return (
    <section className="hidden lg:block md:w-[18rem] xl:w-[26rem] min-h-full pt-24 border-l border-black/10 dark:border-white/20">
      <div className="w-full p-4">
        <h2 className="h3-bold dark:text-white mb-4">Top Questions</h2>
        <div className="h-full flex flex-col gap-4 overflow-y-auto">
          {new Array(4).fill(1).map((item, idx) => {
            const id = 1;
            return (
              <Link
                href={`/questions/${id}`}
                key={idx}
                className="flex flex-row justify-between items-center gap-7 border p-4  border-black/20 dark:border-white/20"
              >
                <p className="body-medium text-zinc-500 dark:text-white/70">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry
                </p>
                <RiArrowRightSLine className="w-8 h-8 dark:text-white" />
              </Link>
            );
          })}
        </div>
      </div>
      <div className="w-full p-4">
        <h2 className="h3-bold dark:text-white mb-4">Popular Tag</h2>
        <div className="h-full flex flex-col gap-4 dark:text-white">
          {new Array(4).fill(1).map((item, idx) => {
            return (
              <SideTags
                key={idx}
                _id={1}
                title="title"
                topicCount={true}
                totlaQuestions={4}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Rightbar;
