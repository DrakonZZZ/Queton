import Pagination from '@/components/Pagination';
import ReplyCard from '@/components/ReplyCard';
import { getUserReplies } from '@/lib/actions/user.action';
import { SearchParamsProps } from '@/types';

interface ReplyTabProps extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}

const ReplyTab = async ({ searchParams, userId, clerkId }: ReplyTabProps) => {
  const data = await getUserReplies({
    userId,
    page: searchParams.page ? +searchParams.page : 1,
  });
  return (
    <>
      {data?.replies.map((r) => {
        const { _id, question, author, upvotes, createdAt, view } = r;
        return (
          <div className="my-[0.5px]" key={_id}>
            <ReplyCard
              id={_id}
              clerkId={clerkId}
              author={author}
              question={question}
              upvotes={upvotes.length}
              createdAt={createdAt}
              view={view}
            />
          </div>
        );
      })}
      <Pagination
        pageNumber={searchParams.page ? +searchParams.page : 1}
        nextPage={data.nextPage}
      />
    </>
  );
};

export default ReplyTab;
