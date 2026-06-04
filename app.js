// ═══════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════
let currentScreen    = 'home';
let currentQuestion  = 0;
let surveyAnswers    = {};
let matchedClubs     = [];
let currentMonth     = new Date().getMonth();
let currentYear      = new Date().getFullYear();
let activeTagFilter  = '';
let searchTerm       = '';
let selectedSchool   = 'neuqua';
let savedClubs       = new Set(JSON.parse(localStorage.getItem('mosaic-saved') || '[]'));

// Calendar page state
let calPageMonth  = new Date().getMonth();
let calPageYear   = new Date().getFullYear();
let calPageSchool = 'neuqua';

// Placeholder school event data (replace with real data later)
const SCHOOL_EVENTS = {
  neuqua: [
    { day:3,  title:'Robotics Club',     time:'3:30 PM', tag:'STEM' },
    { day:5,  title:'Science Olympiad',  time:'4:00 PM', tag:'STEM' },
    { day:10, title:'Art Club',          time:'3:15 PM', tag:'Arts' },
    { day:12, title:'Debate Club',       time:'3:30 PM', tag:'Debate' },
    { day:16, title:'DECA Meeting',      time:'4:00 PM', tag:'Business' },
    { day:19, title:'NHS Meeting',       time:'3:00 PM', tag:'Leadership' },
    { day:22, title:'French Club',       time:'3:30 PM', tag:'Culture' },
    { day:24, title:'Robotics Demo Day', time:'5:00 PM', tag:'STEM' },
  ],
  metea: [
    { day:2,  title:'Drama Club',        time:'3:30 PM', tag:'Arts' },
    { day:7,  title:'Math Team',         time:'4:00 PM', tag:'STEM' },
    { day:11, title:'Key Club',          time:'3:15 PM', tag:'Leadership' },
    { day:15, title:'Film Club',         time:'3:30 PM', tag:'Arts' },
    { day:18, title:'German Club',       time:'4:00 PM', tag:'Culture' },
    { day:22, title:'Science Fair Prep', time:'3:00 PM', tag:'STEM' },
    { day:25, title:'Student Council',   time:'3:30 PM', tag:'Leadership' },
  ],
  waubonsie: [
    { day:1,  title:'Student Council',   time:'3:30 PM', tag:'Leadership' },
    { day:6,  title:'Orchestra',         time:'4:00 PM', tag:'Music' },
    { day:9,  title:'Yearbook',          time:'3:15 PM', tag:'Arts' },
    { day:13, title:'Chess Club',        time:'3:30 PM', tag:'STEM' },
    { day:17, title:'Environmental Club',time:'4:00 PM', tag:'Environment' },
    { day:20, title:'DECA Meeting',      time:'3:00 PM', tag:'Business' },
    { day:23, title:'Band',              time:'4:00 PM', tag:'Music' },
    { day:27, title:'NHS Induction',     time:'6:00 PM', tag:'Leadership' },
  ],
};

const EVENT_TAG_STYLES = {
  'STEM':        { bg:'rgba(30,58,95,0.12)',   color:'#1E3A5F' },
  'Arts':        { bg:'rgba(217,119,6,0.12)',  color:'#B45309' },
  'Leadership':  { bg:'rgba(5,150,105,0.12)', color:'#059669' },
  'Business':    { bg:'rgba(124,58,237,0.12)',color:'#7C3AED' },
  'Music':       { bg:'rgba(220,38,38,0.12)', color:'#DC2626' },
  'Culture':     { bg:'rgba(217,119,6,0.12)', color:'#B45309' },
  'Debate':      { bg:'rgba(30,58,95,0.12)',  color:'#1E3A5F' },
  'Environment': { bg:'rgba(5,150,105,0.12)',color:'#059669' },
};

// ═══════════════════════════════════════════
// SURVEY CONFIG
// ═══════════════════════════════════════════
const Q_ICONS  = ['fa-compass','fa-clock','fa-fire','fa-crown','fa-users'];
const Q_HINTS  = [
  'Select all that apply — choose as many as you like',
  'Choose one that best fits your schedule',
  'Select all that apply — what activities excite you?',
  'How do you see yourself in a club?',
  'What social environment helps you thrive?'
];
const OPTION_ICONS = {
  'STEM & Science':'fa-flask','Arts & Creativity':'fa-palette',
  'Sports & Fitness':'fa-running','Music & Performance':'fa-music',
  'Writing & Literature':'fa-pen-nib','Languages & Culture':'fa-globe',
  'Leadership & Service':'fa-hands-helping','Games & Technology':'fa-gamepad',
  'Debate & Public Speaking':'fa-microphone','Business & Finance':'fa-chart-line',
  'Health & Wellness':'fa-heartbeat','Environment & Nature':'fa-leaf',
  '1-2 hours per week':'fa-feather','3-5 hours per week':'fa-clock',
  '6-10 hours per week':'fa-fire','More than 10 hours per week':'fa-bolt',
  'Competitive':'fa-trophy','Casual & Social':'fa-laugh-beam',
  'Creative Projects':'fa-lightbulb','Community Service':'fa-hands-helping',
  'Academic Focus':'fa-book','Physical Activity':'fa-dumbbell',
  'Yes, I want to lead':'fa-crown',"Maybe, I'm open to it":'fa-handshake',
  'No, I prefer to participate':'fa-user','Large groups':'fa-users',
  'Small groups':'fa-user-friends','One-on-one':'fa-user','Mix of all':'fa-th'
};

// Upcoming events data
const UPCOMING_EVENTS = [
  { month:'JUN', day:'10', club:'Robotics Club',      school:'Neuqua Valley',   cat:'Competitive' },
  { month:'JUN', day:'17', club:'Science Olympiad',   school:'Neuqua Valley',   cat:'Competitive' },
  { month:'JUN', day:'24', club:'Art Club',            school:'Neuqua Valley',   cat:'Communities' },
];

// ═══════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  initListeners();
  initNavScroll();
  initHeroTypewriter();
  initSchoolMarquee();
  initMissionCycler();
  initUpcoming();
  updateSavedBadge();
  showScreen('home');
});

