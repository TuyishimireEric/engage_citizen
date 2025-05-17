import { CheckCircle, Copy, X } from "lucide-react";
import { useState } from "react";

interface SuccessModalProps {
  trackingId: string;
  closeSuccessModal: () => void;
}

export const SuccessModal = ({
  trackingId,
  closeSuccessModal,
}: SuccessModalProps) => {
  const [copied, setCopied] = useState(false);
  const copyToClipboard = () => {
    navigator.clipboard.writeText(trackingId);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-lg backdrop-saturate-200"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-xl p-6 relative animate__animated animate__faster animate__fadeIn">
        <button
          onClick={closeSuccessModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/50 mb-4">
            <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>

          <h3
            className="text-xl font-semibold text-gray-900 dark:text-gray-100"
            id="modal-title"
          >
            Complaint Submitted!
          </h3>

          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Your complaint has been successfully recorded. You can track its
            status using the tracking ID below.
          </p>

          <div className="mt-6 mb-2">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tracking ID
            </p>
            <div className="flex items-center justify-center">
              <div className="bg-gray-100 dark:bg-gray-700 py-3 px-4 rounded-lg flex items-center">
                <span className="font-mono text-4xl font-medium text-gray-800 dark:text-gray-200">
                  {trackingId}
                </span>
                <button
                  onClick={copyToClipboard}
                  className="ml-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none transition-colors"
                  aria-label="Copy tracking ID"
                >
                  <Copy className="h-8 w-8" />
                </button>
              </div>
            </div>
            {copied && (
              <p className="mt-1 text-xs text-green-600 dark:text-green-400 animate-fadeIn">
                Copied to clipboard!
              </p>
            )}
          </div>

          <div className="mt-6">
            <button
              type="button"
              onClick={closeSuccessModal}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
