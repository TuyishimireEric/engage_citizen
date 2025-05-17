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
      title: "Submit Feedback",
      description:
        "Share your thoughts, suggestions, or report an issue using our simple submission form.",
      color: "bg-green-500",
    },
    {
      icon: <ClipboardCheck className="h-6 w-6 text-white" />,
      title: "Acknowledgment",
      description:
        "Receive confirmation that your feedback has been received and is under review.",
      color: "bg-blue-500",
    },
    {
      icon: <MessageCircle className="h-6 w-6 text-white" />,
      title: "Processing",
      description:
        "Our team analyzes your feedback and takes appropriate action to address it.",
      color: "bg-purple-500",
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-white" />,
      title: "Resolution",
      description:
        "Get notified when your feedback has been resolved or implemented.",
      color: "bg-indigo-500",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-gray-600 text-lg">
            Our streamlined process ensures your feedback is heard and addressed
            effectively.
          </p>
        </div>

        <div className="relative">
          {/* Progress line */}
          <div className="absolute left-1/2 top-10 bottom-10 w-0.5 bg-gray-200 hidden md:block"></div>

          <div className="space-y-12 relative">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div
                  className={`md:w-1/2 ${
                    index % 2 === 0 ? "md:pr-12 md:ml-auto" : "md:pl-12"
                  }`}
                >
                  <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-4">
                      <div
                        className={`w-10 h-10 rounded-full ${step.color} flex items-center justify-center mr-4 shrink-0`}
                      >
                        {step.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>

                {/* Number indicator */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border-4 border-gray-200  items-center justify-center font-bold text-gray-500 hidden md:flex">
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
