import Link from 'next/link';
import Tag from '@/components/Tag';

const TagCard = async () => {
  const interactedTags = new Array(3).fill('text');
  return (
    <Link
      href={`/profile/`}
      className="w-full max-xs:min-w-full xs:w-[260px] shadow-light-100_darknone "
    >
      <article className="flex w-full flex-col items-center justify-between border border-black/10 dark:border-white/20 rounded-md pl-8 pr-8 pt-8 pb-6">
        <div className="w-full flex justify-between">
          <div className="flex flex-col justify-center items-end">
            <h3 className="font-semibold text-black/70 dark:text-white"></h3>
            <p className="text-xs text-black/60 dark:text-white/80">@</p>
          </div>
        </div>
        <div className="w-full">
          {interactedTags.length > 0 ? (
            <div className=" flex justify-between mt-6">
              {interactedTags.map((tag) => {
                return <div>tag</div>;
              })}
            </div>
          ) : (
            <div>No activity</div>
          )}
        </div>
      </article>
    </Link>
  );
};

export default TagCard;
