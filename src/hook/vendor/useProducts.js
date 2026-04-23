import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiAuth } from "../../utils/apis/api-client";

export const useFetchProducts = (page = 1, per_page = 10, search = "") => {
  return useQuery({
    queryKey: ["products", page, per_page, search],

    queryFn: async () => {
      const res = await apiAuth.get("/api/vendor/products", {
        params: {
          page,
          per_page,
          search,
        },
      });
      return res.data;
    },

    keepPreviousData: true, // 👈 smooth pagination
  });
};










export const useCreateProductStep1 = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const res = await apiAuth.post(
        "/api/vendor/product/step1",
        payload
      );
      return res.data;
    },

    onSuccess: () => {
      // 🔥 refresh products list
      queryClient.invalidateQueries(["products"]);
    },
  });
};











export const useUpdateProductType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const res = await apiAuth.put(
        "/api/vendor/product/type/update",
        payload
      );
      return res.data;
    },

    onSuccess: () => {
      // 🔄 refresh products list if needed
      queryClient.invalidateQueries(["products"]);
    },
  });
};








export const useFetchProductSimpleStep2 = (productId) => {
  return useQuery({
    queryKey: ["product-step2-simple", productId],

    queryFn: async () => {
      const res = await apiAuth.get(
        `/api/vendor/product/edit/step2/simple/${productId}`
      );
      return res.data;
    },

    enabled: !!productId, // 👈 only run when id exists
  });
};







export const useCreateProductStep2 = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const res = await apiAuth.put(
        "/api/vendor/product/create-step2",
        payload
      );
      return res.data;
    },

    onSuccess: (_, variables) => {
      // 🔄 refresh specific product step2 + products list
      if (variables?.product_id) {
        queryClient.invalidateQueries([
          "product-step2-simple",
          variables.product_id,
        ]);
      }

      queryClient.invalidateQueries(["products"]);
    },
  });
};









export const useFetchProductStep1 = (productId) => {
  return useQuery({
    queryKey: ["product-step1", productId],

    queryFn: async () => {
      const res = await apiAuth.get(
        `/api/vendor/product/edit/step1/${productId}`
      );
      return res.data;
    },

    enabled: !!productId, // 👈 run only if id exists
  });
};







export const useUpdateProductStep1 = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const res = await apiAuth.put(
        "/api/vendor/product/update/step1",
        payload
      );
      return res.data;
    },

    onSuccess: (_, variables) => {
      // 🔄 refetch specific product + list
      if (variables?.product_id) {
        queryClient.invalidateQueries([
          "product-step1",
          variables.product_id,
        ]);
      }

      queryClient.invalidateQueries(["products"]);
    },
  });
};






export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId) => {
      const res = await apiAuth.delete(
        `/api/vendor/product/delete/${productId}`
      );
      return res.data;
    },

    onSuccess: () => {
      // 🔄 refresh product list
      queryClient.invalidateQueries(["products"]);
    },
  });
};