function initListeners() {
  document.getElementById('continue-btn') && document.getElementById('continue-btn').addEventListener('click', startQuiz);
  document.getElementById('next-btn').addEventListener('click', nextQuestion);
  document.getElementById('prev-btn').addEventListener('click', prevQuestion);
  document.getElementById('view-dashboard').addEventListener('click', () => showScreen('dashboard'));
  document.getElementById('browse-all').addEventListener('click', () => showScreen('browse'));
  document.getElementById('prev-month').addEventListener('click', () => changeMonth(-1));
  document.getElementById('next-month').addEventListener('click', () => changeMonth(1));
  document.getElementById('search-clubs').addEventListener('input', e => {
    searchTerm = e.target.value.toLowerCase();
    filterAndRender();
  });
  document.getElementById('club-detail-modal').addEventListener('click', closeClubModal);
  document.getElementById('message-modal').addEventListener('click', closeMessageModal);
}

// ═══════════════════════════════════════════
// NAV SCROLL EFFECT
// ═══════════════════════════════════════════
function initNavScroll() {
  window.addEventListener('scroll', updateNav, { passive: true });
}
function updateNav() {
  const nav = document.getElementById('main-nav');
  if (!nav) return;
  if (currentScreen === 'home') {
    nav.classList.toggle('scrolled', window.scrollY > 80);
    nav.classList.remove('solid');
  }
}

// ═══════════════════════════════════════════
// MOBILE NAV MENU
// ═══════════════════════════════════════════
function toggleMobileMenu() {
  const menu   = document.getElementById('nav-mobile-menu');
  const burger = document.getElementById('nav-burger');
  if (!menu) return;
  const open = menu.classList.toggle('open');
  if (burger) burger.classList.toggle('open', open);
}

function closeMobileMenu() {
  document.getElementById('nav-mobile-menu')?.classList.remove('open');
  document.getElementById('nav-burger')?.classList.remove('open');
}

// Run a nav action then close the mobile menu
function navMobile(fn) {
  closeMobileMenu();
  if (typeof fn === 'function') fn();
}

// ═══════════════════════════════════════════
// SCREEN MANAGEMENT
// ═══════════════════════════════════════════
function showScreen(name) {
  closeMobileMenu();
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = document.getElementById(name);
  if (el) { el.classList.add('active'); window.scrollTo(0,0); }
  currentScreen = name;

  const nav = document.getElementById('main-nav');
  const navCta = document.getElementById('nav-cta');
  const navDash = document.getElementById('nav-dashboard');
  const navMobileDash = document.getElementById('nav-mobile-dash');
  if (navMobileDash) navMobileDash.classList.toggle('hidden', matchedClubs.length === 0);

  if (name === 'home') {
    nav.classList.remove('solid');
    updateNav();
    if (navCta) navCta.classList.remove('hidden');
  } else if (name === 'survey') {
    nav.classList.add('hidden');
  } else {
    nav.classList.remove('hidden','scrolled');
    nav.classList.add('solid');
    if (navCta) navCta.classList.add('hidden');
    if (navDash && matchedClubs.length > 0) navDash.classList.remove('hidden');
  }

  // Active nav link highlight
  document.querySelectorAll('.nav-link[data-screen]').forEach(b => {
    b.classList.toggle('active', b.dataset.screen === name);
  });

  switch (name) {
    case 'survey':        loadSurveyQuestion(); break;
    case 'results':       loadResults();        break;
    case 'dashboard':     loadDashboard();      break;
    case 'browse':        loadBrowseClubs();    break;
    case 'calendar-page': loadCalendarPage();   break;
    case 'about':         /* static content */  break;
  }
}

function showHome() {
  const nav = document.getElementById('main-nav');
  if (nav) nav.classList.remove('hidden','solid');
  showScreen('home');
}

function startQuiz() {
  currentQuestion = 0;
  showScreen('survey');
}

function handleNavAbout(e) {
  if (currentScreen !== 'home') {
    e.preventDefault();
    showScreen('home');
    setTimeout(() => scrollToSection('mission'), 350);
  }
}

function scrollToSection(id) {
  if (currentScreen !== 'home') { showScreen('home'); setTimeout(() => scrollToSection(id), 350); return; }
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior:'smooth' });
}

// ═══════════════════════════════════════════
// SCHOOL PILLS
// ═══════════════════════════════════════════
function selectSchoolPill(btn, school) {
  document.querySelectorAll('.school-pill').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  selectedSchool = school;
}

// ═══════════════════════════════════════════
// UPCOMING EVENTS
// ═══════════════════════════════════════════
function initUpcoming() {
  const list = document.getElementById('upcoming-list');
  if (!list) return;
  list.innerHTML = UPCOMING_EVENTS.map(ev => `
    <div class="upcoming-row">
      <div class="upcoming-date">
        <span class="upcoming-month">${ev.month}</span>
        <span class="upcoming-day">${ev.day}</span>
      </div>
      <div class="upcoming-divider"></div>
      <div class="upcoming-info">
        <div class="upcoming-club">${ev.club}</div>
        <div class="upcoming-school">${ev.school}</div>
      </div>
      <span class="upcoming-tag tag-${ev.cat.toLowerCase()}">${ev.cat}</span>
    </div>
  `).join('');
}

// ═══════════════════════════════════════════
// HERO TYPEWRITER — rotating last word
// ═══════════════════════════════════════════
function initHeroTypewriter() {
  const el = document.getElementById('hero-typewriter');
  if (!el) return;

  const words = ['light.', 'voice.', 'place.'];
  let wordIdx    = 0;
  let charIdx    = words[0].length; // first word already fully shown
  let isDeleting = true;            // start by deleting the first word

  function type() {
    const currentWord = words[wordIdx];

    if (isDeleting) {
      // Remove one character
      charIdx--;
      el.textContent = currentWord.slice(0, charIdx);

      if (charIdx === 0) {
        // Done deleting — switch to next word and start typing
        isDeleting = false;
        wordIdx = (wordIdx + 1) % words.length;
        charIdx = 0;
        setTimeout(type, 350); // brief pause before typing
        return;
      }
      setTimeout(type, 60); // delete speed
    } else {
      // Add one character
      charIdx++;
      el.textContent = words[wordIdx].slice(0, charIdx);

      if (charIdx === words[wordIdx].length) {
        // Done typing — hold, then delete
        isDeleting = true;
        setTimeout(type, 2400); // hold time
        return;
      }
      setTimeout(type, 95); // type speed
    }
  }

  // Hold first word for 2s, then start cycling
  setTimeout(type, 2000);
}

