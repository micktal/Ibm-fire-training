// ── English course data ────────────────────────────────────────
// Mirror of courseData.ts with all content translated to English.
import { CourseModule } from "./courseData";

const CDN = "https://cdn.builder.io/api/v1/image/assets%2Fd93d9a0ec7824aa1ac4d890a1f90a2ec%2F";

export const MODULES_EN: CourseModule[] = [
  // ─── CHAPTER 1 ────────────────────────────────────────────────
  {
    id: "ch1-m1",
    chapter: 1,
    number: 1,
    title: "Detecting a fire",
    subtitle: "Identify the signs in under 10 seconds",
    description: "Analyze scenes showing different warning signals: light smoke, burning smell, electrical noise, localized heat.",
    objective: "Identify the outbreak of a fire in under 10 seconds.",
    learningObjectives: {
      savoir: "The signs of a fire and how IBM fire detectors work",
      savoirFaire: "Apply the 3 reflexes in order: Alarm (777) → Unplug if safe → Evacuate",
      savoirEtre: "Treat every signal as a real emergency — never underestimate an alarm",
    },
    duration: "8 min",
    image: `${CDN}68e7b7c3ea9048b4a797a2ceacec35aa?format=webp&width=800`,
    videoUrl: "https://xnwexjnaiffdcifcnton.supabase.co/storage/v1/object/sign/video%201/Spot%20Fire%20Signs%20and%20Respond%20Fast.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mMWE2Y2M1ZS1kN2E2LTRjY2EtOTg1Ny1iOTc0Njg3NGQzNmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ2aWRlbyAxL1Nwb3QgRmlyZSBTaWducyBhbmQgUmVzcG9uZCBGYXN0Lm1wNCIsImlhdCI6MTc3NjI2MTc2NCwiZXhwIjoxODM5MzMzNzY0fQ.MEZVyVO9SYnhgemqBHKU2edOzLgetETFfIxF5Lz7j8k",
    funFacts: [
      { stat: "30s", label: "to control a fire outbreak", detail: "A small fire can double in size every 60 seconds. The first 30 seconds are decisive. Every reflex trained here can make the difference.", icon: "flame" },
      { stat: "70%", label: "of alarms are false", detail: "Yet IBM procedure is clear: every alarm must be treated as real until proven otherwise. One moment of hesitation can cost a life.", icon: "alert" },
    ],
    keyPoints: [
      "Four warning signals: burning smell, thin smoke, abnormal heat, electrical crackling",
      "Never assume an alarm is false — always treat it as real",
      "777 before 18 and before 15 — IBM Security first",
    ],
    preTest: [
      {
        question: "Which signal does NOT indicate a fire?",
        choices: [
          { key: "A", label: "Burning smell" },
          { key: "B", label: "Thin white smoke" },
          { key: "C", label: "A slightly warm radiator" },
          { key: "D", label: "Electrical crackling" },
        ],
        correctKey: "C",
      },
      {
        question: "IBM requires alerting security at 777 before calling 18. True or false?",
        choices: [
          { key: "A", label: "True — IBM Security knows the building plans" },
          { key: "B", label: "False — always call 18 first" },
        ],
        correctKey: "A",
      },
    ],
    content: [
      {
        type: "intro",
        title: "Why detection is critical",
        body: "A fire that is detected and reported in the first 30 seconds can be controlled. The same fire, left for 2 minutes, can engulf an entire floor. At IBM, the reflex must be automatic: any suspicious signal = immediate alert.",
      },
      {
        type: "info",
        title: "The four warning signals",
        body: "You don't need to see a flame to detect a fire. Four signals must trigger your reflex: 1) Burning smell (plastic, rubber, wood) 2) Thin smoke, even white 3) Abnormal heat on equipment 4) Electrical crackling or sparks.",
        bullets: [
          "Burning smell — especially plastic or rubber",
          "Thin smoke, even light or white",
          "Abnormal heat on a device or wall",
          "Electrical crackling, sparks or buzzing",
        ],
      },
      {
        type: "scenario",
        title: "Realistic scenario — office fire",
        body: "You're working at your desk. A colleague mentions they smell something burning near the printer. The smoke detector hasn't triggered yet. What do you do? Investigate the source? Alert security immediately? Wait to see if it gets worse?",
      },
      {
        type: "list",
        title: "The IBM procedure",
        body: "IBM procedure in case of fire: 1) Call 777 (IBM Security) with your exact location. 2) Assess the situation in 10 seconds. 3) Trigger the manual alarm if needed. 4) Intervene or evacuate based on the situation.",
        bullets: [
          "Call 777 — IBM Security before fire services",
          "Give your exact location (building, floor, zone)",
          "Assess: fire size, available extinguisher, clear exit",
          "Never use elevators during an evacuation",
        ],
      },
    ],
    quiz: [
      {
        id: "q1",
        question: "A thin white smoke appears near a printer. What is your FIRST action?",
        choices: [
          { key: "A", label: "Go check if the printer is really on fire" },
          { key: "B", label: "Call 777 immediately and give your location" },
          { key: "C", label: "Wait for the smoke detector to trigger" },
          { key: "D", label: "Open the windows to ventilate" },
        ],
        correctKey: "B",
        feedbackOk: "Correct. 777 is the first action — IBM Security knows the building and will coordinate the response.",
        feedbackKo: "Always call 777 first. IBM Security has the building plans and can alert the right people immediately. Investigating alone or waiting wastes precious time.",
      },
      {
        id: "q2",
        question: "The smoke detector goes off. You think it might be a false alarm. What do you do?",
        choices: [
          { key: "A", label: "Ignore it — it's probably the kitchen again" },
          { key: "B", label: "Tell colleagues it's probably nothing" },
          { key: "C", label: "Treat it as a real fire and follow the procedure" },
          { key: "D", label: "Call the building maintenance first" },
        ],
        correctKey: "C",
        feedbackOk: "Excellent. IBM procedure: every alarm = real fire until proven otherwise. No exceptions.",
        feedbackKo: "70% of alarms are false — but you never know if this is the 30%. Ignoring or delaying an alarm can cost lives. Always treat it as real.",
      },
      {
        id: "q3",
        question: "Which number do you call FIRST at IBM in case of fire?",
        choices: [
          { key: "A", label: "18 — Fire services" },
          { key: "B", label: "15 — Medical emergency" },
          { key: "C", label: "777 — IBM Security" },
          { key: "D", label: "The building superintendent" },
        ],
        correctKey: "C",
        feedbackOk: "Correct. 777 is the IBM priority number. Security knows the plans, zones, and evacuation procedures.",
        feedbackKo: "At IBM, 777 is always called first. IBM Security coordinates the alert with emergency services. They know the building better than anyone.",
      },
    ],
    locked: false,
  },

  {
    id: "ch1-m2",
    chapter: 1,
    number: 2,
    title: "The fire triangle",
    subtitle: "Fuel · Oxidant · Activation Energy",
    description: "Understanding the three elements of fire and how to remove each to extinguish it.",
    objective: "Understand the fire triangle and apply it to prevent and fight fires.",
    learningObjectives: {
      savoir: "The three components of the fire triangle: fuel, oxidant, activation energy",
      savoirFaire: "Remove one element of the triangle to extinguish or prevent a fire",
      savoirEtre: "Anticipate risks and never create conditions favorable to fire",
    },
    duration: "6 min",
    image: `${CDN}d3c9b22a88e644d98bd46cd69cd9cf30?format=webp&width=800`,
    videoUrl: "https://xnwexjnaiffdcifcnton.supabase.co/storage/v1/object/sign/video%201/Master%20the%20Fire%20Triangle.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mMWE2Y2M1ZS1kN2E2LTRjY2EtOTg1Ny1iOTc0Njg3NGQzNmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ2aWRlbyAxL01hc3RlciB0aGUgRmlyZSBUcmlhbmdsZS5tcDQiLCJpYXQiOjE3NzYyNjE2OTcsImV4cCI6MTgzOTMzMzY5N30.khV_3xQuU4bhy0uU0s6OqvJiiG8HK487QUebm3X2ykw",
    funFacts: [
      { stat: "3", label: "elements — remove 1 to extinguish", detail: "A fire cannot exist without fuel, oxidant and activation energy simultaneously. This is the basis of all firefighting: remove one element and the fire dies.", icon: "flame" },
      { stat: "21%", label: "oxygen in air — 16% minimum for a fire", detail: "Below 16% oxygen, fire cannot be sustained. CO2 and dry powder extinguishers work by reducing this level or by chemical reaction.", icon: "eye" },
    ],
    keyPoints: [
      "Fire triangle: fuel (paper, wood, gas) + oxidant (oxygen) + activation energy (ignition source)",
      "Remove ONE element = fire goes out",
      "Water reduces heat — CO2 eliminates oxygen — powder chemical reaction",
    ],
    preTest: [
      {
        question: "What is the fuel in a paper fire?",
        choices: [
          { key: "A", label: "Oxygen" },
          { key: "B", label: "Paper" },
          { key: "C", label: "Activation energy" },
          { key: "D", label: "CO2" },
        ],
        correctKey: "B",
      },
      {
        question: "A CO2 extinguisher works by eliminating:",
        choices: [
          { key: "A", label: "Activation energy" },
          { key: "B", label: "Fuel" },
          { key: "C", label: "Oxygen" },
        ],
        correctKey: "C",
      },
    ],
    content: [
      { type: "intro", title: "The three elements of fire", body: "Every fire requires exactly three elements: a fuel (something that burns), an oxidant (oxygen), and an activation energy source (ignition source or spark). Remove any one of these and the fire cannot exist. This is the theoretical basis of all firefighting techniques." },
      { type: "info", title: "Fuels at IBM", body: "At IBM offices, common fuels include: paper and cardboard, cable insulation, furniture, flammable liquids (cleaning products), wooden partitions. A fuel alone cannot ignite without a heat source — but the presence of fuels near heat sources is a risk to manage.", bullets: ["Paper and cardboard — class A fire", "Electrical cables — electrical fire", "Flammable liquids — class B fire", "Gas — class C fire"] },
      { type: "info", title: "How extinguishers work", body: "Each extinguishing agent targets one element of the triangle: Water mist reduces temperature (heat). CO2 displaces oxygen (oxidant). ABC powder creates a chemical reaction that breaks the chain. Choosing the wrong agent can worsen the fire — especially water on an electrical fire.", bullets: ["Water: reduces temperature — forbidden on electrical fires", "CO2: eliminates oxygen — ideal for servers and cables", "ABC powder: chemical chain reaction — all-purpose", "Fire blanket: eliminates oxygen — smothers small fires"] },
      { type: "scenario", title: "Scenario: which extinguisher?", body: "A server rack starts smoking in the data center. Three extinguishers are nearby: water mist (red), CO2 (black), ABC powder (blue). Which do you use and why? The water is absolutely forbidden here — electrical and water don't mix." },
    ],
    quiz: [
      { id: "q1", question: "Paper catches fire. Which element of the triangle would you act on by covering the fire with a blanket?", choices: [{ key: "A", label: "Activation energy" }, { key: "B", label: "Fuel" }, { key: "C", label: "Oxidant (oxygen)" }, { key: "D", label: "None of these" }], correctKey: "C", feedbackOk: "Correct. A blanket cuts off oxygen supply. No oxygen = fire dies.", feedbackKo: "A blanket isolates the fire from the air (oxygen). This removes the oxidant from the triangle, which extinguishes the fire." },
      { id: "q2", question: "Which extinguisher must NEVER be used on an electrical fire?", choices: [{ key: "A", label: "CO2" }, { key: "B", label: "Water" }, { key: "C", label: "ABC Powder" }, { key: "D", label: "D Powder" }], correctKey: "B", feedbackOk: "Correct. Water conducts electricity — electrocution risk is fatal.", feedbackKo: "Water is a conductor. On an electrical fire, using water creates an electrocution risk. CO2 is the only safe agent for electrical fires." },
    ],
    locked: false,
  },

  {
    id: "ch1-m3",
    chapter: 1,
    number: 3,
    title: "Fire spread and containment",
    subtitle: "Why closed doors save lives",
    description: "Understanding fire propagation mechanisms and effective containment strategies using fire doors.",
    objective: "Apply containment techniques to slow fire spread and protect evacuation routes.",
    learningObjectives: {
      savoir: "Fire spread speed and the fire-stopping role of doors",
      savoirFaire: "Close all doors when leaving a zone and contain the fire",
      savoirEtre: "Act methodically without running, even under pressure",
    },
    duration: "7 min",
    image: `${CDN}26706b11880d4b55b61df8e668695b14?format=webp&width=800`,
    videoUrl: "https://xnwexjnaiffdcifcnton.supabase.co/storage/v1/object/sign/video%201/Stop%20Fire%20Spread%20Fast.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mMWE2Y2M1ZS1kN2E2LTRjY2EtOTg1Ny1iOTc0Njg3NGQzNmUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ2aWRlbyAxL1N0b3AgRmlyZSBTcHJlYWQgRmFzdC5tcDQiLCJpYXQiOjE3NzYyNjE2MTQsImV4cCI6MTgzOTMzMzYxNH0.wIdpGTSd8AXNzpbjC3Em0JgmNxdhS8mXsSIxnyJlGzY",
    funFacts: [
      { stat: "5×", label: "faster spread with an open door", detail: "A fire-door left open multiplies the spread speed by 5. Closing doors before evacuating is one of the most effective firefighting actions — more effective than most extinguishers.", icon: "flame" },
      { stat: "30 min", label: "fire resistance of a closed EI30 door", detail: "A fire door can resist a fire for 30 to 60 minutes when closed. Propped open, it provides zero protection.", icon: "shield" },
    ],
    keyPoints: [
      "A fire door closed = 30 minutes of protection — open = zero protection",
      "Never run: you inhale more smoke and risk panic falls",
      "Close all doors behind you — always, no exceptions",
    ],
    preTest: [
      { question: "A fire door left open multiplies spread speed by:", choices: [{ key: "A", label: "2 times" }, { key: "B", label: "5 times" }, { key: "C", label: "10 times" }, { key: "D", label: "No difference" }], correctKey: "B" },
      { question: "If you discover a fire on your floor, you should:", choices: [{ key: "A", label: "Run immediately to the exit" }, { key: "B", label: "Calmly close doors behind you while evacuating" }, { key: "C", label: "Leave the doors open to ventilate" }], correctKey: "B" },
    ],
    content: [
      { type: "intro", title: "How fire spreads", body: "Fire spreads in three ways: conduction (heat travels through materials), convection (hot smoke rises and spreads horizontally), and radiation (heat emitted as infrared radiation). At IBM offices, the main risk is convection: smoke and heat spreading through corridors and open doors." },
      { type: "info", title: "The role of fire doors", body: "Fire doors (marked EI30, EI60, EI120) are designed to resist fire and smoke for 30, 60 or 120 minutes respectively. They are your best ally. Closed, they create compartments that slow spread. Propped open — by a chair, book or door wedge — they become useless.", bullets: ["EI30: 30 minutes fire resistance when closed", "Keep all fire doors closed at all times", "Never use a door wedge to prop a fire door open", "A propped door = no protection for evacuation routes"] },
      { type: "scenario", title: "Scenario: fire in the reprographics room", body: "Fire breaks out in the reprographics room at the end of the corridor. The door is open. You are between the fire and the emergency exit. What do you do? Close the door as you walk past (without stopping), then continue to the exit calmly. Never run — the risk of falling in a stairwell is real.", highlight: "Rule: close every door you pass. Never leave a fire door open." },
      { type: "list", title: "Containment best practices", body: "The containment sequence to apply automatically during any evacuation:", bullets: ["EXIT — leave the area immediately", "CLOSE — close every door behind you", "SIGNAL — signal your position to security", "Never return for personal belongings", "Never use the elevator"] },
    ],
    quiz: [
      { id: "q1", question: "You leave a room where a fire has started. What do you do with the door?", choices: [{ key: "A", label: "Leave it open to ventilate" }, { key: "B", label: "Close it completely" }, { key: "C", label: "Leave it half-open" }, { key: "D", label: "Doesn't matter" }], correctKey: "B", feedbackOk: "Correct. A closed door can hold fire back for 30 to 60 minutes. This protects evacuation routes.", feedbackKo: "Closing the door is one of the most important reflexes. A fire door protects for 30-60 min. Open = zero protection." },
      { id: "q2", question: "During an evacuation, you must:", choices: [{ key: "A", label: "Run to get out faster" }, { key: "B", label: "Walk quickly without running and close doors" }, { key: "C", label: "Wait for the all-clear before moving" }, { key: "D", label: "Use the elevator to save time" }], correctKey: "B", feedbackOk: "Correct. Walking without running prevents falls and allows closing doors systematically.", feedbackKo: "Running increases the risk of falls, especially in stairwells. Walk quickly, close every door, and never use the elevator during a fire." },
    ],
    locked: false,
  },

  {
    id: "ch1-m4",
    chapter: 1,
    number: 4,
    title: "Fire classes and extinguishers",
    subtitle: "Choose the right extinguisher",
    description: "Interactive floor plan of an IBM floor. Exercise to choose the right route. Animations on smoke speed in stairwells.",
    objective: "Choose and use the correct extinguisher for the type of fire.",
    learningObjectives: {
      savoir: "Fire classes (A, B, C, D, F) and the appropriate extinguisher for each",
      savoirFaire: "Choose and use the correct extinguisher for the fire",
      savoirEtre: "Never improvise — using the wrong agent can worsen the fire",
    },
    duration: "7 min",
    image: `${CDN}8f5fa15ec33749609150a2fef62457e9?format=webp&width=800`,
    funFacts: [
      { stat: "5", label: "fire classes to master", detail: "Class A (solids), B (liquids), C (gas), D (metals), F (cooking oils). Each requires a specific extinguishing agent. Using the wrong one can spread the fire.", icon: "flame" },
      { stat: "CO₂", label: "the only choice for electrical fires", detail: "Water conducts electricity and can cause fatal electrocution. CO2 extinguishes without conducting current, leaving no residue on equipment.", icon: "zap" },
    ],
    keyPoints: [
      "5 fire classes — each requires a specific agent",
      "NEVER water on an electrical fire: electrocution risk",
      "CO2 (black) for servers and cables — ABC powder for everything else",
    ],
    preTest: [
      { question: "Which extinguisher for a server rack fire?", choices: [{ key: "A", label: "Water mist" }, { key: "B", label: "CO2" }, { key: "C", label: "ABC Powder" }, { key: "D", label: "Class D powder" }], correctKey: "B" },
      { question: "A class A fire involves:", choices: [{ key: "A", label: "Flammable liquids" }, { key: "B", label: "Gas" }, { key: "C", label: "Ordinary solid materials (paper, wood, fabric)" }, { key: "D", label: "Metals" }], correctKey: "C" },
    ],
    content: [
      { type: "intro", title: "Why fire classes exist", body: "Not all fires are fought the same way. Using the wrong extinguishing agent can be ineffective — or dangerously worsen the fire. Water on a liquid fire creates a violent splatter of burning droplets. Water on an electrical fire creates an electrocution risk. This is why fire classes exist." },
      { type: "info", title: "The 5 fire classes", body: "Class A: ordinary solid materials (paper, wood, fabric, plastic). Class B: flammable liquids (oil, solvent, petrol). Class C: gases (propane, natural gas). Class D: metals (lithium, magnesium). Class F: cooking oils and fats.", bullets: ["A — solids: water mist, ABC powder", "B — liquids: CO2, ABC powder, foam", "C — gases: ABC powder (cut gas source first)", "D — metals: specific D powder only", "F — cooking oils: Class F foam only"] },
      { type: "comparison", title: "Which extinguisher at IBM?", body: "IBM offices mainly have three types of extinguisher:", doList: ["CO2 (black label): servers, cables, data centers", "ABC Powder (blue label): all fires except D and F", "Water mist (red label): class A fires only (paper, wood)"], dontList: ["Water on electrical fires", "CO2 on metals (class D)", "ABC powder on cooking oils (class F)", "Any extinguisher without checking the label"] },
    ],
    quiz: [
      { id: "q1", question: "A printer catches fire. Which extinguisher do you use?", choices: [{ key: "A", label: "Water mist — most common" }, { key: "B", label: "CO2 — electrical equipment" }, { key: "C", label: "Class D powder" }, { key: "D", label: "None — evacuate immediately" }], correctKey: "B", feedbackOk: "Correct. A printer is electrical equipment. CO2 is the only safe agent: no electrocution risk, no equipment damage.", feedbackKo: "A printer is electrical — water is forbidden. CO2 is non-conductive and leaves no residue on equipment." },
      { id: "q2", question: "An oil fire in the break room kitchen. What do you do?", choices: [{ key: "A", label: "Throw water on it — to cool it down" }, { key: "B", label: "Use the ABC powder extinguisher" }, { key: "C", label: "Cover with a fire blanket and call 777" }, { key: "D", label: "Use the CO2 extinguisher" }], correctKey: "C", feedbackOk: "Correct. A fire blanket smothers the fire (Class F). If no blanket, call 777 immediately and evacuate.", feedbackKo: "Water on a cooking oil fire causes a violent fireball (steam explosion). A fire blanket is the safest option. If unavailable, evacuate and call 777." },
    ],
    locked: false,
  },

  {
    id: "ch1-m5",
    chapter: 1,
    number: 5,
    title: "Using a fire extinguisher",
    subtitle: "PASS sequence · 2-3 meter distance",
    description: "Step-by-step practical simulation of CO2 and ABC powder extinguisher use. PASS sequence memorization.",
    objective: "Use a fire extinguisher correctly using the PASS sequence.",
    learningObjectives: {
      savoir: "The PASS sequence (Pull · Aim · Squeeze · Sweep) and the safe intervention distance",
      savoirFaire: "Use a CO2 or ABC powder extinguisher safely at 2–3 meters",
      savoirEtre: "Keep an exit behind you and never put your life at risk",
    },
    duration: "6 min",
    image: `${CDN}d41dd2ee6d6d4cf4b7f112d3fc2460f3?format=webp&width=800`,
    funFacts: [
      { stat: "PASS", label: "the 4 steps to remember", detail: "Pull (pin) · Aim (at base of fire) · Squeeze (handle) · Sweep (side to side). This sequence applies to all extinguisher types. Practice it mentally now.", icon: "shield" },
      { stat: "2-3m", label: "optimal distance from fire", detail: "CO2 exits at -78°C. Too close: cold burns. Too far: loss of effectiveness. 2-3 meters is the safety sweet spot for CO2 and ABC powder.", icon: "eye" },
    ],
    keyPoints: [
      "PASS: Pull · Aim · Squeeze · Sweep",
      "2-3 meters from the fire — never get closer",
      "Always keep an exit behind you before using an extinguisher",
    ],
    preTest: [
      { question: "What does the A in PASS stand for?", choices: [{ key: "A", label: "Alert" }, { key: "B", label: "Aim at the base of the fire" }, { key: "C", label: "Activate the alarm" }, { key: "D", label: "Advance toward the fire" }], correctKey: "B" },
      { question: "Before using an extinguisher, you must:", choices: [{ key: "A", label: "Make sure you have an exit behind you" }, { key: "B", label: "Call a colleague for help" }, { key: "C", label: "Check the expiry date on the label" }], correctKey: "A" },
    ],
    content: [
      { type: "intro", title: "Before reaching for the extinguisher", body: "Before using an extinguisher, verify 3 conditions: the fire is small enough (no bigger than a wastepaper basket), the right extinguisher is available, and you have a clear exit behind you. If any of these is missing, do not intervene — evacuate.", highlight: "Rule: if you have to move backward to use it, don't use it." },
      { type: "info", title: "The PASS sequence", body: "PASS is the universal extinguisher sequence: P — Pull: remove the safety pin. A — Aim: direct the nozzle at the base of the fire, not at the flames. S — Squeeze: press the handle to release the agent. S — Sweep: sweep the nozzle from side to side at the base of the fire.", bullets: ["Pull: remove the safety pin", "Aim: target the BASE of the fire", "Squeeze: press and hold the handle", "Sweep: side-to-side movement at the base"] },
      { type: "info", title: "Specific distances and times", body: "CO2: 2-3 meters, maximum 30 seconds of discharge. ABC Powder: 2-4 meters, 15-30 seconds of discharge. Water mist: 1-2 meters, up to 60 seconds. The extinguisher empties quickly. If the fire isn't controlled after one discharge, evacuate immediately.", bullets: ["CO2: 2-3m, 30 seconds" , "ABC powder: 2-4m, 15-30 seconds", "If not controlled in 30s: evacuate"] },
    ],
    quiz: [
      { id: "q1", question: "Step 2 of PASS (Aim) means directing the nozzle:", choices: [{ key: "A", label: "At the flames themselves" }, { key: "B", label: "At the base of the fire" }, { key: "C", label: "At the smoke" }, { key: "D", label: "At the surrounding area" }], correctKey: "B", feedbackOk: "Correct. Aiming at the base extinguishes the source. Aiming at flames is ineffective.", feedbackKo: "Always aim at the BASE of the fire, not the flames. The base is where the fuel is — eliminating the source extinguishes the fire." },
      { id: "q2", question: "The fire is not controlled after 30 seconds of discharge. You should:", choices: [{ key: "A", label: "Fetch another extinguisher" }, { key: "B", label: "Get closer to be more effective" }, { key: "C", label: "Evacuate immediately" }, { key: "D", label: "Switch to a water extinguisher" }], correctKey: "C", feedbackOk: "Correct. An extinguisher is not enough against a developed fire. 30 seconds = abandon point.", feedbackKo: "If the fire isn't controlled in 30 seconds, it's too developed. Evacuate immediately — your safety takes priority." },
    ],
    locked: false,
  },

  {
    id: "ch1-m6",
    chapter: 1,
    number: 6,
    title: "Intervene or evacuate?",
    subtitle: "The 10-second decision rule",
    description: "Branching decision scenarios. Choosing between intervention and evacuation based on evolving situations.",
    objective: "Make the right decision within 10 seconds: intervene or evacuate.",
    learningObjectives: {
      savoir: "The criteria that determine whether to intervene or evacuate",
      savoirFaire: "Apply the 10-second rule: observe, assess, decide",
      savoirEtre: "When in doubt, always favor evacuation without hesitation",
    },
    duration: "8 min",
    image: `${CDN}8e074d1b7bdf4b8fa872d5fd2451fbfe?format=webp&width=800`,
    funFacts: [
      { stat: "10s", label: "maximum to make your decision", detail: "10 seconds to observe, assess, and decide. Beyond this, the fire has grown and your options narrow. Train your decision reflex now.", icon: "clock" },
      { stat: "80%", label: "of victims could have survived", detail: "In most fatal office fires, a faster evacuation decision would have changed the outcome. Doubt must always lead to evacuation — never to waiting.", icon: "alert" },
    ],
    keyPoints: [
      "Intervene only if: fire < wastepaper basket, right extinguisher available, exit behind you",
      "10-second rule: observe → assess → decide",
      "If in doubt: always evacuate. No exceptions.",
    ],
    preTest: [
      { question: "IBM requires deciding to intervene or evacuate in:", choices: [{ key: "A", label: "5 minutes" }, { key: "B", label: "10 seconds" }, { key: "C", label: "1 minute" }], correctKey: "B" },
      { question: "Which condition is NOT required before intervening?", choices: [{ key: "A", label: "Fire smaller than a wastepaper basket" }, { key: "B", label: "A colleague standing by" }, { key: "C", label: "An exit directly behind you" }], correctKey: "B" },
    ],
    content: [
      { type: "intro", title: "The fundamental dilemma", body: "Every IBM employee who discovers a fire faces a dilemma: intervene with an extinguisher, or evacuate immediately? This decision must be made in 10 seconds — and made correctly. A bad decision costs time, and time costs lives." },
      { type: "info", title: "The 3 conditions to intervene", body: "You can only intervene if ALL THREE conditions are met simultaneously: the fire is smaller than a wastepaper basket (early stage), the right extinguisher is within reach, and a clear exit is directly behind you. If even ONE condition is missing, you must evacuate.", bullets: ["Fire < size of a wastepaper basket", "Correct extinguisher within arm's reach", "Clear, unobstructed exit directly behind you", "All 3 must be true — otherwise EVACUATE"] },
      { type: "scenario", title: "Scenario: the 10-second decision", body: "It's 3pm. A colleague shouts — fire in the break room. You arrive: a bin is on fire, flames about 40cm high. An ABC powder extinguisher is on the wall. The corridor behind you is clear. Do you intervene? The fire is still small (yes), the extinguisher is adapted (yes), the exit is clear (yes). You can intervene — but 777 first." },
      { type: "list", title: "When to choose evacuation", body: "Evacuate immediately without hesitation if:", bullets: ["Fire is bigger than a wastepaper basket", "Smoke already filling the corridor", "No adapted extinguisher available", "No clear exit behind you", "You feel any doubt whatsoever"] },
    ],
    quiz: [
      { id: "q1", question: "Flames 80cm high in a printer. An ABC extinguisher is available. An exit is behind you. What do you do?", choices: [{ key: "A", label: "Intervene — the extinguisher is adapted" }, { key: "B", label: "Evacuate — fire is too large" }, { key: "C", label: "Call a colleague to help intervene" }, { key: "D", label: "Wait to see if it grows" }], correctKey: "B", feedbackOk: "Correct. 80cm flames is too large to control with a single extinguisher. Evacuate immediately.", feedbackKo: "80cm exceeds the safe intervention threshold. Even with the right extinguisher, an evacuation must be chosen. The fire is already developed." },
      { id: "q2", question: "A small fire. Extinguisher available. But the corridor behind you is filled with smoke. What do you do?", choices: [{ key: "A", label: "Intervene quickly before the smoke gets worse" }, { key: "B", label: "Evacuate — no clear exit behind me" }, { key: "C", label: "Open the window to clear the smoke first" }, { key: "D", label: "Call security while preparing the extinguisher" }], correctKey: "B", feedbackOk: "Correct. Without a clear exit, intervening is too dangerous. You could become trapped.", feedbackKo: "The 3 conditions require a clear exit behind you. If the exit is blocked, do not intervene — you risk being trapped." },
    ],
    locked: false,
  },

  {
    id: "ch1-m7",
    chapter: 1,
    number: 7,
    title: "Fire simulation",
    subtitle: "Timed full-sequence scenario",
    description: "Final timed scenario: fire smell, smoke, colleagues, doors, extinguisher, point of assembly. Final score.",
    objective: "Validate the full IBM fire response procedure in a simulated situation.",
    learningObjectives: {
      savoir: "The complete IBM fire management procedure",
      savoirFaire: "Chain the 3 reflexes: Alarm (777) → Unplug if safe → Evacuate",
      savoirEtre: "Keep a cool head and coordinate actions under timed pressure",
    },
    duration: "12 min",
    image: `${CDN}dfd2975e7d864d029e522928a710aa05?format=webp&width=800`,
    funFacts: [
      { stat: "3", label: "seconds to react on the first signal", detail: "In a real situation, every second counts. This simulation trains your automatic reflexes so that in a real emergency, you act without thinking.", icon: "zap" },
      { stat: "100%", label: "of reflexes must be automatic", detail: "A learned reflex acts faster than a reasoned decision. Repeat the procedure until it becomes automatic. That's the purpose of this simulation.", icon: "shield" },
    ],
    keyPoints: [
      "Complete procedure: detect → 777 → assess → intervene OR evacuate",
      "Never skip a step, even under time pressure",
      "At the assembly point: stay there and count everyone",
    ],
    preTest: [
      { question: "In a fire simulation, what is your very first action upon detecting smoke?", choices: [{ key: "A", label: "Grab an extinguisher" }, { key: "B", label: "Call 777" }, { key: "C", label: "Evacuate immediately" }, { key: "D", label: "Alert colleagues" }], correctKey: "B" },
      { question: "At the assembly point, you realize a colleague is missing. What do you do?", choices: [{ key: "A", label: "Go back in to find them" }, { key: "B", label: "Report the information to fire services when they arrive" }, { key: "C", label: "Call their mobile" }], correctKey: "B" },
    ],
    content: [
      { type: "intro", title: "Why simulate?", body: "A reflex not practiced degrades over time. IBM's regulation requires annual fire safety training precisely because real-life performance depends on repetition. This final module puts everything together: detection, alert, decision, intervention or evacuation, assembly point." },
      { type: "list", title: "Complete IBM procedure", body: "The 6 steps of the IBM fire safety procedure:", bullets: ["1. DETECT: any suspicious signal = immediate alert", "2. ALERT: call 777 with exact location", "3. ASSESS: 10 seconds — fire size, extinguisher, exit", "4. DECIDE: intervene (3 conditions) or evacuate", "5. CLOSE: close all doors while evacuating", "6. ASSEMBLE: go to the assembly point and stay there"] },
      { type: "scenario", title: "Simulation scenario", body: "It's 10:15am. You smell smoke in the open space. You look up: thin white smoke near a partition. No alarm has triggered yet. The security office is 2 floors down. An extinguisher is 10 meters away. The emergency exit is directly behind you. You have 10 seconds. What do you do — in order?" },
    ],
    quiz: [
      { id: "q1", question: "Order the procedure steps correctly. What comes AFTER 'assess the situation'?", choices: [{ key: "A", label: "Close all doors" }, { key: "B", label: "Call 777" }, { key: "C", label: "Decide: intervene or evacuate" }, { key: "D", label: "Go to the assembly point" }], correctKey: "C", feedbackOk: "Correct. After assessing, you decide: intervene (3 conditions met) or evacuate.", feedbackKo: "The order is: detect → alert (777) → assess → decide (intervene/evacuate) → close doors → assemble." },
      { id: "q2", question: "At the assembly point, you count 23 people. Your team normally has 25. What do you do?", choices: [{ key: "A", label: "Go back in to find the missing 2" }, { key: "B", label: "Wait and say nothing" }, { key: "C", label: "Report the count and missing names to fire services" }, { key: "D", label: "Call their mobiles from inside" }], correctKey: "C", feedbackOk: "Correct. You never go back in. Report to fire services: name, usual location, last badge time.", feedbackKo: "Never return to a building on fire. Report the missing people to fire services with as many details as possible: name, floor, last known location." },
    ],
    locked: false,
  },

  // ─── CHAPTER 2 ─────────────────────────────────────────────────
  {
    id: "ch2-m1",
    chapter: 2,
    number: 1,
    title: "Triggering the alarm",
    subtitle: "When and how to activate the alert",
    description: "Types of IBM fire alarms, manual call points, correct information to give when calling.",
    objective: "Trigger the fire alarm and alert IBM Security at 777 with the correct information.",
    learningObjectives: {
      savoir: "The types of IBM fire alarms and emergency numbers to know",
      savoirFaire: "Activate a manual call point and call 777 with the right details",
      savoirEtre: "Alert immediately without trying to extinguish alone when in doubt",
    },
    duration: "5 min",
    image: `${CDN}2482acaedcdd4b2abad18b1011a424c6?format=webp&width=800`,
    funFacts: [
      { stat: "777", label: "IBM Security — always first", detail: "IBM Security has building plans, knows zone locations, and coordinates with emergency services. Always call them before 18.", icon: "alert" },
      { stat: "3", label: "essential pieces of info to give", detail: "Your name, exact location (building/floor/zone), and description of what you see. 3 pieces of information — memorize them.", icon: "shield" },
    ],
    keyPoints: [
      "777: IBM Security, always before 18",
      "Manual call points: break the glass and press — no key needed",
      "Give: name, exact location, what you see",
    ],
    preTest: [
      { question: "Which number do you call first at IBM during a fire?", choices: [{ key: "A", label: "18 — Fire services" }, { key: "B", label: "777 — IBM Security" }, { key: "C", label: "112 — European emergency" }], correctKey: "B" },
      { question: "A manual call point (MCP) requires:", choices: [{ key: "A", label: "A special key to operate" }, { key: "B", label: "Breaking the glass and pressing" }, { key: "C", label: "Authorization from security" }], correctKey: "B" },
    ],
    content: [
      { type: "intro", title: "Two types of alarm at IBM", body: "IBM offices have automatic detectors (triggered by smoke or heat) and manual call points (red boxes on walls). Both trigger the general alarm. But even if the automatic alarm goes off, you must call 777 to give your exact location." },
      { type: "info", title: "Activating a manual call point", body: "Manual call points are red boxes marked with a flame symbol. To activate: 1) Break the glass (a small hammer is attached). 2) Press the button inside. That's all — no key, no code. The alarm will sound throughout the building.", bullets: ["Locate MCPs on every floor (marked in green on evacuation plans)", "Break glass + press button = alarm triggered", "No key, no code, no authorization needed", "If glass is already broken: press the button directly"] },
      { type: "list", title: "What to say when calling 777", body: "When you reach 777, give these 3 pieces of information immediately:", bullets: ["1. Your full name", "2. Exact location: building name, floor, zone (e.g. 'Building B, 4th floor, zone A')", "3. What you see: 'I see smoke from the reprographics room', 'I smell burning near the servers'"] },
    ],
    quiz: [
      { id: "q1", question: "The smoke detector triggers but you see nothing. What do you do?", choices: [{ key: "A", label: "Reset the detector — probably false alarm" }, { key: "B", label: "Call 777 and give your location" }, { key: "C", label: "Wait 2 minutes to see if it stops" }, { key: "D", label: "Investigate to find the source" }], correctKey: "B", feedbackOk: "Correct. Even without visible fire: call 777. The detector has picked up something, even if you can't see it.", feedbackKo: "Any triggered alarm = call 777. IBM Security will verify and dispatch the response. Never reset without authorization." },
    ],
    locked: false,
  },

  {
    id: "ch2-m2",
    chapter: 2,
    number: 2,
    title: "Stay calm and guide others",
    subtitle: "Communication skills in crisis",
    description: "Managing colleagues in panic. Tone of voice, instructions, leadership posture in an emergency.",
    objective: "Guide colleagues to safety calmly and efficiently during an evacuation.",
    learningObjectives: {
      savoir: "Communication and leadership techniques in a crisis situation",
      savoirFaire: "Calmly guide panicking colleagues to emergency exits",
      savoirEtre: "Adopt a firm, reassuring posture focused on action",
    },
    duration: "7 min",
    image: `${CDN}73ee73f4c5c54adb943d454c10b797a9?format=webp&width=800`,
    funFacts: [
      { stat: "85%", label: "of people freeze in an emergency", detail: "Research shows that most people hesitate for 3-5 seconds before reacting to a fire alarm. One person taking charge immediately can trigger evacuation for the whole group.", icon: "eye" },
      { stat: "1", label: "clear voice is worth 20 shouting", detail: "A calm, firm, directive voice is far more effective than shouting in a panic situation. Volume doesn't equal authority — clarity does.", icon: "shield" },
    ],
    keyPoints: [
      "Calm voice + simple instruction: 'Follow me, we're leaving now'",
      "Designate a task for each person to reduce panic",
      "Never leave someone alone — especially visitors",
    ],
    preTest: [
      { question: "A colleague panics and refuses to move. Your first action:", choices: [{ key: "A", label: "Argue with them about the danger" }, { key: "B", label: "Give a clear instruction: 'Come with me, we're leaving now'" }, { key: "C", label: "Leave them and go yourself" }], correctKey: "B" },
      { question: "To guide a group in panic, you should:", choices: [{ key: "A", label: "Shout to be heard" }, { key: "B", label: "Speak calmly and firmly with a single clear directive" }, { key: "C", label: "Let them find their own way out" }], correctKey: "B" },
    ],
    content: [
      { type: "intro", title: "Why calm is the most powerful tool", body: "In an emergency, the human brain enters a stress response. Most people freeze, follow others blindly, or panic. One person who remains calm and takes charge can guide dozens of people to safety. Your attitude is your most important firefighting tool." },
      { type: "info", title: "The 3-second intervention", body: "When you see colleagues freezing or panicking, intervene in 3 seconds: 1) Physical presence — step forward, make eye contact. 2) Clear instruction — 'Everyone follow me, emergency exit this way.' 3) First movement — start walking immediately. People follow movement.", bullets: ["Make eye contact with the group", "Give one clear, simple instruction", "Start moving immediately — people follow", "Assign someone to close doors behind the group"] },
      { type: "scenario", title: "Scenario: reception panic", body: "The alarm goes off. You're near the main reception. 15 visitors are panicking and heading for the same door. One person starts screaming. What do you do? Step forward, raise your voice without shouting: 'Everyone listen! Emergency exit is this way. Follow me, calmly.' Start walking — the group will follow." },
    ],
    quiz: [
      { id: "q1", question: "A group of 10 people is frozen in the corridor. The best approach is:", choices: [{ key: "A", label: "Shout 'FIRE! RUN!' to get them moving" }, { key: "B", label: "Give a clear directive and start moving yourself" }, { key: "C", label: "Call security and wait for instructions" }, { key: "D", label: "Let them figure it out — adults know what to do" }], correctKey: "B", feedbackOk: "Correct. Modeling movement (starting to walk) triggers the group reflex. Shouting increases panic.", feedbackKo: "People in panic follow movement, not words. Start walking toward the exit while giving a clear directive. The group will follow." },
    ],
    locked: false,
  },

  {
    id: "ch2-m3",
    chapter: 2,
    number: 3,
    title: "Closing the doors",
    subtitle: "EXIT · CLOSE · SIGNAL",
    description: "The EXIT-CLOSE-SIGNAL sequence. Fire door resistance and role in evacuation.",
    objective: "Apply the EXIT-CLOSE-SIGNAL sequence systematically during every evacuation.",
    learningObjectives: {
      savoir: "The EXIT-CLOSE-SIGNAL sequence and its impact on fire spread",
      savoirFaire: "Systematically close every door when leaving premises",
      savoirEtre: "Apply the procedure without exception, even under stress",
    },
    duration: "6 min",
    image: `${CDN}0385f320d59547b2b6d08166e29ab8f3?format=webp&width=800`,
    funFacts: [
      { stat: "5×", label: "faster spread with open door", detail: "A fire door left open multiplies fire spread speed by 5. Closing a door while evacuating is often more effective than an extinguisher.", icon: "flame" },
      { stat: "30 min", label: "resistance of a closed EI30 door", detail: "Closed, an EI30 fire door resists fire for 30 minutes. Propped open: zero protection.", icon: "shield" },
    ],
    keyPoints: [
      "EXIT first — never stay to close before going out",
      "CLOSE every door behind you — without exception",
      "SIGNAL your position and number of people to security",
    ],
    preTest: [
      { question: "The EXIT in EXIT-CLOSE-SIGNAL means:", choices: [{ key: "A", label: "Exit through the main entrance" }, { key: "B", label: "Leave the room before closing the door" }, { key: "C", label: "Look for the exit sign" }], correctKey: "B" },
      { question: "During an evacuation, you should close:", choices: [{ key: "A", label: "Only fire-resistant doors" }, { key: "B", label: "Only the door of the room on fire" }, { key: "C", label: "Every door you pass through" }], correctKey: "C" },
    ],
    content: [
      { type: "intro", title: "The EXIT-CLOSE-SIGNAL sequence", body: "EXIT-CLOSE-SIGNAL is the three-step sequence every IBM employee must apply automatically during any evacuation. EXIT: leave the room before doing anything else. CLOSE: close every door behind you. SIGNAL: indicate your position and number of people to security when you reach the assembly point." },
      { type: "info", title: "Why close every door?", body: "Every closed door is a firewall. In a typical building, there are dozens of doors between you and the fire. Each one closed gives evacuation routes 20-30 more minutes of protection. Propped doors offer zero protection and become fire accelerators.", bullets: ["Each closed door = 20-30 min extra protection", "A door doesn't need to be a fire door to slow spread", "Close doors without locking — rescuers need access", "Never prop a door open with a chair, book or wedge"] },
      { type: "comparison", title: "Do / Don't", body: "", doList: ["Close every door when evacuating", "Exit BEFORE closing (don't stay inside)", "Close without locking", "Close the stairwell doors too"], dontList: ["Leave doors open 'for ventilation'", "Prop doors open with furniture", "Lock doors — rescuers need access", "Return to close a door you forgot"] },
    ],
    quiz: [
      { id: "q1", question: "You leave your office during an evacuation. The door is heavy. What do you do?", choices: [{ key: "A", label: "Leave it — it's too heavy to close quickly" }, { key: "B", label: "Close it — every door matters" }, { key: "C", label: "Leave it half-open" }, { key: "D", label: "Only close it if it's a fire door" }], correctKey: "B", feedbackOk: "Correct. Every door closed counts. A standard interior door can delay fire for several minutes.", feedbackKo: "Every door you close adds minutes of protection to evacuation routes. Even a non-fire-rated door slows smoke and heat spread." },
    ],
    locked: false,
  },

  {
    id: "ch2-m4",
    chapter: 2,
    number: 4,
    title: "Ensuring no one remains",
    subtitle: "Quick and safe zone verification",
    description: "Floor sweep techniques before final evacuation. What to do if someone is found, missing or refuses to move.",
    objective: "Quickly and safely verify that no one remains in a zone before evacuating.",
    learningObjectives: {
      savoir: "The quick zone verification method before final evacuation",
      savoirFaire: "Visually sweep an area and report any presence to the responsible person",
      savoirEtre: "Leave no one behind — without ever putting your own life at risk",
    },
    duration: "8 min",
    image: `${CDN}b5ca9823c0ba42e492f17a707fd14708?format=webp&width=800`,
    funFacts: [
      { stat: "3", label: "seconds to check a room", detail: "A rapid visual sweep from the doorway takes 3 seconds. You don't need to enter — look left, look right, call out if needed. Then close the door and move on.", icon: "eye" },
      { stat: "0", label: "the number of times to re-enter alone", detail: "Never re-enter a building alone to search for someone. Report to fire services immediately — it's their mission and they have equipment.", icon: "shield" },
    ],
    keyPoints: [
      "Verify from the doorway — no need to enter",
      "If someone is found: guide them or signal to security",
      "Never re-enter alone — report to fire services",
    ],
    preTest: [
      { question: "To check if a room is empty, you should:", choices: [{ key: "A", label: "Enter and check every corner" }, { key: "B", label: "Check from the doorway — look and call out" }, { key: "C", label: "Trust the badge system" }], correctKey: "B" },
      { question: "A colleague is missing at the assembly point. Your first action:", choices: [{ key: "A", label: "Go back in to find them" }, { key: "B", label: "Report to fire services with their name and usual location" }, { key: "C", label: "Call their mobile" }], correctKey: "B" },
    ],
    content: [
      { type: "intro", title: "Verify — without risking yourself", body: "Before declaring a floor clear, a rapid visual check is essential. But the rule is absolute: verify from the doorway, never enter a room where fire or smoke is present. Your safety takes priority." },
      { type: "info", title: "The 3-second doorway sweep", body: "From the doorway: look left, look right, call out loudly ('Anyone here? Evacuation!'). Wait 2 seconds for a response. If clear: close the door and move on. If someone is there: guide them out.", bullets: ["Stand at the doorway — do not enter", "Look left, look right", "Call out loudly and wait 2 seconds", "Clear: close door and continue", "Someone there: guide out, close door"] },
      { type: "scenario", title: "Scenario: a missing colleague", body: "At the assembly point, you count 23 people. There should be 25. Two colleagues are missing. One never came in today (confirmed). The other, Marc, is usually on the 4th floor. The building is still evacuating. What do you do? Report to the fire service team leader: 'One person unaccounted for: Marc Durand, 4th floor, zone B. Last badge entry: 9:15am.'" },
    ],
    quiz: [
      { id: "q1", question: "You reach a room — the door is warm to the touch. What do you do?", choices: [{ key: "A", label: "Open the door slowly to check" }, { key: "B", label: "Do not open — hot door means fire on the other side. Report to fire services." }, { key: "C", label: "Call out through the door" }, { key: "D", label: "Leave immediately without reporting" }], correctKey: "B", feedbackOk: "Correct. A warm door means fire is on the other side. Never open it — report to fire services.", feedbackKo: "A warm door is a critical warning signal. Do not open. Report to fire services with the location." },
    ],
    locked: false,
  },

  {
    id: "ch2-m5",
    chapter: 2,
    number: 5,
    title: "Facing smoke",
    subtitle: "Staying safe in a smoke-filled environment",
    description: "Behavior of smoke: where it goes, what it contains, how to move through it. Low position technique and respiratory protection.",
    objective: "Move safely through a smoke-filled environment using the correct techniques.",
    learningObjectives: {
      savoir: "Smoke behavior, its toxicity and effects on the body",
      savoirFaire: "Move in a low position and protect your airways",
      savoirEtre: "Resist panic and maintain a slow, controlled pace",
    },
    duration: "7 min",
    image: `${CDN}cc5ab29f9fd543a2aff682cdd54297ad?format=webp&width=800`,
    funFacts: [
      { stat: "3min", label: "to lose consciousness in smoke", detail: "Fire smoke contains carbon monoxide, CO2 and toxic gases. Within 3 minutes of exposure in a heavily smoke-filled area, loss of consciousness is possible.", icon: "alert" },
      { stat: "60%", label: "of deaths by intoxication", detail: "More than 60% of fire victims die from smoke inhalation, not from flames. Escaping smoke is the absolute priority — even if you don't see visible fire.", icon: "flame" },
    ],
    keyPoints: [
      "Smoke rises at 30m/min — always go down",
      "Stay below 1.8m — air is more breathable near the floor",
      "Protect airways with a damp cloth if possible",
    ],
    preTest: [
      { question: "In a smoke-filled corridor, you should:", choices: [{ key: "A", label: "Run upright as fast as possible" }, { key: "B", label: "Stay low and move quickly" }, { key: "C", label: "Stay still and wait for help" }], correctKey: "B" },
      { question: "Smoke rises at approximately:", choices: [{ key: "A", label: "5 meters per minute" }, { key: "B", label: "30 meters per minute" }, { key: "C", label: "100 meters per minute" }], correctKey: "B" },
    ],
    content: [
      { type: "intro", title: "The invisible enemy", body: "Fire smoke is more dangerous than the flames. It contains: carbon monoxide (CO) — odorless and lethal, CO2 — displaces oxygen, hydrogen cyanide and other toxic gases from burning materials. At high concentrations, 3-5 breaths can be fatal." },
      { type: "info", title: "How smoke behaves", body: "Smoke rises vertically at approximately 30 meters per minute. In a 6-floor building, upper floors fill in 2 minutes. Smoke then spreads horizontally through corridors, ventilation shafts and under doors. It always moves toward exits — which is why closing doors is critical.", bullets: ["Rises at 30m/min — upper floors fill first", "Spreads through corridors and air vents", "The 1.8m zone: air below is more breathable", "At 0.5m from the floor: significantly more oxygen"] },
      { type: "info", title: "Moving in smoke", body: "If you must cross a smoke-filled corridor: Stay below 1.8m (bend your knees or crawl). Protect your mouth and nose with a damp cloth if possible. Move quickly but without running (risk of falls). Touch doors before opening — if warm, do not open.", bullets: ["Bend knees or crawl — stay below 1.8m", "Cover mouth and nose with cloth (damp if possible)", "Keep one hand on the wall to maintain direction", "Touch every door before opening — warm = don't open"] },
    ],
    quiz: [
      { id: "q1", question: "A corridor is filled with smoke to waist height. What is the safest position?", choices: [{ key: "A", label: "Stand upright and run" }, { key: "B", label: "Crouch below the smoke line and move quickly" }, { key: "C", label: "Crawl on all fours" }, { key: "D", label: "Go back — another route" }], correctKey: "B", feedbackOk: "Correct. Below the smoke line, air quality is significantly better. Move quickly but don't run.", feedbackKo: "Moving crouched below the smoke level is safest. If smoke is floor level, use option D (find another route) if possible." },
    ],
    locked: false,
  },

  {
    id: "ch2-m6",
    chapter: 2,
    number: 6,
    title: "Stairs or safe space",
    subtitle: "Never the elevator — always the emergency stairs",
    description: "Interactive floor plan of an IBM floor. Exercise to choose the correct evacuation route.",
    objective: "Find the correct evacuation route quickly.",
    learningObjectives: {
      savoir: "Vertical evacuation rules and safe waiting areas",
      savoirFaire: "Use only the emergency stairs — never the elevator",
      savoirEtre: "Respect the flow, don't rush, help people with reduced mobility",
    },
    duration: "7 min",
    image: `${CDN}48e0cc79ee294fbbaf81f10232959ffb?format=webp&width=800`,
    funFacts: [
      { stat: "100%", label: "of elevator deaths during fires are preventable", detail: "Elevators during a fire are a trap: power cut, smoke entry, doors jamming. Stairs are always the only option.", icon: "alert" },
      { stat: "4×", label: "slower evacuation by elevator", detail: "Average elevator evacuation is 4 times slower than ordered staircase evacuation.", icon: "clock" },
    ],
    keyPoints: [
      "NEVER use the elevator during a fire — it is a death trap",
      "Emergency stairwells are fire-rated — they are safe for 30+ minutes",
      "Safe waiting spaces (EWS) exist for people with reduced mobility",
    ],
    preTest: [
      { question: "During a fire evacuation, you must:", choices: [{ key: "A", label: "Use the elevator to save time" }, { key: "B", label: "Use the emergency stairs only" }, { key: "C", label: "Use any staircase" }], correctKey: "B" },
      { question: "A colleague uses a wheelchair. The stairwell is the only exit. What do you do?", choices: [{ key: "A", label: "Carry them down the stairs" }, { key: "B", label: "Take them to the safe waiting space and call 777" }, { key: "C", label: "Leave them — they'll be found later" }], correctKey: "B" },
    ],
    content: [
      { type: "intro", title: "Why never the elevator?", body: "During a fire: elevator shafts act as chimneys for smoke, power failure can trap people between floors, doors can open on the floor where the fire is, and heat can warp the mechanism. Emergency stairs are the ONLY safe exit during a fire." },
      { type: "info", title: "Emergency stairwells", body: "IBM emergency stairwells are fire-rated compartments, designed to remain safe for 30 minutes minimum. They have: self-closing fire doors, emergency lighting, air pressure systems to prevent smoke entry. Use them calmly, without running, staying to the right.", bullets: ["Self-closing fire doors — close behind you", "Emergency lighting — stays on even during power failure", "Stay right — leave space for fire services going up", "No running — fall risk in stairwells"] },
      { type: "info", title: "People with reduced mobility", body: "People with reduced mobility cannot use stairs. IBM has designated Emergency Waiting Spaces (EWS) on each floor — usually on stairwell landings. Take the person there, call 777, give their name and location. Never attempt to carry someone down stairs without specific training.", bullets: ["EWS: marked on all floor evacuation plans", "Take the person to the EWS on the nearest landing", "Call 777 with name, floor, location", "Fire services are equipped and trained for this"] },
    ],
    quiz: [
      { id: "q1", question: "You're on the 8th floor. The elevator is working. The fire is on floor 2. What do you do?", choices: [{ key: "A", label: "Use the elevator — fire is far away" }, { key: "B", label: "Use the emergency stairs — elevator is forbidden" }, { key: "C", label: "Wait on floor 8 for the all-clear" }, { key: "D", label: "Use the service staircase" }], correctKey: "B", feedbackOk: "Correct. Elevator is forbidden during any fire evacuation — regardless of where the fire is.", feedbackKo: "The elevator is ALWAYS forbidden during a fire, even if it seems far away. The fire can spread to the shaft, power can cut at any time." },
    ],
    locked: false,
  },

  {
    id: "ch2-m7",
    chapter: 2,
    number: 7,
    title: "Full evacuation procedure",
    subtitle: "Final timed simulation",
    description: "Final timed scenario: alarm, smoke, colleagues, doors, stairs, assembly point. Final score.",
    objective: "Validate the full IBM evacuation procedure in a simulated situation.",
    learningObjectives: {
      savoir: "The complete IBM evacuation procedure from A to Z",
      savoirFaire: "Execute all steps in the correct order under time pressure",
      savoirEtre: "Coordination, sense of responsibility and leadership in a real situation",
    },
    duration: "12 min",
    image: `${CDN}2ee3c4ada85544aa87e2f4f440dc1a94?format=webp&width=800`,
    funFacts: [
      { stat: "85%", label: "reduction in death risk with training", detail: "A well-executed and regularly practiced fire training reduces the risk of death by 85% in a real situation.", icon: "shield" },
      { stat: "14 modules", label: "to be fully operational", detail: "You are completing the 14 IBM modules. Every reflex learned here can make the difference between a successful evacuation and a tragedy.", icon: "zap" },
    ],
    keyPoints: [
      "Alarm → EXIT → CLOSE → assembly point — in this order, every time",
      "At the assembly point: stay, count, report to fire services",
      "Never return to the building until authorized by security",
    ],
    preTest: [
      { question: "During a full evacuation, after exiting the building, you should:", choices: [{ key: "A", label: "Go home — you're safe" }, { key: "B", label: "Go to the assembly point and stay there" }, { key: "C", label: "Wait near the entrance" }], correctKey: "B" },
      { question: "You are authorized to re-enter the building when:", choices: [{ key: "A", label: "You decide the danger has passed" }, { key: "B", label: "IBM Security or fire services give authorization" }, { key: "C", label: "After 30 minutes" }], correctKey: "B" },
    ],
    content: [
      { type: "intro", title: "The final test", body: "This final module brings together everything from both chapters: alarm activation, guidance of colleagues, door closure, staircase use, and assembly point procedure. A complete evacuation is measured in minutes — every step matters." },
      { type: "list", title: "Complete IBM evacuation checklist", body: "The 8 steps of a complete IBM evacuation:", bullets: ["1. HEAR the alarm — treat it as real", "2. ALERT 777 with your exact location", "3. GUIDE colleagues near you toward the exit", "4. EXIT your zone immediately", "5. CLOSE every door behind you", "6. DESCEND via emergency stairs only", "7. ASSEMBLE at the designated assembly point", "8. REPORT: count people, report missing to security"] },
      { type: "scenario", title: "Final simulation scenario", body: "10:30am. The general alarm triggers. You are on the 5th floor with 8 colleagues including a visitor and someone with a mobility issue. The corridor has light smoke. An exit is 20m away. Two doors separate you from the stairs. You have 90 seconds to get everyone out safely. What is your exact sequence of actions?" },
    ],
    quiz: [
      { id: "q1", question: "After hearing the alarm, what are the first TWO actions in order?", choices: [{ key: "A", label: "Grab your belongings, then evacuate" }, { key: "B", label: "Alert 777, then guide colleagues to exit" }, { key: "C", label: "Go to the assembly point, then call 777" }, { key: "D", label: "Check the fire, then alert" }], correctKey: "B", feedbackOk: "Correct. Alert (777) then guide. Never grab belongings before evacuating.", feedbackKo: "The correct order: alert 777 (location) → guide colleagues to exit. Never stop for belongings." },
      { id: "q2", question: "At the assembly point, a manager says 'the alarm was false, we can go back in'. What do you do?", choices: [{ key: "A", label: "Follow the manager's instructions" }, { key: "B", label: "Re-enter only when IBM Security or fire services authorize it" }, { key: "C", label: "Wait 15 minutes then re-enter" }, { key: "D", label: "Call the building manager to confirm" }], correctKey: "B", feedbackOk: "Correct. Only IBM Security or the fire services can authorize re-entry. No exceptions, even from management.", feedbackKo: "Only IBM Security or the fire services can authorize re-entry. A manager — no matter their level — cannot override this rule during an emergency." },
    ],
    locked: false,
  },
];

export function getModuleByIdEn(id: string): CourseModule | undefined {
  return MODULES_EN.find((m) => m.id === id);
}

export function getChapterModulesEn(chapter: 1 | 2): CourseModule[] {
  return MODULES_EN.filter((m) => m.chapter === chapter);
}
