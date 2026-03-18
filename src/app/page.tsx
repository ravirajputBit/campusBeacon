"use client";

import { motion } from "framer-motion";
import { AIAssistant } from "@/components/AIAssistant";
import { TaskSearch } from "@/components/TaskSearch";
import { Sparkles, MapPin, Compass, BookOpen, Clock, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { locations } from "@/data/mockData";
import { cn } from "@/lib/utils";

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

export default function Home() {
  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="text-center space-y-8 relative py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium mb-4 shadow-lg shadow-blue-500/10"
        >
          <Sparkles className="w-4 h-4" />
          <span>Your Intelligent Campus Companion</span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/40 leading-tight"
        >
          Navigate Campus <br />
          <span className="text-blue-500">Like a Pro</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
        >
          Get instant AI assistance, find your way with interactive maps, and complete campus tasks effortlessly.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <TaskSearch />
        </motion.div>
      </section>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Quick Features */}
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="lg:col-span-4 space-y-6"
        >
          <h2 className="text-xl font-bold flex items-center space-x-2 px-2">
            <Compass className="w-5 h-5 text-blue-500" />
            <span>Quick Navigation</span>
          </h2>

          <Link href="/map">
            <motion.div
              variants={item}
              whileHover={{ scale: 1.05 }}
              className="backdrop-blur-lg bg-white/10 rounded-xl shadow-xl p-4 transition group cursor-pointer border border-white/10"
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all shadow-inner">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white">Interactive Map</h3>
                  <p className="text-sm text-gray-400">Find any building or room instantly</p>
                </div>
              </div>
            </motion.div>
          </Link>

          <Link href="/first-day">
            <motion.div
              variants={item}
              whileHover={{ scale: 1.05 }}
              className="backdrop-blur-lg bg-white/10 rounded-xl shadow-xl p-4 transition group cursor-pointer border border-white/10"
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-purple-500/10 rounded-2xl text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-all shadow-inner">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white">First Day Mode</h3>
                  <p className="text-sm text-gray-400">Step-by-step onboarding for freshers</p>
                </div>
              </div>
            </motion.div>
          </Link>

          <Link href="/explore">
            <motion.div
              variants={item}
              whileHover={{ scale: 1.05 }}
              className="backdrop-blur-lg bg-white/10 rounded-xl shadow-xl p-4 transition group cursor-pointer border border-white/10"
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-500/10 rounded-2xl text-green-400 group-hover:bg-green-500 group-hover:text-white transition-all shadow-inner">
                  <Compass className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white">Explore Campus</h3>
                  <p className="text-sm text-gray-400">Discover study spots and food joints</p>
                </div>
              </div>
            </motion.div>
          </Link>

          {/* Quick Stats/Status */}
          <motion.div
            variants={item}
            className="backdrop-blur-lg bg-white/10 rounded-xl shadow-xl p-4 hover:scale-105 transition border border-white/10"
          >
            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">Campus Pulse</h4>
            <div className="space-y-4">
              {locations.slice(0, 2).map((loc) => {
                const now = new Date();
                const currentHour = now.getHours();
                // Simple logic: Open if between 9 AM and 6 PM
                const isOpen = currentHour >= 9 && currentHour < 18;
                return (
                  <div key={loc.id} className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-blue-400" />
                      <span className="text-white">{loc.name}</span>
                    </div>
                    <span className={cn(
                      "font-medium",
                      isOpen ? "text-green-500" : "text-red-500"
                    )}>
                      {isOpen ? "Open" : "Closed"}
                    </span>
                  </div>
                );
              })}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-purple-400" />
                  <span className="text-white">Campus Wi-Fi</span>
                </div>
                <span className="text-green-500 font-medium">Stable</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: AI Assistant */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-8"
        >
          <AIAssistant />
        </motion.div>
      </div>

      {/* Features Showcase */}
      <section className="pt-20 border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="backdrop-blur-lg bg-white/10 rounded-xl shadow-xl p-6 hover:scale-105 transition border border-white/10 space-y-4">
            <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Smart Task Engine</h3>
            <p className="text-gray-400 leading-relaxed">
              Don&apos;t know where to go for a bonafide? Just search the task and we&apos;ll tell you the exact room, building, and documents required.
            </p>
          </div>
          <div className="backdrop-blur-lg bg-white/10 rounded-xl shadow-xl p-6 hover:scale-105 transition border border-white/10 space-y-4">
            <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center text-purple-400">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Live Map Integration</h3>
            <p className="text-gray-400 leading-relaxed">
              Interactive Leaflet maps with real campus markers. Get live navigation and building details at your fingertips.
            </p>
          </div>
          <div className="backdrop-blur-lg bg-white/10 rounded-xl shadow-xl p-6 hover:scale-105 transition border border-white/10 space-y-4">
            <div className="w-12 h-12 bg-green-500/20 rounded-2xl flex items-center justify-center text-green-400">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">First Day Guidance</h3>
            <p className="text-gray-400 leading-relaxed">
              A specialized mode for new students that guides them through the initial chaos of campus life with a curated checklist.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
