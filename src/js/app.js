/** @format */

// get url parameter
const url = window.location.search;
const urlName = new URLSearchParams(url);
const nama_tamu = urlName.get('kepada');
const span_tamu = document.querySelector('.nama_url');
const creat_meta = document.createElement('meta');
creat_meta.name = 'description';
creat_meta.content = `Kepada yang Terhormat ${nama_tamu}`;
document.getElementsByTagName('head')[0].appendChild(creat_meta);

span_tamu.textContent = nama_tamu;
// get url parameter end

// home animation
const btn_open = document.querySelector('.tombol');
let tl = gsap.timeline();

btn_open.addEventListener('click', () => {
  const cover = document.querySelector('#cover');
  const main = document.getElementById('home');
  const stagger = document.querySelectorAll('.stagger_animation');
  cover.classList.add('active');
  main.classList.add('show');
  stagger.forEach((e) => {
    e.classList.add('active');
  });
  gsap.to('.active', {
    duration: 0.5,
    stagger: 0.3,
    clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
  });
  const audio = new Audio('/assets/music/music.mp3');
  audio.play();
});
// home animation end

// gift box
const gift_box = document.querySelector('.gift_box');
const gift = document.querySelector('.gift');
const sample = document.querySelector('.sample');

gift.addEventListener('click', () => {
  gift_box.classList.toggle('popUp');
});
function copytext() {
  navigator.clipboard.writeText(sample.textContent);
}
// gift box end

// cowndont timer
let countDownDate = new Date('Jul 22, 2023 18:00:00').getTime();

// membuat pembungkus timer
const count_downd = document.getElementById('countdownd');
const hari = document.querySelector('.hari');
const jam = document.querySelector('.jam');
const menit = document.querySelector('.menit');
const detik = document.querySelector('.detik');

// Memperbarui hitungan mundur setiap 1 detik
let x = setInterval(function () {
  // Untuk mendapatkan tanggal dan waktu hari ini
  let now = new Date().getTime();

  // Temukan jarak antara sekarang dan tanggal hitung mundur
  let distance = countDownDate - now;

  // Perhitungan waktu untuk hari, jam, menit dan detik
  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Keluarkan hasil dalam elemen dengan id = "demo"
  // document.getElementById('demo').innerHTML = days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's ';
  hari.innerHTML = days;
  jam.innerHTML = hours;
  menit.innerHTML = minutes;
  detik.innerHTML = seconds;
}, 1000);
// cowndount timer end

// image slider
const swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  speed: 1000,
  // effect
  effect: 'coverflow',
  // auto play
  autoplay: {
    delay: 1500,
    disableOnInteraction: false,
  },
  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});
// image slider end

// coment system
// configuration database

const firebaseConfig = {
  apiKey: 'AIzaSyCkah6CyB0DMZk_xSyEh2IebAUP79xcuvk',
  authDomain: 'wedding1-9fc08.firebaseapp.com',
  projectId: 'wedding1-9fc08',
  storageBucket: 'wedding1-9fc08.appspot.com',
  messagingSenderId: '75435671637',
  appId: '1:75435671637:web:c272351dfee71f04f1d4dc',
  measurementId: 'G-XMYR9Q1NEQ',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// form submit
document.getElementById('comments').addEventListener('submit', submitForm);

// get value in user input
function submitForm(e) {
  e.preventDefault();
  const nama = document.getElementById('nama').value;
  const comment = document.getElementById('comment').value;
  addComment(nama, comment);
  document.getElementById('comments').reset();
}
// tanggal dan waktu
let d = new Date();
let t = d.getDate();
let b = d.getMonth(toString) + 1;
let y = d.getFullYear();
let j = d.getHours();
let m = d.getMinutes();
j = j % 12;
j = j ? j : 12;
let ampm = j >= 12 ? 'PM' : 'AM';
const tanggal = t + '-' + b + '-' + y;
const waktu = j + ':' + m + ' ' + ampm;

// menambah database dari user input
function addComment(nama, komen) {
  let menambahKomenan = db.collection('comments');
  menambahKomenan.add({
    nama: nama,
    comment: komen,
    waktu: waktu + ' ' + '&#9900;' + ' ' + tanggal,
  });
}

const comment_result = document.getElementById('comment_result');

db.collection('comments').onSnapshot((snap) => {
  let main_div = '';
  // const date = new Date();
  // con
  snap.forEach((change) => {
    if (change.data().nama !== '' && change.data().comment !== '') {
      main_div += /*html*/ `<div class="card">
		<div class="nama">
			<h2 class="nama">${change.data().nama}<ion-icon name="checkmark-done-outline"></ion-icon></h2>
			<p class="waktu">${change.data().waktu}</p>
		</div>
		<div class="ucapan">
			<p class="ucapan">${change.data().comment}</p>
		</div>
	</div>`;
    }
  });
  comment_result.innerHTML = main_div;
});
// coment system end
