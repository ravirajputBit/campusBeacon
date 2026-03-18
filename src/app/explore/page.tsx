"use client";

import { motion } from "framer-motion";
import { Coffee, Library, Trophy, Users, ArrowUpRight, Star } from "lucide-react";
import { locations } from "@/data/mockData";
import Link from "next/link";
import toast from "react-hot-toast";

const categories = [
  { name: "Academic", icon: Library, color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/20", type: "academic" },
  { name: "Cafeteria", icon: Coffee, color: "text-orange-400", bg: "bg-orange-400/10", border: "border-orange-400/20", type: "food" },
  { name: "Sports", icon: Trophy, color: "text-green-400", bg: "bg-green-400/10", border: "border-green-400/20", type: "sports" },
  { name: "Utility", icon: Users, color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/20", type: "utility" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function ExplorePage() {
  const featuredSpots = locations.filter(l => l.type !== 'administrative');

  return (
    <div className="space-y-12 pb-20">
      <header className="space-y-4">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
          Explore Campus
        </h1>
        <p className="text-gray-400 max-w-2xl">
          Discover the best spots to study, eat, and relax. From quiet corners in the library to the buzzing cafeteria.
        </p>
      </header>

      {/* Category Grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <Link href={`/map?filter=${cat.type}`} key={cat.name}>
            <motion.div
              whileHover={{ y: -5, scale: 1.05 }}
              className={`backdrop-blur-lg bg-white/10 rounded-xl shadow-xl p-6 transition border ${cat.border} cursor-pointer group h-full`}
            >
              <div className={`p-3 rounded-2xl bg-white/5 w-fit mb-4 group-hover:bg-white/10 transition-colors`}>
                <cat.icon className={`w-6 h-6 ${cat.color}`} />
              </div>
              <h3 className="font-bold text-lg text-white">{cat.name}</h3>
              <p className="text-xs text-gray-400 mt-1">Explore {cat.name} spots</p>
            </motion.div>
          </Link>
        ))}
      </section>

      {/* Featured Spots */}
      <section className="space-y-8">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-2xl font-bold flex items-center space-x-2">
            <Star className="w-6 h-6 text-yellow-500" />
            <span className="text-white">Top Rated Spots</span>
          </h2>
          <Link href="/map" className="text-sm text-blue-400 hover:text-blue-300 transition-colors flex items-center space-x-1">
            <span>View All</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {featuredSpots.map((spot) => (
            <Link href={`/map?location=${spot.id}`} key={spot.id}>
              <motion.div
                variants={item}
                whileHover={{ scale: 1.05 }}
                className="backdrop-blur-lg bg-white/10 rounded-xl shadow-xl overflow-hidden transition-all border border-white/10 group h-full"
              >
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent z-10" />
                  <img 
                    src={`https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=800&auto=format&fit=crop`} 
                    alt={spot.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute bottom-4 left-4 z-20">
                    <span className="px-2 py-1 bg-blue-500 text-[10px] font-bold rounded uppercase tracking-wider text-white">
                      {spot.type}
                    </span>
                  </div>
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="font-bold text-xl text-white group-hover:text-blue-400 transition-colors">{spot.name}</h3>
                  <div className="flex items-center text-sm text-gray-400 space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>{spot.block}</span>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="flex items-center space-x-1 text-yellow-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-bold">4.8</span>
                    </div>
                    <span className="text-xs text-blue-400 font-semibold group-hover:underline">Visit Map →</span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </section>

      {/* Events Section */}
      <section className="backdrop-blur-lg bg-white/10 rounded-xl shadow-xl p-12 text-center space-y-6 relative overflow-hidden border border-white/10 hover:scale-[1.01] transition">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_120%,rgba(59,130,246,0.2),transparent)] pointer-events-none" />
        <h2 className="text-3xl font-bold text-white">Campus Events</h2>
        <p className="text-gray-400 max-w-xl mx-auto">
          Check out what&apos;s happening around campus. Join workshops, sports tournaments, and club meetups.
        </p>
        <button 
          onClick={() => toast.success("Event Calendar coming soon!", { icon: '📅' })}
          className="px-8 py-3 bg-white text-slate-900 font-bold rounded-2xl hover:bg-gray-200 transition-all shadow-xl hover:shadow-white/20 active:scale-95"
        >
          View Event Calendar
        </button>
      </section>
    </div>
  );
}
