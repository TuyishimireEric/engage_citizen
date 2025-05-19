import showToast from "@/utils/showToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FC_addResponses } from "./services";

interface RespondComplaintInput {
  complaint_id: string;
  status: string;
  message: string;
  responded_by: string;
}

export const useRespondComplaint = () => {
  const queryClient = useQueryClient();

  const respondComplaintMutation = useMutation({
    mutationFn: FC_addResponses,
    onSuccess: async () => {
      showToast("Complaint responded successfully", "success");
      queryClient.invalidateQueries({ queryKey: ["Responses"] });
    },
    onError: () => {
      showToast("An unexpected error occurred", "error");
    },
  });

  const onSubmit = (data: RespondComplaintInput) => {
    if (!data.responded_by) {
      showToast("Please select a user to respond", "error");
      return;
    }
    respondComplaintMutation.mutate(data);
  };

  return {
    onSubmit,
    isPending: respondComplaintMutation.isPending,
    isSuccess: respondComplaintMutation.isSuccess,
  };
};
