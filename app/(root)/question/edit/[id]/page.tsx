import AskForm from '@/app/(root)/ask/components/AskForm';
import { getQuestionsById } from '@/lib/actions/ask.actions';
import { getUserById } from '@/lib/actions/user.action';
import { ParamsProps } from '@/types';
import { auth } from '@clerk/nextjs';

const Edit = async ({ params }: ParamsProps) => {
  const { userId } = auth();

  if (!userId) return null;

  const dbUserId = await getUserById({ userId });
  const result = await getQuestionsById({ questionId: params.id });
  return (
    <>
      <h1 className="h1-bold text-dark-100_light-900">Edit Post</h1>
      <div className="mt-9">
        <AskForm
          type="edit"
          dbUserId={JSON.stringify(dbUserId._id)}
          postDetails={JSON.stringify(result)}
        />
      </div>
    </>
  );
};

export default Edit;