// ═══════════════════════════════════════════
// SCHOOL LOGO MARQUEE — seamless infinite scroll
// ═══════════════════════════════════════════
function initSchoolMarquee() {
  const el = document.getElementById('school-marquee');
  if (!el) return;

  const logos = [
    { src:'nv-logo.png',        alt:'Neuqua Valley' },
    { src:'ipsd-logo.png',      alt:'IPSD 204' },
    { src:'metea-logo.png',     alt:'Metea Valley' },
    { src:'waubonsie-logo.png', alt:'Waubonsie Valley' },
  ];

  // Repeat the set enough times that one group comfortably fills wide screens
  const REPEATS = 3;
  let items = '';
  for (let r = 0; r < REPEATS; r++) {
    logos.forEach(l => {
      items += `<div class="marquee-item"><img src="${l.src}" alt="${l.alt}"></div>`;
    });
  }

  // Two identical sets — translateX(-100%) loops seamlessly with no gap
  el.innerHTML =
    `<div class="marquee-set">${items}</div>` +
    `<div class="marquee-set" aria-hidden="true">${items}</div>`;
}

// ═══════════════════════════════════════════
// MISSION WORD CYCLER
// ═══════════════════════════════════════════
function initMissionCycler() {
  const words = document.querySelectorAll('.mw');
  if (!words.length) return;
  let idx = 0;
  setInterval(() => {
    words[idx].classList.remove('active');
    idx = (idx + 1) % words.length;
    words[idx].classList.add('active');
  }, 2500);
}

// ═══════════════════════════════════════════
// SURVEY
// ═══════════════════════════════════════════
function loadSurveyQuestion() {
  const q        = surveyQuestions[currentQuestion];
  const total    = surveyQuestions.length;
  const progress = ((currentQuestion + 1) / total) * 100;

  document.getElementById('step-label').textContent = `Question ${currentQuestion + 1} of ${total}`;
  document.getElementById('progress-fill').style.width = progress + '%';

  const dots = document.getElementById('step-dots');
  dots.innerHTML = '';
  for (let i = 0; i < total; i++) {
    const d = document.createElement('div');
    d.className = 'step-dot' + (i === currentQuestion ? ' active' : i < currentQuestion ? ' done' : '');
    dots.appendChild(d);
  }

  document.getElementById('question-icon').innerHTML = `<i class="fas ${Q_ICONS[currentQuestion]}"></i>`;
  document.getElementById('question-title').textContent = q.question;
  document.getElementById('question-hint').textContent  = Q_HINTS[currentQuestion] || '';

  const container = document.getElementById('question-options');
  container.innerHTML = '';
  const saved = surveyAnswers[currentQuestion] || [];

  q.options.forEach((opt, i) => {
    const icon = OPTION_ICONS[opt] || 'fa-circle';
    const sel  = saved.includes(opt);
    const card = document.createElement('div');
    card.className = `option-card${sel ? ' opt-selected' : ''}`;
    card.innerHTML = `
      <input type="${q.type === 'single' ? 'radio' : 'checkbox'}"
             name="q${currentQuestion}" value="${opt}" id="opt-${i}"
             ${sel ? 'checked' : ''}>
      <div class="opt-icon"><i class="fas ${icon}"></i></div>
      <label>${opt}</label>
      <div class="opt-check"><i class="fas fa-check"></i></div>
    `;
    card.addEventListener('click', e => {
      if (e.target.tagName === 'INPUT') return;
      handleOptionClick(card, q.type);
    });
    container.appendChild(card);
  });

  document.getElementById('prev-btn').disabled = (currentQuestion === 0);
  document.getElementById('next-btn').disabled = (saved.length === 0);
}

function handleOptionClick(clicked, type) {
  const container = document.getElementById('question-options');
  const input = clicked.querySelector('input');
  if (type === 'single') {
    container.querySelectorAll('.option-card').forEach(c => {
      c.classList.remove('opt-selected');
      c.querySelector('input').checked = false;
    });
    clicked.classList.add('opt-selected');
    input.checked = true;
  } else {
    const next = !clicked.classList.contains('opt-selected');
    clicked.classList.toggle('opt-selected', next);
    input.checked = next;
  }
  const any = container.querySelectorAll('input:checked').length > 0;
  document.getElementById('next-btn').disabled = !any;
}

function nextQuestion() {
  const inputs = document.querySelectorAll(`input[name="q${currentQuestion}"]:checked`);
  surveyAnswers[currentQuestion] = Array.from(inputs).map(i => i.value);
  if (currentQuestion < surveyQuestions.length - 1) {
    currentQuestion++;
    loadSurveyQuestion();
  } else {
    calculateMatches();
    document.getElementById('main-nav').classList.remove('hidden');
    showScreen('results');
  }
}

function prevQuestion() {
  if (currentQuestion > 0) {
    const inputs = document.querySelectorAll(`input[name="q${currentQuestion}"]:checked`);
    surveyAnswers[currentQuestion] = Array.from(inputs).map(i => i.value);
    currentQuestion--;
    loadSurveyQuestion();
  }
}

function retakeSurvey() {
  currentQuestion = 0;
  surveyAnswers   = {};
  matchedClubs    = [];
  showScreen('survey');
}

