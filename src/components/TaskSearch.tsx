"use client";

import { useState } from "react";
import { Search, MapPin, FileText, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { tasks, locations } from "@/data/mockData";

export function TaskSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<typeof tasks>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length > 1) {
      const filtered = tasks.filter(task => 
        task.task.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <div className="relative group backdrop-blur-lg bg-white/10 rounded-xl shadow-xl hover:scale-105 transition border border-white/10 overflow-hidden">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
        </div>
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="What do you need to do today? (e.g. ID card)"
          className="block w-full pl-12 pr-4 py-4 bg-transparent text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
        />
      </div>

      <AnimatePresence>
        {results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="backdrop-blur-lg bg-white/10 rounded-xl shadow-xl border border-white/10 overflow-hidden mt-2"
          >
            {results.map((task) => {
              const location = locations.find(l => l.name === task.location);
              return (
                <div
                  key={task.id}
                  className="p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                          {task.task}
                        </h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-400">
                          <MapPin className="w-3 h-3" />
                          <span>{location?.name} ({location?.room})</span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
