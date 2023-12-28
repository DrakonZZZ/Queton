import Link from 'next/link';
import { RiArrowRightSLine } from 'react-icons/ri';
import SideTags from './SideTags';
import { getPopularPost } from '@/lib/actions/ask.actions';
import { getPopularTags } from '@/lib/actions/tag.actions';

const Rightbar = async () => {
  const popularPosts = await getPopularPost();
  const popularTags = await getPopularTags();

  return (
    <section className="hidden lg:block md:w-[18rem] xl:w-[26rem] h-screen pt-24 border-l border-black/10 dark:border-white/20 sticky top-0 right-0 bg-white dark:bg-black">
      <div className="w-full p-4">
        <h2 className="h3-bold dark:text-white mb-4">Top</h2>
        <div className="h-full flex flex-col gap-4 overflow-y-auto">
          {popularPosts?.map((item, idx) => {
            return (
              <Link
                href={`/question/${item?._id}`}
                key={idx}
                className="flex flex-row justify-between items-center gap-7 border p-4  border-black/20 dark:border-white/20"
              >
                <p className="body-medium text-zinc-500 dark:text-white/70 line-clamp-3">
                  {item?.title.slice(0, 50)}...
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
          {popularTags?.map((item, idx) => {
            return (
              <SideTags
                key={idx}
                _id={item._id}
                title={item.name}
                topicCount={true}
                totlaQuestions={item.numberOfPosts}
                addonClasses="dark:text-white/60"
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Rightbar;
