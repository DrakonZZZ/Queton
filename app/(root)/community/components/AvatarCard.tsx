import Tag from '@/components/Tag';
import { getAcivityTags } from '@/lib/actions/tag.actions';
import Image from 'next/image';
import Link from 'next/link';

interface UserProps {
  user: {
    _id: string;
    clerkId: string;
    avatar: string;
    name: string;
    username: string;
  };
}

const AvatarCard = async ({ user }: UserProps) => {
  const interactedTags = await getAcivityTags({ userId: user._id });

  return (
    <Link
      href={`/profile/${user.clerkId}`}
      className="w-full max-xs:min-w-full xs:w-[260px] shadow-light-100_darknone "
    >
      <article className="flex w-full flex-col items-center justify-between border border-black/10 dark:border-white/20 rounded-md pl-8 pr-8 pt-8 pb-6">
        <div className="w-full flex justify-between">
          <Image
            src={user.avatar}
            alt="user profile picture"
            width={50}
            height={50}
            className="rounded-full"
          />
          <div className="flex flex-col justify-center items-end">
            <h3 className="font-semibold text-black/70 dark:text-white">
              {user.name}
            </h3>
            <p className="text-xs text-black/60 dark:text-white/80">
              @{user.username}
            </p>
          </div>
        </div>
        <div className="w-full">
          {interactedTags.length > 0 ? (
            <div className=" flex justify-between mt-6">
              {interactedTags.map((tag) => {
                return (
                  <Tag
                    key={tag._id}
                    title={tag.name}
                    addonClasses="text-xs flex bg-black/80 text-white dark:bg-white dark:text-black px-[8px] py-[6px]"
                  />
                );
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

export default AvatarCard;
