"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from 'next/navigation';
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { locations } from "@/data/mockData";
import { MapPin, Navigation, Clock, Info, Crosshair, Star, Share2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Fix for default marker icons in Leaflet with Next.js
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

function UserLocationMarker() {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const map = useMap();

  useEffect(() => {
    map.locate().on("locationfound", (e) => {
      setPosition([e.latlng.lat, e.latlng.lng]);
    });
  }, [map]);

  return position === null ? null : (
    <>
      <Marker position={position} icon={L.divIcon({
        className: 'user-location-icon',
        html: `<div class="w-4 h-4 bg-blue-500 border-2 border-white rounded-full shadow-lg animate-pulse"></div>`
      })}>
        <Popup>You are here</Popup>
      </Marker>
      <Circle center={position} radius={50} pathOptions={{ fillColor: 'blue', color: 'transparent' }} />
    </>
  );
}

function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 17);
  }, [center, map]);
  return null;
}

export default function CampusMap() {
  const searchParams = useSearchParams();
  const locationId = searchParams.get('location');
  const filterParam = searchParams.get('filter');

  const [mounted, setMounted] = useState(false);
  const [activeFilter, setActiveFilter] = useState(filterParam ? filterParam.charAt(0).toUpperCase() + filterParam.slice(1) : 'All');
  
  const initialLocation = locations.find(l => l.id === locationId) || locations[0];
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);
  const [mapCenter, setMapCenter] = useState<[number, number]>(initialLocation.coordinates);

  const handleLocate = useCallback(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const coords: [number, number] = [position.coords.latitude, position.coords.longitude];
        setMapCenter(coords);
      });
    }
  }, []);

  const filteredLocations = locations.filter(loc => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Food') return loc.type === 'food';
    return loc.type?.toLowerCase() === activeFilter.toLowerCase();
  });

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (locationId) {
      const locationFromURL = locations.find(l => l.id === locationId);
      if (locationFromURL) {
        setSelectedLocation(locationFromURL);
        setMapCenter(locationFromURL.coordinates);
      }
    }
  }, [locationId]);

  useEffect(() => {
    if (filterParam) {
      const formattedFilter = filterParam === 'food' ? 'Food' : filterParam.charAt(0).toUpperCase() + filterParam.slice(1);
      setActiveFilter(formattedFilter);
    }
  }, [filterParam]);

  if (!mounted) {
    return (
      <div className="w-full h-[600px] bg-slate-900/50 animate-pulse rounded-3xl flex items-center justify-center">
        <div className="text-gray-500 flex flex-col items-center space-y-4">
          <Navigation className="w-12 h-12 animate-bounce" />
          <p className="font-medium">Loading Interactive Map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:row items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Campus Navigator</h1>
          <p className="text-gray-400">Find your way around the campus effortlessly</p>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={handleLocate}
            className="p-3 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-all shadow-lg active:scale-95"
            title="My Location"
          >
            <Crosshair className="w-5 h-5" />
          </button>
          <div className="flex space-x-2 overflow-x-auto pb-2 w-full md:w-auto">
            {['All', 'Academic', 'Administrative', 'Food', 'Sports'].map((type) => (
              <button
                key={type}
                onClick={() => setActiveFilter(type)}
                className={cn(
                  "px-4 py-2 border rounded-xl text-sm whitespace-nowrap transition-all backdrop-blur-md",
                  activeFilter === type
                    ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20"
                    : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white"
                )}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar: Location List */}
        <div className="lg:col-span-1 space-y-4 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10">
          {filteredLocations.length > 0 ? (
            filteredLocations.map((loc) => (
              <motion.div
                key={loc.id}
                whileHover={{ scale: 1.05 }}
                onClick={() => {
                  setSelectedLocation(loc);
                  setMapCenter(loc.coordinates);
                }}
                className={cn(
                  "backdrop-blur-lg bg-white/10 rounded-xl shadow-xl p-4 transition cursor-pointer border",
                  selectedLocation.id === loc.id
                    ? "border-blue-500 ring-2 ring-blue-500/20"
                    : "border-white/10"
                )}
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-white flex items-center space-x-2">
                    <MapPin className={`w-4 h-4 ${selectedLocation.id === loc.id ? "text-blue-400" : "text-gray-500"}`} />
                    <span>{loc.name}</span>
                  </h3>
                  <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1 hover:bg-white/10 rounded text-gray-400 hover:text-blue-400 transition-colors">
                      <Star className="w-3 h-3" />
                    </button>
                    <button className="p-1 hover:bg-white/10 rounded text-gray-400 hover:text-green-400 transition-colors">
                      <Share2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-1">{loc.block}, {loc.room}</p>
              </motion.div>
            ))
          ) : (
            <div className="text-center p-8 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-gray-500 text-sm">No locations found for this category.</p>
            </div>
          )}
        </div>

        {/* Map Display */}
        <div className="lg:col-span-3 h-[600px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative">
          <MapContainer
            center={[28.3670, 77.5400]}
            zoom={17}
            className="h-full w-full z-0"
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapUpdater center={mapCenter} />
            <UserLocationMarker />
            {filteredLocations.map((loc, index) => ( 
              <Marker 
                key={index} 
                position={loc.coordinates}
                eventHandlers={{
                  click: () => setSelectedLocation(loc),
                }}
              > 
                <Popup> 
                  <div className="p-1">
                    <b className="text-slate-900">{loc.name}</b><br /> 
                    <span className="text-slate-600 text-xs">{loc.block}</span><br /> 
                    <span className="text-slate-600 text-xs">{loc.timing}</span>
                  </div>
                </Popup> 
              </Marker> 
            ))}
          </MapContainer>

          {/* Floating Location Detail Card */}
          <AnimatePresence>
            {selectedLocation && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-6 left-6 right-6 z-10 md:w-96"
              >
                <div className="backdrop-blur-lg bg-white/10 rounded-xl shadow-xl p-4 hover:scale-105 transition">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest font-bold text-blue-400 bg-blue-400/10 px-2 py-1 rounded-md">
                        {selectedLocation.type}
                      </span>
                      <h3 className="text-xl font-bold mt-2 text-white">{selectedLocation.name}</h3>
                    </div>
                    <div className="bg-blue-600 p-2 rounded-xl cursor-pointer hover:bg-blue-700 transition-colors">
                      <Navigation className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 text-sm text-gray-300">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span>{selectedLocation.timing}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm text-gray-300">
                      <Info className="w-4 h-4 text-gray-500" />
                      <span>{selectedLocation.services.join(", ")}</span>
                    </div>
                  </div>

                  <div className="mt-6 flex space-x-3">
                    <a
                      href={`https://www.google.com/search?tbm=isch&q=Galgotias+University+${encodeURIComponent(selectedLocation.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-white/10 hover:bg-white/20 text-white py-2 rounded-xl text-sm font-semibold transition-all text-center"
                    >
                      View Photos
                    </a>
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${selectedLocation.coordinates[0]},${selectedLocation.coordinates[1]}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl text-sm font-semibold transition-all text-center"
                    >
                      Directions
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
