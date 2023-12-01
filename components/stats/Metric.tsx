import { abbreviateNumber } from '@/lib/abbreviateNumber';

interface MetricProps {
  icon: React.ReactNode;
  title: string;
  addonTextStyle?: string;
  value: number | string;
  href?: string;
}

const Metric = ({ icon, title, addonTextStyle, value, href }: MetricProps) => {
  return (
    <div className="flex-center flex-wrap gap-2">
      <span className={`${href ? 'rounded-full ' : ''}`}>{icon}</span>
      <p className={`${addonTextStyle} flex items-center gap-1`}>
        {value} {title}
      </p>
    </div>
  );
};

export default Metric;
