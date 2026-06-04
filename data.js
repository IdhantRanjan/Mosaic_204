// Neuqua Valley Clubs and Activities Data
const clubsData = [
  // --- COMMUNITIES ---
  { "name": "Abraham Lincoln Book Club", "category": "Communities", "tags": ["Reading","History","Discussion"], "description": "Discuss Abraham Lincoln and related literature.", "meeting": "TBD", "leaders": ["Sarah Chen", "Marcus Johnson"], "emails": ["sarah.chen@student.ipsd.org", "marcus.johnson@student.ipsd.org"] },
  { "name": "American Sign Language Club", "category": "Communities", "tags": ["Language","Culture","Accessibility"], "description": "Learn and practice ASL.", "meeting": "TBD", "leaders": ["Student Lead #1"] },
  { "name": "Animal Science Club", "category": "Communities", "tags": ["Animals","Science","Biology","STEM","Careers"], "description": "Explore careers and topics in animal science.", "meeting": "TBD", "leaders": ["Student Lead #1"] },
  { "name": "Anime Club", "category": "Communities", "tags": ["Arts","Pop Culture","Social"], "description": "Watch and discuss anime.", "meeting": "Thursdays, Room C123", "leaders": ["Alex Kim", "Emma Rodriguez"], "emails": ["alex.kim@student.ipsd.org", "emma.rodriguez@student.ipsd.org"] },
  { "name": "Art Club", "category": "Communities", "tags": ["Arts","Creativity"], "description": "Collaborate on art projects.", "meeting": "Wednesdays, Room B210", "leaders": ["Maya Patel", "David Liu"], "emails": ["maya.patel@student.ipsd.org", "david.liu@student.ipsd.org"] },
  { "name": "Asian Student Alliance", "category": "Communities", "tags": ["Culture","Community","Leadership"], "description": "Celebrate Asian heritage.", "meeting": "TBD", "leaders": ["Student Lead #1"] },
  { "name": "Aspiring Medical Professionals Club (AMP)", "category": "Communities", "tags": ["STEM","Medicine","Careers"], "description": "For students interested in medical fields.", "meeting": "TBD", "leaders": ["Student Lead #1"] },
  { "name": "Astronomy Club", "category": "Communities", "tags": ["Science","Space","STEM","Nature"], "description": "Learn astronomy and stargaze.", "meeting": "Fridays, Planetarium", "leaders": ["Student Lead #1"] },
  { "name": "Athletic Training Club", "category": "Communities", "tags": ["Sports","Wellness","Health","STEM","Careers"], "description": "Explore sports medicine.", "meeting": "TBD", "leaders": ["Student Lead #1"] },
  { "name": "Best Buddies", "category": "Communities", "tags": ["Service","Inclusion","Friendship"], "description": "Build friendships with peers with IDD.", "meeting": "TBD", "leaders": ["Student Lead #1"] },
  { "name": "Black Student Alliance (BSA)", "category": "Communities", "tags": ["Culture","Leadership"], "description": "Promote unity and leadership.", "meeting": "TBD", "leaders": ["Student Lead #1"] },
  { "name": "Cancer Kids First", "category": "Communities", "tags": ["Service","Health"], "description": "Support children fighting cancer.", "meeting": "TBD", "leaders": ["Student Lead #1"] },
  { "name": "Civics & Debate Club", "category": "Communities", "tags": ["Debate","Politics","Public Speaking","Civics"], "description": "Discuss civics and practice debate.", "meeting": "TBD", "leaders": ["Student Lead #1"] },
  { "name": "Cooking Club", "category": "Communities", "tags": ["Food","Culture","Creativity"], "description": "Learn cooking skills.", "meeting": "TBD", "leaders": ["Student Lead #1"] },
  { "name": "DND Club", "category": "Communities", "tags": ["Games","Creativity","Social","Strategy"], "description": "Play Dungeons and Dragons.", "meeting": "Fridays after school", "leaders": ["Student Lead #1"] },
  { "name": "Drama Club", "category": "Communities", "tags": ["Theatre","Arts","Creativity"], "description": "Perform and produce plays.", "meeting": "TBD", "leaders": ["Student Lead #1"] },
  { "name": "The Echo (Newspaper)", "category": "Communities", "tags": ["Journalism","Writing","Media","Creativity"], "description": "Write and publish school news.", "meeting": "TBD", "leaders": ["Student Lead #1"] },
  { "name": "Environmental Club (NVeco)", "category": "Communities", "tags": ["Environment","Sustainability","Service"], "description": "Promote eco-friendly projects.", "meeting": "TBD", "leaders": ["Student Lead #1"] },
  { "name": "Fashion Club", "category": "Communities", "tags": ["Fashion","Design","Creativity"], "description": "Discuss fashion trends and projects.", "meeting": "TBD", "leaders": ["Student Lead #1"] },
  { "name": "Future Educators Association (FEA/EdRising)", "category": "Communities", "tags": ["Careers","Education","Leadership"], "description": "Prepare for teaching careers.", "meeting": "TBD", "leaders": ["Student Lead #1"] },
  { "name": "Finance Club", "category": "Communities", "tags": ["Finance","Economics","Business"], "description": "Learn personal finance and investing.", "meeting": "TBD", "leaders": ["Student Lead #1"] },
  { "name": "Fit Club", "category": "Communities", "tags": ["Fitness","Wellness"], "description": "Promote student fitness.", "meeting": "TBD", "leaders": ["Student Lead #1"] },
  { "name": "French Club", "category": "Communities", "tags": ["Language","Culture"], "description": "Celebrate French language and culture.", "meeting": "TBD", "leaders": ["Student Lead #1"] },
  { "name": "Gender & Sexuality Alliance", "category": "Communities", "tags": ["Inclusion","Advocacy"], "description": "Celebrate LGBTQ+ students.", "meeting": "TBD", "leaders": ["Student Lead #1"] },
  { "name": "German Club", "category": "Communities", "tags": ["Language","Culture"], "description": "Celebrate German culture.", "meeting": "TBD", "leaders": ["Student Lead #1"] },
  { "name": "Girls in STEM", "category": "Communities", "tags": ["STEM","Inclusion"], "description": "Encourage girls in STEM fields.", "meeting": "TBD", "leaders": ["Student Lead #1"] },
  { "name": "Girls Who Code", "category": "Communities", "tags": ["STEM","Coding","Inclusion"], "description": "Learn computer science with peers.", "meeting": "TBD", "leaders": ["Student Lead #1"] },
  { "name": "Gold Rush", "category": "Communities", "tags": ["School Spirit","Community"], "description": "Promote spirit at games and events.", "meeting": "TBD", "leaders": ["Student Lead #1"] },
  { "name": "Hindu YUVA", "category": "Communities", "tags": ["Culture","Leadership"], "description": "Celebrate Hindu heritage.", "meeting": "TBD", "leaders": ["Student Lead #1"] },
  { "name": "Indian Student Alliance", "category": "Communities", "tags": ["Culture","Community"], "description": "Celebrate Indian culture.", "meeting": "TBD", "leaders": ["Student Lead #1"] },
  { "name": "Inkflow", "category": "Communities", "tags": ["Creativity","Organization"], "description": "Bullet journaling community.", "meeting": "TBD", "leaders": ["Student Lead #1"] },
  { "name": "Interact", "category": "Communities", "tags": ["Service","Leadership"], "description": "Community service club.", "meeting": "TBD", "leaders": ["Student Lead #1"] },
  { "name": "Interactive Gaming Club", "category": "Communities", "tags": ["Games","Technology","Social","Coding","STEM"], "description": "Play and design games.", "meeting": "TBD", "leaders": ["Student Lead #1"] },
  { "name": "Intramurals", "category": "Communities", "tags": ["Sports","Recreation","Fitness","Team"], "description": "Participate in recreational sports.", "meeting": "TBD", "leaders": ["Student Lead #1"] },
  { "name": "Korean Cultural Club", "category": "Communities", "tags": ["Culture","Community"], "description": "Celebrate Korean heritage.", "meeting": "TBD", "leaders": ["Student Lead #1"] },
  { "name": "Literary Magazine (Lit Mag)", "category": "Communities", "tags": ["Writing","Publishing","Creativity","Arts","Literature"], "description": "Publish student writing and art.", "meeting": "TBD", "leaders": ["Student Lead #1"] },
  { "name": "Media Marketing Club", "category": "Communities", "tags": ["Business","Marketing","Creativity"], "description": "Learn marketing and media skills.", "meeting": "TBD", "leaders": ["Student Lead #1"] },
  { "name": "Motorsport Club", "category": "Communities", "tags": ["Engineering","STEM","Sports","Design","Technology"], "description": "Explore motorsport and design.", "meeting": "TBD", "leaders": ["Student Lead #1"] },
  { "name": "Multicultural Club", "category": "Communities", "tags": ["Culture","Diversity"], "description": "Celebrate diversity and culture.", "meeting": "TBD", "leaders": ["Student Lead #1"] },
  { "name": "Muslim Student Association", "category": "Communities", "tags": ["Culture","Religion"], "description": "Celebrate Islamic culture.", "meeting": "TBD", "leaders": ["Student Lead #1"] },
  { "name": "Operation Snowball", "category": "Communities", "tags": ["Wellness","Leadership"], "description": "Promote leadership and healthy choices.", "meeting": "TBD", "leaders": ["Student Lead #1"] },
  { "name": "Outdoor Club", "category": "Communities", "tags": ["Nature","Adventure","Environment","Sports","Recreation"], "description": "Explore the outdoors.", "meeting": "TBD", "leaders": ["Student Lead #1"] },
  { "name": "Poetry Club", "category": "Communities", "tags": ["Writing","Creativity","Literature","Arts"], "description": "Write and perform poetry.", "meeting": "TBD", "leaders": ["Student Lead #1"] },
  { "name": "Psychology Club", "category": "Communities", "tags": ["Science","Mind","Wellness","Health","STEM"], "description": "Explore psychology topics.", "meeting": "TBD", "leaders": ["Student Lead #1"] },
  { "name": "Puzzle Club", "category": "Communities", "tags": ["Logic","Games","STEM","Problem Solving"], "description": "Solve and share puzzles.", "meeting": "TBD", "leaders": ["Student Lead #1"] },
  { "name": "Red Cross Club", "category": "Communities", "tags": ["Service","Health"], "description": "Support Red Cross initiatives.", "meeting": "TBD", "leaders": ["Student Lead #1"] },
  { "name": "Salt and Light Christian Club", "category": "Communities", "tags": ["Faith","Community"], "description": "Fellowship and community for Christian students.", "meeting": "TBD", "leaders": ["Student Lead #1"] },
  { "name": "Spanish Club", "category": "Communities", "tags": ["Language","Culture"], "description": "Celebrate Spanish heritage.", "meeting": "TBD", "leaders": ["Student Lead #1"] },
  { "name": "Star Raiders", "category": "Communities", "tags": ["Space","STEM","Science","Games"], "description": "Explore astronomy and science fiction.", "meeting": "TBD", "leaders": ["Student Lead #1"] },
  { "name": "Student Council", "category": "Communities", "tags": ["Leadership","Service"], "description": "Represent students and plan events.", "meeting": "Thursdays, Main Office", "leaders": ["Jessica Park", "Michael Thompson"], "emails": ["jessica.park@student.ipsd.org", "michael.thompson@student.ipsd.org"] },
  { "name": "Student Equity Action Committee (SEAC)", "category": "Communities", "tags": ["Equity","Leadership"], "description": "Promote equity and inclusion.", "meeting": "TBD", "leaders": ["Student Lead #1"] },
  { "name": "TED ED Club", "category": "Communities", "tags": ["Public Speaking","Leadership","Education"], "description": "Deliver and share TED-style talks.", "meeting": "TBD", "leaders": ["Student Lead #1"] },
  { "name": "TV Production Club", "category": "Communities", "tags": ["Media","Film","Creativity"], "description": "Produce student TV content.", "meeting": "TBD", "leaders": ["Student Lead #1"] },
  { "name": "UNICEF", "category": "Communities", "tags": ["Service","Global Issues"], "description": "Support UNICEF causes.", "meeting": "TBD", "leaders": ["Student Lead #1"] },
  { "name": "Wildcat Fiddlers", "category": "Special Interest", "tags": ["Music","Performance"], "description": "Perform folk and fiddle music.", "meeting": "TBD", "leaders": ["Student Lead #1"] },
  { "name": "Women's Empowerment", "category": "Communities", "tags": ["Leadership","Inclusion"], "description": "Empower women through leadership.", "meeting": "TBD", "leaders": ["Student Lead #1"] },
  { "name": "Yoga Club", "category": "Communities", "tags": ["Wellness","Health"], "description": "Practice yoga and mindfulness.", "meeting": "TBD", "leaders": ["Student Lead #1"] },

  // --- COMPETITIVE ---
  { "name": "Business Professionals of America (BPA)", "category": "Competitive", "tags": ["Business","Competition","Finance","Careers","Leadership"], "description": "Compete in business competitions.", "meeting": "TBD", "leaders": ["Student Lead #1"] },
  { "name": "Chess Team", "category": "Competitive", "tags": ["Strategy","Games","Logic","Competition"], "description": "Compete in chess tournaments.", "meeting": "TBD", "leaders": ["Student Lead #1"] },
  { "name": "Competition Computing Team", "category": "Competitive", "tags": ["Coding","STEM","Technology","Competition","Logic"], "description": "Compete in computing contests.", "meeting": "TBD", "leaders": ["Student Lead #1"] },
  { "name": "Hockey", "category": "Competitive", "tags": ["Sports","Team","Competition","Fitness"], "description": "Play and compete in hockey.", "meeting": "TBD", "leaders": ["Student Lead #1"] },
  { "name": "Illinois Design Educators Association (IDEA) Club", "category": "Competitive", "tags": ["Design","Engineering","Arts","Creativity","Competition","STEM"], "description": "Compete in design challenges.", "meeting": "TBD", "leaders": ["Student Lead #1"] },
  { "name": "Mock Trial", "category": "Competitive", "tags": ["Law","Debate","Public Speaking","Competition"], "description": "Simulate trials and compete.", "meeting": "TBD", "leaders": ["Student Lead #1"] },
  { "name": "Robotics Club", "category": "Competitive", "tags": ["STEM","Robotics","Engineering","Technology","Competition"], "description": "Build and compete in robotics.", "meeting": "Tuesdays, Tech Lab", "leaders": ["Ryan Zhang", "Sophie Williams"], "emails": ["ryan.zhang@student.ipsd.org", "sophie.williams@student.ipsd.org"] },
  { "name": "Rocket Club (ARC)", "category": "Competitive", "tags": ["STEM","Engineering","Science","Technology","Competition"], "description": "Design and launch rockets.", "meeting": "TBD", "leaders": ["Student Lead #1"] },
  { "name": "Rugby", "category": "Competitive", "tags": ["Sports","Team","Competition","Fitness"], "description": "Play competitive rugby.", "meeting": "TBD", "leaders": ["Student Lead #1"] },
  { "name": "Math Team", "category": "Competitive", "tags": ["Mathematics","STEM","Academics","Competition","Problem Solving"], "description": "Compete in mathematics competitions and problem solving.", "meeting": "TBD", "leaders": ["Student Lead #1"] },
  { "name": "Scholastic Bowl", "category": "Competitive", "tags": ["Trivia","Academics","STEM","Competition"], "description": "Compete in quiz competitions.", "meeting": "TBD", "leaders": ["Student Lead #1"] },
  { "name": "Science Olympiad", "category": "Competitive", "tags": ["STEM","Competition","Science","Academics"], "description": "Compete in STEM events.", "meeting": "TBD", "leaders": ["Student Lead #1"] },
  { "name": "Skills USA", "category": "Competitive", "tags": ["Careers","STEM","Competition","Technology"], "description": "Compete in technical skills contests.", "meeting": "TBD", "leaders": ["Student Lead #1"] },
  { "name": "Speech Team", "category": "Competitive", "tags": ["Public Speaking","Competition","Debate"], "description": "Compete in speech tournaments.", "meeting": "TBD", "leaders": ["Student Lead #1"] },
  { "name": "Special Olympics", "category": "Competitive", "tags": ["Inclusion","Sports","Service","Team","Competition"], "description": "Participate in Special Olympics.", "meeting": "TBD", "leaders": ["Student Lead #1"] },
  { "name": "Ultimate Frisbee", "category": "Competitive", "tags": ["Sports","Recreation","Fitness","Team","Competition"], "description": "Play ultimate frisbee.", "meeting": "TBD", "leaders": ["Student Lead #1"] },
  { "name": "Youth and Government", "category": "Competitive", "tags": ["Politics","Debate","Civics","Public Speaking","Leadership"], "description": "Simulate state government.", "meeting": "TBD", "leaders": ["Student Lead #1"] },

  // --- SPECIAL INTEREST ---
  { "name": "Acapella Vocal Groups", "category": "Special Interest", "tags": ["Music","Performance"], "description": "Perform in acapella groups.", "meeting": "TBD", "leaders": ["Student Lead #1"] },
  { "name": "Chamber Singers", "category": "Special Interest", "tags": ["Music","Performance"], "description": "Advanced vocal ensemble.", "meeting": "TBD", "leaders": ["Student Lead #1"] },
  { "name": "Concert Band", "category": "Special Interest", "tags": ["Music","Performance"], "description": "Perform in concert band.", "meeting": "TBD", "leaders": ["Student Lead #1"] },
  { "name": "Jazz Band", "category": "Special Interest", "tags": ["Music","Performance"], "description": "Play jazz music.", "meeting": "TBD", "leaders": ["Student Lead #1"] },
  { "name": "Marching Band", "category": "Special Interest", "tags": ["Music","Performance","School Spirit"], "description": "Perform at football games and competitions.", "meeting": "TBD", "leaders": ["Student Lead #1"] },
  { "name": "Orchestra", "category": "Special Interest", "tags": ["Music","Performance"], "description": "Play in string orchestra.", "meeting": "TBD", "leaders": ["Student Lead #1"] },
  { "name": "Pep Band", "category": "Special Interest", "tags": ["Music","Performance","School Spirit"], "description": "Play at basketball games.", "meeting": "TBD", "leaders": ["Student Lead #1"] },
  { "name": "Symphonic Band", "category": "Special Interest", "tags": ["Music","Performance"], "description": "Advanced concert band.", "meeting": "TBD", "leaders": ["Student Lead #1"] },
  { "name": "Wind Ensemble", "category": "Special Interest", "tags": ["Music","Performance"], "description": "Elite wind instrument ensemble.", "meeting": "TBD", "leaders": ["Student Lead #1"] }
];

