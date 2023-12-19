import { getUserById } from '@/lib/actions/user.action';
import { ParamsProps } from '@/types';
import { auth } from '@clerk/nextjs';
import Profile from '../components/Profile';

const Page = async ({ params }: ParamsProps) => {
  const { userId } = auth();

  if (!userId) return null;

  const dbUserId = await getUserById({ userId });
  return (
    <>
      <h1 className="h1-bold text-dark-100_light-900">Edit Profile</h1>
      <div className="mt-9">
        <Profile
          clerkId={JSON.stringify(userId)}
          user={JSON.stringify(dbUserId)}
        />
      </div>
    </>
  );
};

export default Page;
