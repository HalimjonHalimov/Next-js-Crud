export const setItems = (key: string, data: string) => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(key, data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  export const getItems = (key: string) => {
    try {
      if (typeof window !== "undefined") {
        return localStorage.getItem(key);
      }
    } catch (error) {
      console.log(error);
    }
  };

  export const removeItems = (key: string) => {
    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem(key);
      }
    } catch (error) {
      console.log(error);
    }
  };