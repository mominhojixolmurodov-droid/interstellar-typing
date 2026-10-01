/* ===================== TILLAR ===================== */
const I18N = {
  uz: {
    back: '← Orqaga',
    title: 'INTERSTELLAR TYPING',
    welcome: "Yulduzlar oralig'idagi sayohatga xush kelibsiz. Bu yerda klaviaturada tez yozishni mashq qilamiz.",
    namePh: 'Ismingizni yozing', next: 'Davom etish',
    hello: n => `Xush kelibsiz, ${n}!`,
    choose: "Yozish tezligini tanlang",
    slow: 'Sekin', slowD: "Sokin musiqa, qisqa so'zlar",
    medium: "O'rta", mediumD: "Ritmik musiqa, o'rtacha so'zlar",
    fast: 'Tez', fastD: "Baraban, uzun so'zlar, ko'p ball",
    time: 'Vaqt', score: 'Ball', words: "So'z",
    typePh: "So'zni shu yerga yozing...",
    resultTitle: "O'yin tugadi", again: 'Qayta o`ynash',
    cheer: [
      n => `${n}, yaxshi boshladingiz! 🌟`,
      n => `${n}, 30 ta so'z! Zo'r ketyapsiz! 🚀`,
      n => `${n}, siz haqiqiy yulduz sayohatchisiz! ✨`
    ],
    great: n => `Tasanno, ${n}! Bugun ajoyib natija ko'rsatdingiz! 🏆`,
    ok:    n => `Yaxshi, ${n}! Har kuni mashq qilsangiz yanada tezlashasiz! 💪`,
    tryMsg: n => `${n}, qo'rqmang, har bir mashq sizni yuqoriga olib chiqadi! 🌌`
  },
    ru: {
    back: '← Назад',
    title: 'INTERSTELLAR TYPING',
    welcome: 'Добро пожаловать в путешествие среди звёзд. Здесь мы тренируем быструю печать на клавиатуре.',
    namePh: 'Введите ваше имя', next: 'Продолжить',
    hello: n => `Добро пожаловать, ${n}!`,
    choose: 'Выберите скорость печати',
    slow: 'Медленно', slowD: 'Спокойная музыка, короткие слова',
    medium: 'Средне', mediumD: 'Ритмичная музыка, средние слова',
    fast: 'Быстро', fastD: 'Барабаны, длинные слова, больше очков',
    time: 'Время', score: 'Очки', words: 'Слова',
    typePh: 'Печатайте слово здесь...',
    resultTitle: 'Игра окончена', again: 'Играть снова',
    cheer: [
      n => `${n}, отличное начало! 🌟`,
      n => `${n}, 30 слов! Так держать! 🚀`,
      n => `${n}, вы настоящий звёздный путешественник! ✨`
    ],
    great: n => `Браво, ${n}! Сегодня у вас отличный результат! 🏆`,
    ok:    n => `Хорошо, ${n}! С каждой тренировкой вы будете быстрее! 💪`,
    tryMsg: n => `${n}, не сдавайтесь, каждая тренировка делает вас лучше! 🌌`
  },
    en: {
    back: '← Back',
    title: 'INTERSTELLAR TYPING',
    welcome: 'Welcome to a journey among the stars. Here we practice fast typing on the keyboard.',
    namePh: 'Enter your name', next: 'Continue',
    hello: n => `Welcome, ${n}!`,
    choose: 'Choose your typing speed',
    slow: 'Slow', slowD: 'Calm music, short words',
    medium: 'Medium', mediumD: 'Rhythmic music, medium words',
    fast: 'Fast', fastD: 'Drums, long words, more points',
    time: 'Time', score: 'Score', words: 'Words',
    typePh: 'Type the word here...',
    resultTitle: 'Game over', again: 'Play again',
    cheer: [
      n => `${n}, great start! 🌟`,
      n => `${n}, 30 words! Keep going! 🚀`,
      n => `${n}, you are a true star traveler! ✨`
    ],
    great: n => `Bravo, ${n}! You did amazing today! 🏆`,
    ok:    n => `Nice, ${n}! Practice daily and you'll get even faster! 💪`,
    tryMsg: n => `${n}, don't give up, every practice makes you better! 🌌`
  }
};

