import { LoginFormData } from "@/types/auth";
import { SubmitHandler, useForm } from "react-hook-form";

export function LoginForm({
  onSubmit,
  isLoading,
  onForgotPassword,
}: {
  onSubmit: (data: LoginFormData) => Promise<boolean>;
  isLoading: boolean;
  onForgotPassword: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const submitHandler: SubmitHandler<LoginFormData> = (data) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Email Address
        </label>
        <input
          id="email"
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

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          className={`w-full px-4 py-2 border ${
            errors.password
              ? "border-red-500"
              : "border-gray-300 dark:border-gray-600"
          } rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
          placeholder="Enter your password"
          disabled={isLoading}
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        {errors.password && (
          <p className="mt-1 text-xs text-red-600 dark:text-red-400">
            {errors.password.message}
          </p>
        )}
      </div>

      <div className="text-right">
        <button
          type="button"
          className="text-sm text-green-600 dark:text-green-400 hover:underline"
          onClick={onForgotPassword}
          disabled={isLoading}
        >
          Forgot your password?
        </button>
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-green-500 hover:bg-green-600 text-white rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
        disabled={isLoading}
      >
        {isLoading ? "Logging in..." : "Log In"}
      </button>
    </form>
  );
}