// ═══════════════════════════════════════════
// MATCHING ALGORITHM (preserved)
// ═══════════════════════════════════════════
function calculateMatches() {
  const scores      = {};
  const userProfile = analyzeUserProfile();
  const maxScore    = calculateMaxPossibleScore(userProfile);

  clubsData.forEach(club => {
    let score = 0;
    const tags = club.tags.map(t => t.toLowerCase());
    const desc = club.description.toLowerCase();
    const name = club.name.toLowerCase();

    userProfile.primaryInterests.forEach(interest => {
      const iL = interest.toLowerCase();
      const tm = tags.filter(t => isTagMatch(interest, t));
      if (tm.length > 0) {
        score += 10;
        if (tm.length > 1) score += 2;
        if (iL === 'games & technology' && tm.some(t => ['stem','science','academics','competition'].includes(t))) score += 5;
        else if (iL === 'stem & science' && tm.some(t => ['technology','coding','computing'].includes(t))) score += 4;
        else if (iL === 'arts & creativity' && tm.some(t => ['theatre','drama','writing','journalism'].includes(t))) score += 3;
        else if (iL === 'writing & literature' && tm.some(t => ['journalism','publishing','poetry','arts'].includes(t))) score += 3;
        else if (iL === 'sports & fitness' && tm.some(t => ['team','competition','athletic'].includes(t))) score += 3;
        else if (iL === 'health & wellness' && tm.some(t => ['medicine','medical','psychology'].includes(t))) score += 3;
        else if (iL === 'business & finance' && tm.some(t => ['careers','leadership','competition'].includes(t))) score += 3;
        else if (iL === 'leadership & service' && tm.some(t => ['government','civics','advocacy'].includes(t))) score += 3;
      }
      if (tm.length === 0 && (isTagMatch(interest, desc) || isTagMatch(interest, name))) score += 3;
      if (tm.length === 0) score += kwBonus(iL, tags, name, desc, true);
    });

    userProfile.secondaryInterests.forEach(interest => {
      const iL = interest.toLowerCase();
      const tm = tags.filter(t => isTagMatch(interest, t));
      if (tm.length > 0) {
        score += 5;
        if (iL === 'games & technology' && tm.some(t => ['stem','science','academics','competition'].includes(t))) score += 3;
        else if (iL === 'stem & science' && tm.some(t => ['technology','coding','computing'].includes(t))) score += 2;
        else if (iL === 'arts & creativity' && tm.some(t => ['theatre','drama','writing','journalism'].includes(t))) score += 2;
        else if (iL === 'writing & literature' && tm.some(t => ['journalism','publishing','poetry','arts'].includes(t))) score += 2;
        else if (iL === 'sports & fitness' && tm.some(t => ['team','competition','athletic'].includes(t))) score += 2;
        else if (iL === 'health & wellness' && tm.some(t => ['medicine','medical','psychology'].includes(t))) score += 2;
        else if (iL === 'business & finance' && tm.some(t => ['careers','leadership','competition'].includes(t))) score += 2;
        else if (iL === 'leadership & service' && tm.some(t => ['government','civics','advocacy'].includes(t))) score += 2;
      }
      if (tm.length === 0 && (isTagMatch(interest, desc) || isTagMatch(interest, name))) score += 1;
      if (tm.length === 0) score += kwBonus(iL, tags, name, desc, false);
    });

    if (userProfile.timeCommitment && club.meeting !== 'TBD') {
      if (userProfile.timeCommitment === '1-2 hours per week' && club.category === 'Communities') score += 3;
      else if (userProfile.timeCommitment === '3-5 hours per week') score += 2;
      else if (userProfile.timeCommitment === '6-10 hours per week' && club.category === 'Competitive') score += 4;
      else if (userProfile.timeCommitment === 'More than 10 hours per week' && club.category === 'Competitive') score += 5;
    }

    userProfile.activityStyles.forEach(style => {
      if (style === 'Competitive' && club.category === 'Competitive') {
        score += 6; if (tags.includes('competition')) score += 2;
      } else if (style === 'Casual & Social' && club.category === 'Communities') {
        score += 4; if (tags.some(t => ['social','community','culture'].includes(t))) score += 2;
      } else if (style === 'Creative Projects' && tags.some(t => ['arts','creativity','design','writing','fashion','film','media'].includes(t))) score += 5;
      else if (style === 'Community Service' && tags.some(t => ['service','leadership','inclusion','advocacy','equity','friendship'].includes(t))) score += 5;
      else if (style === 'Academic Focus' && tags.some(t => ['stem','science','academics','trivia','logic','problem solving','mathematics','math','competition','technology','coding','robotics','engineering'].includes(t))) {
        score += 4; if (club.category === 'Competitive' && tags.some(t => ['stem','science','academics','competition'].includes(t))) score += 2;
      } else if (style === 'Physical Activity' && tags.some(t => ['sports','fitness','wellness','recreation','team','athletic','health','training'].includes(t))) {
        score += 4; if (club.category === 'Competitive' && tags.includes('competition')) score += 2;
      }
    });

    if (userProfile.leadershipPreference === 'Yes, I want to lead' && tags.includes('leadership')) score += 7;
    else if (userProfile.leadershipPreference === "Maybe, I'm open to it" && tags.includes('leadership')) score += 3;

    if (userProfile.socialStyle === 'Large groups' && club.category === 'Communities') score += 2;
    else if (userProfile.socialStyle === 'Small groups' && club.category === 'Special Interest') score += 3;
    else if (userProfile.socialStyle === 'One-on-one' && tags.some(t => ['service','inclusion','friendship'].includes(t))) score += 2;

    if (club.category === 'Competitive') score += 2; else score += 1;

    scores[club.name] = { score, percentage: Math.min(Math.round((score / maxScore) * 100), 100) };
  });

  const sorted = Object.entries(scores)
    .sort(([,a],[,b]) => b.score - a.score)
    .map(([n, d]) => ({ ...clubsData.find(c => c.name === n), matchPercentage: d.percentage }))
    .filter(Boolean);

  matchedClubs = [];
  const cats = new Set();
  for (const club of sorted) {
    if (matchedClubs.length >= 5) break;
    if (matchedClubs.length < 2) { matchedClubs.push(club); cats.add(club.category); }
    else if (!cats.has(club.category) || matchedClubs.length >= 3) { matchedClubs.push(club); cats.add(club.category); }
  }
  if (matchedClubs.length < 5) {
    for (const club of sorted) {
      if (matchedClubs.length >= 5) break;
      if (!matchedClubs.includes(club)) matchedClubs.push(club);
    }
  }
}

