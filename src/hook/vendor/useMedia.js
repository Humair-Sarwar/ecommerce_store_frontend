import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiAuth } from "../../utils/apis/api-client";

// fetch function
const fetchMediaApi = async ({page, per_page}) => {
  const res = await apiAuth.get("/api/vendor/medias", {
    params: {
      page,
      per_page
    },
  });
  return res.data;
};

// hook
export const fetchMedia = (page, per_page) => {
  return useQuery({
    queryKey: ["medias", page, per_page],
    queryFn: () => fetchMediaApi({ page, per_page }),
    keepPreviousData: true,
  });
};






// ================= UPLOAD MEDIA =================
const uploadMediaApi = async (formData) => {
  const res = await apiAuth.post("/api/vendor/medias/uploads", formData);
  return res.data;
};

export const useUploadMedia = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadMediaApi,

    onSuccess: () => {
      // 🔥 auto refresh media list
      queryClient.invalidateQueries({ queryKey: ["media"] });
    },
  });
};











// delete api
const deleteMediaApi = async (id) => {
  const res = await apiAuth.delete(`/api/vendor/media/delete/${id}`);
  return res.data;
};

// hook
export const useDeleteMedia = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMediaApi,
    onSuccess: () => {
      // 🔥 list refresh
      queryClient.invalidateQueries(["media"]);
    },
  });
};














// API function
const uploadMediaSingleApi = async (formData) => {
  const res = await apiAuth.post("/api/vendor/media", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

// Hook
export const useUploadSingleMedia = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadMediaSingleApi,

    onSuccess: () => {
      // refresh media list after upload
      queryClient.invalidateQueries(["media"]);
    },
  });
};