// Survey Questions
const surveyQuestions = [
  {
    question: "What are your main interests?",
    type: "multiple",
    options: [
      "STEM & Science", "Arts & Creativity", "Sports & Fitness", "Music & Performance",
      "Writing & Literature", "Languages & Culture", "Leadership & Service", "Games & Technology",
      "Debate & Public Speaking", "Business & Finance", "Health & Wellness", "Environment & Nature"
    ]
  },
  {
    question: "How much time can you commit to clubs?",
    type: "single",
    options: ["1-2 hours per week", "3-5 hours per week", "6-10 hours per week", "More than 10 hours per week"]
  },
  {
    question: "What type of activities do you prefer?",
    type: "multiple",
    options: ["Competitive", "Casual & Social", "Creative Projects", "Community Service", "Academic Focus", "Physical Activity"]
  },
  {
    question: "Are you interested in leadership opportunities?",
    type: "single",
    options: ["Yes, I want to lead", "Maybe, I'm open to it", "No, I prefer to participate"]
  },
  {
    question: "What's your social style?",
    type: "single",
    options: ["Large groups", "Small groups", "One-on-one", "Mix of all"]
  }
];

// Enhanced Calendar data for clubs
const calendarData = {
  "Abraham Lincoln Book Club": { day: "Tuesday", time: "3:30 PM", room: "Library", frequency: "weekly" },
  "Anime Club": { day: "Thursday", time: "3:30 PM", room: "C123", frequency: "weekly" },
  "Art Club": { day: "Wednesday", time: "3:30 PM", room: "B210", frequency: "weekly" },
  "Astronomy Club": { day: "Friday", time: "3:30 PM", room: "Planetarium", frequency: "weekly" },
  "DND Club": { day: "Friday", time: "3:30 PM", room: "Library", frequency: "weekly" },
  "Robotics Club": { day: "Tuesday", time: "3:30 PM", room: "Tech Lab", frequency: "weekly" },
  "Chess Team": { day: "Monday", time: "3:30 PM", room: "A205", frequency: "weekly" },
  "Math Team": { day: "Monday", time: "3:30 PM", room: "Math Wing", frequency: "weekly" },
  "Science Olympiad": { day: "Wednesday", time: "3:30 PM", room: "Science Wing", frequency: "weekly" },
  "Student Council": { day: "Thursday", time: "7:30 AM", room: "Main Office", frequency: "weekly" },
  "Drama Club": { day: "Monday", time: "3:30 PM", room: "Auditorium", frequency: "weekly" },
  "Environmental Club (NVeco)": { day: "Tuesday", time: "3:30 PM", room: "Science Wing", frequency: "weekly" },
  "Finance Club": { day: "Wednesday", time: "3:30 PM", room: "Business Lab", frequency: "weekly" },
  "Girls Who Code": { day: "Thursday", time: "3:30 PM", room: "Computer Lab", frequency: "weekly" },
  "Mock Trial": { day: "Monday", time: "3:30 PM", room: "A215", frequency: "weekly" },
  "Speech Team": { day: "Tuesday", time: "3:30 PM", room: "A205", frequency: "weekly" },
  "The Echo (Newspaper)": { day: "Wednesday", time: "3:30 PM", room: "Journalism Lab", frequency: "weekly" },
  "Civics & Debate Club": { day: "Thursday", time: "3:30 PM", room: "A215", frequency: "weekly" },
  "Best Buddies": { day: "Friday", time: "3:30 PM", room: "Cafeteria", frequency: "weekly" },
  "Interact": { day: "Monday", time: "3:30 PM", room: "Main Office", frequency: "weekly" },
  "Red Cross Club": { day: "Tuesday", time: "3:30 PM", room: "Health Office", frequency: "weekly" }
};

// Generate calendar events for the current month
function generateCalendarEvents() {
  const events = [];
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  
  // Get all days in current month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentYear, currentMonth, day);
    const dayOfWeek = date.getDay();
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = dayNames[dayOfWeek];
    
    // Check for club meetings on this day
    Object.entries(calendarData).forEach(([clubName, meetingInfo]) => {
      if (meetingInfo.day === dayName) {
        events.push({
          date: day,
          club: clubName,
          time: meetingInfo.time,
          room: meetingInfo.room,
          day: dayName
        });
      }
    });
  }
  
  return events;
}
