const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "17bfa31bbbmsh1355592a7405f9bp1dd229jsnd7e87c1e1260",
    "X-RapidAPI-Host": "twitter-api45.p.rapidapi.com",
  },
};
const baseURL = "https://twitter-api45.p.rapidapi.com";

export class API {
  constructor() {}
  // kullanıcı detaylarını alma
  async getUser(userName) {
    try {
      const res = await fetch(
        `${baseURL}/usermedia.php?screenname=${userName}`,
        options
      );
      const data = await res.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
