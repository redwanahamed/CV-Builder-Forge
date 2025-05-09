
import Header from "@/components/layout/Header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does CV Forge AI work?",
    answer: "CV Forge AI uses advanced artificial intelligence to analyze your experience and skills, suggesting the best way to present them in your resume. Simply input your information, and our AI will help structure and phrase your content professionally."
  },
  {
    question: "Can I export my resume in different formats?",
    answer: "Yes! You can export your resume in PDF, DOCX, and other professional formats. Each format is optimized for both human readability and ATS (Applicant Tracking Systems)."
  },
  {
    question: "Is my information secure?",
    answer: "Absolutely. We use industry-standard encryption and security measures to protect your personal information. Your data is never shared with third parties without your explicit consent."
  },
  {
    question: "Can I create multiple versions of my resume?",
    answer: "Yes, our platform allows you to create and save multiple versions of your resume, making it easy to tailor your application for different positions and industries."
  }
];

export default function FAQs() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-serif font-bold mb-6">Frequently Asked Questions</h1>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </main>
    </div>
  );
}
