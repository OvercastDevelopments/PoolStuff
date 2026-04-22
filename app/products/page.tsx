import type { Metadata } from "next";
import ProductsCatalog, { type Product } from "./ProductsCatalog";

export const metadata: Metadata = {
  title: "Commercial Products — PoolStuff",
  description: "Commercial pool products — from accessibility equipment and water treatment to water park equipment and safety gear.",
};

const products: Product[] = [
  { name: "ADA-Compliant Pool Lift", category: "Accessibility Equipment", price: "Contact for quote", blurb: "Battery-powered pool lift meeting ADA accessibility standards for public and semi-public pools." },
  { name: "Accessible Pool Steps & Rails", category: "Accessibility Equipment", price: "Contact for quote", blurb: "Stainless-steel entry steps with dual grab rails for safe, assisted pool access." },

  { name: "Aqua Dumbbells Set", category: "Aquarobics", price: "$129", blurb: "High-density foam water dumbbells — complete set for aquatic fitness classes." },
  { name: "Aqua Jogger Flotation Belt", category: "Aquarobics", price: "$49", blurb: "Deep-water running belt for low-impact aquatic exercise programs." },

  { name: "Competition Starting Blocks", category: "Aquatic Facility Equipment", price: "Contact for quote", blurb: "FINA-approved stainless starting blocks with non-slip top and track-start wedge." },
  { name: "Racing Lane Ropes (25m)", category: "Aquatic Facility Equipment", price: "$599", blurb: "Wave-killing lane ropes with stainless cable and colour-coded floats." },

  { name: "Empex Aqua Mushroom", category: "Empex Water Park Equipment", price: "Contact for quote", blurb: "Iconic Empex mushroom water feature — a splash-pad centrepiece for zero-entry pools." },
  { name: "Empex Splash Slide Set", category: "Empex Water Park Equipment", price: "Contact for quote", blurb: "Modular Empex slide structures for commercial water play areas." },

  { name: "Thermal Pool Blanket", category: "Pool Blankets and Winders", price: "Contact for quote", blurb: "Heat-retaining bubble blanket cut to size — reduces evaporation and heating costs." },
  { name: "Automatic Blanket Winder", category: "Pool Blankets and Winders", price: "Contact for quote", blurb: "Electric reel system for single-operator blanket deployment on commercial pools." },

  { name: "Commercial Pole & Net Set", category: "Pool Cleaning & Maintenance", price: "$189", blurb: "24ft telescoping pole with heavy-duty deep-bag skim net for commercial use." },
  { name: "Tile & Scale Brush Kit", category: "Pool Cleaning & Maintenance", price: "$89", blurb: "Stainless and nylon brush set for tile line, waterline scale, and plaster surfaces." },

  { name: "Dolphin Wave 300 XL Robot", category: "Pool Vacuums", price: "Contact for quote", blurb: "Heavy-duty commercial robotic cleaner for pools up to 50m in length." },
  { name: "Suction-Side Vacuum Head", category: "Pool Vacuums", price: "$79", blurb: "Weighted vacuum head with wheels for manual vacuuming of commercial pools." },

  { name: "Kickboard Bundle (20-pack)", category: "Swim School Equipment", price: "$249", blurb: "Durable EVA foam kickboards sized for learn-to-swim programs." },
  { name: "Swim Teaching Platform", category: "Swim School Equipment", price: "Contact for quote", blurb: "Height-adjustable in-water platform for instructor-led lessons in deep water." },

  { name: "Heavy-Duty Wash Down Hose", category: "Wash Down Hoses", price: "$149", blurb: "Commercial-grade rubber wash down hose with brass fittings — 30m length." },
  { name: "Quick-Release Hose Reel", category: "Wash Down Hoses", price: "$299", blurb: "Wall-mounted retractable hose reel for deck and plant-room wash down." },

  { name: "Waterpolo Goal Set", category: "Waterpolo Equipment", price: "Contact for quote", blurb: "FINA-spec floating waterpolo goals with reinforced netting and anchoring kit." },
  { name: "Waterpolo Ball Set (6-pack)", category: "Waterpolo Equipment", price: "$229", blurb: "Match-grade waterpolo balls — men's and women's sizes available." },

  { name: "Reach Pole & Rescue Tube", category: "Water Safety Programme Equipment", price: "$159", blurb: "Shepherd's crook reach pole paired with a buoyant rescue tube." },
  { name: "Facility First-Aid Kit", category: "Water Safety Programme Equipment", price: "$189", blurb: "Comprehensive aquatic facility first-aid kit meeting health-code requirements." },

  { name: "Inflatable Obstacle Course", category: "Water Toys", price: "Contact for quote", blurb: "Commercial-grade inflatable obstacle run for pool open days and events." },
  { name: "Pool Noodles (Bulk 50-pack)", category: "Water Toys", price: "$129", blurb: "Commercial-density foam pool noodles for play and aquatic fitness." },

  { name: "Chlorine Dosing System", category: "Water Treatment Equipment", price: "Contact for quote", blurb: "Automatic liquid chlorine dosing pump with ORP sensor integration." },
  { name: "pH Controller", category: "Water Treatment Equipment", price: "Contact for quote", blurb: "Digital pH controller with acid dosing pump — maintains balance automatically." },

  { name: "Lifeguard Observation Chair", category: "Life Guarding & Safety Equipment", price: "Contact for quote", blurb: "Elevated stainless-steel lifeguard chair with umbrella mount and equipment tray." },
  { name: "Rescue Ring Buoy", category: "Life Guarding & Safety Equipment", price: "$89", blurb: "Coast Guard-approved ring buoy with 30ft throw line and wall bracket." },
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

      <ProductsCatalog products={products} />
    </>
  );
}
