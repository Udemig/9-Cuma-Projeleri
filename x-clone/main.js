import { API } from './scripts/api.js';
import { getLocal } from './scripts/helpers.js';
import {
  mainEle,
  renderEmptyInfo,
  renderInfo,
  renderLoader,
  renderTimeLine,
  renderUserInfo,
  renderUser,
} from './scripts/ui.js';

const api = new API();

// kullanıcı
const user = getLocal('user');

//! Olay İzleyicileri
//* Sayfanın yüklenme anı
document.addEventListener('DOMContentLoaded', () => {
  // localden kullanıcı bilgilerini alıp ekrana renderlama
  const user = getLocal('user');
  renderUserInfo(user);

  // localden tema bilgilerini al
  const isDarkTheme = getLocal('theme');

  if (!isDarkTheme) {
    document.body.classList.add('light');
    mainEle.themeCheck.checked = false;
  }
});

//* Çıkış yap butonuna tıkladığımızda localden verileri sil ve auth.html sayfasına yönlendir.
mainEle.logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('user');
  window.location = '/auth.html';
});

const controlURL = async (e) => {
  // url'deki arama paramterlerine erişme
  const params = new URLSearchParams(location.search);
  const page = params.get('page');
  const query = params.get('q');

  // kullanıcı localde yok ise çalışır
  if (!user) {
    location = '/auth.html';
  }

  switch (page) {
    case 'status':
      // apiden cevabı beklemeden arayüzü hazırla
      renderEmptyInfo();

      // apiye istek at
      const info = await api.fetchData(`/tweet.php?id=${query}`);

      // tweet detaylarını ekrana basar
      renderInfo(info, user);

      break;

    case 'search':
      // loadingi ekrana bas
      renderEmptyInfo(`${query} için sonuçlar`);

      // aratılan metne uygun tweetleri api'dan al
      api
        .fetchData(`/search.php?query=${query}&search_type=top`)
        // ekrana tweetleri bas
        .then((data) =>
          renderTimeLine('user_info', data.timeline, mainEle.main)
        );

      break;

    case 'user':
      // yükleniyoru bas
      renderEmptyInfo(query);

      // kullancının bilgilerini api'dan al
      api.getUser(query).then((user_data) => {
        // kullanıcın hesap bilgilerini ekrana bas
        renderUser(user_data);

        // tweetlerin geliceği yeri seç
        const outlet = document.querySelector('.page-bottom');

        // kullanıcının attığı tweetleri al
        api.fetchData(`/timeline.php?screenname=${query}`).then((data) => {
          renderTimeLine('author', data.timeline, outlet);
        });
      });

    default:
      // ekrana loadingi basar
      renderLoader(mainEle.tweetsArea);

      // anasayfa da gösterilecek tweetleri alma
      const data = await api.fetchData(
        `/timeline.php?screenname=${user.profile}`
      );

      // tweetleri ekrana basma
      renderTimeLine('author', data.timeline, mainEle.tweetsArea);
  }
};

['hashchange', 'load'].forEach((event) => {
  window.addEventListener(event, controlURL);
});

//* geri butonuna tıklanma olayını izleme
mainEle.main.addEventListener('click', (e) => {
  if (e.target.classList.contains('bi-arrow-left')) {
    // geçmişte bir adım geriye gitmesini sağlar
    history.back();
  }
});

// arama formunun gönderilme olayını izle
mainEle.searchForm.addEventListener('submit', (e) => {
  // sayfanın yenilnemsi engelle
  e.preventDefault();

  // formda aratılan metne eriş
  const searchTerm = e.target[0].value;

  // aratılan metin ile url güncelle
  window.location = `?page=search&q=${searchTerm}`;
});

// tema değişme olayını izle
mainEle.themeCheck.addEventListener('change', (e) => {
  // seçişlen modu belirle
  const isDarkMode = e.target.checked;

  // seçili açıksa body alanına light classı ekle
  if (!isDarkMode) {
    document.body.classList.add('light');
    localStorage.setItem('theme', 'false');
  } else {
    // değilse çıkar
    document.body.classList.remove('light');
    localStorage.setItem('theme', 'true');
  }
});
