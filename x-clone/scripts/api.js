const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '17bfa31bbbmsh1355592a7405f9bp1dd229jsnd7e87c1e1260',
    'X-RapidAPI-Host': 'twitter-api45.p.rapidapi.com',
  },
};
const baseURL = 'https://twitter-api45.p.rapidapi.com';

export class API {
  constructor() {}
  // kullanıcı detaylarını alma
  async getUser(userName) {
    try {
      const res = await fetch(
        `https://twitter-api45.p.rapidapi.com/screenname.php?screenname=${userName}`,
        options
      );
      const data = await res.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  async fetchData(endpoint) {
    try {
      // parametre olarak gelen linke
      // yeni parametre olarak gelen url parametresine istek atma
      const res = await fetch(`${baseURL}${endpoint}`, options);
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
