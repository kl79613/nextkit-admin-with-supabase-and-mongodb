import axios from "@/lib/services/apiAxios";

export interface LoginResponse {
  code: number;
  msg: string;
  data: {
    user: any;
    token: string;
    refresh_token?: string;
  };
}

interface LogoutResponse {
  error?: string;
}

export async function login(
  email: string,
  password: string
): Promise<LoginResponse> {
  try {
    const response = await axios.post("/user/login", {
      email,
      password,
    });
    console.log("Login response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    // Handle error here. With Axios, error handling can be more nuanced thanks to error.response
    throw error;
  }
}
export interface UserInfo {
  id: number;
  username: string;
  nickname: string;
  avatar: string;
  sex: "0" | "1" | "2"; // 0未知 1男 2女（根据常见约定，可按实际调整）
  email: string;
  mobile: string;
  level_id: number;
  level_name: string; // 如：PRO
  level_monthly_init_quota: number;
  birthday: string | null;
  money: number;
  score: number;
  role: number;
  status: number;
  inviter_id: number;
  join_time: string; // 时间字符串
  last_time: string; // 时间字符串
  dynamicRoutesList: string[];
}
export async function getUserInfo(): Promise<UserInfo> {
  try {
    const response = await axios.post("/user/info");
    return response.data;
  } catch (error) {
    console.error("Get user info error:", error);
    throw error;
  }
}

export async function logout(): Promise<LogoutResponse> {
  try {
    const response = await axios.get("logout");
    return response.data;
  } catch (error) {
    // Axios encapsulates HTTP errors in the error object, making it easy to access the original response and status
    console.error("Logout failed:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
}
