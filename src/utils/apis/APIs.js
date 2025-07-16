import axios from "axios";

let token = localStorage.getItem("token")

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: false,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
});



export const signupApi = async (data)=>{
    let response;
    try {
        response = await api.post('/auth/signup', data);
    } catch (error) {
        return error;
    }
    return response;
}



export const loginApi = async (data)=>{
    let response;
    try {
        response = await api.post('/auth/login', data);
    } catch (error) {
        return error;
    }
    return response;
}


export const createUpdateMenuApi = async (data)=>{
    let response;
    try {
        response = await api.post('/api/site-settings/menu-json', data);
    } catch (error) {
        return error;
    }
    return response;
}


export const getMenuApi = async (data)=>{
    let response;
    try {
         response = await api.get('/api/menu-json', {
      params: {
        business_id: data.business_id,
        key: data.key
      }
    });
    } catch (error) {
        return error;
    }
    return response;
}



export const getSiteMenuApi = async ({key})=>{
    let response;
    try {
         response = await api.get('/api/site-menu/menu-json', {
      params: {
        key
      }
    });
    } catch (error) {
        return error;
    }
    return response;
}





export const createCategoryApi = async (data)=>{
    let response;
    try {
        response = await api.post('/api/vendor/categories', data);
    } catch (error) {
        return error;
    }
    return response;
}


export const getCategoriesApi = async ({business_id})=>{
    let response;
    try {
         response = await api.get('/api/vendor/categories', {
      params: {
        business_id
      }
    });
    } catch (error) {
        return error;
    }
    return response;
}



export const getWebsiteCategoriesApi = async ()=>{
    let response;
    try {
         response = await api.get('/api/website/categories');
    } catch (error) {
        return error;
    }
    return response;
}


export const getCategoriesFilterBaseApi = async ({category})=>{
    let response;
    try {
         response = await api.get('/api/website/products/filter', {
      params: {
        category
      }
    });
    } catch (error) {
        return error;
    }
    return response;
}


export const addImageApi = async (data)=>{
    let response;
    try {
        response = await api.post('/api/add/image', data);
    } catch (error) {
        return error;
    }
    return response;
}



// ------------------- Brands --------------------


export const createBrandApi = async (data)=>{
    let response;
    try {
        response = await api.post('/api/vendor/brands', data);
    } catch (error) {
        return error;
    }
    return response;
}

export const getBrandsApi = async ({business_id})=>{
    let response;
    try {
         response = await api.get('/api/vendor/brands', {
      params: {
        business_id
      }
    });
    } catch (error) {
        return error;
    }
    return response;
}