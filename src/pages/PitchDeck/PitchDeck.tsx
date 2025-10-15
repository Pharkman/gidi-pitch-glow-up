// import React, { useState } from "react";
// import { Formik, Form, Field, FieldArray } from "formik";
// import { motion } from "framer-motion";
// import {
//   FaLightbulb,
//   FaUsers,
//   FaPlusCircle,
// } from "react-icons/fa";
// import { useCreatePitchDeck, useGetIndustries, useGetIndustries_Slides } from "@/lib/query";
// import { toast } from "react-toastify";
// import { LoadingSpinner } from "@/components/Loader";
// import PitchDeckImageUpload from "./component/PitchDeckImageUpload";

import CreatePitchDeckModal from "./component/CreatePitchDeckModal"

// export default function PitchDeckForm() {
//   const { mutate, isPending } = useCreatePitchDeck();
//     const [selectedIndustry, setSelectedIndustry] = useState("");
//     const { data: industries } = useGetIndustries();

//   // Fetch slides dynamically whenever an industry is selected
//   const { data: slideData, isLoading } = useGetIndustries_Slides(selectedIndustry);



//   const initialValues = {
//     startUpName: "",
//     industry: "",
//     brandColor: "",
//     scope: "",
//     problems: "",
//     solutions: [""],
//     features: "",
//     founders: [{ name: "", title: "", role: "" }],
//     image: null,
//   };

//   const handleSubmit = async (values, { resetForm }) => {
//     try {
//       const formData = new FormData();
//       for (const key in values) {
//         if (Array.isArray(values[key]) || typeof values[key] === "object") {
//           formData.append(key, JSON.stringify(values[key]));
//         } else {
//           formData.append(key, values[key]);
//         }
//       }

//       mutate(formData, {
//         onSuccess: () => {
//           toast.success("Pitch deck submitted successfully!");
//           resetForm();
//         },
//         onError: (error) => {
//           toast.error(error.message || "Failed to submit pitch deck");
//         },
//       });
//     } catch (error) {
//       toast.error("Something went wrong!");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br flex items-center justify-center p-6">
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, ease: "easeOut" }}
//         className="max-w-6xl w-full bg-primary border border-bgprimary/30 shadow-2xl rounded-3xl p-10"
//       >
//         <div className="text-center mb-10">
//           <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
//             Submit Your Pitch Deck
//           </h1>
//      5   <p className="text-white/70 text-sm">
//             Bring your startup vision to life and connect with investors 🚀
//           </p>
//         </div>

//         <Formik initialValues={initialValues} onSubmit={handleSubmit}>
//           {({ values, setFieldValue }) => (
//             <Form className="space-y-7 text-white">
//               {/* Basic Info */}
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//               >
//                 <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
//                   <FaLightbulb className="text-bgprimary" /> Basic Information
//                 </h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                   {/* Startup Name */}
//                   <Field
//                     name="startUpName"
//                     type="text"
//                     placeholder="Start Up Name"
//                     className="bg-white border border-bgprimary/40 p-3 rounded-lg w-full text-[#0b1525] placeholder:text-gray-500 focus:ring-2 focus:ring-bgprimary outline-none transition"
//                     required
//                   />

//                   {/* ✅ Industry Dropdown */}
//                 <div className="relative w-full">
//   <Field
//     as="select"
//     name="industry"
//     className="appearance-none bg-white border border-bgprimary/40 p-3 pr-10 rounded-lg w-full text-[#0b1525] focus:ring-2 focus:ring-bg-primary outline-none transition duration-200 ease-in-out shadow-sm hover:border-bgprimary/60"
//     required
//     onChange={(e) => {
//       const value = e.target.value;
//       setSelectedIndustry(value);
//       setFieldValue("industry", value);
//     }}
//   >
    // <option value="">Select Industry</option>
    // {industries?.data?.industries?.map((industry) => (
    //   <option key={industry} value={industry}>
    //     {industry.charAt(0).toUpperCase() + industry.slice(1)}
    //   </option>
    // ))}
//   </Field>

//   {/* Custom dropdown arrow */}
//   <svg
//     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
//     xmlns="http://www.w3.org/2000/svg"
//     width="18"
//     height="18"
//     fill="none"
//     viewBox="0 0 24 24"
//     stroke="currentColor"
//     strokeWidth={2}
//   >
//     <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
//   </svg>
// </div>

//                   {/* Brand Color */}
//                   <Field
//                     name="brandColor"
//                     type="text"
//                     placeholder="Brand Color"
//                     className="bg-white border border-bgprimary/40 p-3 rounded-lg w-full text-[#0b1525] placeholder:text-gray-500 focus:ring-2 focus:ring-bgprimary outline-none transition"
//                     required
//                   />

//                   {/* Scope */}
//                   <Field
//                     name="scope"
//                     type="text"
//                     placeholder="Scope"
//                     className="bg-white border border-bgprimary/40 p-3 rounded-lg w-full text-[#0b1525] placeholder:text-gray-500 focus:ring-2 focus:ring-bgprimary outline-none transition"
//                     required
//                   />
//                 </div>
//               </motion.div>

