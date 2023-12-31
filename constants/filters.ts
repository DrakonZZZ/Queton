export const HomePageFilters = [
  { name: 'Newest', value: 'newest' },
  { name: 'Recommended', value: 'recommended' },
  { name: 'Frequent', value: 'frequent' },
  { name: 'Unanswered', value: 'unanswered' },
];

export const TopSearchFilters = [
  { name: 'Question', value: 'question' },
  { name: 'Answer', value: 'answer' },
  { name: 'User', value: 'user' },
  { name: 'Tag', value: 'tag' },
];

export const UserFilters = [
  { name: 'New Users', value: 'new_users' },
  { name: 'Old Users', value: 'old_users' },
  { name: 'Top Contributors', value: 'top_contributors' },
];

export const TagFilters = [
  { name: 'Popular', value: 'popular' },
  { name: 'Recent', value: 'recent' },
  { name: 'Name', value: 'name' },
  { name: 'Old', value: 'old' },
];

export const ReplyFilters = [
  { name: 'Highest Upvotes', value: 'highestUpvotes' },
  { name: 'Lowest Upvotes', value: 'lowestUpvotes' },
  { name: 'Most Recent', value: 'recent' },
  { name: 'Oldest', value: 'old' },
];

export const QuestionFilters = [
  { name: 'Most Recent', value: 'most_recent' },
  { name: 'Oldest', value: 'oldest' },
  { name: 'Most Voted', value: 'most_voted' },
  { name: 'Most Viewed', value: 'most_viewed' },
  { name: 'Most Answered', value: 'most_answered' },
];

export const GSearchFilters = [
  { name: 'Question', value: 'question' },
  { name: 'Answer', value: 'answer' },
  { name: 'User', value: 'user' },
  { name: 'Tag', value: 'tag' },
];

export const LEVEL_RANGE = {
  QUESTION_COUNT: {
    BRONZE: 30,
    SILVER: 70,
    GOLD: 200,
  },
  ANSWER_COUNT: {
    BRONZE: 30,
    SILVER: 90,
    GOLD: 200,
  },
  QUESTION_UPVOTES: {
    BRONZE: 30,
    SILVER: 90,
    GOLD: 200,
  },
  ANSWER_UPVOTES: {
    BRONZE: 30,
    SILVER: 90,
    GOLD: 200,
  },
  TOTAL_VIEWS: {
    BRONZE: 1000,
    SILVER: 10000,
    GOLD: 100000,
  },
};
