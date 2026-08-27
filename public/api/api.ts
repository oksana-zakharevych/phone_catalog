const delay = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export const fetchPhones = () => {
  return delay(1000)
    .then(() => fetch('/api/phones.json'))
    .then((response) => response.json());
};

export const fetchTablets = () => {
  return delay(1000)
    .then(() => fetch('/api/tablets.json'))
    .then((response) => response.json());
};

export const fetchAccessories = () => {
  return delay(1000)
    .then(() => fetch('/api/accessories.json'))
    .then((response) => response.json());
};
