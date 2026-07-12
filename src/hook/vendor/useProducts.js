import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiAuth } from "../../utils/apis/api-client";

export const useFetchProducts = ({
  page = 1,
  per_page = 10,
  search_by_title,
  search_by_sku,
  search_product_type,
  search_product_purpose,
  search_product_stock_status,
  search_product_status,
  search_active_for,
  search_by_brand
}) => {
  const params = {
    page, per_page, search_by_title, search_by_sku,
    search_product_type, search_product_purpose,
    search_product_stock_status, search_product_status, search_active_for,
    search_by_brand
  };
  return useQuery({
    queryKey: [
      "products",
      params
    ],

    queryFn: async () => {
      const res = await apiAuth.get("/api/vendor/products", {
        params: {
          page,
          per_page,
          search_by_title,
          search_by_sku,
          search_product_type,
          search_product_purpose,
          search_product_stock_status,
          search_product_status,
          search_active_for,
          search_by_brand
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
      const res = await apiAuth.post("/api/vendor/product/step1", payload);
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
      const res = await apiAuth.put("/api/vendor/product/type/update", payload);
      return res.data;
    },

    onSuccess: () => {
      // 🔄 refresh products list if needed
      queryClient.invalidateQueries(["products"]);
    },
  });
};

export const useFetchProductTypeById = (productId) => {
  return useQuery({
    queryKey: ["product-type", productId],

    queryFn: async () => {
      const res = await apiAuth.get(
        `/api/vendor/product/type/get/${productId}`,
      );
      return res.data;
    },

    enabled: !!productId, // 👈 run only when id exists
  });
};

export const useFetchProductSimpleStep2 = (productId) => {
  return useQuery({
    queryKey: ["product-step2-simple", productId],

    queryFn: async () => {
      const res = await apiAuth.get(
        `/api/vendor/product/edit/step2/simple/${productId}`,
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
        payload,
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
        `/api/vendor/product/edit/step1/${productId}`,
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
        payload,
      );
      return res.data;
    },

    onSuccess: (_, variables) => {
      // 🔄 refetch specific product + list
      if (variables?.product_id) {
        queryClient.invalidateQueries(["product-step1", variables.product_id]);
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
        `/api/vendor/product/delete/${productId}`,
      );
      return res.data;
    },

    onSuccess: () => {
      // 🔄 refresh product list
      queryClient.invalidateQueries(["products"]);
    },
  });
};




export const useUpdateProductPublish = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const res = await apiAuth.put(
        "/api/vendor/product/publish/update",
        payload
      );
      return res.data;
    },

    onSuccess: (_, variables) => {
      // 🔄 refresh product list + specific product
      queryClient.invalidateQueries(["products"]);

      if (variables?.product_id) {
        queryClient.invalidateQueries([
          "product-step1",
          variables.product_id,
        ]);
      }
    },
  });
};









export const useFetchProductAttributesById = (productId) => {
  return useQuery({
    queryKey: ["product-attributes", productId],

    queryFn: async () => {
      const res = await apiAuth.get(
        `/api/vendor/product/attributes/get/${productId}`
      );
      return res.data;
    },

    enabled: !!productId, // 👈 run only when id exists
    // staleTime: 1000 * 60 * 5,
  });
};





export const useFetchProductTerms = (id) => {
  return useQuery({
    queryKey: ["product-terms", id],

    queryFn: async () => {
      const res = await apiAuth.get(
        `/api/vendor/product/terms/get/${id}`
      );
      return res.data;
    },

    enabled: !!id, // 👈 only run when id exists
  });
};






export const useSaveProductAttributeTerms = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const res = await apiAuth.post(
        "/api/vendor/product/attribute/terms/save",
        payload
      );
      return res.data;
    },

    onSuccess: () => {
      // optional: refetch related queries
      queryClient.invalidateQueries(["product-terms"]);
      queryClient.invalidateQueries(["product-attributes"]);
    },
  });
};







export const useFetchSelectedProductAttributes = (productId) => {
  return useQuery({
    queryKey: ["selected-product-attributes", productId],

    queryFn: async () => {
      const res = await apiAuth.get(
        `/api/vendor/products/${productId}/attributes`
      );
      return res.data;
    },

    enabled: !!productId, // 👈 only run when id exists
  });
};





