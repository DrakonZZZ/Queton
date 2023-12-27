import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getUserInfo } from '@/lib/actions/user.action';
import dateFormat from '@/lib/dateformat';
import { URLProps } from '@/types';
import { SignedIn, auth } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import ProfileURLs from './components/ProfileURLs';
import Stats from './components/Stats';
import PostsTab from './components/PostsTab';
import ReplyTab from './components/ReplyTab';

const page = async ({ params, searchParams }: URLProps) => {
  const { userId: clerkId } = auth();
  const userData = await getUserInfo({ userId: params.id });

  return (
    <>
      <div className="flex flex-col-reverse items-start justify-between sm:flex-row">
        <div className="flex flex-col items-start gap-4 lg:flex-row">
          <Image
            src={userData?.user.avatar}
            alt="profile picture"
            width={140}
            height={140}
            className="rounded-full object-cover"
          />
          <div className="mt-3">
            <h2 className="h2-bold text-black dark:text-white capitalize">
              {userData?.user.username}
            </h2>
            <p className="paragraph-regular text-black/60 dark:text-white">
              {userData?.user.name}
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-start gap-5">
              {userData?.user.location && (
                <>
                  <ProfileURLs title={userData?.user.location} />
                </>
              )}
              Joined {dateFormat(userData?.user.joined)}
            </div>

            {userData?.user.bio && (
              <p className="paragraph-regular  text-black/60 dark:text-white mt-8">
                {userData?.user.bio}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">
          <SignedIn>
            {clerkId === userData?.user.clerkId}
            <Link href={'/profile/edit'}>
              <Button className="bg-black text-white dark:bg-white dark:text-black min-h-[30px] px-4 py-3 rounded-md hover:bg-black/70 dark:hover:bg-white/80 transistion">
                Edit Profile
              </Button>
            </Link>
          </SignedIn>
        </div>
      </div>

      <Stats
        level={userData!.user.level}
        totalQuestions={userData!.totalQuestions}
        totalReplies={userData!.totalReplies}
        levelCount={userData!.badgeCount}
      />

      <div className="mt-10 flex gap-10">
        <Tabs defaultValue="top-posts" className="flex-1">
          <TabsList className="background-light-800_dark-400 min-h-[42px] p-1">
            <TabsTrigger value="top-posts" className="tab">
              post
            </TabsTrigger>
            <TabsTrigger value="answers" className="tab">
              Answers
            </TabsTrigger>
          </TabsList>
          <TabsContent value="top-posts">
            <PostsTab
              searchParams={searchParams}
              userId={userData?.user._id}
              clerkId={clerkId}
            />
          </TabsContent>
          <TabsContent value="answers" className="flex w-full flex-col gap-6">
            <ReplyTab
              searchParams={searchParams}
              userId={userData?.user._id}
              clerkId={clerkId}
            />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default page;
