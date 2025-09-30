import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "How much does Leo cost?",
    answer: "Leo is billed per minute of answered calls — no contracts, no hidden fees. You only pay for the time Leo is actually helping your prospects.",
  },
  {
    question: "Can I try Leo before committing?",
    answer: "Yes — we offer a risk-free trial so you can see Leo in action before paying anything.",
  },
  {
    question: "Can I trust Leo to capture lead info accurately?",
    answer: "Absolutely. Leo confirms each caller's name, number, and email, and logs everything in real time for your team to follow up.",
  },
  {
    question: "What happens if someone calls after hours?",
    answer: "Leo answers 24/7 — even when your office is closed — and keeps your calendar full with qualified tour bookings.",
  },
  {
    question: "What if a prospect wants to speak to a real person?",
    answer: "During office hours, Leo transfers live calls directly to your team. After hours, Leo offers to schedule a follow-up or shares your contact info.",
  },
  {
    question: "How long does it take to set up Leo?",
    answer: "Setup takes less than 10 minutes. No tech skills or training needed — just connect your calendar and you're ready.",
  },
  {
    question: "How do I get the leads Leo captures?",
    answer: "All prospect info — name, phone, email, and preferences — is delivered instantly to your CRM, inbox, or Google Sheet.",
  },
  {
    question: "Will Leo talk to current tenants or vendors too?",
    answer: "When Leo takes a non-leasing call it can politely redirect to the contact handling such queries.",
  },
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F5F3EF]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E293B] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-[#64748B]">
            Get quick answers to common questions about how Leo works.
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-[#0F172A] pr-4">
                  {faq.question}
                </h3>
                <ChevronDown 
                  className={`w-5 h-5 text-[#64748B] transition-transform duration-200 flex-shrink-0 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              <div 
                className={`px-6 overflow-hidden transition-all duration-200 ease-in-out ${
                  openIndex === index 
                    ? 'max-h-96 pb-5' 
                    : 'max-h-0'
                }`}
              >
                <p className="text-[#334155] leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;