function kwBonus(iL, tags, name, desc, primary) {
  const M = {
    'games & technology':       { kw:['science','stem','math','olympiad','competition','robotics','computing','coding'],           rt:['stem','science','academics','competition','technology','coding'], b:[8,4] },
    'stem & science':           { kw:['technology','coding','robotics','engineering','science','math','academic'],                  rt:['stem','science','technology','academics'],                    b:[7,3] },
    'arts & creativity':        { kw:['art','theatre','drama','journalism','writing','poetry','literature','media','film','fashion'],rt:['arts','creativity','theatre','drama','writing','journalism'],  b:[7,3] },
    'writing & literature':     { kw:['journalism','newspaper','echo','poetry','literature','publishing','magazine','writing'],     rt:['writing','literature','journalism','publishing','poetry'],      b:[7,3] },
    'music & performance':      { kw:['music','band','orchestra','vocal','singing','acapella','jazz','marching','fiddlers'],        rt:['music','performance','vocal','band'],                          b:[7,3] },
    'sports & fitness':         { kw:['sports','hockey','rugby','frisbee','fitness','athletic','team','intramurals'],              rt:['sports','fitness','athletic','team'],                          b:[7,3] },
    'health & wellness':        { kw:['health','wellness','medicine','medical','psychology','yoga','fitness','training'],           rt:['health','wellness','medicine','psychology'],                   b:[7,3] },
    'business & finance':       { kw:['business','finance','economics','marketing','bpa','careers','professionals'],               rt:['business','finance','economics','careers'],                    b:[7,3] },
    'leadership & service':     { kw:['leadership','service','government','civics','council','interact','unicef','advocacy'],      rt:['leadership','service','government','civics'],                  b:[7,3] },
    'debate & public speaking': { kw:['debate','speech','trial','mock','government','civics','politics','law'],                    rt:['debate','public speaking','speech','law'],                     b:[7,3] },
    'languages & culture':      { kw:['language','culture','french','german','spanish','asl','alliance','heritage','multicultural'],rt:['language','culture','community'],                             b:[7,3] },
    'environment & nature':     { kw:['environment','nature','sustainability','outdoor','ecology','nveco','astronomy','space'],    rt:['environment','nature','sustainability'],                       b:[7,3] }
  };
  const m = M[iL]; if (!m) return 0;
  const hasKw = m.kw.some(k => name.includes(k) || desc.includes(k));
  const hasRt = m.rt.some(t => tags.includes(t));
  return (hasKw && hasRt) ? (primary ? m.b[0] : m.b[1]) : 0;
}

function calculateMaxPossibleScore(profile) {
  let max = 30;
  if (profile.secondaryInterests) max += profile.secondaryInterests.length * 5;
  max += 5;
  if (profile.activityStyles) max += profile.activityStyles.length * 6;
  return max + 7 + 3 + 2;
}

function analyzeUserProfile() {
  const p = { primaryInterests:[], secondaryInterests:[], timeCommitment:null, activityStyles:[], leadershipPreference:null, socialStyle:null };
  if (surveyAnswers[0]) { p.primaryInterests = surveyAnswers[0].slice(0,3); p.secondaryInterests = surveyAnswers[0].slice(3); }
  if (surveyAnswers[1]) p.timeCommitment = surveyAnswers[1][0];
  if (surveyAnswers[2]) p.activityStyles = surveyAnswers[2];
  if (surveyAnswers[3]) p.leadershipPreference = surveyAnswers[3][0];
  if (surveyAnswers[4]) p.socialStyle = surveyAnswers[4][0];
  return p;
}

function isTagMatch(interest, tag) {
  const iL = interest.toLowerCase(), tL = tag.toLowerCase();
  if (iL.includes(tL) || tL.includes(iL)) return true;
  const semantics = {
    'stem & science': ['science','stem','coding','robotics','engineering','technology','biology','chemistry','physics','mathematics','math','medicine','space','academics','trivia','problem solving','logic','computing','competition','astronomy','animal','psychology','mind'],
    'arts & creativity': ['arts','creativity','design','fashion','film','media','visual arts','drawing','painting','sculpture','theatre','drama','journalism','publishing','literature','writing','poetry','anime','pop culture'],
    'sports & fitness': ['sports','fitness','wellness','recreation','athletic','team','hockey','rugby','frisbee','intramurals','training','health'],
    'music & performance': ['music','vocal','band','orchestra','singing','instrument','acapella','chamber','concert','jazz','marching','symphonic','wind ensemble','fiddlers','performance','theatre','drama'],
    'writing & literature': ['writing','literature','journalism','publishing','poetry','reading','discussion','book','newspaper','echo','lit mag','magazine','creativity','arts'],
    'languages & culture': ['language','culture','community','diversity','heritage','religion','faith','french','german','spanish','sign language','asl','alliance','multicultural','korean','indian','asian','black','muslim','hindu','christian'],
    'leadership & service': ['leadership','service','inclusion','advocacy','equity','friendship','global issues','interact','unicef','red cross','cancer','buddies','student council','seac','government','youth'],
    'games & technology': ['games','technology','gaming','interactive','logic','puzzle','strategy','coding','computing','stem','science','robotics','engineering','academics','mathematics','math','competition','problem solving','dnd','dungeons','dragons'],
    'debate & public speaking': ['debate','public speaking','politics','civics','speech','law','trial','mock trial','youth and government','government','ted','education'],
    'business & finance': ['business','finance','economics','marketing','careers','bpa','professionals','skills','usa','media marketing','education','fea','edrising'],
    'health & wellness': ['health','wellness','fitness','psychology','mind','medicine','yoga','amp','medical','professionals','training','athletic','cancer','red cross','snowball'],
    'environment & nature': ['environment','nature','sustainability','outdoor','adventure','ecology','nveco','astronomy','space','animal','science']
  };
  if (semantics[iL] && semantics[iL].includes(tL)) return true;
  const cross = {
    'games & technology': ['stem','science','academics','mathematics','math','competition','robotics','engineering'],
    'stem & science': ['technology','coding','computing','games','gaming','robotics','engineering'],
    'arts & creativity': ['theatre','drama','journalism','writing','poetry','literature','media','film'],
    'writing & literature': ['arts','creativity','journalism','media','publishing','poetry'],
    'music & performance': ['theatre','drama','performance','arts'],
    'sports & fitness': ['health','wellness','training','athletic','recreation'],
    'health & wellness': ['fitness','sports','medicine','psychology','training'],
    'business & finance': ['careers','leadership','marketing','economics'],
    'leadership & service': ['business','careers','government','civics'],
    'debate & public speaking': ['leadership','government','civics','law','politics'],
    'languages & culture': ['community','diversity','heritage','alliance'],
    'environment & nature': ['science','stem','sustainability','outdoor','adventure']
  };
  if (cross[iL] && cross[iL].includes(tL)) return true;
  return false;
}

