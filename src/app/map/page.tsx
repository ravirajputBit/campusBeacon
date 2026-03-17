"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

const CampusMap = dynamic(() => import("@/components/CampusMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] bg-slate-900/50 animate-pulse rounded-3xl flex flex-col items-center justify-center space-y-4">
      <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
      <p className="text-gray-400 font-medium">Initializing Map Engine...</p>
    </div>
  ),
});

export default function MapPage() {
  return (
    <div className="max-w-7xl mx-auto py-8">
      <CampusMap />
    </div>
  );
}
