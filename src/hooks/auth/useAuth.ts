"use client";

import { supabase } from "@/utils/supabase";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

interface AuthCredentials {
  email: string;
  password: string;
}

interface SignupCredentials extends AuthCredentials {
  name: string;
}

export function useAuth({
  setAuthType,
}: {
  setAuthType: (authType: "login" | "register" | null) => void;
}) {
  const [error, setError] = useState<string | null>(null);

  const loginMutation = useMutation({
    mutationFn: async (data: AuthCredentials) => {
      const { email, password } = data;
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message.includes("Email not confirmed")) {
          throw new Error("Please verify your email before logging in");
        }
        throw new Error(error.message || "Invalid email or password");
      }

      return authData;
    },
    onSuccess: () => {
      toast.success("Successfully logged in");
      setAuthType(null);
    },
    onError: (error: Error) => {
      setError(error.message);
      toast.error(error.message);
    },
  });

  const signupMutation = useMutation({
    mutationFn: async (data: SignupCredentials) => {
      const { name, email, password } = data;
      
      const { data: authData, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });

      if (error) {
        throw new Error(error.message || "Registration failed");
      }

      // Check if email confirmation is required
      if (authData?.user?.identities?.length === 0) {
        throw new Error("This email is already registered");
      }

      return authData;
    },
    onSuccess: (data) => {
      if (data.user?.identities && data.user.identities.length > 0) {
        toast.success(
          "Registration successful! Please check your email to verify your account."
        );
        setAuthType("login");
      }
    },
    onError: (error: Error) => {
      setError(error.message);
      toast.error(error.message);
    },
  });

  const login = async (data: AuthCredentials): Promise<boolean> => {
    try {
      await loginMutation.mutateAsync(data);
      return true;
    } catch {
      return false;
    }
  };

  const signup = async (data: SignupCredentials): Promise<boolean> => {
    try {
      await signupMutation.mutateAsync(data);
      return true;
    } catch {
      return false;
    }
  };

  return {
    isLoading: loginMutation.isPending || signupMutation.isPending,
    error,
    login,
    signup,
  };
}