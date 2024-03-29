export const authEle = {
  loginForm: document.querySelector("#login"),
  nameInp: document.querySelector("#name"),
  passInp: document.querySelector("#pass"),
  nameArea: document.querySelector(".name-warning"),
  passArea: document.querySelector(".pass-warning"),
};

export const mainEle = {
  pics: document.querySelectorAll("#profile-pic"),
  userName: document.querySelector(".user-info #user-name"),
  userTag: document.querySelector(".user-info #user-tag"),
  logoutBtn: document.querySelector("#logout-btn"),
  tweetsArea: document.querySelector(".tweetsArea"),
  main: document.querySelector("main"),
};
//* Kullanıcı bilgilerini ekrana basar
export const renderUserInfo = (user) => {
  // kullanıcı resimlerini günceller
  mainEle.pics.forEach((img) => (img.src = user.avatar));
  // Kullanıcı ismini ve etiket ismini apiden gelen cevabı aktardık.
  mainEle.userName.innerText = user.name;
  mainEle.userTag.innerText = "@" + user.profile;
};
//* Media içeriğine göre HTML dönderir
const getMedia = (media) => {
  if (media.photo && media.photo.length > 0) {
    const imageUrl = media.photo[0].media_url_https;
    return `<img src="${imageUrl}"/>`;
  }
  if (media.video) {
    // diziden sadece mp4leri al
    const filter = media.video[0].variants.filter(
      (item) => item.content_type === "video/mp4"
    );
    // Diziyi bitrate değerine göre yüksekten aza sıralar
    const sorted = filter.sort((a, b) => b.bitrate - a.bitrate);

    return `
      <video controls>
        <source src="${sorted[0].url}"/>
      </video>
      
    `;
  }

  return "";
};

export const renderTimeLine = (user, tweets, outlet) => {
  let timeLineHTML = tweets
    .map(
      (tweet, i) => `
  <div class="tweet">
    <img src=${user.avatar} id="user-img" />
    <div class="body">
        <div class="user">
          <a href="?user#${
            user ? user.profile : tweet.author.screen_name
          }" class="info">
            <h6>${user ? user.name : tweet.author.screen_name}</h6>
            <p>@${user ? user.profile : tweet.author.screen_name}</p>
            <p>${tweet.created_at}</p>
          </a>
          <i class="bi bi-three-dots"></i>
        </div>
        <a href="?status/${user ? user.profile : tweet.author.screen_name}#${
        tweet.tweet_id
      }" class="content">
          <p>${tweet.text}</p>
          ${getMedia(tweet.media)}
        </a>
        <div class="buttons">
          <button>
            <i class="fa-regular fa-comment"></i> <span>${tweet.replies}</span>
          </button>
          <button>
            <i class="fa-solid fa-retweet"></i> <span>${tweet.retweets}</span>
          </button>
          <button>
            <i class="fa-regular fa-heart"></i> <span>${tweet.favorites}</span>
          </button>
          <button>
            <i class="fa-regular fa-bookmark"></i> <span>${
              tweet.bookmarks
            }</span>
          </button>
        </div>
      </div>
    </div>
  
  `
    )
    .join("");
  outlet.innerHTML = timeLineHTML;
};
//* parametre olarak gelen alana loading basar
export const renderLoader = (outlet) => {
  outlet.innerHTML = `
  <div class="d-flex justify-content-center mt-4">
    <div class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
`;
};

export const renderInfo = (info, userName) => {
  console.log(info);
  const html = `
  <div class="info-area">
    <div class="top">
      <i class="bi bi-arrow-left"></i>
      <h3>Gönderi</h3>
    </div>
    <div class="tweet-info">
      <div class="user">
        <div class="info">
          <img class="user-img" src="${info.author.image}"/>
          <p>${userName}</p>
          <p>@${userName}</p>
        </div>
        <button>Abone Ol</button>
      </div>
      <div class="content">
        <p>${info.text}</p>
       
        ${info.media && getMedia(info?.media)}
      
      </div>
      <div class="data">
        <p>
          <span>${info.retweets}</span>
          <span>Yeniden Gönderi</span>
          <button>
          <i class="fa-regular fa-comment"></i>
        </button>
        </p>
        <p>
          <span>${info.quotes}</span>
          <span>Alıntılar</span>
          <button>
          <i class="fa-solid fa-retweet"></i>
        </button>
        </p>
        <p>
          <span>${info.likes}</span>
          <span>Beğeni</span>
          <button>
          <i class="fa-regular fa-heart"></i>
        </button>
        </p>
        <p>
          <span>${info.bookmarks}</span>
          <span>Yer İşareti</span>
          <button>
          <i class="fa-regular fa-bookmark"></i>
        </button>
        </p>
        <p>
          <span class="send-span">Gönder</span>
          <button>
          <i class="fa-solid fa-arrow-up-from-bracket"></i>
        </button>
        </p>
      </div>
      
    </div>
  </div>
  
 `;
  mainEle.main.innerHTML = html;
};

export const renderEmrtyInfo = () => {
  mainEle.main.innerHTML = `
    <div class="top loading-top">
      <i class="bi bi-arrow-left"></i>
      <h3>Gönderi</h3>
    </div>
    <div class="d-flex justify-content-center my-4">
      <div class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
      </div>
    </div>
  `;
};
