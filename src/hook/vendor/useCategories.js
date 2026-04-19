import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiAuth } from "../../utils/apis/api-client";

// ================== FETCH CATEGORIES ==================
const fetchCategoriesApi = async () => {
  const res = await apiAuth.get("/api/vendor/categories");

  return res.data;
};

// hook
export const fetchCategories = (page, per_page, search) => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategoriesApi(),
    keepPreviousData: true,
  });
};




// ================== CREATE CATEGORY ==================

// API call
const createCategoryApi = async (payload) => {
  const res = await apiAuth.post("/api/vendor/category", payload);
  return res.data;
};

// hook
export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategoryApi,

    onSuccess: () => {
      // 🔥 categories list refresh
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};














export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const res = await apiAuth.delete(`/api/vendor/category/${id}`);
      return res.data;
    },

    onSuccess: () => {
      // 🔥 categories list refresh hogi
      queryClient.invalidateQueries(["categories"]);
    },
  });
};







const fetchCategoriesPanelApi = async ({ search }) => {
  const res = await apiAuth.get("/api/vendor/categories/panel", {
    params: {
      search,
    },
  });

  return res.data;
};

export const fetchCategoriesPanel = ( search) => {
  return useQuery({
    queryKey: ["categories-panel", search],
    queryFn: () =>
      fetchCategoriesPanelApi({ search }),
    keepPreviousData: true,
  });
};















export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const res = await apiAuth.put("/api/vendor/category", payload);
      return res.data;
    },

    onSuccess: (res) => {
      // 🔥 auto refresh
      queryClient.invalidateQueries(["categories"]);
      queryClient.invalidateQueries(["categories-panel"]);
    },
  });
};