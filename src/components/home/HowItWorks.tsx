import {
  MessageSquare,
  ClipboardCheck,
  MessageCircle,
  CheckCircle,
} from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      icon: <MessageSquare className="h-6 w-6 text-white" />,
      title: "Submit a Complaint",
      description:
        "Share your concerns or issues through our straightforward complaint form.",
      color: "bg-red-500",
    },
    {
      icon: <ClipboardCheck className="h-6 w-6 text-white" />,
      title: "System Categorizes the Complaint",
      description:
        "Our system automatically organizes your complaint for efficient handling.",
      color: "bg-yellow-500",
    },
    {
      icon: <MessageCircle className="h-6 w-6 text-white" />,
      title: "Complaint is Reviewed",
      description:
        "Our team evaluates the complaint and determines the appropriate action.",
      color: "bg-blue-500",
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-white" />,
      title: "Complaint is Responded",
      description:
        "You receive a response detailing the resolution or further steps.",
      color: "bg-green-500",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Our streamlined process ensures your complaint is categorized,
            reviewed, and addressed effectively.
          </p>
        </div>

        <div className="relative">
          {/* Vertical progress line */}
          <div className="absolute left-1/2 top-10 bottom-10 w-0.5 bg-gray-200 dark:bg-gray-700 hidden md:block"></div>

          <div className="space-y-12 relative">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div
                  className={`md:w-1/2 ${
                    index % 2 === 0 ? "md:pr-12 md:ml-auto" : "md:pl-12"
                  }`}
                >
                  <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-4">
                      <div
                        className={`w-10 h-10 rounded-full ${step.color} flex items-center justify-center mr-4 shrink-0`}
                      >
                        {step.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      {step.description}
                    </p>
                  </div>
                </div>

                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white dark:bg-gray-800 border-4 border-gray-200 dark:border-gray-600 items-center justify-center font-bold text-gray-500 dark:text-gray-300 hidden md:flex">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
