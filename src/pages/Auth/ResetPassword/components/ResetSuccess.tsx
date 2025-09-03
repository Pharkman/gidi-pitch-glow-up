import { useNavigate } from "react-router-dom";
import orangeMark from "/assets/orangeSuccessMark.svg";

const ResetSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-between min-h-full">
      <div className="flex-1 flex flex-col justify-center">
        <div className="text-center mb-6">
          <img src={orangeMark} alt="Success mark" className="mx-auto mb-8" />
          <h1 className="text-3xl md:text-4xl font-semibold text-[#1d1d1d]">
            Successfully reset!
          </h1>
          <p className="font-medium text-[#777777] mt-1">
            Your password has been updated. You can now log in with your new
            password.{" "}
          </p>
          <button
            type="button"
            onClick={() => navigate("/signin")}
            className="mt-12 w-full bg-[#F97316] text-white py-3.5 rounded-md font-semibold"
          >
            Login now
          </button>
        </div>
      </div>

      <p className="text-sm text-[#777777] font-medium mt-6 px-12 md:px-0 text-center">
        By continuing, you agree to Gidipitch’s{" "}
        <a href="#" className="underline">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="underline">
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
};

export default ResetSuccess;
