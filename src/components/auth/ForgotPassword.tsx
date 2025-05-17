import { SubmitHandler, useForm } from "react-hook-form";

export function ForgotPasswordForm({
  onBack,
  onSubmit,
  isLoading,
  error,
  emailSent,
  setEmailSent,
}: {
  onBack: () => void;
  onSubmit: (email: string) => Promise<boolean>;
  isLoading: boolean;
  error: string | null;
  emailSent: boolean;
  setEmailSent: (sent: boolean) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>();

  const submitHandler: SubmitHandler<{ email: string }> = async (data) => {
    const success = await onSubmit(data.email);
    if (success) {
      setEmailSent(true);
    }
  };

  if (emailSent) {
    return (
      <div className="text-center py-4">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Check Your Email
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          We've sent password reset instructions to your email address.
        </p>
        <button
          onClick={onBack}
          className="inline-flex justify-center px-4 py-2 text-sm font-medium text-green-600 bg-white border border-green-600 rounded-md hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Back to Login
        </button>
      </div>
    );
  }

  return (
    <>
      <h2 className="text-2xl font-semibold text-center mb-2 text-gray-900 dark:text-gray-100">
        Reset Password
      </h2>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
        Enter your email and we'll send you instructions to reset your password.
      </p>

      {error && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 rounded-md text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
        <div>
          <label
            htmlFor="reset-email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Email Address
          </label>
          <input
            id="reset-email"
            type="email"
            className={`w-full px-4 py-2 border ${
              errors.email
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            } rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
            placeholder="Enter your email"
            disabled={isLoading}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Please enter a valid email address",
              },
            })}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-600 dark:text-red-400">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="flex space-x-3">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 py-2 px-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 py-2 px-4 bg-green-500 hover:bg-green-600 text-white rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </button>
        </div>
      </form>
    </>
  );
}
