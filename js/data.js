// ─── Mock Data for Howe2Train Prototype ───

const DATA = {

  coach: {
    id: 'coach-1',
    name: 'Rene Howe',
    role: 'admin',
    photo: 'images/rene-endofseason-trophies.jpg',
    bio: 'Former professional footballer. Founder of Howe 2 Coach.',
  },

  parents: [
    { id: 'parent-1', name: 'Sarah Mitchell', email: 'sarah@email.com', children: ['child-1'] },
    { id: 'parent-2', name: 'James Carter', email: 'james@email.com', children: ['child-2', 'child-3'] },
    { id: 'parent-3', name: 'Laura Bennett', email: 'laura@email.com', children: ['child-4'] },
  ],

  children: [
    { id: 'child-1', parentId: 'parent-1', name: 'Leo Mitchell', dob: '2016-03-15', ageGroup: 'U9', photo: 'images/leo-rene-son-in-footbal-kit.jpg' },
    { id: 'child-2', parentId: 'parent-2', name: 'Ethan Carter', dob: '2014-07-22', ageGroup: 'U11', photo: null },
    { id: 'child-3', parentId: 'parent-2', name: 'Noah Carter', dob: '2017-01-10', ageGroup: 'U8', photo: null },
    { id: 'child-4', parentId: 'parent-3', name: 'Oscar Bennett', dob: '2013-11-05', ageGroup: 'U12', photo: null },
  ],

  videos: [
    { id: 'vid-1', url: 'images/keepieupies-session.jpg', thumbnail: 'images/keepieupies-session.jpg', description: 'Keepy-uppies technique session — great control today!', taggedPlayerId: 'child-1', taggedAgeGroup: null, taggedAll: false, date: '2026-02-12' },
    { id: 'vid-2', url: 'images/leo121training.jpg', thumbnail: 'images/leo121training.jpg', description: '1-on-1 cone work and rebounder drill', taggedPlayerId: 'child-1', taggedAgeGroup: null, taggedAll: false, date: '2026-02-10' },
    { id: 'vid-3', url: 'images/plyometrics-action-shot.jpg', thumbnail: 'images/plyometrics-action-shot.jpg', description: 'Plyometrics group session — agility ladder and hurdle drills', taggedPlayerId: null, taggedAgeGroup: 'U9', taggedAll: false, date: '2026-02-08' },
    { id: 'vid-4', url: 'images/plyometrics.jpg', thumbnail: 'images/plyometrics.jpg', description: 'Pre-season fitness — ring hops, ladders and mini hurdles', taggedPlayerId: null, taggedAgeGroup: null, taggedAll: true, date: '2026-02-05' },
  ],

  comments: [
    { id: 'com-1', childId: 'child-1', text: 'Great first touch today, keep working on your weaker foot this week.', date: '2026-02-12' },
    { id: 'com-2', childId: 'child-1', text: 'Excellent effort in the 1v1 drills. Your close control is really improving.', date: '2026-02-08' },
    { id: 'com-3', childId: 'child-2', text: 'Strong passing session. Try to use the inside of your foot more consistently.', date: '2026-02-11' },
    { id: 'com-4', childId: 'child-4', text: 'Good defensive positioning. Work on your recovery runs this week.', date: '2026-02-09' },
  ],

  achievements: [
    { id: 'ach-1', name: 'Player of the Week', icon: 'trophy', description: 'Outstanding performance in training' },
    { id: 'ach-2', name: '100 Touches Challenge', icon: 'target', description: 'Completed 100 touches without losing control' },
    { id: 'ach-3', name: 'First Hat-trick', icon: 'zap', description: 'Scored three goals in a single session' },
    { id: 'ach-4', name: 'Speed Demon', icon: 'timer', description: 'Fastest sprint time in the age group' },
    { id: 'ach-5', name: 'Team Player', icon: 'users', description: 'Best team spirit and encouragement' },
    { id: 'ach-6', name: 'Iron Defence', icon: 'shield', description: 'Outstanding defensive performance' },
  ],

  awardedAchievements: [
    { id: 'aa-1', achievementId: 'ach-1', childId: 'child-1', date: '2026-02-10', note: 'Brilliant session — best player on the pitch' },
    { id: 'aa-2', achievementId: 'ach-2', childId: 'child-1', date: '2026-01-28', note: null },
    { id: 'aa-3', achievementId: 'ach-5', childId: 'child-2', date: '2026-02-06', note: 'Always encouraging the younger players' },
    { id: 'aa-4', achievementId: 'ach-3', childId: 'child-4', date: '2026-02-01', note: null },
  ],

  sessions: [
    { id: 'ses-1', title: 'U9 Saturday Skills', date: '2026-02-21', time: '09:00', location: 'Riverside 3G Pitch', ageGroup: 'U9', sessionType: 'group', capacity: 16, booked: 11, price: 30, description: 'Ball mastery, close control and small-sided games.' },
    { id: 'ses-2', title: 'U11 Passing & Movement', date: '2026-02-22', time: '10:00', location: 'Riverside 3G Pitch', ageGroup: 'U11', sessionType: 'group', capacity: 16, booked: 14, price: 30, description: 'Developing quick passing combinations and off-the-ball movement.' },
    { id: 'ses-3', title: 'U12 Shooting Masterclass', date: '2026-02-22', time: '14:00', location: 'Greens Playing Fields', ageGroup: 'U12', sessionType: 'group', capacity: 12, booked: 8, price: 30, description: 'Finishing from all angles — technique, placement and power.' },
    { id: 'ses-4', title: 'U9 Fitness & Agility', date: '2026-02-28', time: '09:00', location: 'Riverside 3G Pitch', ageGroup: 'U9', sessionType: 'group', capacity: 20, booked: 6, price: 30, description: 'Plyometrics, ladders, hurdles and fun fitness challenges.' },
    { id: 'ses-5', title: 'Half-Term Camp Day 1', date: '2026-03-02', time: '09:30', location: 'Riverside 3G Pitch', ageGroup: 'All', sessionType: 'group', capacity: 30, booked: 22, price: 30, description: 'Full day camp — skills, games, tournaments and prizes. Bring lunch and water.' },
    { id: 'ses-6', title: 'U8 First Kicks', date: '2026-02-23', time: '09:00', location: 'Riverside 3G Pitch', ageGroup: 'U8', sessionType: 'group', capacity: 12, booked: 12, price: 30, description: 'Fun introductory session for our youngest players.' },
    { id: 'ses-7', title: '1-to-1: Technical Development', date: '2026-02-25', time: '16:00', location: 'Riverside 3G Pitch', ageGroup: 'All', sessionType: '1-to-1', capacity: 1, booked: 1, price: 60, description: 'Personalised session focused on individual technical development. Tailored to your child\'s needs.' },
    { id: 'ses-8', title: '2-to-1: Passing & Combination Play', date: '2026-02-26', time: '17:00', location: 'Riverside 3G Pitch', ageGroup: 'All', sessionType: '2-to-1', capacity: 2, booked: 1, price: 70, description: 'Intensive small-group session for two players working on passing combinations and link-up play.' },
  ],

  bookings: [
    { id: 'bk-1', sessionId: 'ses-1', childId: 'child-1', status: 'confirmed', date: '2026-02-13' },
    { id: 'bk-2', sessionId: 'ses-4', childId: 'child-1', status: 'confirmed', date: '2026-02-13' },
  ],

  packages: [
    {
      id: 'pkg-1', title: 'Ball Mastery Basics', description: 'Master the fundamentals of ball control with 8 progressive drills designed for younger players. Build confidence on the ball with fun, structured exercises.',
      category: 'Ball Mastery', ageMin: 7, ageMax: 9, difficulty: 'Beginner', price: 9.99,
      cover: 'images/keepieupies-session.jpg', active: true, drillCount: 8,
      drills: [
        { id: 'd-1', title: 'Sole Rolls', instructions: 'Place your foot on top of the ball and roll it side to side. 30 seconds each foot. Focus on keeping the ball close.', order: 1 },
        { id: 'd-2', title: 'Toe Taps', instructions: 'Alternate tapping the top of the ball with each foot. Start slow, build speed. 3 sets of 30 seconds.', order: 2 },
        { id: 'd-3', title: 'Inside-Outside Touch', instructions: 'Push the ball with the inside of your foot, then the outside. Zig-zag forward for 10 metres. Repeat 5 times.', order: 3 },
        { id: 'd-4', title: 'Pull-Back Turn', instructions: 'Roll the ball back with your sole, then push forward with the inside of the same foot. 10 reps each side.', order: 4 },
        { id: 'd-5', title: 'Figure of 8', instructions: 'Dribble the ball in a figure-of-8 around two cones 2m apart. Use both feet. 5 full patterns.', order: 5 },
        { id: 'd-6', title: 'Keepy-Uppies Challenge', instructions: 'How many touches can you get without the ball hitting the ground? Record your best of 5 attempts.', order: 6 },
        { id: 'd-7', title: 'Dribble & Stop', instructions: 'Dribble at speed for 5m, stop the ball dead with your sole. Repeat 10 times. Quick feet, clean stops.', order: 7 },
        { id: 'd-8', title: 'Ball Mastery Circuit', instructions: 'Combine all previous drills into a circuit. 1 minute per drill, 15 seconds rest between. Complete 2 rounds.', order: 8 },
      ]
    },
    {
      id: 'pkg-2', title: 'Power Shooting', description: 'Develop devastating shooting technique with 12 drills covering placement, power, volleys and finishing under pressure.',
      category: 'Shooting', ageMin: 12, ageMax: 14, difficulty: 'Intermediate', price: 14.99,
      cover: 'images/leo121training.jpg', active: true, drillCount: 12,
      drills: [
        { id: 'd-9', title: 'Standing Foot Placement', instructions: 'Practice hitting a target from 12 yards. Focus on planting your standing foot next to the ball. 20 shots.', order: 1 },
        { id: 'd-10', title: 'Laces Drive', instructions: 'Strike through the centre of the ball with your laces. Aim for power. Hit from 18 yards — 15 shots each foot.', order: 2 },
        { id: 'd-11', title: 'Side-Foot Finish', instructions: 'Accuracy over power. Hit corners from inside the box. 10 left, 10 right.', order: 3 },
        { id: 'd-12', title: 'One-Touch Finish', instructions: 'Have someone pass to you — shoot first time. 20 reps. Quick feet, clean contact.', order: 4 },
      ]
    },
    {
      id: 'pkg-3', title: 'Academy Prep Fitness', description: 'A 20-session fitness programme designed to get players academy-ready. Covers speed, agility, endurance and strength foundations.',
      category: 'Fitness', ageMin: 14, ageMax: 16, difficulty: 'Advanced', price: 24.99,
      cover: 'images/plyometrics.jpg', active: true, drillCount: 20,
      drills: [
        { id: 'd-13', title: 'Warm-Up Routine', instructions: 'Dynamic stretching sequence: high knees, butt kicks, lateral shuffles, arm circles. 5 minutes.', order: 1 },
        { id: 'd-14', title: '20m Sprint Intervals', instructions: '10 x 20m sprints. Walk back recovery. Time each sprint — aim for consistency.', order: 2 },
        { id: 'd-15', title: 'Ladder Drills', instructions: 'Agility ladder: 2 feet in each square, lateral shuffle, icky shuffle. 3 sets of each.', order: 3 },
      ]
    },
    {
      id: 'pkg-4', title: 'Cone Work: Close Control', description: 'Sharpen your dribbling through 10 cone-based drills that develop tight control, quick feet and the ability to beat defenders.',
      category: 'Cone Work', ageMin: 9, ageMax: 11, difficulty: 'Beginner', price: 11.99,
      cover: 'images/leo121training.jpg', active: true, drillCount: 10,
      drills: [
        { id: 'd-16', title: 'Slalom Dribble', instructions: 'Set 6 cones in a line, 1m apart. Dribble through using inside/outside of both feet. 10 runs.', order: 1 },
        { id: 'd-17', title: 'Tight Turn Square', instructions: '4 cones in a 2m square. Dribble to each cone, perform a different turn at each. 5 rounds.', order: 2 },
      ]
    },
    {
      id: 'pkg-5', title: 'First Touch Masterclass', description: 'Transform your first touch with 8 drills covering cushion control, directional touches, aerial control and receiving under pressure.',
      category: 'First Touch', ageMin: 10, ageMax: 13, difficulty: 'Intermediate', price: 12.99,
      cover: 'images/plyometrics-action-shot.jpg', active: true, drillCount: 8,
      drills: [
        { id: 'd-18', title: 'Wall Pass & Control', instructions: 'Pass against a wall, control the return with one touch. Alternate feet. 50 reps.', order: 1 },
        { id: 'd-19', title: 'Cushion Control', instructions: 'Throw the ball up, cushion it dead with your thigh, then foot. 20 reps each side.', order: 2 },
      ]
    },
    {
      id: 'pkg-6', title: 'Defending Fundamentals', description: 'Learn how to defend properly — body shape, jockeying, tackling technique and 1v1 defending.',
      category: 'Defending', ageMin: 10, ageMax: 14, difficulty: 'Intermediate', price: 12.99,
      cover: 'images/plyometrics.jpg', active: true, drillCount: 8,
      drills: [
        { id: 'd-20', title: 'Body Shape Drill', instructions: 'Practice getting side-on to the attacker. Partner dribbles at you slowly — hold your shape. 10 reps.', order: 1 },
      ]
    },
  ],

  purchases: [
    { id: 'pur-1', packageId: 'pkg-1', childId: 'child-1', parentId: 'parent-1', date: '2026-01-20', status: 'completed' },
    { id: 'pur-2', packageId: 'pkg-4', childId: 'child-2', parentId: 'parent-2', date: '2026-02-01', status: 'completed' },
  ],

  drillProgress: [
    { drillId: 'd-1', childId: 'child-1', completed: true, date: '2026-01-22' },
    { drillId: 'd-2', childId: 'child-1', completed: true, date: '2026-01-25' },
    { drillId: 'd-3', childId: 'child-1', completed: true, date: '2026-01-28' },
    { drillId: 'd-4', childId: 'child-1', completed: true, date: '2026-02-01' },
    { drillId: 'd-5', childId: 'child-1', completed: false, date: null },
    { drillId: 'd-16', childId: 'child-2', completed: true, date: '2026-02-03' },
    { drillId: 'd-17', childId: 'child-2', completed: false, date: null },
  ],

  notifications: [
    { id: 'n-1', type: 'video', title: 'New Training Video', message: 'Rene posted a new video for Leo — Keepy-uppies technique session', date: '2026-02-12', read: false },
    { id: 'n-2', type: 'achievement', title: 'Achievement Unlocked!', message: 'Leo earned Player of the Week — Brilliant session!', date: '2026-02-10', read: false },
    { id: 'n-3', type: 'comment', title: 'Coach Comment', message: 'Rene left a note: "Great first touch today, keep working on your weaker foot this week."', date: '2026-02-12', read: true },
    { id: 'n-4', type: 'session', title: 'New Session Available', message: 'U9 Saturday Skills — 21 Feb, 09:00 at Riverside 3G Pitch. 5 spots left!', date: '2026-02-11', read: true },
    { id: 'n-5', type: 'session', title: 'Session Booked', message: 'You\'re confirmed for U9 Fitness & Agility on 28 Feb.', date: '2026-02-13', read: true },
    { id: 'n-6', type: 'package', title: 'Package Progress', message: 'Leo completed Drill 4 of Ball Mastery Basics — 50% complete!', date: '2026-02-01', read: true },
  ],

  polls: [
    { id: 'poll-1', question: 'Would a Saturday 9am session work for the U9s this week?', options: ['Yes', 'No', 'Maybe'], ageGroup: 'U9', active: true, responses: { 'Yes': 8, 'No': 2, 'Maybe': 3 } },
    { id: 'poll-2', question: 'Interest in a half-term 3-day camp?', options: ['Definitely', 'Maybe', 'Not this time'], ageGroup: 'All', active: false, responses: { 'Definitely': 14, 'Maybe': 9, 'Not this time': 4 } },
  ],

  earnings: {
    total: 18745.00,
    thisMonth: 3280.00,
    sessionRevenue: 12460.00,
    packageRevenue: [
      { name: 'Ball Mastery Basics', sold: 34, revenue: 339.66 },
      { name: 'Power Shooting', sold: 22, revenue: 329.78 },
      { name: 'Academy Prep Fitness', sold: 18, revenue: 449.82 },
      { name: 'Cone Work: Close Control', sold: 28, revenue: 335.72 },
      { name: 'First Touch Masterclass', sold: 25, revenue: 324.75 },
      { name: 'Defending Fundamentals', sold: 15, revenue: 194.85 },
    ],
    shopRevenue: 2846.50,
    recentTransactions: [
      { parent: 'Sarah Mitchell', item: 'U9 Saturday Skills (group session)', amount: 30.00, date: '2026-02-13', type: 'session' },
      { parent: 'James Carter', item: 'Power Shooting (package)', amount: 14.99, date: '2026-02-12', type: 'package' },
      { parent: 'Laura Bennett', item: 'Howe2Train Hoodie — Youth L', amount: 34.99, date: '2026-02-12', type: 'shop' },
      { parent: 'Mark Thompson', item: 'U12 Shooting Masterclass (group session)', amount: 30.00, date: '2026-02-11', type: 'session' },
      { parent: 'Emma Wilson', item: 'Half-Term Camp Day 1 (group session)', amount: 30.00, date: '2026-02-11', type: 'session' },
      { parent: 'David Brown', item: 'Cone Work: Close Control (package)', amount: 11.99, date: '2026-02-10', type: 'package' },
      { parent: 'Sarah Mitchell', item: 'Howe2Train Snapback Cap', amount: 18.99, date: '2026-02-10', type: 'shop' },
      { parent: 'James Carter', item: 'U11 Passing & Movement (group session)', amount: 30.00, date: '2026-02-09', type: 'session' },
      { parent: 'Laura Bennett', item: '1-to-1: Technical Development', amount: 60.00, date: '2026-02-08', type: 'session' },
      { parent: 'Mark Thompson', item: 'Training Football — Size 4', amount: 22.99, date: '2026-02-07', type: 'shop' },
    ]
  },

  shop: [
    { id: 'merch-1', name: 'Howe2Train Snapback Cap', category: 'Apparel', price: 18.99, description: 'Premium black snapback with embroidered gold Howe II Train shield logo. One size fits all.', sizes: null, stock: 24, sold: 47 },
    { id: 'merch-2', name: 'Howe2Train Hoodie', category: 'Apparel', price: 34.99, description: 'Heavyweight black hoodie with gold shield logo on the chest. Brushed fleece interior. Perfect for training days and warmups.', sizes: ['Youth S', 'Youth M', 'Youth L', 'Adult S', 'Adult M', 'Adult L', 'Adult XL'], stock: 18, sold: 63 },
    { id: 'merch-3', name: 'Howe2Train Training T-Shirt', category: 'Apparel', price: 19.99, description: 'Lightweight moisture-wicking performance tee in black with gold logo. Ideal for sessions.', sizes: ['Youth S', 'Youth M', 'Youth L', 'Adult S', 'Adult M', 'Adult L'], stock: 32, sold: 85 },
    { id: 'merch-4', name: 'Howe2Train Beanie', category: 'Apparel', price: 14.99, description: 'Black knitted beanie with embroidered gold logo. Keep warm on the sidelines.', sizes: null, stock: 30, sold: 38 },
    { id: 'merch-5', name: 'Training Football — Size 4', category: 'Equipment', price: 22.99, description: 'Match-quality football, size 4. Black and gold colourway with Howe2Train branding. Suitable for U7–U12.', sizes: null, stock: 15, sold: 52 },
    { id: 'merch-6', name: 'Training Football — Size 5', category: 'Equipment', price: 24.99, description: 'Match-quality football, size 5. Black and gold colourway with Howe2Train branding. Suitable for U13+.', sizes: null, stock: 12, sold: 34 },
    { id: 'merch-7', name: 'Marker Cone Set (20 pack)', category: 'Equipment', price: 12.99, description: 'Set of 20 high-visibility marker cones in neon yellow. Essential for home drills and training package exercises.', sizes: null, stock: 40, sold: 71 },
    { id: 'merch-8', name: 'Speed Agility Ladder', category: 'Equipment', price: 16.99, description: '4-metre speed ladder with adjustable rungs. Perfect for fitness and agility drills from the training packages.', sizes: null, stock: 22, sold: 44 },
    { id: 'merch-9', name: 'Rebounder Wall (60cm x 60cm)', category: 'Equipment', price: 49.99, description: 'Portable rebound wall for passing and first-touch practice at home. Adjustable angle. Foldable for storage.', sizes: null, stock: 8, sold: 29 },
    { id: 'merch-10', name: 'Mini Hurdle Set (6 pack)', category: 'Equipment', price: 19.99, description: 'Set of 6 mini training hurdles (15cm height). Ideal for plyometrics and agility drills.', sizes: null, stock: 18, sold: 36 },
    { id: 'merch-11', name: 'Ball Pump with Needle', category: 'Equipment', price: 6.99, description: 'Dual-action ball pump with spare needle. Never turn up to training with a flat ball again.', sizes: null, stock: 50, sold: 92 },
    { id: 'merch-12', name: 'Howe2Train Drawstring Bag', category: 'Apparel', price: 12.99, description: 'Lightweight black drawstring bag with gold logo. Ideal for carrying kit to and from sessions.', sizes: null, stock: 25, sold: 55 },
    { id: 'merch-13', name: 'Howe2Train Water Bottle (750ml)', category: 'Equipment', price: 9.99, description: 'BPA-free black sports bottle with gold Howe2Train branding. Squeeze cap for easy hydration.', sizes: null, stock: 35, sold: 68 },
    { id: 'merch-14', name: 'Shin Pad Set — Youth', category: 'Equipment', price: 8.99, description: 'Lightweight slip-in shin pads for youth players. Available in S/M/L.', sizes: ['Youth S', 'Youth M', 'Youth L'], stock: 20, sold: 41 },
  ],

  shopOrders: [
    { id: 'ord-1', parentId: 'parent-1', items: [{ merchId: 'merch-1', qty: 1, size: null }], total: 18.99, date: '2026-02-10', status: 'delivered' },
    { id: 'ord-2', parentId: 'parent-3', items: [{ merchId: 'merch-2', qty: 1, size: 'Youth L' }], total: 34.99, date: '2026-02-12', status: 'shipped' },
    { id: 'ord-3', parentId: 'parent-2', items: [{ merchId: 'merch-5', qty: 1, size: null }, { merchId: 'merch-7', qty: 2, size: null }], total: 48.97, date: '2026-02-07', status: 'delivered' },
  ]
};

