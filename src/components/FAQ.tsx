import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { faqs } from './dummy';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 max-sm:py-10  bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-[32px] lg:text-[52px] font-bold mb-6 max-sm:text-2xl">
            Frequently Asked
            <span className="text-gradient-primary ml-3">Questions</span>
          </h2>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-[#F5F5F5] border border-[#DBDBDB] rounded-2xl shadow-soft overflow-hidden transition-all duration-300 hover:shadow-medium"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-muted/30 transition-colors duration-200"
              >
                <h3 className="text-lg font-medium text-[#1D1D1D] pr-4 max-sm:text-base ">
                  {faq.question}
                </h3>
                <ChevronDown 
                  className={`h-5 w-5 text-muted-foreground transition-transform duration-300 flex-shrink-0 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="px-8 pb-6">
                  <p className="text-[#777777] text-[16px] font-medium leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        
        {/* Bottom CTA */}
        {/* <div className="text-center mt-16">
          <div className="bg-gradient-card border border-border rounded-2xl p-8 max-w-2xl mx-auto shadow-soft">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-muted-foreground mb-6">
              Join hundreds of African founders who've already built their pitch materials with GidiPitch.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-hero">
                Start Building Now
              </button>
              <button className="btn-ghost">
                Watch Demo
              </button>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default FAQ;