// ═══════════════════════════════════════════
// RESULTS
// ═══════════════════════════════════════════
function loadResults() {
  const c = document.getElementById('matched-clubs');
  c.innerHTML = '';
  matchedClubs.forEach(club => c.appendChild(createClubCard(club, true)));
}

// ═══════════════════════════════════════════
// DASHBOARD
// ═══════════════════════════════════════════
function loadDashboard() {
  loadDashboardStats();
  loadMyClubs();
  loadSavedClubs();
  loadCalendar();
  switchDashboardTab('clubs');
}

function loadDashboardStats() {
  const profile = analyzeUserProfile();
  const interests = profile.primaryInterests.length + profile.secondaryInterests.length;
  document.getElementById('dashboard-stats').innerHTML = `
    <div class="stat-card"><div class="stat-card-icon sci-blue"><i class="fas fa-star"></i></div><div><div class="stat-card-val">${matchedClubs.length}</div><div class="stat-card-lbl">Matched Clubs</div></div></div>
    <div class="stat-card"><div class="stat-card-icon sci-gold"><i class="fas fa-heart"></i></div><div><div class="stat-card-val">${savedClubs.size}</div><div class="stat-card-lbl">Saved Clubs</div></div></div>
    <div class="stat-card"><div class="stat-card-icon sci-green"><i class="fas fa-compass"></i></div><div><div class="stat-card-val">${interests}</div><div class="stat-card-lbl">Interests</div></div></div>
  `;
}

function loadMyClubs() {
  const c = document.getElementById('my-matched-clubs');
  c.innerHTML = '';
  matchedClubs.forEach(club => c.appendChild(createClubCard(club, true)));
}

function loadSavedClubs() {
  const grid  = document.getElementById('saved-clubs-grid');
  const empty = document.getElementById('saved-empty');
  const saved = clubsData.filter(c => savedClubs.has(c.name));
  grid.innerHTML = '';
  if (saved.length === 0) { empty.style.display = 'block'; grid.style.display = 'none'; }
  else { empty.style.display = 'none'; grid.style.display = ''; saved.forEach(c => grid.appendChild(createClubCard(c, false))); }
}

function switchDashboardTab(tab) {
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  const panelId = tab === 'clubs' ? 'my-clubs-tab' : `${tab}-tab`;
  document.getElementById(panelId).classList.add('active');
  document.getElementById(`tab-btn-${tab}`).classList.add('active');
}

function updateSavedBadge() {
  const b = document.getElementById('saved-badge');
  if (b) b.textContent = savedClubs.size;
}

// ═══════════════════════════════════════════
// CALENDAR
// ═══════════════════════════════════════════
function loadCalendar() {
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  document.getElementById('current-month').textContent = `${months[currentMonth]} ${currentYear}`;
  const grid = document.getElementById('calendar-grid');
  grid.innerHTML = '';
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const days     = new Date(currentYear, currentMonth + 1, 0).getDate();
  const dayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].forEach(d => {
    const h = document.createElement('div'); h.className = 'calendar-day-header'; h.textContent = d; grid.appendChild(h);
  });
  for (let i = 0; i < firstDay; i++) { const e = document.createElement('div'); e.className = 'calendar-day empty'; grid.appendChild(e); }
  for (let day = 1; day <= days; day++) {
    const cell = document.createElement('div'); cell.className = 'calendar-day'; cell.textContent = day;
    const dn = dayNames[new Date(currentYear, currentMonth, day).getDay()];
    matchedClubs.forEach(club => {
      const info = calendarData[club.name];
      if (info && info.day === dn) { const m = document.createElement('div'); m.className = 'calendar-meeting'; m.innerHTML = `<div class="meeting-club">${club.name}</div><div class="meeting-time">${info.time}</div>`; cell.appendChild(m); }
    });
    Object.entries(calendarData).forEach(([n, info]) => {
      if (info.day === dn && !matchedClubs.some(c => c.name === n)) { const m = document.createElement('div'); m.className = 'calendar-meeting other-club'; m.innerHTML = `<div class="meeting-club">${n}</div><div class="meeting-time">${info.time}</div>`; cell.appendChild(m); }
    });
    grid.appendChild(cell);
  }
}

function changeMonth(dir) {
  currentMonth += dir;
  if (currentMonth < 0) { currentMonth = 11; currentYear--; }
  if (currentMonth > 11) { currentMonth = 0; currentYear++; }
  loadCalendar();
}

// ═══════════════════════════════════════════
// BROWSE
// ═══════════════════════════════════════════
function loadBrowseClubs() {
  document.getElementById('club-count').textContent = clubsData.length;
  activeTagFilter = '';
  searchTerm = '';
  document.querySelectorAll('.filter-chip').forEach(c => c.classList.toggle('active', c.dataset.tag === ''));
  document.getElementById('search-clubs').value = '';
  filterAndRender();
}

function setTagFilter(btn, tag) {
  activeTagFilter = tag;
  document.querySelectorAll('.filter-chip').forEach(c => c.classList.toggle('active', c.dataset.tag === tag));
  filterAndRender();
}

function clearSearch() {
  document.getElementById('search-clubs').value = '';
  searchTerm = '';
  filterAndRender();
}

