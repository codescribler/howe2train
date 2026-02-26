// ─── Howe2Train App ───

const APP = {
  role: null,          // 'parent' | 'coach'
  screen: 'splash',
  selectedChild: 'child-1',
  history: [],
  activeTab: 'dashboard',
};

// ─── Lucide Icon Helper ───
function icon(name, cls = 'w-5 h-5') {
  return `<i data-lucide="${name}" class="${cls}"></i>`;
}

function refreshIcons() {
  if (window.lucide) lucide.createIcons();
}

// ─── Navigation ───
function navigate(screen, opts = {}) {
  if (!opts.replace) APP.history.push(APP.screen);
  APP.screen = screen;
  render();
}

function goBack() {
  const prev = APP.history.pop();
  if (prev) { APP.screen = prev; render(); }
}

function setTab(tab) {
  APP.activeTab = tab;
  if (APP.role === 'parent') {
    const map = { dashboard: 'parent-dashboard', sessions: 'parent-sessions', packages: 'parent-packages', shop: 'parent-shop', notifications: 'parent-notifications', profile: 'parent-profile' };
    navigate(map[tab], { replace: true });
  } else {
    const map = { dashboard: 'coach-dashboard', players: 'coach-players', packages: 'coach-packages', sessions: 'coach-sessions', more: 'coach-more' };
    navigate(map[tab], { replace: true });
  }
}

// ─── Toast ───
function showToast(msg, type = 'success') {
  const el = document.getElementById('toast-container');
  const colors = { success: 'bg-gold text-dark', error: 'bg-red-500 text-white', info: 'bg-dark-surface text-white border border-dark-border' };
  const t = document.createElement('div');
  t.className = `toast ${colors[type] || colors.info} px-4 py-3 rounded-xl text-sm font-medium shadow-lg`;
  t.textContent = msg;
  el.appendChild(t);
  setTimeout(() => { t.classList.add('toast-exit'); setTimeout(() => t.remove(), 300); }, 2500);
}

// ─── Modal ───
function openModal(html) {
  const container = document.getElementById('modal-container');
  container.innerHTML = `<div class="modal-overlay" onclick="closeModal()"></div><div class="modal-sheet bg-dark-card">${html}</div>`;
  refreshIcons();
}

function closeModal() {
  document.getElementById('modal-container').innerHTML = '';
}

// ─── Render ───
function render() {
  const content = document.getElementById('app-content');
  const nav = document.getElementById('bottom-nav');

  const screens = {
    'splash': renderSplash,
    'login': renderLogin,
    'parent-dashboard': renderParentDashboard,
    'parent-sessions': renderParentSessions,
    'parent-session-detail': renderParentSessionDetail,
    'parent-packages': renderParentPackages,
    'parent-package-detail': renderParentPackageDetail,
    'parent-package-progress': renderParentPackageProgress,
    'parent-shop': renderParentShop,
    'parent-shop-item': renderParentShopItem,
    'parent-notifications': renderParentNotifications,
    'parent-profile': renderParentProfile,
    'coach-dashboard': renderCoachDashboard,
    'coach-players': renderCoachPlayers,
    'coach-player-detail': renderCoachPlayerDetail,
    'coach-packages': renderCoachPackages,
    'coach-sessions': renderCoachSessions,
    'coach-shop': renderCoachShop,
    'coach-more': renderCoachMore,
    'coach-earnings': renderCoachEarnings,
  };

  const renderer = screens[APP.screen] || renderSplash;
  content.innerHTML = `<div class="screen-enter">${renderer()}</div>`;

  // Show/hide nav
  const showNav = APP.screen !== 'splash' && APP.screen !== 'login';
  nav.classList.toggle('hidden', !showNav);
  if (showNav) renderNav();

  refreshIcons();
}

// ─── Bottom Nav ───
function renderNav() {
  const nav = document.getElementById('bottom-nav');
  const inner = nav.querySelector('div');

  if (APP.role === 'parent') {
    const tabs = [
      { id: 'dashboard', icon: 'home', label: 'Home' },
      { id: 'sessions', icon: 'calendar', label: 'Sessions' },
      { id: 'packages', icon: 'package', label: 'Packages' },
      { id: 'shop', icon: 'shopping-bag', label: 'Shop' },
      { id: 'profile', icon: 'user', label: 'Profile' },
    ];
    const unread = DATA.notifications.filter(n => !n.read).length;
    inner.innerHTML = tabs.map(t => `
      <button onclick="setTab('${t.id}')" class="nav-item flex flex-col items-center gap-1 py-1 px-3 min-w-[56px] ${APP.activeTab === t.id ? 'active text-gold' : 'text-gray-500'}">
        <span class="relative">${icon(t.icon, 'w-6 h-6')}${t.id === 'dashboard' && unread ? `<span class="notif-dot absolute -top-1 -right-1 w-2.5 h-2.5 bg-gold rounded-full"></span>` : ''}</span>
        <span class="text-[10px] font-medium">${t.label}</span>
      </button>
    `).join('');
  } else {
    const tabs = [
      { id: 'dashboard', icon: 'layout-dashboard', label: 'Home' },
      { id: 'players', icon: 'users', label: 'Players' },
      { id: 'packages', icon: 'package', label: 'Packages' },
      { id: 'sessions', icon: 'calendar', label: 'Sessions' },
      { id: 'more', icon: 'menu', label: 'More' },
    ];
    inner.innerHTML = tabs.map(t => `
      <button onclick="setTab('${t.id}')" class="nav-item flex flex-col items-center gap-1 py-1 px-3 min-w-[56px] ${APP.activeTab === t.id ? 'active text-gold' : 'text-gray-500'}">
        ${icon(t.icon, 'w-6 h-6')}
        <span class="text-[10px] font-medium">${t.label}</span>
      </button>
    `).join('');
  }
  refreshIcons();
}

// ═══════════════════════════════════════
// SCREENS
// ═══════════════════════════════════════

// ─── Splash ───
function renderSplash() {
  return `
    <div class="min-h-dvh flex flex-col items-center justify-center px-6">
      <img src="images/howe2trainlogo.png" alt="Howe2Train" class="logo-reveal w-48 h-48 mb-8">
      <h1 class="font-display text-4xl font-bold tracking-tight mb-2 text-center">HOWE <span class="text-gold">II</span> TRAIN</h1>
      <p class="text-gray-400 text-center mb-12">Professional football coaching by Rene Howe</p>
      <div class="w-full max-w-sm flex flex-col gap-3">
        <button onclick="APP.role='parent'; navigate('login')" class="card-tap w-full bg-gold text-dark font-semibold text-lg py-4 rounded-xl flex items-center justify-center gap-3">
          ${icon('user', 'w-5 h-5')} I'm a Parent
        </button>
        <button onclick="APP.role='coach'; navigate('login')" class="card-tap w-full bg-dark-surface border border-dark-border text-white font-semibold text-lg py-4 rounded-xl flex items-center justify-center gap-3 hover:border-gold/30 transition-colors">
          ${icon('shield', 'w-5 h-5')} I'm the Coach
        </button>
      </div>
      <p class="text-gray-600 text-xs mt-8">Clickable prototype — tap a role to explore</p>
    </div>
  `;
}

// ─── Login ───
function renderLogin() {
  const isParent = APP.role === 'parent';
  return `
    <div class="min-h-dvh flex flex-col px-6 safe-top">
      <button onclick="goBack()" class="mt-4 mb-6 text-gray-400 flex items-center gap-2 card-tap w-fit">${icon('arrow-left', 'w-5 h-5')} Back</button>
      <img src="images/howe2trainlogo.png" alt="Howe2Train" class="w-20 h-20 mx-auto mb-6">
      <h2 class="font-display text-3xl font-bold text-center mb-1">${isParent ? 'PARENT LOGIN' : 'COACH LOGIN'}</h2>
      <p class="text-gray-400 text-center mb-8">${isParent ? 'See your child\'s progress' : 'Welcome back, Rene'}</p>
      <div class="flex flex-col gap-4 max-w-sm mx-auto w-full">
        <div>
          <label class="text-sm text-gray-400 mb-1 block">Email</label>
          <input type="email" value="${isParent ? 'sarah@email.com' : 'rene@howe2coach.com'}" class="w-full bg-dark-surface border border-dark-border rounded-xl px-4 py-3.5 text-white focus:border-gold focus:outline-none transition-colors" readonly>
        </div>
        <div>
          <label class="text-sm text-gray-400 mb-1 block">Password</label>
          <input type="password" value="prototype" class="w-full bg-dark-surface border border-dark-border rounded-xl px-4 py-3.5 text-white focus:border-gold focus:outline-none transition-colors" readonly>
        </div>
        <button onclick="doLogin()" class="card-tap w-full bg-gold text-dark font-semibold text-lg py-4 rounded-xl mt-2">
          Sign In
        </button>
        ${isParent ? '<p class="text-center text-gray-500 text-sm">Demo: Sarah Mitchell (parent of Leo)</p>' : ''}
      </div>
    </div>
  `;
}

function doLogin() {
  if (APP.role === 'parent') {
    APP.activeTab = 'dashboard';
    APP.selectedChild = 'child-1';
    navigate('parent-dashboard', { replace: true });
  } else {
    APP.activeTab = 'dashboard';
    navigate('coach-dashboard', { replace: true });
  }
  APP.history = [];
  showToast('Welcome to Howe2Train!');
}


// ═══════════════════════════════════════
// PARENT SCREENS
// ═══════════════════════════════════════

