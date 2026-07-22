import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

type SeedCategory = {
  name: string;
  heroTitle: string;
  heroBlurb: string;
  description?: string;
  subcategories: { name: string; icon?: string; blurb?: string }[];
};

const seedCategories: SeedCategory[] = [
  {
    name: "Accessibility",
    heroTitle: "Accessibility",
    heroBlurb:
      "Code-compliant accessibility equipment for commercial pools and aquatic facilities — Paramobility and SR Smith hoists, wheelchairs, steps, and genuine parts.",
    subcategories: [
      { name: "Paramobility Hoists", icon: "🏗️", blurb: "Aqualift and Easi-Lift hoists for accessible pool entry." },
      { name: "Paramobility Wheelchairs", icon: "♿", blurb: "Aquatic and beach wheelchairs built for wet-area and outdoor use." },
      { name: "Paramobility Platypus Steps & Changing Table", icon: "🪜", blurb: "Modular pool entry steps and adjustable changing tables." },
      { name: "Paramobility Parts", icon: "🔧", blurb: "Genuine Paramobility replacement batteries, slings, and service parts." },
      { name: "SR Smith Hoists", icon: "🏗️", blurb: "SR Smith PAL and Multilift pool lifts for fixed and portable installs." },
      { name: "SR Smith Parts", icon: "🔧", blurb: "Genuine SR Smith batteries, slings, and service-replacement parts." },
    ],
  },
  {
    name: "Aquarobics",
    heroTitle: "Aquarobics",
    heroBlurb:
      "Water-based fitness equipment for aquatic programs — joggers, dumbbells, barbells, and noodles built to handle commercial use.",
    subcategories: [
      { name: "Aquajoggers", icon: "🏃", blurb: "Flotation belts for deep-water running and low-impact aquatic exercise." },
      { name: "Dumbbell Medium Resistance", icon: "🏋️", blurb: "Medium-density foam water dumbbells for most aquarobics classes." },
      { name: "Dumbbell Heavy Resistance", icon: "💪", blurb: "Maximum-density water dumbbells for advanced strength training." },
      { name: "Barbell Long Bar", icon: "⚖️", blurb: "Floating long-bar aquatic barbells for compound resistance work." },
      { name: "Aquastix Noodles", icon: "🌊", blurb: "Flexible, buoyant aquatic exercise noodles for class programs." },
    ],
  },
  {
    name: "Lane Rope & Accessories",
    heroTitle: "Lane Rope & Accessories",
    heroBlurb:
      "Competition-grade lane ropes, Storeels storage caddies, and the stainless hardware to install them — everything for lap pools and aquatic centres.",
    subcategories: [
      { name: "Lane Ropes", icon: "〰️", blurb: "Wave-killing competition lane ropes in standard and custom lengths." },
      { name: "Storeels Caddy", icon: "🛒", blurb: "Storeels mobile caddies and reels for easy lane rope storage and deployment." },
      { name: "Hardware & Fittings", icon: "🔩", blurb: "Anchor hooks, tensioning cleats, and stainless fittings for lane rope installs." },
    ],
  },
  {
    name: "Lifeguard Equipment",
    heroTitle: "Lifeguard Equipment",
    heroBlurb:
      "Everything your lifeguards need — from rescue tools and uniforms to spinal equipment, training manikins, and observation chairs.",
    subcategories: [
      { name: "Rescue Equipment", icon: "🛟", blurb: "Reach poles, rescue tubes, throw bags, and ring buoys." },
      { name: "Lifeguard Gear", icon: "🦺", blurb: "Uniforms, whistles, caps, and personal kit for lifeguards." },
      { name: "Spinal Equipment", icon: "🩺", blurb: "Spinal boards, head immobilisers, and cervical collars." },
      { name: "First Aid", icon: "🩹", blurb: "First-aid kits and wall-mounted cabinets for aquatic facilities." },
      { name: "Rescue Manikins", icon: "🧍", blurb: "CPR training and in-water rescue manikins for staff training." },
      { name: "Lifeguard Chairs", icon: "🪑", blurb: "Elevated observation chairs and mobile lifeguard stands." },
    ],
  },
  {
    name: "Pool Cleaning",
    heroTitle: "Pool Cleaning",
    heroBlurb:
      "From commercial Dolphin robots to manual vacs and genuine spare parts — everything you need to keep your pool spotless.",
    subcategories: [
      { name: "Commercial Robotic Cleaners", icon: "🤖", blurb: "Heavy-duty Dolphin robotic cleaners built for commercial pool environments." },
      { name: "Manual Vacs", icon: "🧹", blurb: "Manual vacuum heads, plates, and hoses for hands-on pool cleaning." },
      { name: "Vac Parts & Cleaning", icon: "🧽", blurb: "Poles, nets, brushes, and replacement parts to keep your cleaning kit working." },
      { name: "Robotic Parts", icon: "⚙️", blurb: "Genuine Dolphin replacement parts — brushes, filters, drive motors, and more." },
    ],
  },
  {
    name: "Pool Cover & Reels",
    heroTitle: "Pool Cover & Reels",
    heroBlurb: "Thermal covers and automatic reels for commercial pools.",
    subcategories: [],
  },
  {
    name: "Pool Deck Equipment",
    heroTitle: "Pool Deck Equipment",
    heroBlurb:
      "Hard-wearing equipment for the area around your pool — clocks, grating, signage, changing-room fittings, and backstroke gear.",
    subcategories: [
      { name: "Clocks", icon: "⏱️", blurb: "Pace clocks and digital race clocks for training and competition." },
      { name: "Grating", icon: "🔲", blurb: "Polymer pool edge and channel drainage grating — UV-stable and anti-slip." },
      { name: "Pool Side Signage", icon: "🪧", blurb: "Compliance-ready depth markers, rules, and safety signage." },
      { name: "Changing Rooms & Poolside", icon: "🚿", blurb: "Stainless benches, foot wash stations, and wet-area fittings." },
      { name: "Backstroke Fittings", icon: "🚩", blurb: "FINA-spec backstroke flags, poles, and deck mounts for competition pools." },
    ],
  },
  {
    name: "Starting Blocks",
    heroTitle: "Starting Blocks",
    heroBlurb:
      "ANTI Wave starting blocks, track-start models, covers, and backstroke ledges — competition-ready hardware for serious aquatic facilities.",
    subcategories: [
      { name: "ANTI 600", icon: "🏁", blurb: "ANTI Wave 600 starting blocks — reliable, FINA-compliant entry-level competition blocks." },
      { name: "ANTI 750 Track Start", icon: "🏃", blurb: "ANTI Wave 750 blocks with integrated adjustable track-start wedge." },
      { name: "ANTI WAVE 800 Track start", icon: "🌊", blurb: "Top-tier ANTI Wave 800 Track Start blocks — international competition-grade." },
      { name: "Start Block Covers", icon: "🛡️", blurb: "UV-stable vinyl covers and custom sponsor covers for starting blocks." },
      { name: "Anti Back Stroke Ledges", icon: "🔙", blurb: "Fixed and adjustable ANTI backstroke start ledges — FINA-approved for competition." },
    ],
  },
  {
    name: "Swim School & Water Safety",
    heroTitle: "Swim School & Water Safety",
    heroBlurb:
      "Equipment for swim schools and learn-to-swim programs — kickboards, platforms, pull buoys, training fins, and foam drill aids.",
    subcategories: [
      { name: "Kickboard", icon: "🏊", blurb: "EVA foam kickboards for learn-to-swim, stroke training, and class programs." },
      { name: "Swim Platforms", icon: "🪜", blurb: "Adjustable in-water and portable floor platforms for instructor-led lessons." },
      { name: "Pool Buoy", icon: "🛟", blurb: "Pull buoys in adult and junior sizes for upper-body stroke training." },
      { name: "Flippers", icon: "🐠", blurb: "Training fins and junior swim flippers to build kick strength." },
      { name: "Foam Acesseries", icon: "🧽", blurb: "Foam dive bricks, lane indicator cones, and drill aids for swim programs." },
    ],
  },
  {
    name: "Water Testing",
    heroTitle: "Water Testing",
    heroBlurb:
      "PoolStuff is an authorized Lovibond service centre — photometers, meters, and reagents to keep your water analysis accurate and compliant.",
    subcategories: [
      { name: "Photometers", icon: "🔬", blurb: "Lovibond single- and multi-parameter photometers." },
      { name: "Ph, TDS Meters", icon: "📊", blurb: "Handheld digital pH, TDS, and conductivity meters for routine testing." },
      { name: "Reagents", icon: "💊", blurb: "Genuine Lovibond DPD, Phenol Red, and other reagent tablets." },
    ],
  },
  {
    name: "Watertoys",
    heroTitle: "Watertoys",
    heroBlurb:
      "Play equipment for commercial pools and aquatic facilities — from inflatable obstacle courses to Empex water features and waterpark tubes.",
    subcategories: [
      { name: "Fun Mats", icon: "🏄", blurb: "Inflatable obstacle courses and floating play mats." },
      { name: "Empex WaterToys", icon: "🍄", blurb: "Iconic Empex splash-pad features — mushrooms, domes, and interactive water play." },
      { name: "Water Park Tubes", icon: "🛟", blurb: "Single and double rider tubes for waterslides, lazy rivers, and raft rides." },
    ],
  },
];

