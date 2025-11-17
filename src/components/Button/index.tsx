import { LoadingSpinner } from "../Loader";

type SubmitButtonProps = {
  isLoading: boolean;
  text: string;
};

const SubmitButton = ({ isLoading, text }: SubmitButtonProps) => {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="mt-12 w-full bg-primary text-white py-3.5 rounded-md font-semibold flex items-center justify-center"
    >
      {isLoading ? <LoadingSpinner /> : text}
    </button>
  );
};

export default SubmitButton;