export const useDeleteProductAttribute = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const res = await apiAuth.delete(
        "/api/vendor/products/attributes/delete",
        {
          data: payload, // 👈 important (axios delete body)
        }
      );
      return res.data;
    },

    onSuccess: (_, variables) => {
      // 🔄 refetch selected attributes
      if (variables?.product_id) {
        queryClient.invalidateQueries([
          "selected-product-attributes",
          variables.product_id,
        ]);
      }

      queryClient.invalidateQueries(["product-attributes"]);
    },
  });
};





export const useDeleteProductTerm = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const res = await apiAuth.delete(
        "/api/vendor/products/terms/delete",
        {
          data: payload, // 👈 axios delete body
        }
      );
      return res.data;
    },

    onSuccess: (_, variables) => {
      // 🔄 refetch selected attributes/terms
      if (variables?.product_id) {
        queryClient.invalidateQueries([
          "selected-product-attributes",
          variables.product_id,
        ]);
      }

      queryClient.invalidateQueries(["product-terms"]);
    },
  });
};





export const useUpdateAttributeSortOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const res = await apiAuth.patch(
        "/api/vendor/products/attributes/update-sort-order",
        payload
      );
      return res.data;
    },

    onSuccess: (_, variables) => {
      // 🔄 refetch selected attributes after sorting
      if (variables?.product_id) {
        queryClient.invalidateQueries([
          "selected-product-attributes",
          variables.product_id,
        ]);
      }
    },
  });
};


export const useFetchProductVariations = (productId, page) => {
  return useQuery({
    queryKey: ["product-variations", productId, page],

    queryFn: async () => {
      const res = await apiAuth.get(
        `/api/vendor/products/${productId}/variations`, {
    params: {
      page
    },
  }
      );
      return res.data;
    },

    enabled: !!productId, // 👈 run only when id exists
  });
};


export const useGenerateVariations = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const res = await apiAuth.post("/api/vendor/products/generate-variations", payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["product-variations"]);
    },
  });
};






export const useRemoveTermAndVariations = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const res = await apiAuth.delete(
        "/api/vendor/products/remove-term-variations",
        {
          data: payload, // 👈 axios DELETE body
        }
      );
      return res.data;
    },

    onSuccess: (_, variables) => {
      const productId = variables?.product_id;

      // 🔄 refetch everything related
      if (productId) {
        queryClient.invalidateQueries([
          "selected-product-attributes",
          productId,
        ]);

        queryClient.invalidateQueries([
          "product-variations",
          productId,
        ]);
      }

      queryClient.invalidateQueries(["product-terms"]);
    },
  });
};









export const useUpdateVariation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, payload }) => {
      const res = await apiAuth.put(
        `/api/vendor/products/variations/${id}`,
        payload
      );
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["product-variations"],
      });
    },
  });
};






export const useSaveTermImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const res = await apiAuth.post(
        "/api/vendor/product/term/save-image",
        payload
      );
      return res.data;
    },

    onSuccess: () => {
      // optional: refetch related queries
      queryClient.invalidateQueries(["product-terms"]);
    },
  });
};






export const useClearTermImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const res = await apiAuth.post(
        "/api/vendor/clear-term-image",
        payload
      );
      return res.data;
    },

    onSuccess: (_, variables) => {
      const productId = variables?.product_id;

      // 🔄 refetch related data
      if (productId) {
        queryClient.invalidateQueries([
          "selected-product-attributes",
          productId,
        ]);
      }

      queryClient.invalidateQueries(["product-terms"]);
    },
  });
};






export const useSyncTermImageToVariations = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const res = await apiAuth.post(
        "/api/vendor/sync-term-image-to-variations",
        payload
      );
      return res.data;
    },

    onSuccess: (_, variables) => {
      const productId = variables?.product_id;

      // 🔄 refresh variations + terms
      if (productId) {
        queryClient.invalidateQueries([
          "product-variations",
          productId,
        ]);

        queryClient.invalidateQueries([
          "selected-product-attributes",
          productId,
        ]);
      }

      queryClient.invalidateQueries(["product-terms"]);
    },
  });
};



const fetchWarrantiesPanelApi = async ({ search }) => {
  const res = await apiAuth.get("/api/vendor/warranties/panel", {
    params: {
      search,
    },
  });

  return res.data;
};

export const fetchWarrantiesPanel = ( search) => {
  return useQuery({
    queryKey: ["returns-panel", search],
    queryFn: () =>
      fetchWarrantiesPanelApi({ search }),
    keepPreviousData: true,
  });
};