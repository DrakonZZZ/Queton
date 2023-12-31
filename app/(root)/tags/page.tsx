import Searchbar from '@/components/Searchbar';
import { BiSearch } from 'react-icons/bi';
import Filter from '@/components/Filter';
import { TagFilters } from '@/constants/filters';
import NoResults from '@/components/NoResults';
import { getAllTags } from '@/lib/actions/tag.actions';
import Link from 'next/link';
import { SearchParamsProps } from '@/types';
import Pagination from '@/components/Pagination';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tags | Queton',
  description: 'Queton All Tags page',
};

const Page = async ({ searchParams }: SearchParamsProps) => {
  const result = await getAllTags({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });
  return (
    <>
      <h1 className="h1-bold text-dark-100_light-900">Tags</h1>
      <div className="mt-10 flex flex-col gap-5">
        <div className="w-full flex justify-between sm:items-center">
          <Searchbar
            route="/tags"
            addOnClasses="flex-1"
            iconCord="left"
            icontype={
              <BiSearch className="cursor pointer dark:fill-white mr-2 cursor-pointer" />
            }
            placeHolder="Search for Other people"
          />
          <Filter
            options={TagFilters}
            addOnClasses="min-h-[40px] sm:min-w-[170px]"
          />
        </div>
        <section className="mt-12 flex flex-wrap gap-4">
          {result.tags.length > 0 ? (
            result.tags.map((tag) => {
              return (
                <Link href={`/tags/${tag._id}`} key={tag._id}>
                  <article className="flex w-full flex-col items-center justify-between border bg-black dark:bg-white rounded-md pl-8 pr-8 pt-8 pb-6">
                    <div className="w-fit text-white dark:text-black">
                      <p className="capitalize font-semibold">{tag.name}</p>
                      <p className="small-medium mt-4">
                        {' '}
                        Questions
                        <span className="ml-2.5">{tag.questions.length}+</span>
                      </p>
                    </div>
                  </article>
                </Link>
              );
            })
          ) : (
            <NoResults
              title="No Tags Found!"
              desc="It seems like there are not tags present"
              link="/ask"
              btnTitle="Ask some questions"
            />
          )}
        </section>
      </div>
      <Pagination
        pageNumber={searchParams.page ? +searchParams.page : 1}
        nextPage={result.nextPage}
      />
    </>
  );
};

export default Page;
