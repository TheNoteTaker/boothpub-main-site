import React from 'react';
import { Icon } from '@/components/ui/Icon';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from '@/components/ui/accordion';

const faqs = [
  {
    question: "How far in advance should I book?",
    answer: "We recommend booking at least 2-3 months in advance for peak season events (May-October) and 1-2 months for off-peak events. However, we may be able to accommodate last-minute bookings based on availability."
  },
  {
    question: "What area do you serve?",
    answer: "We primarily serve the Los Angeles area and surrounding counties. Travel fees may apply for locations beyond a 30-mile radius of downtown LA."
  },
  {
    question: "How much space do you need?",
    answer: "Our photo booth setup requires approximately 8x8 feet of space. For packages including bar service, we need an additional 10x6 feet area for the bar setup."
  },
  {
    question: "Do you require a deposit?",
    answer: "Yes, we require a 25% non-refundable deposit to secure your date, with the remaining balance due 14 days before your event."
  },
  {
    question: "What's included in the bar service?",
    answer: "Our bar service includes a professional bartender, all necessary equipment, glassware, ice, mixers, and garnishes. Alcohol is not included but we can provide recommendations based on your preferences and guest count."
  },
  {
    question: "How do we get our photos?",
    answer: "Guests receive instant prints at the event. All digital photos are uploaded to a private online gallery within 24 hours, where you can download and share them."
  }
];

export function FAQ() {
  return (
    <section id="faq" className="relative overflow-hidden bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-[#2F505F] sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Have a different question? Reach out to our team at{' '}
              <a 
                href="mailto:hello@boothpub.com" 
                className="text-[#D75E1F] hover:text-[#2F505F] transition-colors duration-300"
              >
                hello@boothpub.com
              </a>
            </p>
          </div>

          <div className="mt-12">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index}
                  value={`item-${index}`}
                  className="rounded-lg border border-gray-200 px-4 py-3 hover:border-[#D75E1F]/50 transition-colors duration-300"
                >
                  <AccordionTrigger className="flex w-full items-center justify-between py-2 text-left text-lg font-medium text-[#2F505F] hover:text-[#D75E1F] transition-colors duration-300">
                    {faq.question}
                    <Icon name="ChevronDown" className="h-5 w-5 shrink-0 transition-transform duration-300" />
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 pt-2 text-base text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="mt-12 text-center">
            <a
              href="#contact"
              className="inline-flex items-center px-6 py-3 text-base font-medium rounded-lg text-white bg-[#D75E1F] hover:bg-[#2F505F] transition-all duration-300 group"
            >
              Contact Us
              <Icon
                name="ArrowRight"
                className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
} 