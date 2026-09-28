import axios from "axios";
import BaseUrl from "./baseURL";

const API_URL = `${BaseUrl.baseUrl}/api/public`;

class FileService {
    getAllActionFiles() {
      return axios.get(`${API_URL}/getallactionfile`);
    }
    getAllPerformanceFile() {
      return axios.get(`${API_URL}/getallperformancefile`);
    }
}

export default new FileService();