const FAQ = () => {
  const faqs = [
    {
      question: "How can I book an appointment?",
      answer: "You can book an appointment through the 'Find a Doctor' section or call our support line.",
    },
    {
      question: "Are online consultations available?",
      answer: "Yes, we offer online consultations for most specialties.",
    },
    
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index}>
            <h2 className="text-xl font-semibold text-blue-700">{faq.question}</h2>
            <p className="text-gray-700 mt-2">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
