interface TagProps {
  title: string;
  addonClasses?: string;
}

const Tag = ({ addonClasses, title }: TagProps) => {
  return (
    <div
      className={`${addonClasses} font-semibold text-justify p-2 rounded-lg text-black/60`}
    >
      <span>#</span> {title}
    </div>
  );
};

export default Tag;
