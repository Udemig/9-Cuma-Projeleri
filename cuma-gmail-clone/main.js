import { showModal } from "./ui.js"

//! HTML' den getirdiklerimiz
const createMailBtn = document.querySelector(".create")
const closeMailBtn = document.querySelector("#close-btn")
const modal = document.querySelector(".modal-wrapper")
const hamburgerMenu = document.querySelector(".hamburger-menu")
const navigation = document.querySelector("nav")
// console.log(navigation)


//! Olay İzleyicileri
hamburgerMenu.addEventListener("click",hideMenu)

// modal işlemleri
createMailBtn.addEventListener("click",()=>showModal(modal,true))
closeMailBtn.addEventListener("click",()=>showModal(modal,false))


//! Fonksiyonlar
function hideMenu(){
    /*
        classList.toggle();
        * Ona parametre olarak verdiğimiz class'ı
        * yoksa ekler varsa çıkarır.
    
    */
    navigation.classList.toggle("hide")
}