const delay = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

const fetchDataWithDelay = (src: string, ms: number) => {
  return delay(ms)
    .then(() => fetch(src))
    .then((response) => response.json());
};

export const getProductsByCategory = (category: string) => {
  return fetchDataWithDelay(`/api/${category}.json`, 500);
};
