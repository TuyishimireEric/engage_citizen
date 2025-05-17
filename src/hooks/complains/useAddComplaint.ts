import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "@/utils/supabase";
import { useMutation } from "@tanstack/react-query";
import { FC_createComplaint } from "./services";

export interface ComplaintFormData {
  title: string;
  description: string;
  is_public: boolean;
  fullname: string;
  email: string;
}

export function useAddComplaint() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [trackingId, setTrackingId] = useState("");
  const [is_public, setIsPublic] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ComplaintFormData>({
    defaultValues: {
      title: "",
      description: "",
      is_public: false,
      fullname: "",
      email: "",
    },
  });

  const generateTrackingId = () => {
    const year = new Date().getFullYear();
    const randomId = Math.floor(10000 + Math.random() * 90000);
    return `TRK-${year}-${randomId}`;
  };

  const submitComplaintMutation = useMutation({
    mutationFn: async (data: ComplaintFormData) => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      const controller = new AbortController();
      abortControllerRef.current = controller;

      const timeout = setTimeout(() => controller.abort(), 8000);

      try {
        const newTrackingId = generateTrackingId();

        const complaintData = {
          ...data,
          tracking_code: newTrackingId,
          category_id: "5b2fdf00-14d3-42f4-a9c1-9927d86f3d93",
          status: "pending",
          created_by: null,
          is_public: is_public,
        };

        const { data: result, error } = await FC_createComplaint(complaintData);

        if (error) throw error;

        return { result, trackingId: newTrackingId };
      } finally {
        clearTimeout(timeout);
      }
    },
    onSuccess: (data) => {
      setTrackingId(data.trackingId);
      setShowSuccessModal(true);
      reset();
    },
    onError: (err: any) => {
      if (err.name === "AbortError") {
        setError("Request was aborted due to timeout.");
      } else {
        setError("An unexpected error occurred.");
      }
    },
  });

  const onSubmit = (data: ComplaintFormData) => {
    submitComplaintMutation.mutate(data);
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };

  return {
    isSubmitting: submitComplaintMutation.isPending,
    showSuccessModal,
    trackingId,
    is_public,
    error,
    register,
    errors,
    handleSubmit,
    onSubmit,
    setIsPublic,
    closeSuccessModal,
  };
}