// ─── Parent Dashboard ───
function renderParentDashboard() {
  const child = getChild(APP.selectedChild);
  const parent = DATA.parents.find(p => p.children.includes(APP.selectedChild));
  const videos = getChildVideos(child.id);
  const comments = getChildComments(child.id);
  const achievements = getChildAchievements(child.id);
  const bookings = getChildBookings(child.id);
  const purchases = getChildPurchases(child.id);

  // Build child switcher if parent has multiple children
  const siblings = parent ? DATA.children.filter(c => parent.children.includes(c.id)) : [child];
  const childSwitcher = siblings.length > 1 ? `
    <div class="flex gap-2 mb-4 overflow-x-auto pb-1">
      ${siblings.map(s => `
        <button onclick="APP.selectedChild='${s.id}'; render()" class="pill px-4 py-2 rounded-full text-sm font-medium border ${s.id === APP.selectedChild ? 'active' : 'border-dark-border text-gray-400'}">
          ${s.name.split(' ')[0]}
        </button>
      `).join('')}
    </div>
  ` : '';

  return `
    <div class="safe-top safe-bottom px-4">
      <!-- Header -->
      <div class="flex items-center justify-between pt-4 mb-4">
        <div>
          <p class="text-gray-400 text-sm">Good morning, Sarah</p>
          <h1 class="font-display text-2xl font-bold">${child.name.split(' ')[0]}'s Dashboard</h1>
        </div>
        <div class="w-12 h-12 rounded-full overflow-hidden border-2 border-gold/30 bg-dark-surface">
          ${child.photo ? `<img src="${child.photo}" alt="${child.name}" class="img-cover">` : `<div class="w-full h-full flex items-center justify-center text-gold font-display text-lg">${child.name[0]}</div>`}
        </div>
      </div>

      ${childSwitcher}

      <!-- Player Info Card -->
      <div class="bg-dark-card rounded-2xl p-4 mb-4 border border-dark-border">
        <div class="flex items-center gap-4">
          <div class="w-16 h-16 rounded-xl overflow-hidden bg-dark-surface border border-dark-border flex-shrink-0">
            ${child.photo ? `<img src="${child.photo}" alt="${child.name}" class="img-cover">` : `<div class="w-full h-full flex items-center justify-center text-gold font-display text-2xl">${child.name[0]}</div>`}
          </div>
          <div class="flex-1">
            <h3 class="font-display text-xl font-bold">${child.name}</h3>
            <p class="text-gray-400 text-sm">${child.ageGroup} &middot; Age ${new Date('2026-02-14').getFullYear() - new Date(child.dob).getFullYear()}</p>
          </div>
          <div class="text-right">
            <div class="text-gold font-display text-2xl font-bold">${achievements.length}</div>
            <div class="text-gray-500 text-xs">Badges</div>
          </div>
        </div>
        ${achievements.length ? `
        <div class="flex gap-2 mt-3 overflow-x-auto pb-1">
          ${achievements.map(a => `
            <div class="badge-pulse flex-shrink-0 w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center" title="${a.name}">
              ${icon(a.icon, 'w-5 h-5 text-gold')}
            </div>
          `).join('')}
        </div>` : ''}
      </div>

      <!-- Upcoming Sessions -->
      ${bookings.length ? `
      <div class="mb-4">
        <h2 class="font-display text-lg font-semibold mb-3 flex items-center gap-2">${icon('calendar', 'w-4 h-4 text-gold')} Upcoming Sessions</h2>
        ${bookings.map(b => `
          <div class="card-tap bg-dark-card rounded-xl p-4 border border-dark-border mb-2" onclick="APP._sessionId='${b.sessionId}'; navigate('parent-session-detail')">
            <div class="flex justify-between items-start">
              <div>
                <h4 class="font-semibold">${b.session.title}</h4>
                <p class="text-gray-400 text-sm mt-1">${icon('clock', 'w-3.5 h-3.5 inline -mt-0.5')} ${formatDate(b.session.date)}, ${b.session.time} &middot; ${b.session.location}</p>
              </div>
              <span class="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full font-medium">${b.status}</span>
            </div>
          </div>
        `).join('')}
      </div>` : ''}

      <!-- Active Packages -->
      ${purchases.length ? `
      <div class="mb-4">
        <h2 class="font-display text-lg font-semibold mb-3 flex items-center gap-2">${icon('package', 'w-4 h-4 text-gold')} Active Packages</h2>
        ${purchases.map(p => {
          const prog = getPackageProgress(p.packageId, child.id);
          return `
            <div class="card-tap bg-dark-card rounded-xl p-4 border border-dark-border mb-2" onclick="APP._packageId='${p.packageId}'; navigate('parent-package-progress')">
              <div class="flex items-center gap-3">
                <div class="w-14 h-14 rounded-lg overflow-hidden bg-dark-surface flex-shrink-0">
                  <img src="${p.package.cover}" alt="${p.package.title}" class="img-cover">
                </div>
                <div class="flex-1 min-w-0">
                  <h4 class="font-semibold truncate">${p.package.title}</h4>
                  <p class="text-gray-400 text-sm">${prog.completed}/${prog.total} drills complete</p>
                  <div class="mt-2 h-2 bg-dark-surface rounded-full overflow-hidden">
                    <div class="progress-bar progress-glow h-full bg-gold rounded-full" style="width:${prog.percent}%"></div>
                  </div>
                </div>
                <span class="text-gold font-display text-xl font-bold">${prog.percent}%</span>
              </div>
            </div>
          `;
        }).join('')}
      </div>` : ''}

      <!-- Activity Feed -->
      <div class="mb-4">
        <h2 class="font-display text-lg font-semibold mb-3 flex items-center gap-2">${icon('activity', 'w-4 h-4 text-gold')} Recent Activity</h2>

        ${videos.slice(0, 3).map(v => `
          <div class="bg-dark-card rounded-xl overflow-hidden border border-dark-border mb-3">
            <div class="aspect-video bg-dark-surface relative">
              <img src="${v.thumbnail}" alt="${v.description}" class="img-cover absolute inset-0">
              <div class="absolute inset-0 flex items-center justify-center bg-black/30">
                <div class="w-14 h-14 rounded-full bg-dark/60 border border-white/20 flex items-center justify-center backdrop-blur-sm cursor-pointer">
                  ${icon('play', 'w-7 h-7 text-white ml-1')}
                </div>
              </div>
            </div>
            <div class="p-3">
              <p class="text-sm">${v.description}</p>
              <p class="text-gray-500 text-xs mt-1">${timeAgo(v.date)}</p>
            </div>
          </div>
        `).join('')}

        ${comments.slice(0, 2).map(c => `
          <div class="bg-dark-card rounded-xl p-4 border border-dark-border mb-3 flex gap-3">
            <div class="w-9 h-9 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center flex-shrink-0">
              ${icon('message-circle', 'w-4 h-4 text-gold')}
            </div>
            <div>
              <p class="text-sm font-medium text-gold">Coach Rene</p>
              <p class="text-sm text-gray-300 mt-1">"${c.text}"</p>
              <p class="text-gray-500 text-xs mt-2">${timeAgo(c.date)}</p>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Quick Links -->
      <div class="grid grid-cols-3 gap-2 mb-6">
        <button onclick="setTab('sessions')" class="card-tap bg-dark-card rounded-xl p-4 border border-dark-border text-left">
          ${icon('calendar', 'w-6 h-6 text-gold mb-2')}
          <p class="font-semibold text-sm">Sessions</p>
          <p class="text-gray-500 text-xs mt-1">${DATA.sessions.length} available</p>
        </button>
        <button onclick="setTab('packages')" class="card-tap bg-dark-card rounded-xl p-4 border border-dark-border text-left">
          ${icon('package', 'w-6 h-6 text-gold mb-2')}
          <p class="font-semibold text-sm">Packages</p>
          <p class="text-gray-500 text-xs mt-1">From ${formatPrice(9.99)}</p>
        </button>
        <button onclick="setTab('shop')" class="card-tap bg-dark-card rounded-xl p-4 border border-dark-border text-left">
          ${icon('shopping-bag', 'w-6 h-6 text-gold mb-2')}
          <p class="font-semibold text-sm">Shop</p>
          <p class="text-gray-500 text-xs mt-1">${DATA.shop.length} items</p>
        </button>
      </div>
    </div>
  `;
}

// ─── Parent Sessions ───
function renderParentSessions() {
  const child = getChild(APP.selectedChild);
  const sessions = DATA.sessions.filter(s => s.ageGroup === child.ageGroup || s.ageGroup === 'All');
  const booked = DATA.bookings.filter(b => b.childId === child.id).map(b => b.sessionId);

  return `
    <div class="safe-top safe-bottom px-4">
      <div class="pt-4 mb-4">
        <h1 class="font-display text-2xl font-bold">Sessions</h1>
        <p class="text-gray-400 text-sm">Available for ${child.ageGroup}</p>
      </div>
      <div class="flex flex-col gap-3">
        ${sessions.map(s => {
          const isBooked = booked.includes(s.id);
          const isFull = s.booked >= s.capacity;
          const spotsLeft = s.capacity - s.booked;
          return `
            <div class="card-tap bg-dark-card rounded-2xl p-4 border border-dark-border" onclick="APP._sessionId='${s.id}'; navigate('parent-session-detail')">
              <div class="flex justify-between items-start mb-3">
                <div>
                  <div class="flex items-center gap-2 mb-1">
                    <h3 class="font-display text-lg font-bold">${s.title}</h3>
                  </div>
                  <div class="flex items-center gap-2 mb-1">
                    <span class="text-xs px-2 py-0.5 rounded-full font-medium ${s.sessionType === '1-to-1' ? 'bg-gold/20 text-gold' : s.sessionType === '2-to-1' ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-500/20 text-purple-400'}">${s.sessionType === 'group' ? 'Group' : s.sessionType}</span>
                  </div>
                  <p class="text-gray-400 text-sm mt-1">${s.description}</p>
                </div>
                ${isBooked ? `<span class="flex-shrink-0 text-xs bg-green-500/20 text-green-400 px-2.5 py-1 rounded-full font-medium">Booked</span>` : ''}
              </div>
              <div class="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-400 mb-3">
                <span class="flex items-center gap-1">${icon('calendar', 'w-3.5 h-3.5')} ${formatDate(s.date)}</span>
                <span class="flex items-center gap-1">${icon('clock', 'w-3.5 h-3.5')} ${s.time}</span>
                <span class="flex items-center gap-1">${icon('map-pin', 'w-3.5 h-3.5')} ${s.location}</span>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <div class="h-1.5 w-24 bg-dark-surface rounded-full overflow-hidden">
                    <div class="h-full rounded-full ${isFull ? 'bg-red-400' : spotsLeft <= 3 ? 'bg-amber-400' : 'bg-green-400'}" style="width:${(s.booked/s.capacity)*100}%"></div>
                  </div>
                  <span class="text-xs ${isFull ? 'text-red-400' : spotsLeft <= 3 ? 'text-amber-400' : 'text-gray-400'}">${isFull ? 'Full' : spotsLeft + ' spots left'}</span>
                </div>
                <span class="font-display text-lg font-bold text-gold">${s.price === 0 ? 'Free' : formatPrice(s.price)}</span>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

// ─── Parent Session Detail ───
function renderParentSessionDetail() {
  const s = getSession(APP._sessionId);
  if (!s) return '<p>Session not found</p>';
  const isBooked = DATA.bookings.some(b => b.sessionId === s.id && b.childId === APP.selectedChild);
  const isFull = s.booked >= s.capacity;
  const child = getChild(APP.selectedChild);

  return `
    <div class="safe-top safe-bottom px-4">
      <button onclick="goBack()" class="mt-4 mb-4 text-gray-400 flex items-center gap-2 card-tap w-fit">${icon('arrow-left', 'w-5 h-5')} Back</button>
      <div class="bg-dark-card rounded-2xl overflow-hidden border border-dark-border mb-4">
        <div class="bg-gradient-to-br from-gold/10 to-transparent p-6">
          <div class="flex items-center gap-2">
            <span class="text-gold text-sm font-medium">${s.ageGroup}</span>
            <span class="text-xs px-2 py-0.5 rounded-full font-medium ${s.sessionType === '1-to-1' ? 'bg-gold/20 text-gold' : s.sessionType === '2-to-1' ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-500/20 text-purple-400'}">${s.sessionType === 'group' ? 'Group' : s.sessionType}</span>
          </div>
          <h1 class="font-display text-3xl font-bold mt-1">${s.title}</h1>
        </div>
        <div class="p-5 flex flex-col gap-4">
          <div class="grid grid-cols-2 gap-3">
            <div class="bg-dark-surface rounded-xl p-3">
              <p class="text-gray-500 text-xs mb-1 flex items-center gap-1">${icon('calendar', 'w-3 h-3')} Date</p>
              <p class="font-semibold">${formatDate(s.date)}</p>
            </div>
            <div class="bg-dark-surface rounded-xl p-3">
              <p class="text-gray-500 text-xs mb-1 flex items-center gap-1">${icon('clock', 'w-3 h-3')} Time</p>
              <p class="font-semibold">${s.time}</p>
            </div>
            <div class="bg-dark-surface rounded-xl p-3">
              <p class="text-gray-500 text-xs mb-1 flex items-center gap-1">${icon('map-pin', 'w-3 h-3')} Location</p>
              <p class="font-semibold text-sm">${s.location}</p>
            </div>
            <div class="bg-dark-surface rounded-xl p-3">
              <p class="text-gray-500 text-xs mb-1 flex items-center gap-1">${icon('users', 'w-3 h-3')} Capacity</p>
              <p class="font-semibold">${s.booked}/${s.capacity}</p>
            </div>
          </div>
          <div>
            <h3 class="font-semibold mb-1">About this session</h3>
            <p class="text-gray-400 text-sm">${s.description}</p>
          </div>
          <div class="flex items-center justify-between pt-2 border-t border-dark-border">
            <div>
              <p class="text-gray-500 text-xs">${s.sessionType === '1-to-1' ? 'Session price' : s.sessionType === '2-to-1' ? 'Price (2 players)' : 'Price per player'}</p>
              <p class="font-display text-2xl font-bold text-gold">${s.price === 0 ? 'Free' : formatPrice(s.price)}</p>
            </div>
            ${isBooked ? `
              <span class="bg-green-500/20 text-green-400 px-5 py-3 rounded-xl font-semibold flex items-center gap-2">${icon('check-circle', 'w-5 h-5')} Booked for ${child.name.split(' ')[0]}</span>
            ` : isFull ? `
              <button onclick="showToast('Added to waiting list!', 'info')" class="card-tap bg-dark-surface border border-dark-border text-white px-5 py-3 rounded-xl font-semibold">Join Waitlist</button>
            ` : `
              <button onclick="bookSession('${s.id}')" class="card-tap bg-gold text-dark px-5 py-3 rounded-xl font-semibold">Book Now</button>
            `}
          </div>
        </div>
      </div>
    </div>
  `;
}

function bookSession(sessionId) {
  DATA.bookings.push({ id: 'bk-' + Date.now(), sessionId, childId: APP.selectedChild, status: 'confirmed', date: '2026-02-14' });
  const s = getSession(sessionId);
  if (s) s.booked++;
  showToast('Session booked successfully!');
  render();
}

// ─── Parent Packages ───
function renderParentPackages() {
  const child = getChild(APP.selectedChild);
  const childAge = new Date('2026-02-14').getFullYear() - new Date(child.dob).getFullYear();
  const categories = ['All', ...new Set(DATA.packages.map(p => p.category))];

  if (!APP._pkgFilter) APP._pkgFilter = 'All';

  const filtered = DATA.packages.filter(p => {
    const catOk = APP._pkgFilter === 'All' || p.category === APP._pkgFilter;
    return p.active && catOk;
  });

  const owned = DATA.purchases.filter(p => p.childId === child.id).map(p => p.packageId);

  return `
    <div class="safe-top safe-bottom px-4">
      <div class="pt-4 mb-3">
        <h1 class="font-display text-2xl font-bold">Training Packages</h1>
        <p class="text-gray-400 text-sm">${DATA.packages.length} packages available</p>
      </div>

      <!-- Category Filter -->
      <div class="flex gap-2 overflow-x-auto pb-3 mb-3 -mx-4 px-4">
        ${categories.map(c => `
          <button onclick="APP._pkgFilter='${c}'; render()" class="pill px-4 py-2 rounded-full text-sm font-medium border ${APP._pkgFilter === c ? 'active' : 'border-dark-border text-gray-400'}">${c}</button>
        `).join('')}
      </div>

      <div class="flex flex-col gap-3">
        ${filtered.map(p => {
          const isOwned = owned.includes(p.id);
          return `
            <div class="card-tap bg-dark-card rounded-2xl overflow-hidden border border-dark-border" onclick="APP._packageId='${p.id}'; navigate('parent-package-detail')">
              <div class="flex">
                <div class="w-28 h-28 flex-shrink-0 bg-dark-surface">
                  <img src="${p.cover}" alt="${p.title}" class="img-cover">
                </div>
                <div class="flex-1 p-3 flex flex-col justify-between">
                  <div>
                    <div class="flex items-start justify-between">
                      <h3 class="font-display text-base font-bold leading-tight pr-2">${p.title}</h3>
                      ${isOwned ? `<span class="flex-shrink-0 text-[10px] bg-gold/20 text-gold px-2 py-0.5 rounded-full font-medium">Owned</span>` : ''}
                    </div>
                    <div class="flex flex-wrap gap-x-2 gap-y-0.5 mt-1">
                      <span class="text-gray-500 text-xs">Ages ${p.ageMin}–${p.ageMax}</span>
                      <span class="text-gray-500 text-xs">${p.difficulty}</span>
                      <span class="text-gray-500 text-xs">${p.drillCount} drills</span>
                    </div>
                  </div>
                  <div class="flex items-center justify-between mt-2">
                    <span class="text-xs px-2 py-0.5 rounded-full bg-dark-surface text-gray-400 border border-dark-border">${p.category}</span>
                    <span class="font-display text-lg font-bold text-gold">${formatPrice(p.price)}</span>
                  </div>
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

// ─── Parent Package Detail ───
function renderParentPackageDetail() {
  const p = getPackage(APP._packageId);
  if (!p) return '<p>Package not found</p>';
  const child = getChild(APP.selectedChild);
  const isOwned = DATA.purchases.some(pr => pr.packageId === p.id && pr.childId === child.id);

  return `
    <div class="safe-top safe-bottom">
      <div class="relative">
        <div class="aspect-[2/1] bg-dark-surface">
          <img src="${p.cover}" alt="${p.title}" class="img-cover w-full h-full">
          <div class="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent"></div>
        </div>
        <button onclick="goBack()" class="absolute top-4 left-4 w-10 h-10 rounded-full bg-dark/70 backdrop-blur-sm flex items-center justify-center card-tap">${icon('arrow-left', 'w-5 h-5')}</button>
      </div>

      <div class="px-4 -mt-16 relative z-10">
        <div class="flex items-center gap-2 mb-2">
          <span class="text-xs px-2 py-0.5 rounded-full bg-gold/20 text-gold font-medium">${p.category}</span>
          <span class="text-xs px-2 py-0.5 rounded-full bg-dark-surface text-gray-400 border border-dark-border">${p.difficulty}</span>
        </div>
        <h1 class="font-display text-3xl font-bold mb-2">${p.title}</h1>
        <div class="flex flex-wrap gap-x-3 text-sm text-gray-400 mb-4">
          <span>Ages ${p.ageMin}–${p.ageMax}</span>
          <span>${p.drillCount} drills</span>
        </div>
        <p class="text-gray-300 text-sm leading-relaxed mb-6">${p.description}</p>

        <!-- Drill Preview -->
        <h3 class="font-display text-lg font-semibold mb-3">What's included</h3>
        <div class="flex flex-col gap-2 mb-6">
          ${p.drills.map((d, i) => `
            <div class="flex items-center gap-3 bg-dark-card rounded-xl p-3 border border-dark-border ${i === 0 ? '' : isOwned ? '' : 'opacity-50'}">
              <div class="w-8 h-8 rounded-lg bg-dark-surface flex items-center justify-center text-gold font-display font-bold text-sm flex-shrink-0">${d.order}</div>
              <div class="flex-1 min-w-0">
                <p class="font-medium text-sm truncate">${d.title}</p>
                ${i === 0 || isOwned ? `<p class="text-gray-500 text-xs mt-0.5 line-clamp-1">${d.instructions}</p>` : ''}
              </div>
              ${!isOwned && i > 0 ? icon('lock', 'w-4 h-4 text-gray-600 flex-shrink-0') : icon('play-circle', 'w-5 h-5 text-gold flex-shrink-0')}
            </div>
          `).join('')}
        </div>

        <!-- Purchase / Progress -->
        <div class="bg-dark-card rounded-2xl p-4 border border-dark-border mb-6">
          ${isOwned ? `
            <button onclick="APP._packageId='${p.id}'; navigate('parent-package-progress')" class="card-tap w-full bg-gold text-dark font-semibold py-4 rounded-xl text-lg flex items-center justify-center gap-2">
              ${icon('play', 'w-5 h-5')} Continue Training
            </button>
          ` : `
            <div class="flex items-center justify-between mb-3">
              <div>
                <p class="text-gray-500 text-xs">One-time purchase</p>
                <p class="font-display text-3xl font-bold text-gold">${formatPrice(p.price)}</p>
              </div>
              <div class="text-right text-gray-500 text-xs">
                <p>Immediate access</p>
                <p>Track progress in-app</p>
              </div>
            </div>
            <button onclick="purchasePackage('${p.id}')" class="card-tap w-full bg-gold text-dark font-semibold py-4 rounded-xl text-lg flex items-center justify-center gap-2">
              ${icon('credit-card', 'w-5 h-5')} Purchase for ${child.name.split(' ')[0]}
            </button>
          `}
        </div>
      </div>
    </div>
  `;
}

function purchasePackage(pkgId) {
  const child = getChild(APP.selectedChild);
  DATA.purchases.push({ id: 'pur-' + Date.now(), packageId: pkgId, childId: child.id, parentId: 'parent-1', date: '2026-02-14', status: 'completed' });
  const pkg = getPackage(pkgId);
  if (pkg) {
    pkg.drills.forEach(d => {
      if (!DATA.drillProgress.find(dp => dp.drillId === d.id && dp.childId === child.id)) {
        DATA.drillProgress.push({ drillId: d.id, childId: child.id, completed: false, date: null });
      }
    });
  }
  showToast('Package purchased! Let\'s train!');
  render();
}

// ─── Parent Package Progress ───
function renderParentPackageProgress() {
  const p = getPackage(APP._packageId);
  if (!p) return '<p>Package not found</p>';
  const child = getChild(APP.selectedChild);
  const prog = getPackageProgress(p.id, child.id);

  return `
    <div class="safe-top safe-bottom px-4">
      <button onclick="goBack()" class="mt-4 mb-4 text-gray-400 flex items-center gap-2 card-tap w-fit">${icon('arrow-left', 'w-5 h-5')} Back</button>

      <div class="flex items-center gap-4 mb-4">
        <div class="w-16 h-16 rounded-xl overflow-hidden bg-dark-surface flex-shrink-0">
          <img src="${p.cover}" alt="${p.title}" class="img-cover">
        </div>
        <div class="flex-1">
          <h1 class="font-display text-xl font-bold">${p.title}</h1>
          <p class="text-gray-400 text-sm">${prog.completed}/${prog.total} drills completed</p>
        </div>
      </div>

      <!-- Progress Ring -->
      <div class="bg-dark-card rounded-2xl p-6 border border-dark-border mb-4 flex items-center justify-center gap-6">
        <div class="relative w-24 h-24">
          <svg class="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" stroke="#1A1A1A" stroke-width="8" fill="none"/>
            <circle cx="50" cy="50" r="42" stroke="#C5A55A" stroke-width="8" fill="none" stroke-linecap="round"
              stroke-dasharray="${2 * Math.PI * 42}" stroke-dashoffset="${2 * Math.PI * 42 * (1 - prog.percent / 100)}"
              style="transition: stroke-dashoffset 1s ease"/>
          </svg>
          <div class="absolute inset-0 flex items-center justify-center">
            <span class="font-display text-2xl font-bold text-gold">${prog.percent}%</span>
          </div>
        </div>
        <div>
          <p class="font-display text-lg font-bold">${prog.percent === 100 ? 'Complete!' : 'Keep going!'}</p>
          <p class="text-gray-400 text-sm">${prog.total - prog.completed} drills remaining</p>
        </div>
      </div>

      <!-- Drill List -->
      <div class="flex flex-col gap-2">
        ${p.drills.map(d => {
          const dp = DATA.drillProgress.find(x => x.drillId === d.id && x.childId === child.id);
          const done = dp && dp.completed;
          const isNext = !done && p.drills.filter(dd => {
            const ddp = DATA.drillProgress.find(x => x.drillId === dd.id && x.childId === child.id);
            return ddp && ddp.completed;
          }).length === d.order - 1;

          return `
            <div class="bg-dark-card rounded-xl p-4 border ${isNext ? 'border-gold/50' : 'border-dark-border'} ${done ? 'opacity-70' : ''}">
              <div class="flex items-start gap-3">
                <input type="checkbox" class="drill-check mt-0.5" ${done ? 'checked' : ''} onchange="toggleDrill('${d.id}', '${child.id}', this.checked)">
                <div class="flex-1">
                  <div class="flex items-center gap-2">
                    <span class="text-xs text-gold font-display font-bold">DRILL ${d.order}</span>
                    ${isNext ? `<span class="text-[10px] bg-gold/20 text-gold px-2 py-0.5 rounded-full font-medium">Up Next</span>` : ''}
                  </div>
                  <h4 class="font-semibold mt-0.5 ${done ? 'line-through text-gray-500' : ''}">${d.title}</h4>
                  <p class="text-gray-400 text-sm mt-1">${d.instructions}</p>
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

function toggleDrill(drillId, childId, completed) {
  const dp = DATA.drillProgress.find(x => x.drillId === drillId && x.childId === childId);
  if (dp) {
    dp.completed = completed;
    dp.date = completed ? '2026-02-14' : null;
  }
  if (completed) showToast('Drill completed! Nice work!');
  render();
}

// ─── Parent Shop ───
function renderParentShop() {
  const categories = ['All', ...new Set(DATA.shop.map(m => m.category))];
  if (!APP._shopFilter) APP._shopFilter = 'All';
  const filtered = APP._shopFilter === 'All' ? DATA.shop : DATA.shop.filter(m => m.category === APP._shopFilter);

  return `
    <div class="safe-top safe-bottom px-4">
      <div class="pt-4 mb-3">
        <h1 class="font-display text-2xl font-bold">Shop</h1>
        <p class="text-gray-400 text-sm">Official Howe2Train kit & equipment</p>
      </div>

      <!-- Category Filter -->
      <div class="flex gap-2 overflow-x-auto pb-3 mb-3 -mx-4 px-4">
        ${categories.map(c => `
          <button onclick="APP._shopFilter='${c}'; render()" class="pill px-4 py-2 rounded-full text-sm font-medium border ${APP._shopFilter === c ? 'active' : 'border-dark-border text-gray-400'}">${c}</button>
        `).join('')}
      </div>

      <div class="grid grid-cols-2 gap-3">
        ${filtered.map(m => `
          <div class="card-tap bg-dark-card rounded-2xl overflow-hidden border border-dark-border" onclick="APP._merchId='${m.id}'; navigate('parent-shop-item')">
            <div class="aspect-square bg-dark-surface flex items-center justify-center p-4">
              <div class="w-16 h-16 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center">
                ${icon(m.category === 'Apparel' ? 'shirt' : m.name.includes('Football') ? 'circle' : m.name.includes('Cone') ? 'triangle' : m.name.includes('Ladder') ? 'grid-3x3' : m.name.includes('Rebounder') ? 'square' : m.name.includes('Hurdle') ? 'minus' : m.name.includes('Pump') ? 'droplets' : m.name.includes('Water') ? 'cup-soda' : m.name.includes('Shin') ? 'shield' : m.name.includes('Bag') ? 'briefcase' : 'box', 'w-8 h-8 text-gold')}
              </div>
            </div>
            <div class="p-3">
              <h3 class="font-semibold text-sm leading-tight line-clamp-2">${m.name}</h3>
              <div class="flex items-center justify-between mt-2">
                <span class="text-xs text-gray-500">${m.category}</span>
                <span class="font-display text-lg font-bold text-gold">${formatPrice(m.price)}</span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// ─── Parent Shop Item Detail ───
function renderParentShopItem() {
  const m = getMerch(APP._merchId);
  if (!m) return '<p>Item not found</p>';

  return `
    <div class="safe-top safe-bottom px-4">
      <button onclick="goBack()" class="mt-4 mb-4 text-gray-400 flex items-center gap-2 card-tap w-fit">${icon('arrow-left', 'w-5 h-5')} Back</button>

      <div class="bg-dark-card rounded-2xl overflow-hidden border border-dark-border mb-4">
        <div class="aspect-square bg-dark-surface flex items-center justify-center">
          <div class="w-28 h-28 rounded-full bg-gold/10 border-2 border-gold/20 flex items-center justify-center">
            ${icon(m.category === 'Apparel' ? 'shirt' : m.name.includes('Football') ? 'circle' : m.name.includes('Cone') ? 'triangle' : m.name.includes('Ladder') ? 'grid-3x3' : m.name.includes('Rebounder') ? 'square' : m.name.includes('Hurdle') ? 'minus' : m.name.includes('Pump') ? 'droplets' : m.name.includes('Water') ? 'cup-soda' : m.name.includes('Shin') ? 'shield' : m.name.includes('Bag') ? 'briefcase' : 'box', 'w-14 h-14 text-gold')}
          </div>
        </div>
        <div class="p-5">
          <div class="flex items-center gap-2 mb-2">
            <span class="text-xs px-2 py-0.5 rounded-full bg-gold/20 text-gold font-medium">${m.category}</span>
            ${m.stock < 10 ? `<span class="text-xs px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 font-medium">Low Stock</span>` : `<span class="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 font-medium">In Stock</span>`}
          </div>
          <h1 class="font-display text-2xl font-bold mb-2">${m.name}</h1>
          <p class="text-gray-300 text-sm leading-relaxed mb-4">${m.description}</p>

          ${m.sizes ? `
            <div class="mb-4">
              <label class="text-sm text-gray-400 mb-2 block">Select Size</label>
              <div class="flex flex-wrap gap-2">
                ${m.sizes.map((s, i) => `
                  <button onclick="this.parentElement.querySelectorAll('button').forEach(b=>{b.classList.remove('border-gold','bg-gold/10');b.classList.add('border-dark-border')}); this.classList.remove('border-dark-border'); this.classList.add('border-gold','bg-gold/10')" class="card-tap px-3 py-2 rounded-lg text-sm border ${i === 0 ? 'border-gold bg-gold/10' : 'border-dark-border'}">${s}</button>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <div class="flex items-center justify-between pt-4 border-t border-dark-border">
            <div>
              <p class="text-gray-500 text-xs">Price</p>
              <p class="font-display text-3xl font-bold text-gold">${formatPrice(m.price)}</p>
            </div>
            <button onclick="showToast('Added to basket!')" class="card-tap bg-gold text-dark font-semibold px-6 py-3 rounded-xl text-lg flex items-center gap-2">
              ${icon('shopping-bag', 'w-5 h-5')} Add to Basket
            </button>
          </div>
        </div>
      </div>

      <!-- Related Items -->
      <h3 class="font-display text-lg font-semibold mb-3">You might also need</h3>
      <div class="flex gap-3 overflow-x-auto pb-3 -mx-4 px-4">
        ${DATA.shop.filter(r => r.id !== m.id && r.category === m.category).slice(0, 4).map(r => `
          <div class="card-tap flex-shrink-0 w-36 bg-dark-card rounded-xl overflow-hidden border border-dark-border" onclick="APP._merchId='${r.id}'; render()">
            <div class="aspect-square bg-dark-surface flex items-center justify-center p-3">
              <div class="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                ${icon(r.category === 'Apparel' ? 'shirt' : 'box', 'w-5 h-5 text-gold')}
              </div>
            </div>
            <div class="p-2">
              <p class="text-xs font-medium line-clamp-2">${r.name}</p>
              <p class="text-gold font-display font-bold text-sm mt-1">${formatPrice(r.price)}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// ─── Parent Notifications ───
function renderParentNotifications() {
  const typeIcons = { video: 'play-circle', achievement: 'trophy', comment: 'message-circle', session: 'calendar', package: 'package' };
  const typeColors = { video: 'text-blue-400', achievement: 'text-gold', comment: 'text-green-400', session: 'text-purple-400', package: 'text-amber-400' };

  return `
    <div class="safe-top safe-bottom px-4">
      <div class="pt-4 mb-4 flex items-center justify-between">
        <h1 class="font-display text-2xl font-bold">Notifications</h1>
        <button onclick="markAllRead()" class="text-gold text-sm font-medium card-tap">Mark all read</button>
      </div>
      <div class="flex flex-col gap-2">
        ${DATA.notifications.map(n => `
          <div class="card-tap bg-dark-card rounded-xl p-4 border ${n.read ? 'border-dark-border' : 'border-gold/30 bg-gold/5'}">
            <div class="flex gap-3">
              <div class="w-10 h-10 rounded-full ${n.read ? 'bg-dark-surface' : 'bg-gold/10'} flex items-center justify-center flex-shrink-0">
                ${icon(typeIcons[n.type] || 'bell', `w-5 h-5 ${typeColors[n.type] || 'text-gray-400'}`)}
              </div>
              <div class="flex-1">
                <div class="flex items-center justify-between">
                  <h4 class="font-semibold text-sm">${n.title}</h4>
                  ${!n.read ? '<span class="w-2 h-2 rounded-full bg-gold flex-shrink-0"></span>' : ''}
                </div>
                <p class="text-gray-400 text-sm mt-1">${n.message}</p>
                <p class="text-gray-600 text-xs mt-2">${timeAgo(n.date)}</p>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function markAllRead() {
  DATA.notifications.forEach(n => n.read = true);
  showToast('All notifications marked as read', 'info');
  render();
}

// ─── Parent Profile ───
function renderParentProfile() {
  const child = getChild(APP.selectedChild);
  const parent = DATA.parents[0];

  return `
    <div class="safe-top safe-bottom px-4">
      <div class="pt-4 mb-6">
        <h1 class="font-display text-2xl font-bold">Profile</h1>
      </div>
      <div class="bg-dark-card rounded-2xl p-5 border border-dark-border mb-4 flex items-center gap-4">
        <div class="w-16 h-16 rounded-full bg-gold/10 border-2 border-gold/30 flex items-center justify-center">
          <span class="font-display text-2xl text-gold font-bold">${parent.name[0]}</span>
        </div>
        <div>
          <h2 class="font-display text-xl font-bold">${parent.name}</h2>
          <p class="text-gray-400 text-sm">${parent.email}</p>
        </div>
      </div>

      <div class="bg-dark-card rounded-2xl border border-dark-border overflow-hidden mb-4">
        <div class="p-4 border-b border-dark-border">
          <h3 class="font-semibold text-sm text-gray-400">My Children</h3>
        </div>
        ${DATA.children.filter(c => parent.children.includes(c.id)).map(c => `
          <div class="flex items-center gap-3 p-4 border-b border-dark-border last:border-0">
            <div class="w-10 h-10 rounded-full overflow-hidden bg-dark-surface border border-dark-border">
              ${c.photo ? `<img src="${c.photo}" alt="${c.name}" class="img-cover">` : `<div class="w-full h-full flex items-center justify-center text-gold font-display">${c.name[0]}</div>`}
            </div>
            <div class="flex-1">
              <p class="font-semibold">${c.name}</p>
              <p class="text-gray-500 text-xs">${c.ageGroup}</p>
            </div>
            ${icon('chevron-right', 'w-4 h-4 text-gray-600')}
          </div>
        `).join('')}
      </div>

      <div class="bg-dark-card rounded-2xl border border-dark-border overflow-hidden mb-4">
        ${[
          { icon: 'bell', label: 'Notifications', badge: DATA.notifications.filter(n => !n.read).length, action: "APP.activeTab='notifications'; navigate('parent-notifications')" },
          { icon: 'credit-card', label: 'Payment Methods', badge: 0, action: "showToast('Payment settings', 'info')" },
          { icon: 'help-circle', label: 'Help & Support', badge: 0, action: "showToast('Support contact', 'info')" },
          { icon: 'file-text', label: 'Terms & Privacy', badge: 0, action: "showToast('Terms and privacy', 'info')" },
        ].map(item => `
          <button onclick="${item.action}" class="card-tap flex items-center gap-3 p-4 border-b border-dark-border last:border-0 w-full text-left">
            ${icon(item.icon, 'w-5 h-5 text-gray-400')}
            <span class="flex-1 text-sm font-medium">${item.label}</span>
            ${item.badge ? `<span class="w-5 h-5 bg-gold rounded-full text-dark text-xs font-bold flex items-center justify-center">${item.badge}</span>` : ''}
            ${icon('chevron-right', 'w-4 h-4 text-gray-600')}
          </button>
        `).join('')}
      </div>

      <button onclick="APP.role=null; APP.history=[]; navigate('splash', {replace:true})" class="card-tap w-full bg-dark-surface border border-dark-border text-red-400 font-semibold py-3 rounded-xl text-sm">
        Sign Out
      </button>
    </div>
  `;
}


// ═══════════════════════════════════════
// COACH SCREENS
// ═══════════════════════════════════════

// ─── Coach Dashboard ───
function renderCoachDashboard() {
  const totalPlayers = DATA.children.length;
  const upcomingSessions = DATA.sessions.filter(s => new Date(s.date) >= new Date('2026-02-14')).length;
  const unreadNotifs = DATA.notifications.filter(n => !n.read).length;

  return `
    <div class="safe-top safe-bottom px-4">
      <div class="flex items-center justify-between pt-4 mb-4">
        <div>
          <p class="text-gray-400 text-sm">Welcome back</p>
          <h1 class="font-display text-2xl font-bold">Coach Rene</h1>
        </div>
        <img src="images/howe2coach.png" alt="Howe2Coach" class="w-12 h-12">
      </div>

      <!-- Quick Actions -->
      <div class="grid grid-cols-3 gap-2 mb-5">
        ${[
          { icon: 'video', label: 'Upload Video', action: 'openUploadVideo()' },
          { icon: 'message-circle', label: 'Add Comment', action: 'openAddComment()' },
          { icon: 'trophy', label: 'Award Badge', action: 'openAwardBadge()' },
        ].map(a => `
          <button onclick="${a.action}" class="card-tap bg-dark-card border border-dark-border rounded-xl p-4 flex flex-col items-center gap-2">
            <div class="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">${icon(a.icon, 'w-5 h-5 text-gold')}</div>
            <span class="text-xs font-medium text-center">${a.label}</span>
          </button>
        `).join('')}
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-4 gap-2 mb-5">
        ${[
          { value: totalPlayers, label: 'Players', color: 'text-gold' },
          { value: upcomingSessions, label: 'Sessions', color: 'text-blue-400' },
          { value: DATA.packages.length, label: 'Packages', color: 'text-green-400' },
          { value: formatPrice(DATA.earnings.thisMonth), label: 'This Month', color: 'text-gold' },
        ].map((s, i) => `
          <div class="stat-reveal bg-dark-card rounded-xl p-3 border border-dark-border text-center">
            <p class="font-display text-xl font-bold ${s.color}">${s.value}</p>
            <p class="text-gray-500 text-[10px] mt-0.5">${s.label}</p>
          </div>
        `).join('')}
      </div>

      <!-- Upcoming Sessions -->
      <h2 class="font-display text-lg font-semibold mb-3 flex items-center gap-2">${icon('calendar', 'w-4 h-4 text-gold')} Upcoming Sessions</h2>
      <div class="flex flex-col gap-2 mb-5">
        ${DATA.sessions.slice(0, 3).map(s => `
          <div class="card-tap bg-dark-card rounded-xl p-3 border border-dark-border flex items-center gap-3">
            <div class="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
              <div class="text-center">
                <p class="font-display text-sm font-bold text-gold">${formatDate(s.date).split(' ')[0]}</p>
                <p class="text-[10px] text-gray-400">${formatDate(s.date).split(' ')[1]}</p>
              </div>
            </div>
            <div class="flex-1 min-w-0">
              <h4 class="font-semibold text-sm truncate">${s.title}</h4>
              <p class="text-gray-500 text-xs">${s.time} &middot; ${s.booked}/${s.capacity} booked</p>
            </div>
            <div class="text-right">
              <span class="text-gold font-display font-bold">${s.price === 0 ? 'Free' : formatPrice(s.price)}</span>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Recent Sales -->
      <h2 class="font-display text-lg font-semibold mb-3 flex items-center gap-2">${icon('trending-up', 'w-4 h-4 text-gold')} Recent Sales</h2>
      <div class="flex flex-col gap-2 mb-4">
        ${DATA.earnings.recentTransactions.slice(0, 5).map(t => {
          const typeIcons = { session: 'calendar', package: 'package', shop: 'shopping-bag' };
          const typeColors = { session: 'text-blue-400', package: 'text-purple-400', shop: 'text-amber-400' };
          const typeBg = { session: 'bg-blue-500/10', package: 'bg-purple-500/10', shop: 'bg-amber-500/10' };
          return `
          <div class="bg-dark-card rounded-xl p-3 border border-dark-border flex items-center gap-3">
            <div class="w-8 h-8 rounded-full ${typeBg[t.type] || 'bg-dark-surface'} flex items-center justify-center flex-shrink-0">
              ${icon(typeIcons[t.type] || 'circle', 'w-4 h-4 ' + (typeColors[t.type] || 'text-gray-400'))}
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium">${t.parent}</p>
              <p class="text-gray-500 text-xs truncate">${t.item} &middot; ${timeAgo(t.date)}</p>
            </div>
            <span class="text-green-400 font-display font-bold flex-shrink-0">+${formatPrice(t.amount)}</span>
          </div>
          `;
        }).join('')}
      </div>

      <!-- Active Poll -->
      ${DATA.polls.filter(p => p.active).map(p => `
        <h2 class="font-display text-lg font-semibold mb-3 flex items-center gap-2">${icon('bar-chart-3', 'w-4 h-4 text-gold')} Active Poll</h2>
        <div class="bg-dark-card rounded-xl p-4 border border-dark-border mb-4">
          <p class="font-semibold mb-3">${p.question}</p>
          ${p.options.map(opt => {
            const total = Object.values(p.responses).reduce((a, b) => a + b, 0);
            const count = p.responses[opt] || 0;
            const pct = total ? Math.round((count / total) * 100) : 0;
            return `
              <div class="mb-2">
                <div class="flex justify-between text-sm mb-1">
                  <span>${opt}</span>
                  <span class="text-gray-400">${count} (${pct}%)</span>
                </div>
                <div class="h-2 bg-dark-surface rounded-full overflow-hidden">
                  <div class="h-full bg-gold rounded-full" style="width:${pct}%"></div>
                </div>
              </div>
            `;
          }).join('')}
          <p class="text-gray-500 text-xs mt-2">${p.ageGroup} &middot; ${Object.values(p.responses).reduce((a, b) => a + b, 0)} responses</p>
        </div>
      `).join('')}
    </div>

    <!-- FAB for quick actions -->
    <button onclick="openQuickActions()" class="fab w-14 h-14 bg-gold rounded-full flex items-center justify-center shadow-lg">
      ${icon('plus', 'w-7 h-7 text-dark')}
    </button>
  `;
}

// ─── Coach Players ───
function renderCoachPlayers() {
  const groups = [...new Set(DATA.children.map(c => c.ageGroup))].sort();
  if (!APP._playerGroup) APP._playerGroup = 'All';

  const filtered = APP._playerGroup === 'All' ? DATA.children : DATA.children.filter(c => c.ageGroup === APP._playerGroup);

  return `
    <div class="safe-top safe-bottom px-4">
      <div class="pt-4 mb-3 flex items-center justify-between">
        <div>
          <h1 class="font-display text-2xl font-bold">Players</h1>
          <p class="text-gray-400 text-sm">${DATA.children.length} registered</p>
        </div>
        <button onclick="showToast('Add player form would open here', 'info')" class="card-tap w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
          ${icon('user-plus', 'w-5 h-5 text-gold')}
        </button>
      </div>

      <div class="flex gap-2 overflow-x-auto pb-3 mb-3 -mx-4 px-4">
        ${['All', ...groups].map(g => `
          <button onclick="APP._playerGroup='${g}'; render()" class="pill px-4 py-2 rounded-full text-sm font-medium border ${APP._playerGroup === g ? 'active' : 'border-dark-border text-gray-400'}">${g}</button>
        `).join('')}
      </div>

      <div class="flex flex-col gap-2">
        ${filtered.map(c => {
          const achs = getChildAchievements(c.id);
          const parent = DATA.parents.find(p => p.children.includes(c.id));
          return `
            <div class="card-tap bg-dark-card rounded-xl p-4 border border-dark-border flex items-center gap-3" onclick="APP._playerId='${c.id}'; navigate('coach-player-detail')">
              <div class="w-12 h-12 rounded-full overflow-hidden bg-dark-surface border border-dark-border flex-shrink-0">
                ${c.photo ? `<img src="${c.photo}" alt="${c.name}" class="img-cover">` : `<div class="w-full h-full flex items-center justify-center text-gold font-display text-lg">${c.name[0]}</div>`}
              </div>
              <div class="flex-1 min-w-0">
                <h4 class="font-semibold">${c.name}</h4>
                <p class="text-gray-500 text-xs">${c.ageGroup} &middot; Parent: ${parent ? parent.name : 'N/A'}</p>
              </div>
              <div class="flex items-center gap-1">
                ${achs.length ? `<span class="text-xs text-gold">${achs.length}</span>${icon('trophy', 'w-4 h-4 text-gold')}` : ''}
                ${icon('chevron-right', 'w-4 h-4 text-gray-600')}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

// ─── Coach Player Detail ───
function renderCoachPlayerDetail() {
  const c = getChild(APP._playerId);
  if (!c) return '<p>Player not found</p>';
  const parent = DATA.parents.find(p => p.children.includes(c.id));
  const achievements = getChildAchievements(c.id);
  const comments = getChildComments(c.id);
  const videos = getChildVideos(c.id);
  const purchases = getChildPurchases(c.id);
  const age = new Date('2026-02-14').getFullYear() - new Date(c.dob).getFullYear();

  return `
    <div class="safe-top safe-bottom px-4">
      <button onclick="goBack()" class="mt-4 mb-4 text-gray-400 flex items-center gap-2 card-tap w-fit">${icon('arrow-left', 'w-5 h-5')} Back</button>

      <!-- Player Header -->
      <div class="bg-dark-card rounded-2xl p-5 border border-dark-border mb-4 text-center">
        <div class="w-20 h-20 rounded-full overflow-hidden bg-dark-surface border-2 border-gold/30 mx-auto mb-3">
          ${c.photo ? `<img src="${c.photo}" alt="${c.name}" class="img-cover">` : `<div class="w-full h-full flex items-center justify-center text-gold font-display text-3xl">${c.name[0]}</div>`}
        </div>
        <h1 class="font-display text-2xl font-bold">${c.name}</h1>
        <p class="text-gray-400 text-sm">${c.ageGroup} &middot; Age ${age} &middot; Parent: ${parent ? parent.name : 'N/A'}</p>

        <!-- Quick Actions -->
        <div class="flex justify-center gap-3 mt-4">
          <button onclick="openAddComment('${c.id}')" class="card-tap bg-dark-surface border border-dark-border rounded-xl px-4 py-2 text-sm flex items-center gap-2">
            ${icon('message-circle', 'w-4 h-4 text-gold')} Comment
          </button>
          <button onclick="openAwardBadge('${c.id}')" class="card-tap bg-dark-surface border border-dark-border rounded-xl px-4 py-2 text-sm flex items-center gap-2">
            ${icon('trophy', 'w-4 h-4 text-gold')} Badge
          </button>
          <button onclick="openUploadVideo('${c.id}')" class="card-tap bg-dark-surface border border-dark-border rounded-xl px-4 py-2 text-sm flex items-center gap-2">
            ${icon('video', 'w-4 h-4 text-gold')} Video
          </button>
        </div>
      </div>

      <!-- Achievements -->
      ${achievements.length ? `
      <h3 class="font-display text-lg font-semibold mb-2">${icon('trophy', 'w-4 h-4 text-gold inline -mt-0.5')} Achievements</h3>
      <div class="flex gap-3 overflow-x-auto pb-3 mb-4 -mx-4 px-4">
        ${achievements.map(a => `
          <div class="flex-shrink-0 bg-dark-card rounded-xl p-3 border border-gold/20 w-28 text-center">
            <div class="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-2">
              ${icon(a.icon, 'w-5 h-5 text-gold')}
            </div>
            <p class="text-xs font-medium">${a.name}</p>
            <p class="text-gray-500 text-[10px] mt-0.5">${formatDate(a.date)}</p>
          </div>
        `).join('')}
      </div>` : ''}

      <!-- Coach Comments -->
      <h3 class="font-display text-lg font-semibold mb-2">${icon('message-circle', 'w-4 h-4 text-gold inline -mt-0.5')} Comments</h3>
      <div class="flex flex-col gap-2 mb-4">
        ${comments.length ? comments.map(co => `
          <div class="bg-dark-card rounded-xl p-3 border border-dark-border">
            <p class="text-sm text-gray-300">"${co.text}"</p>
            <p class="text-gray-500 text-xs mt-2">${timeAgo(co.date)}</p>
          </div>
        `).join('') : '<p class="text-gray-500 text-sm">No comments yet</p>'}
      </div>

      <!-- Videos -->
      <h3 class="font-display text-lg font-semibold mb-2">${icon('play-circle', 'w-4 h-4 text-gold inline -mt-0.5')} Videos</h3>
      <div class="grid grid-cols-2 gap-2 mb-4">
        ${videos.slice(0, 4).map(v => `
          <div class="card-tap bg-dark-card rounded-xl overflow-hidden border border-dark-border">
            <div class="aspect-video bg-dark-surface relative">
              <img src="${v.thumbnail}" alt="${v.description}" class="img-cover absolute inset-0">
              <div class="absolute inset-0 flex items-center justify-center bg-black/20">
                ${icon('play', 'w-8 h-8 text-white/80')}
              </div>
            </div>
            <div class="p-2">
              <p class="text-xs text-gray-400 line-clamp-2">${v.description}</p>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Active Packages -->
      ${purchases.length ? `
      <h3 class="font-display text-lg font-semibold mb-2">${icon('package', 'w-4 h-4 text-gold inline -mt-0.5')} Active Packages</h3>
      ${purchases.map(p => {
        const prog = getPackageProgress(p.packageId, c.id);
        return `
          <div class="bg-dark-card rounded-xl p-3 border border-dark-border mb-2">
            <div class="flex items-center justify-between mb-2">
              <h4 class="font-semibold text-sm">${p.package.title}</h4>
              <span class="text-gold font-display font-bold text-sm">${prog.percent}%</span>
            </div>
            <div class="h-2 bg-dark-surface rounded-full overflow-hidden">
              <div class="progress-bar h-full bg-gold rounded-full" style="width:${prog.percent}%"></div>
            </div>
          </div>
        `;
      }).join('')}
      ` : ''}
    </div>
  `;
}

// ─── Coach Packages ───
function renderCoachPackages() {
  return `
    <div class="safe-top safe-bottom px-4">
      <div class="pt-4 mb-3 flex items-center justify-between">
        <div>
          <h1 class="font-display text-2xl font-bold">Packages</h1>
          <p class="text-gray-400 text-sm">${DATA.packages.length} training packages</p>
        </div>
        <button onclick="openCreatePackage()" class="card-tap bg-gold text-dark font-semibold px-4 py-2 rounded-xl text-sm flex items-center gap-2">
          ${icon('plus', 'w-4 h-4')} New
        </button>
      </div>
      <div class="flex flex-col gap-3">
        ${DATA.packages.map(p => {
          const sold = DATA.earnings.packageRevenue.find(r => r.name === p.title);
          return `
            <div class="card-tap bg-dark-card rounded-2xl overflow-hidden border border-dark-border">
              <div class="flex">
                <div class="w-24 h-24 flex-shrink-0 bg-dark-surface">
                  <img src="${p.cover}" alt="${p.title}" class="img-cover">
                </div>
                <div class="flex-1 p-3 flex flex-col justify-between">
                  <div>
                    <h3 class="font-display text-base font-bold leading-tight">${p.title}</h3>
                    <div class="flex gap-2 mt-1 text-xs text-gray-500">
                      <span>${p.category}</span>
                      <span>${p.difficulty}</span>
                      <span>${p.drillCount} drills</span>
                    </div>
                  </div>
                  <div class="flex items-center justify-between mt-1">
                    <span class="text-green-400 text-xs">${sold ? sold.sold + ' sold' : '0 sold'}</span>
                    <span class="font-display text-lg font-bold text-gold">${formatPrice(p.price)}</span>
                  </div>
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

// ─── Coach Sessions ───
function renderCoachSessions() {
  return `
    <div class="safe-top safe-bottom px-4">
      <div class="pt-4 mb-3 flex items-center justify-between">
        <div>
          <h1 class="font-display text-2xl font-bold">Sessions</h1>
          <p class="text-gray-400 text-sm">${DATA.sessions.length} upcoming</p>
        </div>
        <button onclick="openCreateSession()" class="card-tap bg-gold text-dark font-semibold px-4 py-2 rounded-xl text-sm flex items-center gap-2">
          ${icon('plus', 'w-4 h-4')} New
        </button>
      </div>
      <div class="flex flex-col gap-3">
        ${DATA.sessions.map(s => `
          <div class="card-tap bg-dark-card rounded-2xl p-4 border border-dark-border">
            <div class="flex items-start justify-between mb-2">
              <div>
                <h3 class="font-display text-lg font-bold">${s.title}</h3>
                <span class="text-xs px-2 py-0.5 rounded-full font-medium ${s.sessionType === '1-to-1' ? 'bg-gold/20 text-gold' : s.sessionType === '2-to-1' ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-500/20 text-purple-400'}">${s.sessionType === 'group' ? 'Group' : s.sessionType}</span>
              </div>
              <span class="text-gold font-display font-bold">${s.price === 0 ? 'Free' : formatPrice(s.price)}</span>
            </div>
            <div class="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-400 mb-3">
              <span class="flex items-center gap-1">${icon('calendar', 'w-3.5 h-3.5')} ${formatDate(s.date)}</span>
              <span class="flex items-center gap-1">${icon('clock', 'w-3.5 h-3.5')} ${s.time}</span>
              <span class="flex items-center gap-1">${icon('map-pin', 'w-3.5 h-3.5')} ${s.location}</span>
              <span class="flex items-center gap-1">${icon('users', 'w-3.5 h-3.5')} ${s.ageGroup}</span>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div class="h-2 w-20 bg-dark-surface rounded-full overflow-hidden">
                  <div class="h-full bg-gold rounded-full" style="width:${(s.booked/s.capacity)*100}%"></div>
                </div>
                <span class="text-xs text-gray-400">${s.booked}/${s.capacity}</span>
              </div>
              <button onclick="showToast('Edit session form would open', 'info')" class="card-tap text-gold text-sm font-medium flex items-center gap-1">
                ${icon('edit', 'w-3.5 h-3.5')} Edit
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// ─── Coach Shop Management ───
function renderCoachShop() {
  const categories = ['All', ...new Set(DATA.shop.map(m => m.category))];
  if (!APP._coachShopFilter) APP._coachShopFilter = 'All';
  const filtered = APP._coachShopFilter === 'All' ? DATA.shop : DATA.shop.filter(m => m.category === APP._coachShopFilter);
  const totalItems = DATA.shop.reduce((a, m) => a + m.sold, 0);
  const totalShopRev = DATA.earnings.shopRevenue;

  return `
    <div class="safe-top safe-bottom px-4">
      <button onclick="goBack()" class="mt-4 mb-4 text-gray-400 flex items-center gap-2 card-tap w-fit">${icon('arrow-left', 'w-5 h-5')} Back</button>

      <div class="flex items-center justify-between mb-4">
        <div>
          <h1 class="font-display text-2xl font-bold">Shop</h1>
          <p class="text-gray-400 text-sm">${DATA.shop.length} products &middot; ${totalItems} total sold</p>
        </div>
        <button onclick="showToast('Add product form would open here', 'info')" class="card-tap bg-gold text-dark font-semibold px-4 py-2 rounded-xl text-sm flex items-center gap-2">
          ${icon('plus', 'w-4 h-4')} Add Item
        </button>
      </div>

      <!-- Shop Stats -->
      <div class="grid grid-cols-3 gap-2 mb-4">
        <div class="stat-reveal bg-dark-card rounded-xl p-3 border border-dark-border text-center">
          <p class="font-display text-lg font-bold text-amber-400">${formatPrice(totalShopRev)}</p>
          <p class="text-gray-500 text-[10px]">Revenue</p>
        </div>
        <div class="stat-reveal bg-dark-card rounded-xl p-3 border border-dark-border text-center">
          <p class="font-display text-lg font-bold text-gold">${totalItems}</p>
          <p class="text-gray-500 text-[10px]">Items Sold</p>
        </div>
        <div class="stat-reveal bg-dark-card rounded-xl p-3 border border-dark-border text-center">
          <p class="font-display text-lg font-bold text-green-400">${DATA.shop.filter(m => m.stock > 0).length}</p>
          <p class="text-gray-500 text-[10px]">In Stock</p>
        </div>
      </div>

      <!-- Filter -->
      <div class="flex gap-2 overflow-x-auto pb-3 mb-3 -mx-4 px-4">
        ${categories.map(c => `
          <button onclick="APP._coachShopFilter='${c}'; render()" class="pill px-4 py-2 rounded-full text-sm font-medium border ${APP._coachShopFilter === c ? 'active' : 'border-dark-border text-gray-400'}">${c}</button>
        `).join('')}
      </div>

      <!-- Product List -->
      <div class="flex flex-col gap-2">
        ${filtered.map(m => `
          <div class="card-tap bg-dark-card rounded-xl p-4 border border-dark-border flex items-center gap-3">
            <div class="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
              ${icon(m.category === 'Apparel' ? 'shirt' : 'box', 'w-6 h-6 text-gold')}
            </div>
            <div class="flex-1 min-w-0">
              <h4 class="font-semibold text-sm truncate">${m.name}</h4>
              <div class="flex gap-3 text-xs mt-0.5">
                <span class="text-gray-500">${m.sold} sold</span>
                <span class="${m.stock < 10 ? 'text-amber-400' : 'text-gray-500'}">${m.stock} in stock</span>
              </div>
            </div>
            <div class="text-right flex-shrink-0">
              <p class="text-gold font-display font-bold">${formatPrice(m.price)}</p>
              <p class="text-green-400 text-xs font-medium">${formatPrice(m.price * m.sold)}</p>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Recent Orders -->
      <h3 class="font-display text-lg font-semibold mt-5 mb-3">Recent Orders</h3>
      <div class="flex flex-col gap-2">
        ${DATA.shopOrders.map(o => {
          const parent = getParent(o.parentId);
          return `
            <div class="bg-dark-card rounded-xl p-3 border border-dark-border flex items-center justify-between">
              <div>
                <p class="text-sm font-medium">${parent ? parent.name : 'Unknown'}</p>
                <p class="text-gray-500 text-xs">${o.items.length} item${o.items.length > 1 ? 's' : ''} &middot; ${timeAgo(o.date)}</p>
              </div>
              <div class="text-right">
                <p class="text-gold font-display font-bold">${formatPrice(o.total)}</p>
                <span class="text-[10px] px-2 py-0.5 rounded-full ${o.status === 'delivered' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'} font-medium">${o.status}</span>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

// ─── Coach More ───
function renderCoachMore() {
  return `
    <div class="safe-top safe-bottom px-4">
      <div class="pt-4 mb-6">
        <h1 class="font-display text-2xl font-bold">More</h1>
      </div>
      <div class="bg-dark-card rounded-2xl border border-dark-border overflow-hidden mb-4">
        ${[
          { icon: 'trending-up', label: 'Earnings & Revenue', action: "navigate('coach-earnings')" },
          { icon: 'shopping-bag', label: 'Shop & Merchandise', action: "navigate('coach-shop')" },
          { icon: 'bar-chart-3', label: 'Polls', action: "showToast('Polls management coming soon', 'info')" },
          { icon: 'bell', label: 'Notifications', action: "showToast('Coach notifications', 'info')" },
          { icon: 'settings', label: 'App Settings', action: "showToast('Settings panel', 'info')" },
          { icon: 'help-circle', label: 'Help & Support', action: "showToast('Support contact', 'info')" },
        ].map(item => `
          <button onclick="${item.action}" class="card-tap flex items-center gap-4 p-4 border-b border-dark-border last:border-0 w-full text-left">
            <div class="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
              ${icon(item.icon, 'w-5 h-5 text-gold')}
            </div>
            <span class="flex-1 font-medium">${item.label}</span>
            ${icon('chevron-right', 'w-5 h-5 text-gray-600')}
          </button>
        `).join('')}
      </div>
      <button onclick="APP.role=null; APP.history=[]; navigate('splash', {replace:true})" class="card-tap w-full bg-dark-surface border border-dark-border text-red-400 font-semibold py-3 rounded-xl text-sm">
        Sign Out
      </button>
    </div>
  `;
}

// ─── Coach Earnings ───
function renderCoachEarnings() {
  const e = DATA.earnings;
  const pkgTotal = e.packageRevenue.reduce((a, r) => a + r.revenue, 0);
  const typeIcons = { session: 'calendar', package: 'package', shop: 'shopping-bag' };
  const typeColors = { session: 'text-blue-400', package: 'text-purple-400', shop: 'text-amber-400' };

  return `
    <div class="safe-top safe-bottom px-4">
      <button onclick="goBack()" class="mt-4 mb-4 text-gray-400 flex items-center gap-2 card-tap w-fit">${icon('arrow-left', 'w-5 h-5')} Back</button>

      <h1 class="font-display text-2xl font-bold mb-4">Earnings</h1>

      <!-- Summary Cards -->
      <div class="grid grid-cols-2 gap-3 mb-4">
        <div class="stat-reveal bg-dark-card rounded-2xl p-4 border border-dark-border">
          <p class="text-gray-500 text-xs mb-1">Total Revenue</p>
          <p class="font-display text-3xl font-bold text-gold">${formatPrice(e.total)}</p>
        </div>
        <div class="stat-reveal bg-dark-card rounded-2xl p-4 border border-dark-border">
          <p class="text-gray-500 text-xs mb-1">This Month</p>
          <p class="font-display text-3xl font-bold text-green-400">${formatPrice(e.thisMonth)}</p>
        </div>
      </div>

      <!-- Revenue Breakdown -->
      <div class="grid grid-cols-3 gap-2 mb-5">
        <div class="stat-reveal bg-dark-card rounded-xl p-3 border border-dark-border text-center">
          ${icon('calendar', 'w-5 h-5 text-blue-400 mx-auto mb-1')}
          <p class="font-display text-lg font-bold text-blue-400">${formatPrice(e.sessionRevenue)}</p>
          <p class="text-gray-500 text-[10px]">Sessions</p>
        </div>
        <div class="stat-reveal bg-dark-card rounded-xl p-3 border border-dark-border text-center">
          ${icon('package', 'w-5 h-5 text-purple-400 mx-auto mb-1')}
          <p class="font-display text-lg font-bold text-purple-400">${formatPrice(pkgTotal)}</p>
          <p class="text-gray-500 text-[10px]">Packages</p>
        </div>
        <div class="stat-reveal bg-dark-card rounded-xl p-3 border border-dark-border text-center">
          ${icon('shopping-bag', 'w-5 h-5 text-amber-400 mx-auto mb-1')}
          <p class="font-display text-lg font-bold text-amber-400">${formatPrice(e.shopRevenue)}</p>
          <p class="text-gray-500 text-[10px]">Shop</p>
        </div>
      </div>

      <!-- Revenue by Package -->
      <h3 class="font-display text-lg font-semibold mb-3">Package Sales</h3>
      <div class="bg-dark-card rounded-2xl border border-dark-border p-4 mb-5">
        ${e.packageRevenue.map(r => {
          const pct = Math.round((r.revenue / pkgTotal) * 100);
          return `
            <div class="mb-3 last:mb-0">
              <div class="flex justify-between text-sm mb-1">
                <span class="font-medium">${r.name}</span>
                <span class="text-gray-400">${formatPrice(r.revenue)} (${r.sold} sold)</span>
              </div>
              <div class="h-2 bg-dark-surface rounded-full overflow-hidden">
                <div class="h-full bg-gold rounded-full" style="width:${pct}%"></div>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- Recent Transactions -->
      <h3 class="font-display text-lg font-semibold mb-3">Recent Transactions</h3>
      <div class="flex flex-col gap-2">
        ${e.recentTransactions.map(t => `
          <div class="bg-dark-card rounded-xl p-3 border border-dark-border flex items-center gap-3">
            <div class="w-8 h-8 rounded-full ${t.type === 'session' ? 'bg-blue-500/10' : t.type === 'shop' ? 'bg-amber-500/10' : 'bg-purple-500/10'} flex items-center justify-center flex-shrink-0">
              ${icon(typeIcons[t.type] || 'circle', `w-4 h-4 ${typeColors[t.type] || 'text-gray-400'}`)}
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium">${t.parent}</p>
              <p class="text-gray-500 text-xs truncate">${t.item}</p>
            </div>
            <div class="text-right flex-shrink-0">
              <p class="text-green-400 font-display font-bold">+${formatPrice(t.amount)}</p>
              <p class="text-gray-500 text-xs">${timeAgo(t.date)}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}


// ═══════════════════════════════════════
// MODALS (Quick Actions)
// ═══════════════════════════════════════

function openQuickActions() {
  openModal(`
    <div class="sheet-handle"></div>
    <div class="p-5 pb-8">
      <h3 class="font-display text-xl font-bold mb-4">Quick Actions</h3>
      <div class="grid grid-cols-2 gap-3">
        ${[
          { icon: 'video', label: 'Upload Video', action: 'closeModal(); openUploadVideo()' },
          { icon: 'message-circle', label: 'Add Comment', action: 'closeModal(); openAddComment()' },
          { icon: 'trophy', label: 'Award Badge', action: 'closeModal(); openAwardBadge()' },
          { icon: 'calendar-plus', label: 'New Session', action: 'closeModal(); openCreateSession()' },
          { icon: 'package-plus', label: 'New Package', action: 'closeModal(); openCreatePackage()' },
          { icon: 'bar-chart-3', label: 'New Poll', action: 'closeModal(); showToast("Poll creation coming soon", "info")' },
        ].map(a => `
          <button onclick="${a.action}" class="card-tap bg-dark-surface border border-dark-border rounded-xl p-4 flex flex-col items-center gap-2">
            <div class="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">${icon(a.icon, 'w-5 h-5 text-gold')}</div>
            <span class="text-sm font-medium">${a.label}</span>
          </button>
        `).join('')}
      </div>
    </div>
  `);
}

function openUploadVideo(playerId) {
  openModal(`
    <div class="sheet-handle"></div>
    <div class="p-5 pb-8">
      <h3 class="font-display text-xl font-bold mb-4">Upload Video</h3>
      <div class="flex flex-col gap-4">
        <!-- Video Selector -->
        <div class="border-2 border-dashed border-dark-border rounded-xl p-8 text-center card-tap" onclick="this.innerHTML='<div class=\\'text-gold font-semibold\\'>video_training_clip.mp4</div><div class=\\'text-gray-400 text-xs mt-1\\'>12.4 MB — Ready to upload</div>'">
          ${icon('upload', 'w-8 h-8 text-gray-500 mx-auto mb-2')}
          <p class="text-gray-400 text-sm">Tap to select video</p>
          <p class="text-gray-600 text-xs mt-1">Or record from camera</p>
        </div>

        <div>
          <label class="text-sm text-gray-400 mb-1 block">Description</label>
          <input type="text" placeholder="Short description of this video..." class="w-full bg-dark-surface border border-dark-border rounded-xl px-4 py-3 text-white focus:border-gold focus:outline-none transition-colors">
        </div>

        <div>
          <label class="text-sm text-gray-400 mb-1 block">Tag to</label>
          <select class="w-full bg-dark-surface border border-dark-border rounded-xl px-4 py-3 text-white focus:border-gold focus:outline-none">
            ${playerId ? `<option selected>${getChild(playerId).name}</option>` : '<option>Select player or group...</option>'}
            ${DATA.children.map(c => `<option value="${c.id}">${c.name} (${c.ageGroup})</option>`).join('')}
            <option value="u8">U8 Group</option>
            <option value="u9">U9 Group</option>
            <option value="u11">U11 Group</option>
            <option value="u12">U12 Group</option>
            <option value="all">Everyone</option>
          </select>
        </div>

        <button onclick="closeModal(); showToast('Video uploaded successfully!')" class="card-tap w-full bg-gold text-dark font-semibold py-4 rounded-xl text-lg">
          Publish Video
        </button>
      </div>
    </div>
  `);
}

function openAddComment(playerId) {
  openModal(`
    <div class="sheet-handle"></div>
    <div class="p-5 pb-8">
      <h3 class="font-display text-xl font-bold mb-4">Add Coach Comment</h3>
      <div class="flex flex-col gap-4">
        <div>
          <label class="text-sm text-gray-400 mb-1 block">Player</label>
          <select class="w-full bg-dark-surface border border-dark-border rounded-xl px-4 py-3 text-white focus:border-gold focus:outline-none">
            ${playerId ? `<option selected>${getChild(playerId).name}</option>` : '<option>Select player...</option>'}
            ${DATA.children.map(c => `<option value="${c.id}">${c.name} (${c.ageGroup})</option>`).join('')}
          </select>
        </div>
        <div>
          <label class="text-sm text-gray-400 mb-1 block">Comment</label>
          <textarea rows="3" placeholder="Great session today..." class="w-full bg-dark-surface border border-dark-border rounded-xl px-4 py-3 text-white focus:border-gold focus:outline-none resize-none"></textarea>
        </div>
        <button onclick="closeModal(); showToast('Comment added!')" class="card-tap w-full bg-gold text-dark font-semibold py-4 rounded-xl text-lg">
          Save Comment
        </button>
      </div>
    </div>
  `);
}

function openAwardBadge(playerId) {
  openModal(`
    <div class="sheet-handle"></div>
    <div class="p-5 pb-8">
      <h3 class="font-display text-xl font-bold mb-4">Award Achievement</h3>
      <div class="flex flex-col gap-4">
        <div>
          <label class="text-sm text-gray-400 mb-1 block">Player</label>
          <select class="w-full bg-dark-surface border border-dark-border rounded-xl px-4 py-3 text-white focus:border-gold focus:outline-none">
            ${playerId ? `<option selected>${getChild(playerId).name}</option>` : '<option>Select player...</option>'}
            ${DATA.children.map(c => `<option value="${c.id}">${c.name} (${c.ageGroup})</option>`).join('')}
          </select>
        </div>
        <div>
          <label class="text-sm text-gray-400 mb-2 block">Select Badge</label>
          <div class="grid grid-cols-2 gap-2">
            ${DATA.achievements.map(a => `
              <button onclick="this.parentElement.querySelectorAll('button').forEach(b=>b.classList.remove('border-gold','bg-gold/10')); this.classList.add('border-gold','bg-gold/10')" class="card-tap bg-dark-surface border border-dark-border rounded-xl p-3 flex items-center gap-2 text-left">
                <div class="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                  ${icon(a.icon, 'w-4 h-4 text-gold')}
                </div>
                <span class="text-xs font-medium">${a.name}</span>
              </button>
            `).join('')}
          </div>
        </div>
        <button onclick="closeModal(); showToast('Badge awarded! Parent has been notified.')" class="card-tap w-full bg-gold text-dark font-semibold py-4 rounded-xl text-lg">
          Award Badge
        </button>
      </div>
    </div>
  `);
}

function openCreateSession() {
  openModal(`
    <div class="sheet-handle"></div>
    <div class="p-5 pb-8">
      <h3 class="font-display text-xl font-bold mb-4">Create Session</h3>
      <div class="flex flex-col gap-3">
        <div>
          <label class="text-sm text-gray-400 mb-1 block">Session Title</label>
          <input type="text" placeholder="e.g. U9 Saturday Skills" class="w-full bg-dark-surface border border-dark-border rounded-xl px-4 py-3 text-white focus:border-gold focus:outline-none">
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="text-sm text-gray-400 mb-1 block">Date</label>
            <input type="date" class="w-full bg-dark-surface border border-dark-border rounded-xl px-4 py-3 text-white focus:border-gold focus:outline-none">
          </div>
          <div>
            <label class="text-sm text-gray-400 mb-1 block">Time</label>
            <input type="time" class="w-full bg-dark-surface border border-dark-border rounded-xl px-4 py-3 text-white focus:border-gold focus:outline-none">
          </div>
        </div>
        <div>
          <label class="text-sm text-gray-400 mb-1 block">Location</label>
          <input type="text" placeholder="Riverside 3G Pitch" class="w-full bg-dark-surface border border-dark-border rounded-xl px-4 py-3 text-white focus:border-gold focus:outline-none">
        </div>
        <div>
          <label class="text-sm text-gray-400 mb-1 block">Session Type</label>
          <div class="grid grid-cols-3 gap-2" id="sessionTypeSelector">
            <button type="button" onclick="document.querySelectorAll('#sessionTypeSelector button').forEach(b=>b.classList.remove('border-gold','text-gold'));this.classList.add('border-gold','text-gold');document.getElementById('sessionPrice').value='60';document.getElementById('sessionCapacity').value='1'" class="card-tap bg-dark-surface border border-dark-border rounded-xl py-3 text-sm font-medium text-center focus:outline-none">1-to-1<br><span class='text-gold text-xs'>\u00A360</span></button>
            <button type="button" onclick="document.querySelectorAll('#sessionTypeSelector button').forEach(b=>b.classList.remove('border-gold','text-gold'));this.classList.add('border-gold','text-gold');document.getElementById('sessionPrice').value='70';document.getElementById('sessionCapacity').value='2'" class="card-tap bg-dark-surface border border-dark-border rounded-xl py-3 text-sm font-medium text-center focus:outline-none">2-to-1<br><span class='text-gold text-xs'>\u00A370</span></button>
            <button type="button" onclick="document.querySelectorAll('#sessionTypeSelector button').forEach(b=>b.classList.remove('border-gold','text-gold'));this.classList.add('border-gold','text-gold');document.getElementById('sessionPrice').value='30';document.getElementById('sessionCapacity').value='16'" class="card-tap bg-dark-surface border border-gold text-gold rounded-xl py-3 text-sm font-medium text-center focus:outline-none">Group<br><span class='text-gold text-xs'>\u00A330pp</span></button>
          </div>
        </div>
        <div class="grid grid-cols-3 gap-3">
          <div>
            <label class="text-sm text-gray-400 mb-1 block">Age Group</label>
            <select class="w-full bg-dark-surface border border-dark-border rounded-xl px-3 py-3 text-white focus:border-gold focus:outline-none text-sm">
              <option>U8</option><option>U9</option><option>U10</option><option>U11</option><option>U12</option><option>All</option>
            </select>
          </div>
          <div>
            <label class="text-sm text-gray-400 mb-1 block">Capacity</label>
            <input id="sessionCapacity" type="number" value="16" class="w-full bg-dark-surface border border-dark-border rounded-xl px-3 py-3 text-white focus:border-gold focus:outline-none">
          </div>
          <div>
            <label class="text-sm text-gray-400 mb-1 block">Price (\u00A3)</label>
            <input id="sessionPrice" type="number" value="30" step="0.01" class="w-full bg-dark-surface border border-dark-border rounded-xl px-3 py-3 text-white focus:border-gold focus:outline-none">
          </div>
        </div>
        <div>
          <label class="text-sm text-gray-400 mb-1 block">Description</label>
          <textarea rows="2" placeholder="What will this session cover..." class="w-full bg-dark-surface border border-dark-border rounded-xl px-4 py-3 text-white focus:border-gold focus:outline-none resize-none"></textarea>
        </div>
        <button onclick="closeModal(); showToast('Session created! Parents will be notified.')" class="card-tap w-full bg-gold text-dark font-semibold py-4 rounded-xl text-lg">
          Create Session
        </button>
      </div>
    </div>
  `);
}

function openCreatePackage() {
  openModal(`
    <div class="sheet-handle"></div>
    <div class="p-5 pb-8 max-h-[80dvh] overflow-y-auto">
      <h3 class="font-display text-xl font-bold mb-4">Create Training Package</h3>
      <div class="flex flex-col gap-3">
        <div>
          <label class="text-sm text-gray-400 mb-1 block">Package Title</label>
          <input type="text" placeholder="e.g. Ball Mastery Basics" class="w-full bg-dark-surface border border-dark-border rounded-xl px-4 py-3 text-white focus:border-gold focus:outline-none">
        </div>
        <div>
          <label class="text-sm text-gray-400 mb-1 block">Description</label>
          <textarea rows="2" placeholder="What players will learn..." class="w-full bg-dark-surface border border-dark-border rounded-xl px-4 py-3 text-white focus:border-gold focus:outline-none resize-none"></textarea>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="text-sm text-gray-400 mb-1 block">Category</label>
            <select class="w-full bg-dark-surface border border-dark-border rounded-xl px-3 py-3 text-white focus:border-gold focus:outline-none text-sm">
              <option>Ball Mastery</option><option>Shooting</option><option>Fitness</option><option>Cone Work</option><option>First Touch</option><option>Defending</option><option>Passing</option>
            </select>
          </div>
          <div>
            <label class="text-sm text-gray-400 mb-1 block">Difficulty</label>
            <select class="w-full bg-dark-surface border border-dark-border rounded-xl px-3 py-3 text-white focus:border-gold focus:outline-none text-sm">
              <option>Beginner</option><option>Intermediate</option><option>Advanced</option><option>Academy</option>
            </select>
          </div>
        </div>
        <div class="grid grid-cols-3 gap-3">
          <div>
            <label class="text-sm text-gray-400 mb-1 block">Age Min</label>
            <input type="number" value="7" class="w-full bg-dark-surface border border-dark-border rounded-xl px-3 py-3 text-white focus:border-gold focus:outline-none">
          </div>
          <div>
            <label class="text-sm text-gray-400 mb-1 block">Age Max</label>
            <input type="number" value="9" class="w-full bg-dark-surface border border-dark-border rounded-xl px-3 py-3 text-white focus:border-gold focus:outline-none">
          </div>
          <div>
            <label class="text-sm text-gray-400 mb-1 block">Price</label>
            <input type="number" value="9.99" step="0.01" class="w-full bg-dark-surface border border-dark-border rounded-xl px-3 py-3 text-white focus:border-gold focus:outline-none">
          </div>
        </div>

        <!-- Cover Image -->
        <div>
          <label class="text-sm text-gray-400 mb-1 block">Cover Image</label>
          <div class="border-2 border-dashed border-dark-border rounded-xl p-4 text-center card-tap" onclick="this.innerHTML='<div class=\\'text-gold font-semibold text-sm\\'>cover_image.jpg selected</div>'">
            ${icon('image', 'w-6 h-6 text-gray-500 mx-auto mb-1')}
            <p class="text-gray-400 text-xs">Tap to upload cover</p>
          </div>
        </div>

        <!-- Drills Preview -->
        <div>
          <label class="text-sm text-gray-400 mb-2 block">Drills (add after creation)</label>
          <div class="bg-dark-surface border border-dark-border rounded-xl p-4 text-center">
            <p class="text-gray-500 text-sm">You'll add drills after creating the package</p>
            <p class="text-gray-600 text-xs mt-1">Each drill includes a video + instructions</p>
          </div>
        </div>

        <button onclick="closeModal(); showToast('Package created! Now add drills.')" class="card-tap w-full bg-gold text-dark font-semibold py-4 rounded-xl text-lg">
          Create Package
        </button>
      </div>
    </div>
  `);
}


// ═══════════════════════════════════════
// INIT
// ═══════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
  render();
});