/* ===================== SO'ZLAR ===================== */
const WORDS = {
  uz: ['yulduz','galaktika','sayyora','kosmos','quyosh','oy','raketa','vaqt','kelajak','umid','sayohat','koinot','nur','orbita','tortishish','sir','xotira','muhabbat','jasorat','osmon','tuman','energiya','tezlik','olam','safar','kashfiyot','sabr','maqsad','orzu','sayohatchi','yorug','mehr'],
  ru: ['звезда','галактика','планета','космос','солнце','луна','ракета','время','будущее','надежда','путешествие','вселенная','свет','орбита','гравитация','тайна','память','любовь','смелость','небо','туман','энергия','скорость','мир','путь','открытие','терпение','цель','мечта','корабль','спутник','свобода'],
  en: ['star','galaxy','planet','cosmos','sun','moon','rocket','time','future','hope','journey','universe','light','orbit','gravity','mystery','memory','love','courage','sky','nebula','energy','speed','world','path','discovery','patience','goal','dream','ship','satellite','freedom','astronaut','horizon']
};

const SPEEDS = {
  slow:   { maxLen: 6,  mult: 1,   track: 'slow' },
  medium: { maxLen: 8,  mult: 1.5, track: 'medium' },
  fast:   { maxLen: 99, mult: 2,   track: 'fast' }
};

/* ===================== HOLAT ===================== */
let lang = 'uz', playerName = '', speed = 'medium';
let timeLeft = 120, score = 0, words = 0, chars = 0;
let current = '', timerId = null, toastTimer = null;

const $ = id => document.getElementById(id);
const t = () => I18N[lang];

/* ===================== EKRANLAR VA TIL ===================== */
function show(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  $(id).classList.add('active');
}

function applyLang() {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => el.textContent = t()[el.dataset.i18n]);
  document.querySelectorAll('[data-i18n-ph]').forEach(el => el.placeholder = t()[el.dataset.i18nPh]);
  $('hello').textContent = t().hello(playerName);
}

document.querySelectorAll('.lang').forEach(btn => {
  btn.addEventListener('click', () => {
    lang = btn.dataset.lang;
    document.querySelectorAll('.lang').forEach(b => b.classList.toggle('active', b === btn));
    applyLang();
  });
});

$('btn-next').addEventListener('click', goSpeed);
$('name').addEventListener('keydown', e => { if (e.key === 'Enter') goSpeed(); });

function goSpeed() {
  const n = $('name').value.trim();
  if (!n) { $('name').focus(); return; }
  playerName = n.charAt(0).toUpperCase() + n.slice(1);
  applyLang();
  show('screen-speed');
}

document.querySelectorAll('.speed').forEach(btn => {
  btn.addEventListener('click', () => startGame(btn.dataset.speed));
});

$('btn-again').addEventListener('click', () => { Music.play('menu'); show('screen-speed'); });
document.querySelectorAll('.btn-back').forEach(btn => {
  btn.addEventListener('click', () => {
    // O'yin paytida orqaga qaytsa: taymer to'xtaydi, musiqa menyu musiqasiga o'tadi
    if ($('screen-game').classList.contains('active')) {
      clearInterval(timerId);
      $('toast').classList.remove('show');
      Music.play('menu');
    }
    show(btn.dataset.back);
  });
});
/* ===================== O'YIN ===================== */
function nextWord() {
  const pool = WORDS[lang].filter(w => w.length <= SPEEDS[speed].maxLen && w !== current);
  current = pool[Math.floor(Math.random() * pool.length)];
  $('word').textContent = current;
  $('typing').value = '';
  $('typing').classList.remove('wrong');
}

function startGame(s) {
  speed = s;
  timeLeft = 120; score = 0; words = 0; chars = 0; current = '';
  $('time').textContent = timeLeft; $('score').textContent = 0; $('words').textContent = 0;
  show('screen-game');
  nextWord();
  $('typing').focus();
  Music.play(SPEEDS[speed].track);

  clearInterval(timerId);
  timerId = setInterval(() => {
    timeLeft--;
    $('time').textContent = timeLeft;
    if (timeLeft <= 0) endGame();
  }, 1000);
}

$('typing').addEventListener('input', () => {
  const val = $('typing').value.trim().toLowerCase();
  const ok = current.startsWith(val);
  $('typing').classList.toggle('wrong', !ok);
  $('word').innerHTML = ok
    ? `<span class="ok">${current.slice(0, val.length)}</span>${current.slice(val.length)}`
    : current;

  if (val === current) {
    words++;
    chars += current.length;
    score += Math.round(current.length * 10 * SPEEDS[speed].mult);
    $('score').textContent = score;
    $('words').textContent = words;

    const milestone = { 15: 0, 30: 1, 45: 2 }[words];
    if (milestone !== undefined) toast(t().cheer[milestone](playerName));
    nextWord();
  }
});

