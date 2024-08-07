import axios from "axios";

const apiUrl = "http://localhost:3001/";

const getJWTToken = () => {
  return localStorage.getItem("access-token");
};

export const requests = {
  isLoggedIn: "user/isloggedin",
  login: "user/login",
  register: "user/register",
  getUsers: "user/all",
  getApps: "app/all",
  addApp: "app/new",
};

export async function fetchApi(route, method = "GET", params) {
  if (method === "POST") {
    return await postApi(route, params);
  } else if (method === "DELETE") {
    return await deleteApi(route);
  } else if (method === "PATCH") {
    return await patchApi(route, params);
  } else {
    return await getApi(route);
  }
}

async function getApi(route) {
  try {
    return axios
      .get(`${apiUrl}${route}`, {
        headers: {
          Authorization: getJWTToken(),
        },
      })
      .then(function (response) {
        return { success: true, data: response.data };
      })
      .catch(function (axiosError) {
        return {
          success: false,
          error: axiosError.response?.data || axiosError.message,
        };
      });
  } catch (error) {
    return {
      success: false,
      error: error?.message || String(error),
    };
  }
}

async function postApi(route, params) {
  try {
    return axios
      .post(`${apiUrl}${route}`, params, {
        headers: {
          Authorization: getJWTToken(),
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        return { success: true, data: response.data };
      })
      .catch(function (axiosError) {
        return {
          success: false,
          error: axiosError.response?.data || axiosError.message,
        };
      });
  } catch (error) {
    return {
      success: false,
      error: error?.message || String(error),
    };
  }
}

async function deleteApi(route) {
  try {
    return axios
      .delete(`${apiUrl}${route}`)
      .then(function (response) {
        return { success: true, data: response.data };
      })
      .catch(function (axiosError) {
        return {
          success: false,
          error: axiosError.response?.data || axiosError.message,
        };
      });
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

async function patchApi(route, params) {
  try {
    return axios
      .patch(`${apiUrl}${route}`, params)
      .then(function (response) {
        return { success: true, data: response.data };
      })
      .catch(function (axiosError) {
        return {
          success: false,
          error: axiosError.response?.data || axiosError.message,
        };
      });
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
