//* Localstorage eleman ekleme
export const setLocal = (key, data) => {
  const strData = JSON.stringify(data);
  console.log(strData);
  localStorage.setItem(key, strData);
};

export const getLocal = (key) => {
  const strData = localStorage.getItem(key);
  const data = JSON.parse(strData);
  return data;
};