function toast(msg) {
  const el = $('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2800);
}

function endGame() {
  clearInterval(timerId);
  Music.play('menu');
  $('r-score').textContent = score;
  $('r-words').textContent = words;
  $('r-wpm').textContent = Math.round(chars / 5 / 2);
  const msg = words >= 30 ? t().great(playerName)
            : words >= 15 ? t().ok(playerName)
            : t().tryMsg(playerName);
  $('final-msg').textContent = msg;
  show('screen-result');
}

/* ===================== MUSIQA ===================== */
// Avval audio/ papkasidagi mp3 faylni qidiradi. Topilmasa, brauzerning o'zida musiqa yaratadi.
const Music = {
  el: null, ctx: null, master: null, timer: null,

  play(track) {
    this.stop();
    const a = new Audio('menu.mp3');
    a.loop = true; a.volume = 0.5;
    this.el = a;
    a.play().catch(() => { if (this.el === a) this.synth(track); });
  },

  stop() {
    if (this.el) { this.el.pause(); this.el = null; }
    clearInterval(this.timer);
    if (this.master) { this.master.disconnect(); this.master = null; }
  },

  synth(track) {
    this.ctx = this.ctx || new (window.AudioContext || window.webkitAudioContext)();
    const ctx = this.ctx;
    ctx.resume();
    const master = ctx.createGain();
    master.gain.value = 0.3;
    master.connect(ctx.destination);
    this.master = master;

    const chords = [[220, 261.6, 329.6], [196, 246.9, 293.7], [174.6, 220, 261.6], [196, 246.9, 293.7]];
    const bpm = { menu: 56, slow: 60, medium: 100, fast: 140 }[track];
    const eighth = 60 / bpm / 2;
    let step = 0;

    const pad = (freqs, t0, dur) => freqs.forEach(f => {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = 'triangle'; o.frequency.value = f;
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.linearRampToValueAtTime(0.18, t0 + dur * 0.35);
      g.gain.linearRampToValueAtTime(0.0001, t0 + dur);
      o.connect(g); g.connect(master);
      o.start(t0); o.stop(t0 + dur);
    });

    const drum = (t0, f0, f1, vol, len) => {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.frequency.setValueAtTime(f0, t0);
      o.frequency.exponentialRampToValueAtTime(f1, t0 + len);
      g.gain.setValueAtTime(vol, t0);
      g.gain.exponentialRampToValueAtTime(0.001, t0 + len);
      o.connect(g); g.connect(master);
      o.start(t0); o.stop(t0 + len);
    };

    const tick = () => {
      const t0 = ctx.currentTime;
      if (step % 8 === 0) pad(chords[(step / 8) % 4], t0, eighth * 8);
      if (track === 'medium' || track === 'fast') {
        if (step % 2 === 0) drum(t0, 150, 40, 0.9, 0.25);          // kick
        if (step % 4 === 2) drum(t0, 260, 120, 0.5, 0.15);         // snare
      }
      if (track === 'fast' && step % 2 === 1) drum(t0, 400, 200, 0.3, 0.1); // tez zarb
      step++;
    };
    tick();
    this.timer = setInterval(tick, eighth * 1000);
  }
};

// Brauzer birinchi bosishdan keyin musiqaga ruxsat beradi
document.addEventListener('click', () => Music.play('menu'), { once: true });

/* ===================== YULDUZLI FON ===================== */
const canvas = $('stars'), cx = canvas.getContext('2d');
let stars = [];
function resize() {
  canvas.width = innerWidth; canvas.height = innerHeight;
  stars = Array.from({ length: 260 }, () => ({
    x: Math.random() * canvas.width, y: Math.random() * canvas.height,
    r: Math.random() * 1.5 + 0.2, s: Math.random() * 0.35 + 0.05
  }));
}
function drawStars() {
  cx.clearRect(0, 0, canvas.width, canvas.height);
  for (const s of stars) {
    s.x -= s.s; if (s.x < 0) s.x = canvas.width;
    cx.fillStyle = `rgba(255,255,255,${Math.min(1, s.r / 1.6)})`;
    cx.beginPath(); cx.arc(s.x, s.y, s.r, 0, Math.PI * 2); cx.fill();
  }
  requestAnimationFrame(drawStars);
}
addEventListener('resize', resize);
resize(); drawStars(); applyLang();
