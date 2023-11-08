import Searchbar from '@/components/Searchbar';
import { Button } from '@/components/ui/button';
import { BiSearch } from 'react-icons/bi';
import Link from 'next/link';
import Filter from '@/components/Filter';
import { HomePageFilters } from '@/constants/filters';
import HomeFilter from './components/HomeFilter';
import { questions } from '@/constants/questions';
import NoResults from '@/components/NoResults';
import QuestionCard from '@/components/QuestionCard';

const Home = () => {
  return (
    <>
      <div className="w-full flex justify-between flex-col-reverse gap-4 sm:flex-row">
        <h1 className="h1-bold text-dark-100_light-900">All Questions</h1>
        <Link
          href={`/ask`}
          className="flex justify-end max-sm:w-full gap-4 sm:flex-row"
        >
          <Button className="bg-black text-white dark:bg-white dark:text-black min-h-[30px] px-4 py-3 rounded-md hover:bg-black/70 dark:hover:bg-white/80 transistion">
            Ask Anything
          </Button>
        </Link>
      </div>
      <div className="mt-10 flex flex-col gap-5">
        <div className="w-full flex justify-between sm:items-center">
          <Searchbar
            route="/"
            addOnClasses="flex-1"
            iconCord="left"
            icontype={
              <BiSearch className="cursor pointer dark:fill-white mr-2 cursor-pointer" />
            }
            placeHolder="Search for questions"
          />
          <Filter
            options={HomePageFilters}
            addOnClasses="min-h-[40px] sm:min-w-[170px]"
            containerClasses="lg:hidden max-md:flex"
          />
        </div>

        <HomeFilter />
        <div className="w-full mt-10 flex flex-col gap-6">
          {questions.length > 0 ? (
            questions.map((q, idx) => {
              const { id, title, author, upvotes, view, createAt, tags } = q;
              return (
                <QuestionCard
                  key={id}
                  id={id}
                  title={title}
                  author={author}
                  upvotes={upvotes}
                  view={view}
                  createAt={createAt}
                  tags={tags}
                />
              );
            })
          ) : (
            <NoResults
              title="There's no question to show"
              link="/ask"
              btnTitle="Start a thread"
              desc="Seize the opportunity to shatter the silence! Be the one to ask an intriguing question, igniting vibrant discussions and sparking
            engagement."
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
