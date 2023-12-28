import Image from 'next/image';

interface StatsBadgeProp {
  imgUrl: string;
  title: string;
  value: number;
}

const StatsBadge = ({ imgUrl, title, value }: StatsBadgeProp) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 bg-black/90 dark:bg-white rounded-md p-6 shadow-light300 dark:shadow-dark-200">
      <div>
        <p className="paragraph-semibold dark:text-black text-white">{value}</p>
        <p className="body-medium dark:text-black/50 text-white/70">{title}</p>
      </div>
      <Image src={imgUrl} alt={title} width={40} height={50} />
    </div>
  );
};

export default StatsBadge;
