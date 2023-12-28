import Searchbar from '@/components/Searchbar';
import Filter from '@/components/Filter';
import { UserFilters } from '@/constants/filters';
import { BiSearch } from 'react-icons/bi';
import { getAllUsers } from '@/lib/actions/user.action';
import Link from 'next/link';
import AvatarCard from './components/AvatarCard';
import { SearchParamsProps } from '@/types';
import Pagination from '@/components/Pagination';
import Loading from '@/app/(root)/community/components/Loading';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Community | Queton',
  description: 'Queton community page',
};

const Page = async ({ searchParams }: SearchParamsProps) => {
  const result = await getAllUsers({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <>
      <h1 className="h1-bold text-dark-100_light-900">All Questions</h1>
      <div className="mt-10 flex flex-col gap-5">
        <div className="w-full flex justify-between sm:items-center">
          <Searchbar
            route="/community"
            addOnClasses="flex-1"
            iconCord="left"
            icontype={
              <BiSearch className="cursor pointer dark:fill-white mr-2 cursor-pointer" />
            }
            placeHolder="Search for Other people"
          />
          <Filter
            options={UserFilters}
            addOnClasses="min-h-[40px] sm:min-w-[170px]"
          />
        </div>
      </div>
      <section className="mt-12 flex flex-wrap gap-4">
        {result.users.length > 0 ? (
          result.users.map((user) => {
            return <AvatarCard key={user._id} user={user} />;
          })
        ) : (
          <div className="paragraph-regular mx-auto max-w-4xl text-dark-200_light-800 text-center">
            <p>No users found</p>
            <Link href="/sign-up" className="mt-2 font-bold text-xl underline">
              Be the first to join!
            </Link>
          </div>
        )}
      </section>
      <Pagination
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        nextPage={result.nextPage}
      />
    </>
  );
};

export default Page;