// Helper functions
function getChild(id) { return DATA.children.find(c => c.id === id); }
function getParent(id) { return DATA.parents.find(p => p.id === id); }
function getAchievement(id) { return DATA.achievements.find(a => a.id === id); }
function getPackage(id) { return DATA.packages.find(p => p.id === id); }
function getSession(id) { return DATA.sessions.find(s => s.id === id); }
function getMerch(id) { return DATA.shop.find(m => m.id === id); }
function getChildVideos(childId) { return DATA.videos.filter(v => v.taggedPlayerId === childId || v.taggedAll); }
function getChildComments(childId) { return DATA.comments.filter(c => c.childId === childId); }
function getChildAchievements(childId) {
  return DATA.awardedAchievements.filter(a => a.childId === childId).map(aa => ({
    ...aa, ...getAchievement(aa.achievementId)
  }));
}
function getChildBookings(childId) {
  return DATA.bookings.filter(b => b.childId === childId).map(b => ({
    ...b, session: getSession(b.sessionId)
  }));
}
function getChildPurchases(childId) {
  return DATA.purchases.filter(p => p.childId === childId).map(p => ({
    ...p, package: getPackage(p.packageId)
  }));
}
function getPackageProgress(packageId, childId) {
  const pkg = getPackage(packageId);
  if (!pkg) return { completed: 0, total: 0, percent: 0 };
  const drillIds = pkg.drills.map(d => d.id);
  const completed = DATA.drillProgress.filter(dp => drillIds.includes(dp.drillId) && dp.childId === childId && dp.completed).length;
  return { completed, total: pkg.drills.length, percent: Math.round((completed / pkg.drills.length) * 100) };
}
function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}
function formatPrice(price) {
  return '\u00A3' + price.toFixed(2);
}
function timeAgo(dateStr) {
  const now = new Date('2026-02-14');
  const d = new Date(dateStr);
  const diff = Math.floor((now - d) / 86400000);
  if (diff === 0) return 'Today';
  if (diff === 1) return 'Yesterday';
  if (diff < 7) return diff + ' days ago';
  return formatDate(dateStr);
}
