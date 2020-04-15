export const fetchService = async (searchTerm: string, page = 1) => {
  try {
    const result = await fetch(
      `http://www.omdbapi.com/?s=${searchTerm}&page=${page}&apikey=894910fd`
    );
    const body = await result.json();
    return body;
  } catch (error) {
    console.error(error);
  }
};

export const fetchById = async (id: string) => {
  try {
    const result = await fetch(
      `http://www.omdbapi.com/?i=${id}&apikey=894910fd`
    );
    const body = await result.json();
    return body;
  } catch (error) {
    console.log(error);
  }
};
