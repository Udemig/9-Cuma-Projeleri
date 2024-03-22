export const setLocal = (key, data) => {
  const strData = JSON.stringify(data);
  console.log(strData);
  localStorage.setItem(key, strData);
};
