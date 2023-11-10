import AskForm from './components/AskForm';

const page = () => {
  return (
    <div>
      <h1 className="h1-bold text-dark-100_light-900">Question</h1>
      <div className="mt-9">
        <AskForm />
      </div>
    </div>
  );
};

export default page;