type SeedProduct = {
  name: string;
  category: string;
  subcategory?: string;
  price: string;
  blurb: string;
  isNew?: boolean;
};

const seedProducts: SeedProduct[] = [
  // Accessibility
  { name: "Paramobility Aqualift Hoist", category: "Accessibility", subcategory: "Paramobility Hoists", price: "Contact for quote", blurb: "Paramobility battery-powered Aqualift hoist for compliant, dignified pool access." },
  { name: "Paramobility Easi-Lift Hoist", category: "Accessibility", subcategory: "Paramobility Hoists", price: "Contact for quote", blurb: "Paramobility Easi-Lift fixed-frame hoist for commercial aquatic facilities." },
  { name: "Paramobility Aquatic Wheelchair", category: "Accessibility", subcategory: "Paramobility Wheelchairs", price: "Contact for quote", blurb: "Corrosion-resistant Paramobility aquatic wheelchair built for pool deck and shower use." },
  { name: "Paramobility Beach Wheelchair", category: "Accessibility", subcategory: "Paramobility Wheelchairs", price: "Contact for quote", blurb: "Wide-tyre Paramobility beach wheelchair for sand, grass, and outdoor aquatic centres." },
  { name: "Paramobility Platypus Steps", category: "Accessibility", subcategory: "Paramobility Platypus Steps & Changing Table", price: "Contact for quote", blurb: "Paramobility Platypus modular pool entry steps — code-compliant accessibility steps with handrails." },
  { name: "Paramobility Changing Table", category: "Accessibility", subcategory: "Paramobility Platypus Steps & Changing Table", price: "Contact for quote", blurb: "Height-adjustable Paramobility changing table for accessible changing rooms." },
  { name: "Paramobility Replacement Battery", category: "Accessibility", subcategory: "Paramobility Parts", price: "Contact for quote", blurb: "Genuine Paramobility replacement battery pack for Aqualift and Easi-Lift hoists." },
  { name: "Paramobility Sling Set", category: "Accessibility", subcategory: "Paramobility Parts", price: "Contact for quote", blurb: "Replacement Paramobility hoist slings in standard and bariatric sizes." },
  { name: "SR Smith PAL Pool Lift", category: "Accessibility", subcategory: "SR Smith Hoists", price: "Contact for quote", blurb: "SR Smith PAL battery-powered pool lift — proven, code-compliant accessibility." },
  { name: "SR Smith Multilift", category: "Accessibility", subcategory: "SR Smith Hoists", price: "Contact for quote", blurb: "SR Smith Multilift portable pool lift for facilities with multiple pool entry points." },
  { name: "SR Smith Replacement Battery", category: "Accessibility", subcategory: "SR Smith Parts", price: "Contact for quote", blurb: "Genuine SR Smith battery pack for PAL and Multilift pool lifts." },
  { name: "SR Smith Lift Sling", category: "Accessibility", subcategory: "SR Smith Parts", price: "Contact for quote", blurb: "Replacement SR Smith lift sling — standard and bariatric sizes available." },

  // Aquarobics
  { name: "Aqua Jogger Flotation Belt", category: "Aquarobics", subcategory: "Aquajoggers", price: "$49", blurb: "Deep-water running belt for low-impact aquatic exercise programs." },
  { name: "Aqua Jogger Pro Belt", category: "Aquarobics", subcategory: "Aquajoggers", price: "$79", blurb: "Heavy-duty deep-water jogger belt with reinforced strap and extra buoyancy." },
  { name: "Aqua Dumbbells — Medium Resistance", category: "Aquarobics", subcategory: "Dumbbell Medium Resistance", price: "$129", blurb: "Medium-density foam water dumbbells — versatile resistance for most aquatic fitness classes." },
  { name: "Aqua Dumbbells — Heavy Resistance", category: "Aquarobics", subcategory: "Dumbbell Heavy Resistance", price: "$169", blurb: "Maximum-density foam water dumbbells for advanced aquatic strength training." },
  { name: "Aqua Barbell — Long Bar", category: "Aquarobics", subcategory: "Barbell Long Bar", price: "$189", blurb: "Floating long-bar aquatic barbell for compound water-based resistance work." },
  { name: "Aquastix Noodle Set", category: "Aquarobics", subcategory: "Aquastix Noodles", price: "$99", blurb: "Premium aquatic exercise noodles — flexible, buoyant, and class-ready in assorted colours." },

  // Lane Rope & Accessories
  { name: "Racing Lane Ropes (25m)", category: "Lane Rope & Accessories", subcategory: "Lane Ropes", price: "$599", blurb: "Wave-killing lane ropes with stainless cable and colour-coded floats." },
  { name: "Wave-Killer Lane Rope (50m)", category: "Lane Rope & Accessories", subcategory: "Lane Ropes", price: "$1,099", blurb: "Competition-grade 50m wave-killer lane rope with reinforced cable and disc inserts." },
  { name: "Storeels Lane Rope Caddy", category: "Lane Rope & Accessories", subcategory: "Storeels Caddy", price: "Contact for quote", blurb: "Storeels mobile aluminium caddy for storing and deploying lane ropes single-handed." },
  { name: "Storeels Mobile Reel — Compact", category: "Lane Rope & Accessories", subcategory: "Storeels Caddy", price: "Contact for quote", blurb: "Compact Storeels reel designed for smaller commercial lap pools and tight plant-room storage." },
  { name: "Lane Rope Anchor Hooks (Pair)", category: "Lane Rope & Accessories", subcategory: "Hardware & Fittings", price: "$59", blurb: "Stainless wall-mounted anchor hooks for safe, secure lane rope tensioning." },
  { name: "Stainless Tensioning Cleats", category: "Lane Rope & Accessories", subcategory: "Hardware & Fittings", price: "$39", blurb: "Heavy-duty 316 stainless tensioning cleats — replacement hardware for lane rope installs." },

  // Lifeguard Equipment
  { name: "Reach Pole & Rescue Tube", category: "Lifeguard Equipment", subcategory: "Rescue Equipment", price: "$159", blurb: "Shepherd's crook reach pole paired with a buoyant rescue tube." },
  { name: "Rescue Ring Buoy", category: "Lifeguard Equipment", subcategory: "Rescue Equipment", price: "$89", blurb: "Approved ring buoy with 30ft throw line and wall bracket." },
  { name: "Rescue Throw Bag", category: "Lifeguard Equipment", subcategory: "Rescue Equipment", price: "$79", blurb: "20m floating throw rope packed in a quick-deploy bag." },
  { name: "Lifeguard Uniform Pack", category: "Lifeguard Equipment", subcategory: "Lifeguard Gear", price: "$129", blurb: "Branded singlet, shorts, cap, and whistle pack — staff-ready for opening day." },
  { name: "Lifeguard Whistle & Lanyard Set", category: "Lifeguard Equipment", subcategory: "Lifeguard Gear", price: "$29", blurb: "Pealess safety whistles with breakaway lanyards — pack of 4." },
  { name: "Spinal Board with Head Blocks", category: "Lifeguard Equipment", subcategory: "Spinal Equipment", price: "Contact for quote", blurb: "Floating polyethylene spinal board, head immobiliser and 3-point strap kit." },
  { name: "Cervical Collar Set", category: "Lifeguard Equipment", subcategory: "Spinal Equipment", price: "$89", blurb: "Adjustable two-piece cervical collars in adult and paediatric sizes." },
  { name: "Aquatic Facility First-Aid Kit", category: "Lifeguard Equipment", subcategory: "First Aid", price: "$189", blurb: "Pool-deck first-aid kit with burns, lacerations, and CPR consumables." },
  { name: "Wall-Mounted First-Aid Cabinet", category: "Lifeguard Equipment", subcategory: "First Aid", price: "$329", blurb: "Lockable steel cabinet pre-stocked for a commercial aquatic facility." },
  { name: "CPR Training Manikin — Adult", category: "Lifeguard Equipment", subcategory: "Rescue Manikins", price: "$499", blurb: "Full-body adult CPR manikin with feedback indicator and carry case." },
  { name: "CPR Training Manikin — Junior", category: "Lifeguard Equipment", subcategory: "Rescue Manikins", price: "$429", blurb: "Junior-sized CPR training manikin for paediatric scenarios." },
  { name: "Submersible Rescue Manikin", category: "Lifeguard Equipment", subcategory: "Rescue Manikins", price: "Contact for quote", blurb: "Weighted, neutrally buoyant rescue manikin for in-water training drills." },
  { name: "Lifeguard Observation Chair", category: "Lifeguard Equipment", subcategory: "Lifeguard Chairs", price: "Contact for quote", blurb: "Elevated stainless-steel lifeguard chair with umbrella mount and equipment tray." },
  { name: "Mobile Beachfront Lifeguard Stand", category: "Lifeguard Equipment", subcategory: "Lifeguard Chairs", price: "Contact for quote", blurb: "Wheeled aluminium lifeguard stand for beach, river, and event use." },

  // Pool Cleaning
  { name: "Dolphin Wave 300 XL Robot", category: "Pool Cleaning", subcategory: "Commercial Robotic Cleaners", price: "Contact for quote", blurb: "Heavy-duty commercial robotic cleaner for pools up to 50m in length." },
  { name: "Dolphin M600 Commercial Robot", category: "Pool Cleaning", subcategory: "Commercial Robotic Cleaners", price: "Contact for quote", blurb: "Mid-size commercial robot with smart scanning and dual scrubbing brushes." },
  { name: "Manual Suction-Side Vacuum Head", category: "Pool Cleaning", subcategory: "Manual Vacs", price: "$79", blurb: "Weighted vacuum head with wheels for manual vacuuming of commercial pools." },
  { name: "Heavy-Duty Manual Vacuum Plate", category: "Pool Cleaning", subcategory: "Manual Vacs", price: "$129", blurb: "Wide-mouth vacuum plate with weighted base for deep-clean of larger pools." },
  { name: "Vacuum Hose — 15m Commercial", category: "Pool Cleaning", subcategory: "Manual Vacs", price: "$159", blurb: "Flexible 15m commercial vacuum hose with swivel cuffs and UV-stable jacket." },
  { name: "Commercial Pole & Net Set", category: "Pool Cleaning", subcategory: "Vac Parts & Cleaning", price: "$189", blurb: "24ft telescoping pole with heavy-duty deep-bag skim net for commercial use." },
  { name: "Tile & Scale Brush Kit", category: "Pool Cleaning", subcategory: "Vac Parts & Cleaning", price: "$89", blurb: "Stainless and nylon brush set for tile line, waterline scale, and plaster surfaces." },
  { name: "Replacement Hose Cuffs (Pack of 6)", category: "Pool Cleaning", subcategory: "Vac Parts & Cleaning", price: "$39", blurb: "Universal hose cuff replacements for commercial vacuum hose maintenance." },
  { name: "Dolphin Replacement Brush Set", category: "Pool Cleaning", subcategory: "Robotic Parts", price: "$89", blurb: "Genuine Maytronics replacement brushes — fits the Dolphin Wave and M-series." },
  { name: "Dolphin Replacement Cartridge Filter", category: "Pool Cleaning", subcategory: "Robotic Parts", price: "$59", blurb: "Genuine Maytronics ultra-fine cartridge filter for Dolphin commercial robots." },
  { name: "Dolphin Drive Motor Assembly", category: "Pool Cleaning", subcategory: "Robotic Parts", price: "Contact for quote", blurb: "Replacement drive motor for Dolphin commercial robotic cleaners — service-centre installation." },

  // Pool Deck Equipment
  { name: "Aquatic Pace Clock — Wall", category: "Pool Deck Equipment", subcategory: "Clocks", price: "$489", blurb: "Wall-mounted analog pace clock with high-contrast face for swim training and lap counting." },
  { name: "Digital Race Clock", category: "Pool Deck Equipment", subcategory: "Clocks", price: "Contact for quote", blurb: "Large-format digital race clock with remote start/stop and lap-display modes." },
  { name: "Pool Edge Grating", category: "Pool Deck Equipment", subcategory: "Grating", price: "Contact for quote", blurb: "UV-stable polymer pool edge grating — anti-slip, cut to length for any pool perimeter." },
  { name: "Polymer Channel Drainage Grating", category: "Pool Deck Equipment", subcategory: "Grating", price: "Contact for quote", blurb: "Heavy-duty channel drainage grating for pool decks and wet-area run-off." },
  { name: "Pool Signage Kit", category: "Pool Deck Equipment", subcategory: "Pool Side Signage", price: "$249", blurb: "Depth-marker, rules, and safety signage bundle that meets common compliance requirements." },
  { name: "Pool Depth Marker Set", category: "Pool Deck Equipment", subcategory: "Pool Side Signage", price: "$129", blurb: "High-visibility ceramic depth marker tiles — full set in metres and feet." },
  { name: "Stainless Poolside Bench", category: "Pool Deck Equipment", subcategory: "Changing Rooms & Poolside", price: "Contact for quote", blurb: "316 stainless-steel bench seat designed for wet changing-room and poolside environments." },
  { name: "Foot Wash Station", category: "Pool Deck Equipment", subcategory: "Changing Rooms & Poolside", price: "$589", blurb: "Stainless foot wash station with adjustable spray — keeps pool decks clean and compliant." },
  { name: "Backstroke Flag Set (5m)", category: "Pool Deck Equipment", subcategory: "Backstroke Fittings", price: "$129", blurb: "5m FINA-spec backstroke flags with stainless eyelets and weather-resistant pennants." },
  { name: "Adjustable Backstroke Pole", category: "Pool Deck Equipment", subcategory: "Backstroke Fittings", price: "$299", blurb: "Height-adjustable stainless backstroke pole with quick-release deck mount." },

  // Starting Blocks
  { name: "ANTI 600 Starting Block", category: "Starting Blocks", subcategory: "ANTI 600", price: "Contact for quote", blurb: "ANTI Wave 600 starting block — durable, FINA-compliant entry-level competition block." },
  { name: "ANTI 600 Base Plate Kit", category: "Starting Blocks", subcategory: "ANTI 600", price: "Contact for quote", blurb: "Stainless base plate and anchor hardware kit for ANTI 600 starting block installs." },
  { name: "ANTI 750 Track Start Block", category: "Starting Blocks", subcategory: "ANTI 750 Track Start", price: "Contact for quote", blurb: "ANTI Wave 750 starting block with integrated adjustable track-start wedge." },
  { name: "ANTI 750 Pedestal Frame", category: "Starting Blocks", subcategory: "ANTI 750 Track Start", price: "Contact for quote", blurb: "Replacement stainless pedestal frame for the ANTI 750 Track Start block." },
  { name: "ANTI WAVE 800 Track Start Block", category: "Starting Blocks", subcategory: "ANTI WAVE 800 Track start", price: "Contact for quote", blurb: "Top-tier ANTI Wave 800 Track Start block — FINA-approved for international competition." },
  { name: "ANTI 800 Top Plate Replacement", category: "Starting Blocks", subcategory: "ANTI WAVE 800 Track start", price: "Contact for quote", blurb: "Non-slip top plate replacement panel for the ANTI Wave 800 starting block." },
  { name: "Vinyl Start Block Cover", category: "Starting Blocks", subcategory: "Start Block Covers", price: "$159", blurb: "Heavy-duty UV-stable vinyl cover that protects starting blocks when not in use." },
  { name: "Branded Sponsor Block Cover", category: "Starting Blocks", subcategory: "Start Block Covers", price: "Contact for quote", blurb: "Custom-printed sponsor cover for race-day starting blocks — full-colour branding." },
  { name: "ANTI Backstroke Start Ledge", category: "Starting Blocks", subcategory: "Anti Back Stroke Ledges", price: "Contact for quote", blurb: "FINA-compliant ANTI backstroke start ledge — fixed-position model." },
  { name: "ANTI Adjustable Backstroke Ledge", category: "Starting Blocks", subcategory: "Anti Back Stroke Ledges", price: "Contact for quote", blurb: "Quick-adjust ANTI backstroke ledge with height and angle settings for elite swimmers." },

  // Swim School & Water Safety
  { name: "Kickboard Bundle (20-pack)", category: "Swim School & Water Safety", subcategory: "Kickboard", price: "$249", blurb: "Durable EVA foam kickboards sized for learn-to-swim programs." },
  { name: "Premium Junior Kickboard", category: "Swim School & Water Safety", subcategory: "Kickboard", price: "$29", blurb: "Junior-sized contoured kickboard with secure hand-grip cut-out." },
  { name: "Swim Teaching Platform", category: "Swim School & Water Safety", subcategory: "Swim Platforms", price: "Contact for quote", blurb: "Height-adjustable in-water platform for instructor-led lessons in deep water." },
  { name: "Portable Adjustable Floor Platform", category: "Swim School & Water Safety", subcategory: "Swim Platforms", price: "Contact for quote", blurb: "Modular portable floor platform that raises water depth on demand for junior classes." },
  { name: "Adult Pull Buoy", category: "Swim School & Water Safety", subcategory: "Pool Buoy", price: "$39", blurb: "Foam pull buoy for upper-body swim training and stroke technique work." },
  { name: "Junior Pull Buoy", category: "Swim School & Water Safety", subcategory: "Pool Buoy", price: "$32", blurb: "Smaller-format pull buoy sized for junior swimmers." },
  { name: "Training Fins — Adult", category: "Swim School & Water Safety", subcategory: "Flippers", price: "$79", blurb: "Short-blade silicone training fins — build kick strength and ankle flexibility." },
  { name: "Junior Swim Flippers", category: "Swim School & Water Safety", subcategory: "Flippers", price: "$59", blurb: "Junior-sized swim flippers for learn-to-swim and stroke development classes." },
  { name: "Foam Diving Brick Set", category: "Swim School & Water Safety", subcategory: "Foam Acesseries", price: "$89", blurb: "Weighted foam dive bricks for retrieval drills and water-safety training." },
  { name: "Foam Lane Indicator Cones", category: "Swim School & Water Safety", subcategory: "Foam Acesseries", price: "$49", blurb: "High-visibility foam cones for marking lanes, drills, and obstacle courses." },

  // Water Testing
  { name: "Lovibond MD100 Photometer", category: "Water Testing", subcategory: "Photometers", price: "Contact for quote", blurb: "Single-parameter photometer for accurate, repeatable chlorine and pH testing." },
  { name: "Lovibond MD610 Multi-Parameter Photometer", category: "Water Testing", subcategory: "Photometers", price: "Contact for quote", blurb: "Premium multi-parameter Lovibond photometer for commercial pool water analysis." },
  { name: "Digital pH Meter", category: "Water Testing", subcategory: "Ph, TDS Meters", price: "$229", blurb: "Handheld digital pH meter with auto-calibration and IP67 waterproof body." },
  { name: "TDS / Conductivity Meter", category: "Water Testing", subcategory: "Ph, TDS Meters", price: "$189", blurb: "Pocket TDS and conductivity meter — essential for monitoring pool water balance." },
  { name: "DPD Test Tablets (250-pack)", category: "Water Testing", subcategory: "Reagents", price: "$39", blurb: "Genuine Lovibond DPD reagent tablets for free and total chlorine testing." },
  { name: "Phenol Red pH Tablets (250-pack)", category: "Water Testing", subcategory: "Reagents", price: "$35", blurb: "Lovibond Phenol Red tablets for fast, accurate pH testing." },

  // Watertoys
  { name: "Inflatable Obstacle Course", category: "Watertoys", subcategory: "Fun Mats", price: "Contact for quote", blurb: "Commercial-grade inflatable obstacle run for pool open days and events." },
  { name: "Floating Action Mat", category: "Watertoys", subcategory: "Fun Mats", price: "$489", blurb: "Heavy-duty floating play mat — durable, anchored, and built for high-traffic use." },
  { name: "Empex Aqua Mushroom", category: "Watertoys", subcategory: "Empex WaterToys", price: "Contact for quote", blurb: "The iconic Empex mushroom water feature — a splash-pad centrepiece for zero-entry pools." },
  { name: "Empex Splash Dome", category: "Watertoys", subcategory: "Empex WaterToys", price: "Contact for quote", blurb: "Empex dome water feature with rain-effect spray for interactive aquatic play." },
  { name: "Single-Rider Water Park Tube", category: "Watertoys", subcategory: "Water Park Tubes", price: "$129", blurb: "Heavy-duty single-rider tube with reinforced handles for waterslide use." },
  { name: "Family Double Water Park Tube", category: "Watertoys", subcategory: "Water Park Tubes", price: "$189", blurb: "Two-person family tube for raft rides and lazy rivers — rated for commercial use." },
];

