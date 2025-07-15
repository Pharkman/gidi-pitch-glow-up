import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Is GidiPitch free to use?',
      answer: 'Yes! We offer a free tier that includes basic pitch deck generation and limited financial forecasting. Our premium plans unlock advanced features like unlimited exports, custom branding, and priority support.'
    },
    {
      question: 'Can I edit the generated pitch deck?',
      answer: 'Absolutely! All generated content is fully editable. You can modify text, add your own images, adjust layouts, and customize the design to match your brand. Export to PowerPoint, PDF, or continue editing in our platform.'
    },
    {
      question: 'Will this work for my specific industry?',
      answer: 'GidiPitch works across all industries - from fintech and healthtech to agriculture and e-commerce. Our AI is trained on successful pitch decks from various African sectors and adapts content to your specific market and business model.'
    },
    {
      question: 'Can I apply to Y Combinator with materials from GidiPitch?',
      answer: 'Yes! Our YC Assistant specifically helps you prepare application materials that meet Y Combinator\'s requirements. Many of our users have successfully applied to top accelerators using GidiPitch-generated content.'
    },
    {
      question: 'How accurate are the financial forecasts?',
      answer: 'Our financial models are based on industry benchmarks and best practices for startup projections. While we provide solid foundations, we always recommend reviewing numbers with a financial advisor or mentor familiar with your specific market.'
    },
    {
      question: 'Do you offer support for teams?',
      answer: 'Yes! Our team plans include collaboration features, shared workspaces, and dedicated account management. We also offer training sessions for accelerators and incubators working with multiple startups.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Frequently Asked{' '}
            <span className="text-gradient-primary">Questions</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about GidiPitch and how it works.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-card border border-border rounded-2xl shadow-soft overflow-hidden transition-all duration-300 hover:shadow-medium"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-muted/30 transition-colors duration-200"
              >
                <h3 className="text-lg font-semibold pr-4">
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
                  <p className="text-muted-foreground leading-relaxed">
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