function filterAndRender() {
  let results = clubsData;

  if (activeTagFilter) {
    results = results.filter(club =>
      club.tags.some(t => isTagMatch(activeTagFilter, t)) ||
      isTagMatch(activeTagFilter, club.description.toLowerCase()) ||
      isTagMatch(activeTagFilter, club.name.toLowerCase())
    );
  }

  if (searchTerm) {
    results = results.filter(club =>
      club.name.toLowerCase().includes(searchTerm) ||
      club.description.toLowerCase().includes(searchTerm) ||
      club.tags.some(t => t.toLowerCase().includes(searchTerm))
    );
  }

  const container = document.getElementById('all-clubs');
  const info      = document.getElementById('browse-info');
  container.innerHTML = '';
  info.textContent = results.length === clubsData.length
    ? `Showing all ${results.length} clubs`
    : `${results.length} club${results.length !== 1 ? 's' : ''} found`;
  results.forEach(club => container.appendChild(createClubCard(club, false)));
}

// alias used by old code
function filterClubs() { filterAndRender(); }

// ═══════════════════════════════════════════
// CLUB CARDS
// ═══════════════════════════════════════════
function createClubCard(club, isMatched) {
  const card    = document.createElement('div');
  const isSaved = savedClubs.has(club.name);
  const catLbl  = club.category.toUpperCase();
  const safeN   = club.name.replace(/'/g,"\\'");
  const safeL   = (club.leaders[0] || '').replace(/'/g,"\\'");

  card.className = `club-card${isMatched ? ' matched' : ''}`;
  card.innerHTML = `
    <div class="club-card-top">
      <div class="club-card-title">
        <h3>${club.name}</h3>
        <span class="club-cat-label">${catLbl}</span>
      </div>
      <div class="club-card-right">
        ${isMatched && club.matchPercentage !== undefined ? matchRing(club.matchPercentage) : ''}
        <button class="btn-fav${isSaved ? ' saved' : ''}"
                onclick="toggleFav(event,'${safeN}')">
          <i class="${isSaved ? 'fas' : 'far'} fa-heart"></i>
        </button>
      </div>
    </div>
    <p class="club-desc">${club.description}</p>
    <div class="club-tags">${club.tags.slice(0,4).map(t => `<span class="tag">${t}</span>`).join('')}</div>
    <div class="club-meeting-row"><i class="fas fa-clock"></i><span>${club.meeting}</span></div>
    <div class="club-card-actions">
      <button class="btn-details" onclick="openClubModal('${safeN}')">View Details</button>
      <button class="btn-contact-sm" onclick="messageLeader('${safeL}','${safeN}')">
        <i class="fas fa-envelope"></i> Contact
      </button>
    </div>
  `;
  return card;
}

function matchRing(pct) {
  const r    = 19;
  const circ = 2 * Math.PI * r;
  const off  = circ * (1 - pct / 100);
  const col  = pct >= 80 ? '#059669' : pct >= 60 ? '#1E3A5F' : pct >= 40 ? '#D97706' : '#9CA3AF';
  return `<svg class="match-ring" width="50" height="50" viewBox="0 0 50 50">
    <circle cx="25" cy="25" r="${r}" fill="none" stroke="#F3F4F6" stroke-width="4"/>
    <circle cx="25" cy="25" r="${r}" fill="none" stroke="${col}" stroke-width="4"
            stroke-linecap="round"
            stroke-dasharray="${circ.toFixed(1)}" stroke-dashoffset="${off.toFixed(1)}"
            transform="rotate(-90 25 25)"/>
    <text x="25" y="21" text-anchor="middle" font-family="Geist,system-ui,sans-serif"
          font-size="9.5" font-weight="800" fill="#111827">${pct}%</text>
    <text x="25" y="31" text-anchor="middle" font-family="Geist,system-ui,sans-serif"
          font-size="6.5" font-weight="600" fill="#9CA3AF" letter-spacing="0.4">MATCH</text>
  </svg>`;
}

// ═══════════════════════════════════════════
// FAVORITES
// ═══════════════════════════════════════════
function toggleFav(e, clubName) {
  e.stopPropagation();
  savedClubs.has(clubName) ? savedClubs.delete(clubName) : savedClubs.add(clubName);
  localStorage.setItem('mosaic-saved', JSON.stringify([...savedClubs]));
  updateSavedBadge();
  document.querySelectorAll('.btn-fav').forEach(btn => {
    const name = btn.closest('.club-card')?.querySelector('h3')?.textContent;
    if (name === clubName) {
      const s = savedClubs.has(clubName);
      btn.classList.toggle('saved', s);
      btn.innerHTML = `<i class="${s ? 'fas' : 'far'} fa-heart"></i>`;
    }
  });
  if (currentScreen === 'dashboard') { loadDashboardStats(); loadSavedClubs(); }
}

// ═══════════════════════════════════════════
// CLUB DETAIL MODAL
// ═══════════════════════════════════════════
function openClubModal(clubName) {
  const club = clubsData.find(c => c.name === clubName);
  if (!club) return;
  const isSaved = savedClubs.has(club.name);
  const safeN   = club.name.replace(/'/g,"\\'");

  const leaders = club.leaders.map((l, i) => {
    const email = (club.emails && club.emails[i]) || `${l.toLowerCase().replace(/ /g,'.')}@student.ipsd.org`;
    const safeL = l.replace(/'/g,"\\'");
    return `<div class="leader-row">
      <div><div class="leader-name">${l}</div><div class="leader-email">${email}</div></div>
      <button class="btn-navy" style="padding:6px 12px;font-size:0.8125rem"
              onclick="messageLeader('${safeL}','${safeN}')">
        <i class="fas fa-envelope"></i> Contact
      </button>
    </div>`;
  }).join('');

  document.getElementById('club-detail-inner').innerHTML = `
    <div class="cd-banner">
      <div class="cd-name">${club.name}</div>
      <div class="cd-cat">${club.category.toUpperCase()}</div>
      ${club.matchPercentage !== undefined ? `<div class="cd-ring">${matchRing(club.matchPercentage)}</div>` : ''}
    </div>
    <div class="cd-section"><div class="cd-section-title">About</div><p class="cd-desc">${club.description}</p></div>
    <div class="cd-section"><div class="cd-section-title">Details</div>
      <div class="cd-info-grid">
        <div class="cd-info-item"><i class="fas fa-clock"></i><span>${club.meeting}</span></div>
        <div class="cd-info-item"><i class="fas fa-tag"></i><span>${club.category}</span></div>
      </div>
    </div>
    <div class="cd-section"><div class="cd-section-title">Tags</div>
      <div class="club-tags">${club.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
    </div>
    <div class="cd-section"><div class="cd-section-title">Club Leaders</div>
      <div class="leaders-list">${leaders}</div>
    </div>
    <div style="margin-top:16px">
      <button class="btn-secondary btn-full" onclick="toggleFav(event,'${safeN}')">
        <i class="${isSaved ? 'fas' : 'far'} fa-heart"></i>
        ${isSaved ? 'Saved' : 'Save Club'}
      </button>
    </div>
  `;

  document.getElementById('club-detail-modal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeClubModal() {
  document.getElementById('club-detail-modal').classList.remove('active');
  document.body.style.overflow = '';
}

// ═══════════════════════════════════════════
// MESSAGE MODAL
// ═══════════════════════════════════════════
let _leader = { name:'', email:'', club:'' };

function messageLeader(leaderName, clubName) {
  const club  = clubsData.find(c => c.name === clubName) || findClubByLeader(leaderName);
  const idx   = club ? club.leaders.indexOf(leaderName) : 0;
  const email = (club && club.emails && club.emails[idx]) ||
                `${leaderName.toLowerCase().replace(/ /g,'.')}@student.ipsd.org`;
  _leader = { name: leaderName, email, club: clubName || (club ? club.name : '') };
  document.getElementById('leader-name').textContent  = leaderName;
  document.getElementById('leader-email').textContent = email;
  document.getElementById('message-modal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeMessageModal() {
  document.getElementById('message-modal').classList.remove('active');
  document.body.style.overflow = '';
}

function sendEmail() {
  const subj = `Interest in joining ${_leader.club || 'your club'}`;
  const body  = `Hi ${_leader.name},\n\nI found your club through Mosaic and I'm interested in learning more.\n\nCould you share details about meeting times and how to get involved?\n\nThank you!\n\n[Your Name]`;
  window.open(`mailto:${_leader.email}?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(body)}`);
  closeMessageModal();
}

function findClubByLeader(name) {
  return clubsData.find(c => c.leaders && c.leaders.includes(name));
}

// ═══════════════════════════════════════════
// CALENDAR PAGE
// ═══════════════════════════════════════════
function loadCalendarPage() {
  renderCalPageCalendar();
  renderCalEventsList();
  updateCalSchoolLabel();
}

function selectCalSchool(btn, school) {
  document.querySelectorAll('.cal-school-tile').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  calPageSchool = school;
  renderCalPageCalendar();
  renderCalEventsList();
  updateCalSchoolLabel();
}

function updateCalSchoolLabel() {
  const labels = { neuqua:'Neuqua Valley', metea:'Metea Valley', waubonsie:'Waubonsie Valley' };
  const el = document.getElementById('cal-school-label');
  if (el) el.textContent = labels[calPageSchool] || calPageSchool;
}

function changeCalPageMonth(dir) {
  calPageMonth += dir;
  if (calPageMonth < 0)  { calPageMonth = 11; calPageYear--; }
  if (calPageMonth > 11) { calPageMonth = 0;  calPageYear++; }
  renderCalPageCalendar();
  renderCalEventsList();
}

function renderCalPageCalendar() {
  const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const label  = document.getElementById('cal-page-month');
  const grid   = document.getElementById('cal-page-grid');
  if (!grid) return;

  if (label) label.textContent = `${MONTHS[calPageMonth]} ${calPageYear}`;

  const events = SCHOOL_EVENTS[calPageSchool] || [];
  const eventsByDay = {};
  events.forEach(ev => { eventsByDay[ev.day] = ev; });

  const firstDay = new Date(calPageYear, calPageMonth, 1).getDay();
  const daysIn   = new Date(calPageYear, calPageMonth + 1, 0).getDate();
  const today    = new Date();

  grid.innerHTML = '';

  // Day headers
  ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].forEach(d => {
    const h = document.createElement('div');
    h.className = 'calendar-day-header';
    h.textContent = d;
    grid.appendChild(h);
  });

  // Empty cells
  for (let i = 0; i < firstDay; i++) {
    const e = document.createElement('div');
    e.className = 'calendar-day empty';
    grid.appendChild(e);
  }

  // Day cells
  for (let day = 1; day <= daysIn; day++) {
    const cell = document.createElement('div');
    const isToday = day === today.getDate() && calPageMonth === today.getMonth() && calPageYear === today.getFullYear();
    cell.className = 'calendar-day' + (isToday ? ' today' : '');
    cell.textContent = day;

    if (eventsByDay[day]) {
      const ev  = eventsByDay[day];
      const sty = EVENT_TAG_STYLES[ev.tag] || { bg:'rgba(30,58,95,0.12)', color:'#1E3A5F' };
      const m   = document.createElement('div');
      m.className = 'calendar-meeting';
      m.style.background = sty.bg;
      m.style.color = sty.color;
      m.innerHTML = `<div class="meeting-club">${ev.title}</div><div class="meeting-time">${ev.time}</div>`;
      cell.appendChild(m);
    }
    grid.appendChild(cell);
  }
}

function renderCalEventsList() {
  const list   = document.getElementById('cal-events-list');
  if (!list) return;
  const events = (SCHOOL_EVENTS[calPageSchool] || [])
    .slice()
    .sort((a, b) => a.day - b.day);

  list.innerHTML = '';
  events.forEach(ev => {
    const sty = EVENT_TAG_STYLES[ev.tag] || { bg:'rgba(30,58,95,0.12)', color:'#1E3A5F' };
    const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const row = document.createElement('div');
    row.className = 'cal-event-row';
    row.innerHTML = `
      <div class="cal-event-day">${ev.day}</div>
      <div class="cal-event-info">
        <div class="cal-event-title">${ev.title}</div>
        <div class="cal-event-time">${MONTHS[calPageMonth]} ${ev.day} · ${ev.time}</div>
      </div>
      <span class="cal-event-tag" style="background:${sty.bg};color:${sty.color}">${ev.tag}</span>
    `;
    list.appendChild(row);
  });
}
