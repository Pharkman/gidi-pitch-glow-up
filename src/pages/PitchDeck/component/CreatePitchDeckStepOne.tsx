import { Formik, Form, Field } from "formik";
import { FaChevronDown } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { useGetIndustries } from "@/lib/query";

export default function CreatePitchDeckStepOne({ onClose }) {
  const navigate = useNavigate();
   const { data: industries } = useGetIndustries();

  const handleNext = (values) => {
    console.log("Form Data:", values);
    // ✅ Save form data to localStorage
    localStorage.setItem("pitchDeckData", JSON.stringify(values));
    // ✅ Navigate to step two
    navigate("/create-pitchdeck/step-two");
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-xl rounded-2xl p-6 shadow-xl border border-gray-100 max-sm:mx-3">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-gray-900">Create Pitch Deck</h2>
          <button
            onClick={onClose}
            className="text-gray-700 hover:text-gray-900 transition"
          >
            <IoClose size={22} />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-10 h-1.5 rounded-full bg-orange-500"></div>
          <div className="w-10 h-1.5 rounded-full bg-gray-200"></div>
          <div className="w-10 h-1.5 rounded-full bg-gray-200"></div>
        </div>

        {/* Formik Wrapper */}
        <Formik
          initialValues={{
            startupName: "",
            industry: "",
            summary: "",
          }}
          onSubmit={handleNext}
        >
          {() => (
            <Form>
              <div className="space-y-5">
                {/* Startup Name */}
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-800 mb-2">
                    Startup Name
                  </label>
                  <Field
                    name="startupName"
                    type="text"
                    placeholder="e.g. PayLink Africa"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>

                {/* Industry */}
               <div className="relative mb-2 mt-2 overflow-visible">
  <label className="block text-sm font-medium text-gray-800 mb-2">
    Industry
  </label>
  <div className="relative overflow-visible">
    <Field
      as="select"
      name="industry"
      className="appearance-none w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:ring-2 focus:ring-orange-500 focus:outline-none pr-10 bg-white"
      defaultValue=""
    >
      <option value="" disabled>
        Select industry
      </option>
      {industries?.data?.industries?.map((industry) => (
        <option key={industry} value={industry}>
          {industry.charAt(0).toUpperCase() + industry.slice(1)}
        </option>
      ))}
    </Field>

    {/* Custom Dropdown Icon */}
    <FaChevronDown
      size={14}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
    />
  </div>
</div>


                {/* One-line Summary */}
                <div className="mb-2 mt-2">
                  <label className="block text-sm font-medium text-gray-800 mb-2">
                    One-line Summary
                  </label>
                  <Field
                    as="textarea"
                    name="summary"
                    rows="3"
                    placeholder="e.g. We help small businesses accept cross-border payments in seconds."
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm placeholder-gray-400 resize-none focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Buttons */}
              <section className="flex justify-between items-center mt-6">
                <div
                  onClick={() => navigate("/dashboard")}
                  className="flex items-center gap-2 text-gray-600 cursor-pointer max-sm:px-0 hover:text-gray-900 transition"
                >
                  <FiArrowLeft className="text-lg" />
                  <span className="text-sm font-medium">Go Back</span>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-[#FF5619] text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-orange-600 transition"
                  >
                    Next
                  </button>
                </div>
              </section>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
