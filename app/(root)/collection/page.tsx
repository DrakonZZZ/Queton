import Searchbar from '@/components/Searchbar';
import Filter from '@/components/Filter';
import { QuestionFilters } from '@/constants/filters';
import NoResults from '@/components/NoResults';
import QuestionCard from '@/components/QuestionCard';
import { getSavedQuesions } from '@/lib/actions/user.action';
import { BiSearch } from 'react-icons/bi';
import { auth } from '@clerk/nextjs';
import { SearchParamsProps } from '@/types';
import Pagination from '@/components/Pagination';

interface Question {
  id: string;
  title: string;
  author: { clerkId: string; name: string; avatar: string };
  upvotes: string;
  view: number;
  createdAt: Date;
  tags: { id: number; name: string; _id: string }[];
  replies: string[];
}

const Collection = async ({ searchParams }: SearchParamsProps) => {
  const { userId } = auth();

  if (!userId) return null;

  const data = await getSavedQuesions({
    clerkId: userId,
    searchQuery: searchParams.q,
    page: searchParams.page ? +searchParams.page : 1,
  });

  console.log(searchParams.pages);

  return (
    <>
      <h1 className="h1-bold text-dark-100_light-900">Saved Questions</h1>
      <div className="mt-10 flex flex-col gap-5">
        <div className="w-full flex justify-between sm:items-center">
          <Searchbar
            route="/community"
            addOnClasses="flex-1"
            iconCord="left"
            icontype={
              <BiSearch className="cursor pointer dark:fill-white mr-2 cursor-pointer" />
            }
            placeHolder="Search for questions"
          />
          <Filter
            options={QuestionFilters}
            addOnClasses="min-h-[40px] sm:min-w-[170px]"
            containerClasses="lg:hidden max-md:flex"
          />
        </div>

        <div className="w-full mt-10 flex flex-col gap-6">
          {data.savedQuestions.length > 0 ? (
            data.savedQuestions.map((q: Question) => {
              const {
                id,
                title,
                author,
                upvotes,
                view,
                createdAt,
                tags,
                replies,
              } = q;
              return (
                <QuestionCard
                  key={id}
                  id={id}
                  title={title}
                  author={author}
                  upvotes={upvotes.length}
                  replies={replies.length}
                  view={view}
                  createAt={createdAt}
                  tags={tags}
                />
              );
            })
          ) : (
            <NoResults
              title="No questions saved"
              link="/"
              btnTitle="Save"
              desc="Seize the opportunity to shatter the silence! Be the one to ask an intriguing question, igniting vibrant discussions and sparking
            engagement."
            />
          )}
        </div>
      </div>
      <Pagination
        pageNumber={searchParams.page ? +searchParams.page : 1}
        nextPage={data.nextPage}
      />
    </>
  );
};

export default Collection;
