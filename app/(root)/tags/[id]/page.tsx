import NoResults from '@/components/NoResults';
import QuestionCard from '@/components/QuestionCard';
import Searchbar from '@/components/Searchbar';
import { getQuesitonsByTagId } from '@/lib/actions/tag.actions';
import { IQuestions } from '@/lib/db/models/question.model';
import React from 'react';
import { BiSearch } from 'react-icons/bi';

const TagIdPage = async ({ params, searchParams }) => {
  const data = await getQuesitonsByTagId({
    tagId: params.id,
    page: 1,
    searchQuery: searchParams.q,
  });

  return (
    <>
      <h1 className="h1-bold text-dark-100_light-900">{data.tagTitle}</h1>
      <div className="w-full mt-11">
        <div className="w-full flex justify-between sm:items-center">
          <Searchbar
            route="/"
            addOnClasses="flex-1"
            iconCord="left"
            icontype={
              <BiSearch className="cursor pointer dark:fill-white mr-2 cursor-pointer" />
            }
            placeHolder="Search Tag questions"
          />
        </div>

        <div className="w-full mt-10 flex flex-col gap-6">
          {data.questions.length > 0 ? (
            data.questions.map((q: IQuestions) => {
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
              title="No Tags questions to show"
              link="/ask"
              btnTitle="Ask some questions"
              desc="Seize the opportunity to shatter the silence! Be the one to ask an intriguing question, igniting vibrant discussions and sparking
        engagement."
            />
          )}
        </div>
      </div>
    </>
  );
};

export default TagIdPage;
