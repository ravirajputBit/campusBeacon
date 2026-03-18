"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, BookOpen, UserCheck, CreditCard, Home, ChevronRight, Trophy } from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { locations } from "@/data/mockData";

export default function FirstDayPage() {
  const [completed, setCompleted] = useState<number[]>([]);

  // Define steps inside the component to ensure data is loaded
  const steps = [
    {
      id: 1,
      title: "Complete Admission",
      description: `Head to the ${locations.find(l => l.id === 'admin-block')?.name || 'Admin Block'} (${locations.find(l => l.id === 'admin-block')?.room || 'Room 101'}) for Admission Queries.`,
      icon: UserCheck,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
    },
    {
      id: 2,
      title: "Get Student ID",
      description: `Collect your ID card from ${locations.find(l => l.id === 'admin-block')?.name || 'Admin Block'} (${locations.find(l => l.id === 'admin-block')?.room || 'Room 101'}).`,
      icon: CreditCard,
      color: "text-purple-400",
      bg: "bg-purple-400/10",
    },
    {
      id: 3,
      title: "Library Registration",
      description: `Register for library access at ${locations.find(l => l.id === 'central-library')?.name || 'Central Library'} (${locations.find(l => l.id === 'central-library')?.room || 'Ground Floor'}).`,
      icon: BookOpen,
      color: "text-green-400",
      bg: "bg-green-400/10",
    },
    {
      id: 4,
      title: "Hostel Queries",
      description: `For room allotment, visit ${locations.find(l => l.id === 'hostel-office')?.name || 'Hostel Office'} (${locations.find(l => l.id === 'hostel-office')?.room || 'Office 1'}).`,
      icon: Home,
      color: "text-orange-400",
      bg: "bg-orange-400/10",
    },
    {
      id: 5,
      title: "Exam Cell Check",
      description: `Visit ${locations.find(l => l.id === 'exam-cell')?.name || 'Exam Cell'} (${locations.find(l => l.id === 'exam-cell')?.room || 'Room 210'}) for any result or exam queries.`,
      icon: Trophy,
      color: "text-pink-400",
      bg: "bg-pink-400/10",
    },
  ];

  const toggleStep = (id: number) => {
    if (completed.includes(id)) {
      setCompleted(completed.filter((s) => s !== id));
    } else {
      setCompleted([...completed, id]);
      toast.success("Step completed! Keep going.");
    }
  };

  const progress = (completed.length / steps.length) * 100;

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20">
      <header className="space-y-4 text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-block p-3 bg-blue-500/10 rounded-3xl mb-4"
        >
          <BookOpen className="w-10 h-10 text-blue-500" />
        </motion.div>
        <h1 className="text-4xl font-extrabold tracking-tight">First Day Onboarding</h1>
        <p className="text-gray-400 max-w-xl mx-auto">
          Welcome to Campus! We&apos;ve prepared a simple checklist to help you navigate your first day without any stress.
        </p>
      </header>

      {/* Progress Bar */}
      <div className="backdrop-blur-lg bg-white/10 rounded-xl shadow-xl p-8 relative overflow-hidden border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg flex items-center space-x-2">
            <span className="text-white">Your Progress</span>
            <span className="text-blue-500">{Math.round(progress)}%</span>
          </h3>
          <span className="text-sm text-gray-500">{completed.length} of {steps.length} steps completed</span>
        </div>
        <div className="h-4 bg-white/5 rounded-full overflow-hidden border border-white/10 p-1">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full shadow-lg shadow-blue-500/20"
          />
        </div>
        
        {progress === 100 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-2xl text-green-400 text-sm text-center font-bold flex items-center justify-center space-x-2"
          >
            <Trophy className="w-5 h-5" />
            <span>Congratulations! You&apos;re officially a student now.</span>
          </motion.div>
        )}
      </div>

      {/* Steps List */}
      <div className="space-y-4">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => toggleStep(step.id)}
            className={cn(
              "backdrop-blur-lg bg-white/10 rounded-xl shadow-xl p-6 transition cursor-pointer group flex items-center space-x-6 border",
              completed.includes(step.id)
                ? "border-green-500/30 opacity-70"
                : "border-white/10 hover:scale-105"
            )}
          >
            <div className={`p-4 rounded-2xl ${step.bg} ${step.color} transition-all group-hover:scale-110`}>
              <step.icon className="w-6 h-6" />
            </div>

            <div className="flex-1">
              <h3 className={`font-bold text-lg transition-all ${completed.includes(step.id) ? "text-gray-500 line-through" : "text-white"}`}>
                {step.title}
              </h3>
              <p className="text-sm text-gray-400 mt-1">{step.description}</p>
            </div>

            <div className="flex-shrink-0">
              {completed.includes(step.id) ? (
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              ) : (
                <Circle className="w-8 h-8 text-gray-700 group-hover:text-blue-500 transition-colors" />
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Need Help Section */}
      <section className="backdrop-blur-lg bg-white/10 rounded-xl shadow-xl p-8 flex flex-col md:row items-center justify-between gap-6 border border-white/10 hover:scale-[1.02] transition">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="font-bold text-xl text-white">Feeling overwhelmed?</h3>
          <p className="text-sm text-gray-400">Our AI assistant is here to guide you through every step.</p>
        </div>
        <Link href="/" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all flex items-center space-x-2 shadow-lg shadow-blue-500/20 active:scale-95">
          <span>Talk to AI Assistant</span>
          <ChevronRight className="w-5 h-5" />
        </Link>
      </section>
    </div>
  );
}
