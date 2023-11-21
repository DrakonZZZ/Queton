import { auth } from '@clerk/nextjs';
import AskForm from './components/AskForm';
import { redirect } from 'next/navigation';
import { getUserById } from '@/lib/actions/user.action';

const page = async () => {
  // const { userId } = auth();

  // if (!userId) redirect('/sign-in');

  const userId = 'clerk123';
  const dbUser = await getUserById({ userId });

  console.log(dbUser);
  return (
    <div>
      <h1 className="h1-bold text-dark-100_light-900">Question</h1>
      <div className="mt-9">
        <AskForm dbUserId={JSON.stringify(dbUser._id)} />
      </div>
    </div>
  );
};

export default page;
