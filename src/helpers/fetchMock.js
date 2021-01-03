import faker from "faker";

const fetchMock = async ({ delay, limit }) => {
  console.log(delay);
  if (typeof limit !== "number") {
    throw new Error("Please provide limit");
  }

  if (typeof delay !== "number") {
    throw new Error("Please provide delay");
  }

  if (Math.floor(delay) !== delay) {
    throw new Error("Delay should be integer");
  }

  return new Promise((resolve) => setTimeout(resolve, delay)).then(() =>
    Array.from({ length: limit }, (value, index) => {
      const image = faker.image.image();
      const title = faker.lorem.sentence();
      const videoId = faker.random.number();
      const isLiked = null;
      return {
        image,
        title,
        videoId,
        isLiked,
      };
    })
  );
};

export default fetchMock;
