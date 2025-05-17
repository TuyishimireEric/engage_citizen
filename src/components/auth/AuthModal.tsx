"use client";

import React, { useCallback } from "react";
import { X } from "lucide-react";
import { LoginFormData } from "@/types/auth";
import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignUpForm";
import { ForgotPasswordForm } from "./ForgotPassword";
import { useAuth } from "@/hooks/auth/useAuth";

interface AuthModalProps {
  authType: "login" | "register" | null;
  setAuthType: (type: "login" | "register" | null) => void;
}

export interface SignupFormData extends LoginFormData {
  name: string;
}

export default function AuthModal({ authType, setAuthType }: AuthModalProps) {
  const [showForgotPassword, setShowForgotPassword] = React.useState(false);
  const [resetEmailSent, setResetEmailSent] = React.useState(false);

  const {
    isLoading,
    login,
    signup,
    error,
    loginWithGoogle,
    loginWithFacebook,
    forgotPassword,
  } = useAuth({ setAuthType });

  const switchAuthMode = useCallback(() => {
    setAuthType(authType === "login" ? "register" : "login");
  }, [authType]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-lg backdrop-saturate-200`}
    >
      <div
        className={`bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6 relative  animate__animated animate__faster animate__fadeIn `}
      >
        <button
          onClick={() => setAuthType(null)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          aria-label="Close modal"
          disabled={isLoading}
        >
          <X size={20} />
        </button>

        {showForgotPassword ? (
          <ForgotPasswordForm
            onBack={() => setShowForgotPassword(false)}
            onSubmit={forgotPassword}
            isLoading={isLoading}
            error={error}
            emailSent={resetEmailSent}
            setEmailSent={setResetEmailSent}
          />
        ) : (
          <>
            <h2 className="text-2xl font-semibold text-center mb-6 text-gray-900 dark:text-gray-100">
              {authType === "login" ? "Log In" : "Sign Up"}
            </h2>

            {error && (
              <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 rounded-md text-sm">
                {error}
              </div>
            )}

            {authType === "login" ? (
              <LoginForm
                onSubmit={login}
                isLoading={isLoading}
                onForgotPassword={() => setShowForgotPassword(true)}
              />
            ) : (
              <SignupForm onSubmit={signup} isLoading={isLoading} />
            )}

            <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
              {authType === "login"
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                onClick={switchAuthMode}
                className="text-green-600 dark:text-green-400 hover:underline font-medium"
                disabled={isLoading}
              >
                {authType === "login" ? "Sign Up" : "Log In"}
              </button>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-4">
                Or continue with
              </p>
              <div className="flex space-x-4">
                <button
                  className="flex-1 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md flex justify-center items-center text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  onClick={loginWithGoogle}
                  disabled={isLoading}
                >
                  Google
                </button>
                <button
                  className="flex-1 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md flex justify-center items-center text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  onClick={loginWithFacebook}
                  disabled={isLoading}
                >
                  Facebook
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
