export const checkAuth = () => {
  const result = localStorage.getItem("token");
  return !!result;
};

export const getLocalUser = () => {
  const result = localStorage.getItem("user");
  if (result) return JSON.parse(result);
  return null;
};
