// configApi.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://petserviceplatform-dpgyc0c3fcg9dtc7.southeastasia-01.azurewebsites.net',
  timeout: 10000, // Thời gian timeout 10 giây
});

export const getListServices = async (pageIndex = 0, pageSize = 10) => {
  try {
    const response = await apiClient.get(`/api/service/GetListServices?pageIndex=${pageIndex}&pageSize=${pageSize}`);
    return response; // Trả về dữ liệu
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error; // Ném lại lỗi để xử lý bên ngoài
  }
};
