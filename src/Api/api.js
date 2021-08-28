export const fetchRegistrations = async(data, onExistedEmail) => {
  try {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (!response.ok) {
      if (response.status === 409) {
        onExistedEmail();
        return;
      }
      throw new Error(`Failed with status code: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const fetchLogin = async(data, onIncorrectData) => {
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (!response.ok) {
      if (response.status === 401) {
        onIncorrectData();
        return;
      }
      throw new Error(`Failed with status code: ${response}`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const fetchProductData = async(offset, token) => {
  try {
    const response = await fetch(`/api/products?offset=${offset}&limit=12`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    if (!response.ok) {
      throw new Error(`Failed with status code: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("error:", error);
  }
};

export const fetchFavoriteList = async(token, offset) => {
  try {
    const response = await fetch(`/api/products/favorites?offset=${offset}&limit=12&sortBy=latest`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token} `
      }
    });
    if (!response.ok) {
      throw new Error(`Failed with status code: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("error:", error);
  }
};

export const Search = async(offset, value, token) => {
  try {
    const response = await fetch(`/api/products/search?keywords=${value}&offset=${offset}&limit=12&sortBy=latest`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    if (!response.ok) {
      throw new Error(`Failed with status code: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("error:", error);
  }
};

export const fetchProductCategories = async() => {
  try {
    const response = await fetch("/api/categories");
    if (!response.ok) {
      throw new Error(`Failed with status code: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("error:", error);
  }
};

export const fetchCategoriesList = async(id, offset, token) => {
  try {
    const response = await fetch(`/api/categories/${id}/products?offset=${offset}&limit=12&sortBy=latest`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    if (!response.ok) {
      throw new Error(`Failed with status code: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("error:", error);
  }
};

export const asyncSort = async(filter, offset, token) => {
  try {
    const response = await fetch(`/api/products?offset=${offset}&limit=12&sortBy=${filter}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    if (!response.ok) {
      throw new Error(`Failed with status code: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("error:", error);
  }
};

export const fetchSingleItem = async(id, token) => {
  try {
    const response = await fetch(`/api/products/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error(`Failed with status code: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("error:", error);
  }
};

export const postFavouritesId = async(token, id) => {
  try {
    const response = await fetch(`/api/products/${id}/favorite`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token} `
      }
    });
    if (!response.ok) {
      if (response.status === 409) {
        return;
      }
      throw new Error(`Failed with status code: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const deleteFavouritesId = async(token, id) => {
  try {
    const response = await fetch(`/api/products/${id}/favorite`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token} `
      }
    });
    if (!response.ok) {
      if (response.status === 409) {
        return;
      }
      throw new Error(`Failed with status code: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};
export const fetchAccount = async(token) => {
  try {
    const response = await fetch("/api/account", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token} `
      }
    });
    if (!response.ok) {
      throw new Error(`Failed with status code: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("error:", error);
  }
};

export const fetchLocation = async() => {
  try {
    const response = await fetch("/api/locations/countries");
    if (!response.ok) {
      throw new Error(`Failed with status code: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("error:", error);
  }
};

export const postOrder = async(token, data) => {
  try {
    const response = await fetch("/api/orders", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token} `
      }
    });
    if (!response.ok) {
      throw new Error(`Failed with status code: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const putAccount = async(token, data) => {
  try {
    const response = await fetch("/api/account", {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token} `
      }
    });
    if (!response.ok) {
      throw new Error(`Failed with status code: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const putAccountPassword = async(token, data) => {
  try {
    const response = await fetch("/api/account/password", {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token} `
      }
    });
    if (!response.ok) {
      throw new Error(`Failed with status code: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getOrders = async(token, offset) => {
  try {
    const response = await fetch(`api/orders?offset=${offset}&limit=12`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token} `
      }
    });
    if (!response.ok) {
      throw new Error(`Failed with status code: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};
