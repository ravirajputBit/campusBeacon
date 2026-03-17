export interface Location {
  id: string;
  name: string;
  block: string;
  room: string;
  services: string[];
  timing: string;
  coordinates: [number, number];
  type?: 'academic' | 'administrative' | 'utility' | 'food' | 'sports';
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
     type: "administrative"
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
     type: "utility"
   }, 
   { 
     id: "hostel-office",
     name: "Hostel Office", 
     block: "Hostel Block", 
     room: "Office 1", 
     services: ["Room Allotment", "Hostel Queries"], 
     timing: "9 AM - 5 PM", 
     coordinates: [28.3682, 77.5412],
     type: "administrative"
   }, 
   { 
     id: "cafeteria",
     name: "Cafeteria", 
     block: "Food Court", 
     room: "Main Area", 
     services: ["Food", "Snacks", "Drinks"], 
     timing: "8 AM - 10 PM", 
     coordinates: [28.3668, 77.5403],
     type: "food"
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
