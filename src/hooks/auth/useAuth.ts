"use client";

import { supabase } from "@/utils/supabase";
import { useState, useCallback } from "react";

type AuthType = "login" | "signup";

interface AuthCredentials {
  email: string;
  password: string;
}

interface SignupCredentials extends AuthCredentials {
  name: string;
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export function useAuth({
  setAuthType,
}: {
  setAuthType: (authType: "login" | "register" | null) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (data: AuthCredentials): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    const { email, password } = data;

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      setAuthType(null);
      return true;
    } catch (err) {
      console.error("Login failed:", err);
      setError("Invalid email or password. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (data: SignupCredentials): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    const { name, email, password } = data;

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      const user: UserProfile = {
        id: "user-" + Math.floor(Math.random() * 1000),
        name,
        email,
      };

      const { error: userError } = await supabase.from("Profiles").insert({
        user_id: data?.user?.id,
        full_name: name,
        role_id: 3,
        email: email,
      });

      setAuthType("login");
      return true;
    } catch (err) {
      console.error("Signup failed:", err);
      setError(
        "Registration failed. Please try again or use a different email."
      );
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = useCallback(async (): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      return true;
    } catch (err) {
      console.error("Google login failed:", err);
      setError("Google login failed. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loginWithFacebook = async (): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      console.log("Logging in with Facebook");

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock successful Facebook login
      const mockUser: UserProfile = {
        id: "fb-user-123",
        name: "Facebook User",
        email: "facebook.user@example.com",
        avatar: "https://via.placeholder.com/150",
      };

      return true;
    } catch (err) {
      console.error("Facebook login failed:", err);
      setError("Facebook login failed. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const forgotPassword = useCallback(
    async (email: string): Promise<boolean> => {
      setIsLoading(true);
      setError(null);

      try {
        console.log("Password reset requested for:", email);

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // In a real app, this would send a password reset email

        return true;
      } catch (err) {
        console.error("Password reset failed:", err);
        setError("Failed to send password reset email. Please try again.");
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    isLoading,
    error,
    login,
    signup,
    loginWithGoogle,
    loginWithFacebook,
    forgotPassword,
  };
}
