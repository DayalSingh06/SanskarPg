import React from "react";
import { useTheme } from "../context/ThemeContext";

const rulesData = [
  {
    en: "Do not allow friends or relatives inside the hostel without permission.",
    hi: "बिना अनुमति मित्र या रिश्तेदार को हॉस्टल परिसर में प्रवेश न दें।",
  },
  {
    en: "Entry in hostel before 10:00 PM is mandatory.",
    hi: "रात 10:00 बजे से पहले हॉस्टल में आना अनिवार्य है।",
  },
  {
    en: "Meals must be taken at scheduled times in the mess.",
    hi: "भोजन निर्धारित समय पर मेस में ही करना होगा।",
  },
  {
    en: "Keep the hostel clean and maintain discipline.",
    hi: "हॉस्टल को साफ रखें और अनुशासन बनाए रखें।",
  },
  {
    en: "Hostel fees must be paid in advance and are non-refundable.",
    hi: "हॉस्टल शुल्क अग्रिम जमा करना होगा और वापस नहीं होगा।",
  },
  {
    en: "One month notice is required before leaving the hostel.",
    hi: "हॉस्टल छोड़ने से पहले 1 महीने की सूचना देना अनिवार्य है।",
  },
  {
    en: "Talking to strangers outside the hostel is not allowed.",
    hi: "हॉस्टल के बाहर अनजान लोगों से बात करना मना है।",
  },
  {
    en: "Do not create noise or disturb others.",
    hi: "शोर-शराबा करना या दूसरों को परेशान करना मना है।",
  },
  {
    en: "Students are responsible for their personal belongings.",
    hi: "अपने सामान की सुरक्षा की जिम्मेदारी स्वयं की होगी।",
  },
  {
    en: "Do not use beds without bedsheets.",
    hi: "बिस्तर का उपयोग बिना चादर के न करें।",
  },
  {
    en: "Keep your room clean and organized.",
    hi: "अपने कमरे को साफ और व्यवस्थित रखें।",
  },
  {
    en: "Dry clothes only in designated areas.",
    hi: "कपड़े केवल निर्धारित स्थान पर ही सुखाएं।",
  },
  {
    en: "Any damage to hostel property must be compensated.",
    hi: "हॉस्टल की संपत्ति को नुकसान पहुंचाने पर भरपाई करनी होगी।",
  },
  {
    en: "Violation of rules can lead to cancellation of admission.",
    hi: "नियमों का उल्लंघन करने पर प्रवेश रद्द किया जा सकता है।",
  },
  {
    en: "Permission is required before going on leave.",
    hi: "अवकाश पर जाने से पहले अनुमति आवश्यक है।",
  },
  {
    en: "Turn off lights, fans before leaving room.",
    hi: "कमरा छोड़ने से पहले लाइट और पंखा बंद करें।",
  },
  {
    en: "Monthly fees must be paid between 1st to 5th.",
    hi: "मासिक शुल्क 1 से 5 तारीख के बीच जमा करें।",
  },
  {
    en: "Room changes depend on management approval.",
    hi: "कमरा बदलना प्रबंधन की अनुमति पर निर्भर करेगा।",
  },
  {
    en: "Hostel is not responsible for incidents outside premises.",
    hi: "हॉस्टल परिसर के बाहर की घटनाओं के लिए जिम्मेदार नहीं होगा।",
  },
  {
    en: "No fee refund during leave or holidays.",
    hi: "अवकाश या छुट्टियों में शुल्क वापस नहीं होगा।",
  },
  {
    en: "All disputes will be handled under Jaipur jurisdiction.",
    hi: "सभी विवाद जयपुर क्षेत्राधिकार में सुलझाए जाएंगे।",
  },
];

const Rules = () => {
  const { darkMode } = useTheme();

  return (
    <div
      className={`min-h-screen px-4 py-6 select-none sm:p-6 ${
        darkMode
          ? "bg-[#0f0f1a] text-white"
          : "bg-gray-50 text-gray-800"
      }`}
    >
      <div className="mx-auto w-full max-w-4xl">
        {/* HEADING */}
        <h1 className="mb-6 text-center text-2xl font-bold sm:mb-8 sm:text-3xl">
          Rules & Regulations
        </h1>
        {/* RULE LIST */}
        <div className="space-y-3 sm:space-y-4">
          {rulesData.map((rule, index) => (
            <div
              key={index}
              className={`rounded-xl border p-3 sm:p-4 ${
                darkMode
                  ? "border-gray-700 bg-[#1a1625]"
                  : "border-gray-200 bg-white"
              } shadow-sm transition hover:shadow-md`}
            >
              <p className="text-sm leading-relaxed font-medium sm:text-base">
                {index + 1}. {rule.en}
              </p>
              <p className="mt-1.5 pl-5 text-xs leading-relaxed opacity-80 sm:pl-5 sm:text-sm">
                {rule.hi}
              </p>
            </div>
          ))}
        </div>
        {/* FOOT NOTE */}
        <div className="mt-8 text-center text-xs opacity-70 sm:mt-10 sm:text-sm">
          <p>
            By staying in the hostel, you agree to follow all the
            above rules.
          </p>
          <p className="mt-1">
            हॉस्टल में रहने पर उपरोक्त सभी नियमों का पालन करना
            अनिवार्य होगा।
          </p>
        </div>
      </div>
    </div>
  );
};

export default Rules;
