"use client";

import { motion } from "framer-motion";
import { Coffee, Library, Trophy, Users, ArrowUpRight, Star } from "lucide-react";
import { locations } from "@/data/mockData";
import Link from "next/link";

const categories = [
  { name: "Study Spots", icon: Library, color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/20" },
  { name: "Cafeteria", icon: Coffee, color: "text-orange-400", bg: "bg-orange-400/10", border: "border-orange-400/20" },
  { name: "Sports", icon: Trophy, color: "text-green-400", bg: "bg-green-400/10", border: "border-green-400/20" },
  { name: "Hangout", icon: Users, color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/20" },
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
          <motion.div
            key={cat.name}
            whileHover={{ y: -5, scale: 1.02 }}
            className={`p-6 rounded-3xl border ${cat.border} ${cat.bg} backdrop-blur-md cursor-pointer group transition-all`}
          >
            <div className={`p-3 rounded-2xl bg-white/5 w-fit mb-4 group-hover:bg-white/10 transition-colors`}>
              <cat.icon className={`w-6 h-6 ${cat.color}`} />
            </div>
            <h3 className="font-bold text-lg">{cat.name}</h3>
            <p className="text-xs text-gray-400 mt-1">12+ Locations</p>
          </motion.div>
        ))}
      </section>

      {/* Featured Spots */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center space-x-2">
            <Star className="w-6 h-6 text-yellow-500" />
            <span>Top Rated Spots</span>
          </h2>
          <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors flex items-center space-x-1">
            <span>View All</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {featuredSpots.map((spot) => (
            <motion.div
              key={spot.id}
              variants={item}
              whileHover={{ scale: 1.02 }}
              className="bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden group hover:bg-white/10 transition-all shadow-2xl"
            >
              {/* Image Placeholder */}
              <div className="h-48 bg-gradient-to-br from-slate-800 to-slate-900 relative">
                <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white flex items-center space-x-2">
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                  <span>4.8 Rating</span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  {spot.type === 'food' && <Coffee className="w-20 h-20" />}
                  {spot.type === 'utility' && <Library className="w-20 h-20" />}
                  {spot.type === 'sports' && <Trophy className="w-20 h-20" />}
                </div>
              </div>

              <div className="p-8 space-y-4">
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold text-white">{spot.name}</h3>
                  <p className="text-sm text-gray-400">{spot.block}, {spot.room}</p>
                </div>

                <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">
                  {spot.description || "A popular spot for students to gather and spend quality time between classes."}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {spot.services.slice(0, 3).map((service) => (
                    <span 
                      key={service}
                      className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-medium text-gray-300"
                    >
                      {service}
                    </span>
                  ))}
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-white/5">
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <Users className="w-4 h-4" />
                    <span>Popular now</span>
                  </div>
                  <Link 
                    href="/map" 
                    className="p-2 bg-blue-600 rounded-xl text-white hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 active:scale-95"
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Events Section */}
      <section className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-white/10 rounded-[3rem] p-12 text-center space-y-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_120%,rgba(59,130,246,0.2),transparent)] pointer-events-none" />
        <h2 className="text-3xl font-bold">Campus Events</h2>
        <p className="text-gray-400 max-w-xl mx-auto">
          Check out what&apos;s happening around campus. Join workshops, sports tournaments, and club meetups.
        </p>
        <button className="px-8 py-3 bg-white text-slate-900 font-bold rounded-2xl hover:bg-gray-200 transition-all shadow-xl hover:shadow-white/20 active:scale-95">
          View Event Calendar
        </button>
      </section>
    </div>
  );
}
