// configApi.js
import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://localhost:7238",
  timeout: 10000, // Thời gian timeout 10 giây
});
//authencation
export const signUpShop = async (data) => {
  try {
    const response = await apiClient.post(
      `/api/Auth/user/register/shop`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "*/*",
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
};

//services
export const getListServices = async (pageIndex = 0, pageSize = 100) => {
  try {
    const response = await apiClient.get(
      `/api/service/GetListServices?pageIndex=${pageIndex}&pageSize=${pageSize}`
    );
    return response; // Trả về dữ liệu
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error; // Ném lại lỗi để xử lý bên ngoài
  }
};

export const getServiceById = async (id) => {
  try {
    const response = await apiClient.get(
      `/api/service/ViewServiceById?serviceId=${id}`
    );
    return response;
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
};

export const getListServicesByUserId = async (userId, token) => {
  try {
    const response = await apiClient.get(
      `/api/service/ViewListServicesByUserId?userId=${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          accept: "*/*",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
};

export const postCreateService = async (formData, token) => {
  try {
    const reponse = await apiClient.post(
      `/api/service/CreateService`,
      formData,
      {
        headers: {
          "Content-Type": `multipart/form-data`,
          Accept: "text/plain",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return reponse;
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
};

export const getSubCatergoy = async () => {
  try {
    const response = await apiClient.get(`/Api/GetAllSubCategories`);
    return response;
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
};