async function main() {
  console.log("Seeding categories and sub-categories…");

  const categoryIdByName = new Map<string, string>();
  const subcategoryIdByKey = new Map<string, string>();

  for (const [i, cat] of seedCategories.entries()) {
    const catRow = await prisma.category.upsert({
      where: { slug: slugify(cat.name) },
      update: {
        name: cat.name,
        heroTitle: cat.heroTitle,
        heroBlurb: cat.heroBlurb,
        description: cat.description ?? null,
        sortOrder: i,
      },
      create: {
        name: cat.name,
        slug: slugify(cat.name),
        heroTitle: cat.heroTitle,
        heroBlurb: cat.heroBlurb,
        description: cat.description ?? null,
        sortOrder: i,
      },
    });
    categoryIdByName.set(cat.name, catRow.id);

    for (const [j, sub] of cat.subcategories.entries()) {
      const subRow = await prisma.subcategory.upsert({
        where: { categoryId_slug: { categoryId: catRow.id, slug: slugify(sub.name) } },
        update: {
          name: sub.name,
          icon: sub.icon ?? null,
          blurb: sub.blurb ?? null,
          sortOrder: j,
        },
        create: {
          categoryId: catRow.id,
          name: sub.name,
          slug: slugify(sub.name),
          icon: sub.icon ?? null,
          blurb: sub.blurb ?? null,
          sortOrder: j,
        },
      });
      subcategoryIdByKey.set(`${cat.name}::${sub.name}`, subRow.id);
    }
  }

  console.log("Seeding products…");

  for (const [i, p] of seedProducts.entries()) {
    const categoryId = categoryIdByName.get(p.category);
    if (!categoryId) throw new Error(`Missing category for product: ${p.category}`);
    const subcategoryId = p.subcategory ? subcategoryIdByKey.get(`${p.category}::${p.subcategory}`) : null;
    if (p.subcategory && !subcategoryId) throw new Error(`Missing subcategory for product: ${p.category}::${p.subcategory}`);

    await prisma.product.upsert({
      where: { slug: slugify(p.name) },
      update: {
        name: p.name,
        categoryId,
        subcategoryId: subcategoryId ?? null,
        price: p.price,
        blurb: p.blurb,
        isNew: p.isNew ?? false,
        sortOrder: i,
      },
      create: {
        name: p.name,
        slug: slugify(p.name),
        categoryId,
        subcategoryId: subcategoryId ?? null,
        price: p.price,
        blurb: p.blurb,
        isNew: p.isNew ?? false,
        sortOrder: i,
      },
    });
  }

  console.log("Seeding admin user…");
  const username = process.env.ADMIN_USERNAME ?? "admin";
  const password = process.env.ADMIN_PASSWORD ?? "password";
  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.user.upsert({
    where: { username },
    update: {},
    create: {
      username,
      passwordHash,
      mustChangePassword: true,
    },
  });

  console.log(`Done. Admin username: ${username}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
