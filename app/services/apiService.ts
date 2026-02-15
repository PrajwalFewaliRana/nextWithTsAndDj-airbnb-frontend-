import { getAccessToken } from "../lib/actions";
//only need bearer token when the permissionclass is authenticated means user need to login
const apiService = {
  get: async function (url: string): Promise<any> {
    const token = await getAccessToken();
    // const headers: HeadersInit = {
    //   Accept: "application/json",
    //   "Content-Type": "application/json",
    // };
    // if (token) {
    //   headers["Authorization"] = `Bearer ${token}`;
    // }

    // const response = await fetch(
    //   `${process.env.NEXT_PUBLIC_API_HOST}${url}`,
    //   {
    //     method: "GET",
    //     headers,
    //     cache: "no-store", // ensures fresh data
    //   }
    // );

    // if (!response.ok) {
    //   const text = await response.text();
    //   console.error("API fetch failed:", text); // log the real error
    //   return []; // fallback to empty array
    // }

    // return await response.json();



    return new Promise((resolve, reject) => {
      fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          // console.log("Response", json);
          resolve(json);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
   
  post: async function (url: string, data: any): Promise<any> {
    // console.log("post", url, data);
    const token = await getAccessToken();
    return new Promise((resolve, reject) => {
      fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          // console.log("Response:", json);
          resolve(json);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  // postForm: async function (url: string, data: FormData): Promise<any> {
  //   const token = await getAccessToken();
  //   return new Promise((resolve, reject) => {
  //     fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
  //       method: "POST",
  //       body: data,
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //       .then((response) => response.json())
  //       .then((json) => {
  //         // console.log("Response:", json);
  //         resolve(json);
  //       })
  //       .catch((error) => {
  //         reject(error);
  //       });
  //   });
  // },
  postForm: async function (url: string, data: FormData): Promise<any> {
    const token = await getAccessToken();

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
      method: "POST",
      body: data, // FormData
      headers: {
        Authorization: `Bearer ${token}`,
        // ❌ DO NOT set Content-Type for FormData
      },
    });

    // Handle HTTP errors safely
    if (!response.ok) {
      const text = await response.text(); // backend might not send JSON
      throw new Error(text || "Request failed");
    }

    return await response.json();
  },
};

export default apiService;