//               {/* Problem */}
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//               >
//                 <h2 className="text-xl font-semibold mb-3 text-bgprimary">
//                   Problem Statement
//                 </h2>
//                 <Field
//                   as="textarea"
//                   name="problems"
//                   placeholder="Describe the core problem your startup is solving..."
//                   className="bg-white border border-bgprimary/40 p-4 rounded-lg w-full h-32 text-[#0b1525] placeholder:text-gray-500 focus:ring-2 focus:ring-bgprimary outline-none resize-none transition"
//                   required
//                 />
//               </motion.div>

//               {/* Solutions */}
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//               >
//                 <h2 className="text-xl font-semibold mb-3 text-bgprimary">
//                   Solutions
//                 </h2>
//                 <FieldArray name="solutions">
//                   {({ push }) => (
//                     <div>
//                       {values.solutions.map((_, i) => (
//                         <div key={i}>
//                           <Field
//                             as="textarea"
//                             name={`solutions.${i}`}
//                             placeholder={`Solution ${i + 1}`}
//                             className="bg-white border border-bgprimary/40 p-3 rounded-lg w-full h-24 text-[#0b1525] placeholder:text-gray-500 focus:ring-2 focus:ring-bgprimary outline-none mb-3 resize-none transition"
//                           />
//                         </div>
//                       ))}
//                       <button
//                         type="button"
//                         onClick={() => push("")}
//                         className="flex items-center gap-2 text-bg-primary hover:text-white hover:bg-bgprimary/90 border border-bgprimary transition font-medium px-4 py-2 rounded-lg mt-2"
//                       >
//                         <FaPlusCircle /> Add Another Solution
//                       </button>
//                     </div>
//                   )}
//                 </FieldArray>
//               </motion.div>

//               {/* Features */}
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//               >
//                 <h2 className="text-xl font-semibold mb-3 text-bgprimary">
//                   Key Features
//                 </h2>
//                 <Field
//                   as="textarea"
//                   name="features"
//                   placeholder="Highlight key features of your product..."
//                   className="bg-white border border-bgprimary/40 p-4 rounded-lg w-full h-32 text-[#0b1525] placeholder:text-gray-500 focus:ring-2 focus:ring-bgprimary outline-none resize-none transition"
//                   required
//                 />
//               </motion.div>

//               {/* Founders */}
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//               >
//                 <h2 className="flex items-center gap-2 text-xl font-semibold mb-4 text-bgprimary">
//                   <FaUsers className="text-bgprimary" /> Founders
//                 </h2>
//                 <FieldArray name="founders">
//                   {({ push }) => (
//                     <div>
//                       {values.founders.map((founder, i) => (
//                         <div
//                           key={i}
//                           className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3"
//                         >
//                           {["name", "title", "role"].map((key) => (
//                             <Field
//                               key={key}
//                               name={`founders.${i}.${key}`}
//                               type="text"
//                               placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
//                               className="bg-white border border-bgprimary/40 p-3 rounded-lg text-[#0b1525] placeholder:text-gray-500 focus:ring-2 focus:ring-bgprimary outline-none transition"
//                               required
//                             />
//                           ))}
//                         </div>
//                       ))}
//                       <button
//                         type="button"
//                         onClick={() => push({ name: "", title: "", role: "" })}
//                         className="flex items-center gap-2 text-bg-primary hover:text-white hover:bg-bgprimary/90 border border-bgprimary transition font-medium px-4 py-2 rounded-lg mt-2"
//                       >
//                         <FaPlusCircle /> Add Another Founder
//                       </button>
//                     </div>
//                   )}
//                 </FieldArray>
//               </motion.div>


//                <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             <h2 className="text-xl font-semibold mb-3 text-bgprimary">
//               Select Slide
//             </h2>
//             <div className="relative w-full">
//               <Field
//                 as="select"
//                 name="slide"
//                 className="appearance-none bg-white border border-bgprimary/40 p-3 pr-10 rounded-lg w-full text-[#0b1525] focus:ring-2 focus:ring-bg-primary outline-none transition duration-200 ease-in-out shadow-sm hover:border-bgprimary/60"
//                 disabled={!selectedIndustry || isLoading}
//               >
//                 <option value="">
//                   {isLoading
//                     ? "Loading slides..."
//                     : !selectedIndustry
//                     ? "Select an industry first"
//                     : "Select Slide"}
//                 </option>
//                 {slideData?.data?.slides?.map((slide) => (
//                   <option key={slide._id} value={slide._id}>
//                     {slide.title}
//                   </option>
//                 ))}
//               </Field>
//               <svg
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="18"
//                 height="18"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth={2}
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
//               </svg>
//             </div>
//           </motion.div>

//               {/* Upload */}
//               <PitchDeckImageUpload setFieldValue={setFieldValue} />

//               {/* Submit */}
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 type="submit"
//                 disabled={isPending}
//                 className="mt-8 w-full py-3 bg-white text-primary font-semibold rounded-lg shadow-lg transition-all duration-300 focus:ring-2 focus:ring-bgprimary"
//               >
//                 {isPending ? <LoadingSpinner /> : "Submit Pitch Deck"}
//               </motion.button>
//             </Form>
//           )}
//         </Formik>
//       </motion.div>
//     </div>
//   );
// }

const PitchDeck = () => {
  return (
    <div>
       <CreatePitchDeckModal />
    </div>
  )
}

export default PitchDeck

