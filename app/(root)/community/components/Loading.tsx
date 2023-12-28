import { Skeleton } from '../../../../components/ui/skeleton';

const Loading = () => {
  return (
    <div>
      <h1 className="h1-bold dark:text-white">All Users</h1>
      <div className="flex flex-wrap gap-5 mb-12 mt-11">
        <Skeleton className="h-14 flex-1" />
        <Skeleton className="h-14 w-[200px]" />
      </div>
      <div className="grid md:grid-cols-3 gap-4 grid-cols-2">
        {Array(9)
          .fill('profile')
          .map((item, idx) => (
            <Skeleton key={idx} className=" h-[140px] rounded-md" />
          ))}
      </div>
    </div>
  );
};

export default Loading;
