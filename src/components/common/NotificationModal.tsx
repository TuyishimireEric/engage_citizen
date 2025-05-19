import { CheckCircle, XCircle, X } from "lucide-react";

interface NotificationModalProps {
  type: "success" | "error";
  message: string;
  title?: string;
  onClose: () => void;
}

export const NotificationModal = ({
  type,
  title,
  message,
  onClose,
}: NotificationModalProps) => {
  const isSuccess = type === "success";

  const icon = isSuccess ? (
    <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
  ) : (
    <XCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
  );

  const iconBg = isSuccess ? "bg-green-100 dark:bg-green-900/50" : "bg-red-100 dark:bg-red-900/50";

  const buttonColor = isSuccess
    ? "bg-green-600 hover:bg-green-700 focus:ring-green-500"
    : "bg-red-600 hover:bg-red-700 focus:ring-red-500";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-lg backdrop-saturate-200"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6 relative animate__animated animate__fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="text-center">
          <div className={`mx-auto flex items-center justify-center h-16 w-16 rounded-full mb-4 ${iconBg}`}>
            {icon}
          </div>

          {title && (
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1">
              {title}
            </h3>
          )}

          <p className="text-gray-600 dark:text-gray-400">{message}</p>

          <div className="mt-6">
            <button
              onClick={onClose}
              className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${buttonColor} focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors`}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
