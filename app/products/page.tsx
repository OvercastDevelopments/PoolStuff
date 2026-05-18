import type { Metadata } from "next";
import { Suspense } from "react";
import ProductsCatalog, { type Product } from "./ProductsCatalog";

export const metadata: Metadata = {
  title: "Commercial Products — PoolStuff",
  description: "Commercial pool products — from accessibility equipment and water treatment to water park equipment and safety gear.",
};

const products: Product[] = [
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

  { name: "Aqua Jogger Flotation Belt", category: "Aquarobics", subcategory: "Aquajoggers", price: "$49", blurb: "Deep-water running belt for low-impact aquatic exercise programs." },
  { name: "Aqua Jogger Pro Belt", category: "Aquarobics", subcategory: "Aquajoggers", price: "$79", blurb: "Heavy-duty deep-water jogger belt with reinforced strap and extra buoyancy." },

  { name: "Aqua Dumbbells — Medium Resistance", category: "Aquarobics", subcategory: "Dumbbell Medium Resistance", price: "$129", blurb: "Medium-density foam water dumbbells — versatile resistance for most aquatic fitness classes." },
  { name: "Aqua Dumbbells — Heavy Resistance", category: "Aquarobics", subcategory: "Dumbbell Heavy Resistance", price: "$169", blurb: "Maximum-density foam water dumbbells for advanced aquatic strength training." },

  { name: "Aqua Barbell — Long Bar", category: "Aquarobics", subcategory: "Barbell Long Bar", price: "$189", blurb: "Floating long-bar aquatic barbell for compound water-based resistance work." },

  { name: "Aquastix Noodle Set", category: "Aquarobics", subcategory: "Aquastix Noodles", price: "$99", blurb: "Premium aquatic exercise noodles — flexible, buoyant, and class-ready in assorted colours." },

  { name: "Racing Lane Ropes (25m)", category: "Lane Rope & Accessories", subcategory: "Lane Ropes", price: "$599", blurb: "Wave-killing lane ropes with stainless cable and colour-coded floats." },
  { name: "Wave-Killer Lane Rope (50m)", category: "Lane Rope & Accessories", subcategory: "Lane Ropes", price: "$1,099", blurb: "Competition-grade 50m wave-killer lane rope with reinforced cable and disc inserts." },

  { name: "Storeels Lane Rope Caddy", category: "Lane Rope & Accessories", subcategory: "Storeels Caddy", price: "Contact for quote", blurb: "Storeels mobile aluminium caddy for storing and deploying lane ropes single-handed." },
  { name: "Storeels Mobile Reel — Compact", category: "Lane Rope & Accessories", subcategory: "Storeels Caddy", price: "Contact for quote", blurb: "Compact Storeels reel designed for smaller commercial lap pools and tight plant-room storage." },

  { name: "Lane Rope Anchor Hooks (Pair)", category: "Lane Rope & Accessories", subcategory: "Hardware & Fittings", price: "$59", blurb: "Stainless wall-mounted anchor hooks for safe, secure lane rope tensioning." },
  { name: "Stainless Tensioning Cleats", category: "Lane Rope & Accessories", subcategory: "Hardware & Fittings", price: "$39", blurb: "Heavy-duty 316 stainless tensioning cleats — replacement hardware for lane rope installs." },

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

  { name: "Thermal Pool Cover", category: "Pool Cover & Reels", price: "Contact for quote", blurb: "Heat-retaining bubble cover cut to size — reduces evaporation and heating costs." },
  { name: "Automatic Cover Reel", category: "Pool Cover & Reels", price: "Contact for quote", blurb: "Electric reel system for single-operator cover deployment on commercial pools." },

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

  { name: "Lovibond MD100 Photometer", category: "Water Testing", subcategory: "Photometers", price: "Contact for quote", blurb: "Single-parameter photometer for accurate, repeatable chlorine and pH testing." },
  { name: "Lovibond MD610 Multi-Parameter Photometer", category: "Water Testing", subcategory: "Photometers", price: "Contact for quote", blurb: "Premium multi-parameter Lovibond photometer for commercial pool water analysis." },

  { name: "Digital pH Meter", category: "Water Testing", subcategory: "Ph, TDS Meters", price: "$229", blurb: "Handheld digital pH meter with auto-calibration and IP67 waterproof body." },
  { name: "TDS / Conductivity Meter", category: "Water Testing", subcategory: "Ph, TDS Meters", price: "$189", blurb: "Pocket TDS and conductivity meter — essential for monitoring pool water balance." },

  { name: "DPD Test Tablets (250-pack)", category: "Water Testing", subcategory: "Reagents", price: "$39", blurb: "Genuine Lovibond DPD reagent tablets for free and total chlorine testing." },
  { name: "Phenol Red pH Tablets (250-pack)", category: "Water Testing", subcategory: "Reagents", price: "$35", blurb: "Lovibond Phenol Red tablets for fast, accurate pH testing." },

  { name: "Inflatable Obstacle Course", category: "Watertoys", subcategory: "Fun Mats", price: "Contact for quote", blurb: "Commercial-grade inflatable obstacle run for pool open days and events." },
  { name: "Floating Action Mat", category: "Watertoys", subcategory: "Fun Mats", price: "$489", blurb: "Heavy-duty floating play mat — durable, anchored, and built for high-traffic use." },

  { name: "Empex Aqua Mushroom", category: "Watertoys", subcategory: "Empex WaterToys", price: "Contact for quote", blurb: "The iconic Empex mushroom water feature — a splash-pad centrepiece for zero-entry pools." },
  { name: "Empex Splash Dome", category: "Watertoys", subcategory: "Empex WaterToys", price: "Contact for quote", blurb: "Empex dome water feature with rain-effect spray for interactive aquatic play." },

  { name: "Single-Rider Water Park Tube", category: "Watertoys", subcategory: "Water Park Tubes", price: "$129", blurb: "Heavy-duty single-rider tube with reinforced handles for waterslide use." },
  { name: "Family Double Water Park Tube", category: "Watertoys", subcategory: "Water Park Tubes", price: "$189", blurb: "Two-person family tube for raft rides and lazy rivers — rated for commercial use." },
];

export default function ProductsPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-sky-600 to-cyan-600 text-white">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <h1 className="text-4xl md:text-5xl font-extrabold">Commercial Products</h1>
          <p className="mt-4 text-sky-50 text-lg max-w-2xl">
            From accessibility and safety gear to water treatment, aquatic fitness, and water park equipment — everything a commercial pool facility needs.
          </p>
        </div>
      </section>

      <Suspense fallback={null}>
        <ProductsCatalog products={products} />
      </Suspense>
    </>
  );
}
