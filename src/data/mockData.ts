export interface Location {
  id: string;
  name: string;
  block: string;
  room: string;
  services: string[];
  timing: string;
  coordinates: [number, number];
  type?: 'academic' | 'administrative' | 'utility' | 'food' | 'sports';
  image?: string;
}

export interface Task {
  id: string;
  task: string;
  location: string;
  room: string;
  timing: string;
  documents: string[];
}

export const locations: Location[] = [ 
   { 
     id: "admin-block",
     name: "Admin Block", 
     block: "Main Campus", 
     room: "Room 101", 
     services: ["ID Card", "Bonafide Certificate", "Admission Queries"], 
     timing: "10 AM - 4 PM", 
     coordinates: [28.3675, 77.5405],
     type: "administrative",
     image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop"
   }, 
   { 
     id: "exam-cell",
     name: "Exam Cell", 
     block: "Admin Block", 
     room: "Room 210", 
     services: ["Exam Form", "Backlog Form", "Result Queries"], 
     timing: "10 AM - 4 PM", 
     coordinates: [28.3678, 77.5408],
     type: "administrative"
   }, 
   { 
     id: "central-library",
     name: "Central Library", 
     block: "Knowledge Centre", 
     room: "Ground Floor", 
     services: ["Book Issue", "Reading Hall", "Digital Library"], 
     timing: "9 AM - 8 PM", 
     coordinates: [28.3670, 77.5400],
     type: "utility",
     image: "https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=800&auto=format&fit=crop"
   }, 
   { 
     id: "block-a",
     name: "A Block", 
     block: "Academic Block A", 
     room: "Rooms 101-505", 
     services: ["Computer Labs", "Lecture Halls", "Faculty Cabins"], 
     timing: "9 AM - 5 PM", 
     coordinates: [28.365204, 77.541391],
     type: "academic",
     image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800&auto=format&fit=crop"
   },
   { 
     id: "block-aids",
     name: "AI & DS Block", 
     block: "Artificial Intelligence and Data Science Block", 
     room: "Ultra-Modern Tech Hub", 
     services: ["AI Lab", "Machine Learning Lab", "Advanced Computing"], 
     timing: "9 AM - 6 PM", 
     coordinates: [28.365246, 77.540539], 
     type: "academic",
     image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800&auto=format&fit=crop"
   },
   { 
     id: "block-b",
     name: "B Block", 
     block: "Academic Block B", 
     room: "Rooms 101-404", 
     services: ["Physics Lab", "Chemistry Lab", "Seminar Hall"], 
     timing: "9 AM - 5 PM", 
     coordinates: [28.365290, 77.542000],
     type: "academic",
     image: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?q=80&w=800&auto=format&fit=crop"
   },
   { 
     id: "block-c",
     name: "C Block", 
     block: "Academic Block C", 
     room: "Rooms 101-303", 
     services: ["Management Studies", "Commerce"], 
     timing: "9 AM - 5 PM", 
     coordinates: [28.366270, 77.542623],
     type: "academic",
     image: "https://images.unsplash.com/photo-1523050853064-1660b19aa2e3?q=80&w=800&auto=format&fit=crop"
   },
   { 
     id: "hostel",
     name: "Hostel", 
     block: "Hostel Block", 
     room: "Warden Office", 
     services: ["Accommodation", "Laundry"], 
     timing: "24/7", 
     coordinates: [28.367138, 77.541438],
     type: "utility",
     image: "https://images.unsplash.com/photo-1555854817-5b2260d50c47?q=80&w=800&auto=format&fit=crop"
   }, 
   { 
     id: "mess",
     name: "Mess", 
     block: "Hostel Area", 
     room: "Ground Floor", 
     services: ["Breakfast", "Lunch", "Dinner"], 
     timing: "7 AM - 9 PM", 
     coordinates: [28.368155, 77.541120],
     type: "food",
     image: "https://images.unsplash.com/photo-1567529684892-09290a1b2d05?q=80&w=800&auto=format&fit=crop"
   },
   { 
     id: "cafeteria",
     name: "Cafeteria", 
     block: "Food Court", 
     room: "Main Area", 
     services: ["Snacks", "Coffee", "Drinks"], 
     timing: "8 AM - 10 PM", 
     coordinates: [28.365572, 77.541569],
     type: "food",
     image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&auto=format&fit=crop"
   },
   { 
     id: "agriculture-dept",
     name: "Agriculture Department", 
     block: "Agriculture Block", 
     room: "HOD Office", 
     services: ["Soil Lab", "Crop Research"], 
     timing: "9 AM - 5 PM", 
     coordinates: [28.367969, 77.540650],
     type: "academic",
     image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=800&auto=format&fit=crop"
   },
   { 
     id: "ios-centre",
     name: "iOS Development Centre", 
     block: "Block B", 
     room: "Level 4", 
     services: ["iOS Training", "Swift Programming"], 
     timing: "10 AM - 4 PM", 
     coordinates: [28.365769, 77.542200],
     type: "academic",
     image: "https://images.unsplash.com/photo-1510511459019-5dee211c6627?q=80&w=800&auto=format&fit=crop"
   },
   { 
     id: "drone-zone",
     name: "Drone Zone", 
     block: "Open Field", 
     room: "Flight Area", 
     services: ["Drone Testing", "Aviation Lab"], 
     timing: "10 AM - 5 PM", 
     coordinates: [28.366271, 77.542019],
     type: "academic",
     image: "https://images.unsplash.com/photo-1473960154466-50f8a2c56dd4?q=80&w=800&auto=format&fit=crop"
   },
   { 
     id: "agri-farm",
     name: "Agriculture Farm", 
     block: "Outer Campus", 
     room: "Field", 
     services: ["Practical Farming", "Plantation"], 
     timing: "6 AM - 6 PM", 
     coordinates: [28.369055, 77.540983],
     type: "academic"
   },
   { 
     id: "basketball-ground",
     name: "Basketball Ground", 
     block: "Sports Area", 
     room: "Court 1", 
     services: ["Basketball", "Tournament"], 
     timing: "6 AM - 9 PM", 
     coordinates: [28.366590, 77.543376],
     type: "sports",
     image: "https://images.unsplash.com/photo-1544919982-b61976f0ba43?q=80&w=800&auto=format&fit=crop"
   },
   { 
     id: "football-ground",
     name: "Football Ground", 
     block: "Main Stadium", 
     room: "Ground", 
     services: ["Football", "Track"], 
     timing: "6 AM - 9 PM", 
     coordinates: [28.366662, 77.543885],
     type: "sports",
     image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800&auto=format&fit=crop"
   },
   { 
     id: "archery-ground",
     name: "Archery Ground", 
     block: "Sports Block", 
     room: "Target Area", 
     services: ["Archery Training"], 
     timing: "4 PM - 7 PM", 
     coordinates: [28.367023, 77.544855],
     type: "sports"
   },
   { 
     id: "cricket-ground",
     name: "Cricket Ground", 
     block: "Main Ground", 
     room: "Pitch", 
     services: ["Cricket Practice"], 
     timing: "6 AM - 9 PM", 
     coordinates: [28.366770, 77.544015],
     type: "sports",
     image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=800&auto=format&fit=crop"
   },
   { 
     id: "remaining-games",
     name: "Remaining Games Ground", 
     block: "Sports Area", 
     room: "Multi-purpose Ground", 
     services: ["Badminton", "Volleyball"], 
     timing: "6 AM - 9 PM", 
     coordinates: [28.366358, 77.544613],
     type: "sports"
   },
   { 
     id: "wip-area",
     name: "Work in Progress Area", 
     block: "New Construction", 
     room: "Site", 
     services: ["Expansion"], 
     timing: "24/7", 
     coordinates: [28.365688, 77.543564],
     type: "utility"
   },
   { 
     id: "c-block-ground",
     name: "C Block Ground", 
     block: "Block C", 
     room: "Garden", 
     services: ["Relaxation", "Events"], 
     timing: "6 AM - 9 PM", 
     coordinates: [28.365743, 77.542776],
     type: "utility"
   },
   { 
     id: "sarasvati-ground",
     name: "Maa Sarasvati Ground", 
     block: "Block A Area", 
     room: "Garden", 
     services: ["Peaceful Zone"], 
     timing: "6 AM - 9 PM", 
     coordinates: [28.364769, 77.540330],
     type: "utility"
   },
   { 
     id: "stage-ground",
     name: "Stage Ground", 
     block: "Main Plaza", 
     room: "Open Stage", 
     services: ["Cultural Events", "Performances"], 
     timing: "9 AM - 8 PM", 
     coordinates: [28.366251, 77.541660],
     type: "utility"
   },
   { 
     id: "outside-parking",
     name: "Outside Parking", 
     block: "Gate 1", 
     room: "Parking Lot", 
     services: ["Bike Parking", "Car Parking"], 
     timing: "24/7", 
     coordinates: [28.367485, 77.544177],
     type: "utility"
   }
 ]; 

 export const tasks: Task[] = [ 
   { 
     id: "task-id-card",
     task: "ID card", 
     location: "Admin Block", 
     room: "Room 101", 
     timing: "10 AM - 4 PM", 
     documents: ["Admission Slip", "Photo"] 
   }, 
   { 
     id: "task-registration",
     task: "semester registration", 
     location: "A Block", 
     room: "Ground Floor Counter", 
     timing: "10 AM - 4 PM", 
     documents: ["ID Card", "Fee Receipt", "Previous Semester Marksheet"] 
   },
   { 
     id: "task-sports-registration",
     task: "sports registration", 
     location: "Basketball Play Ground", 
     room: "Grounds Office", 
     timing: "10 AM - 5 PM", 
     documents: ["ID Card", "Medical Fitness"] 
   },
   { 
     id: "task-bonafide-certificate",
     task: "bonafide certificate", 
     location: "Admin Block", 
     room: "Room 101", 
     timing: "10 AM - 4 PM", 
     documents: ["ID Card", "Fee Receipt"] 
   }, 
   { 
     id: "task-exam-form",
     task: "exam form", 
     location: "Exam Cell", 
     room: "Room 210", 
     timing: "10 AM - 4 PM", 
     documents: ["ID Card"] 
   }, 
   { 
     id: "task-backlog-form",
     task: "backlog form", 
     location: "Exam Cell", 
     room: "Room 210", 
     timing: "10 AM - 4 PM", 
     documents: ["Fee Receipt"] 
   }, 
   { 
     id: "task-library-access",
     task: "library access", 
     location: "Central Library", 
     room: "Ground Floor", 
     timing: "9 AM - 8 PM", 
     documents: ["ID Card"] 
   } 
 ]; 
