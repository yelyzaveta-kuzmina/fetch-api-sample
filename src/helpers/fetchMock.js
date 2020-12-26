import faker from "faker";

const fetchMock = ({ resultsMaxNumber }) =>
  Array.from({ length: resultsMaxNumber }, (value, index) => {
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
  });

export default fetchMock;
