const fetchMock = async ({ delay, isError, data }) => {
  console.log(delay);

  return new Promise((resolve, reject) =>
    setTimeout(
      () =>
        resolve({
          json: () => (isError ? Promise.reject(data) : Promise.resolve(data)),
        }),
      delay
    )
  );
};

export default fetchMock;
