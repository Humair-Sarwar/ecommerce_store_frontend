import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiAuth } from "../../utils/apis/api-client";

// fetch Brands function
const fetchBrandApi = async ({page, per_page, search}) => {
  const res = await apiAuth.get("/api/vendor/brands", {
    params: {
      page,
      per_page,
      search
    },
  });
  return res.data;
};

// hook
export const fetchBrands = (page, per_page, search) => {
  return useQuery({
    queryKey: ["brands", page, per_page, search],
    queryFn: () => fetchBrandApi({ page, per_page, search }),
    keepPreviousData: true,
  });
};





// ================== CREATE BRAND ==================
const createBrandApi = async (payload) => {
  const res = await apiAuth.post("/api/vendor/brands", payload);
  return res.data;
};

export const useCreateBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBrandApi,

    onSuccess: () => {
      // 🔥 refetch brands list automatically
      queryClient.invalidateQueries({ queryKey: ["brands"] });
    },
  });
};













export const useUpdateBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, formData }) => {
      formData.append("_method", "PUT");
      const res = await apiAuth.post(`/api/vendor/brand/${id}`, formData);

      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["brands"]);
    },
  });
};









export const useDeleteBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const res = await apiAuth.delete(`/api/vendor/brand/${id}`);
      return res.data;
    },

    onSuccess: () => {
      // refresh brand list
      queryClient.invalidateQueries(["brands"]);
    },
  });
};














export const useUpdateBrandStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const formData = new FormData();

      formData.append("_method", "PUT");
      formData.append("id", payload.id);
      formData.append("status", payload.status ? 1 : 0);

      const res = await apiAuth.post(
        "/api/vendor/brand/status/update",
        formData
      );

      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["brands"]);
    },
  });
};







export const useDeleteSelectedBrands = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (brand_ids) => {
      const res = await apiAuth.delete("/api/vendor/brands", {
        data: { brand_ids }, 
      });

      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["brands"]);
    },
  });
};