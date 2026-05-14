import type { User } from "../components/UsersTable/types";

// Mock employee data
export const MOCK_EMPLOYEES: User[] = [
  {
    id: "1",
    userId: 1001,
    firstName: "John",
    lastName: "Anderson",
    email: "john.anderson@workforce.com",
    phoneNumber: "+1 555-0101",
    gender: "Male",
    department: "Engineering",
    role: "Manager",
    country: "USA",
    isActive: true,
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    userId: 1002,
    firstName: "Sarah",
    lastName: "Mitchell",
    email: "sarah.mitchell@workforce.com",
    phoneNumber: "+1 555-0102",
    gender: "Female",
    department: "Marketing",
    role: "Manager",
    country: "USA",
    isActive: true,
    createdAt: "2024-02-20T09:15:00Z",
  },
  {
    id: "3",
    userId: 1003,
    firstName: "Raj",
    lastName: "Patel",
    email: "raj.patel@workforce.com",
    phoneNumber: "+91 98765-43210",
    gender: "Male",
    department: "Engineering",
    role: "User",
    country: "India",
    isActive: true,
    createdAt: "2024-03-10T14:00:00Z",
  },
  {
    id: "4",
    userId: 1004,
    firstName: "Emma",
    lastName: "Wilson",
    email: "emma.wilson@workforce.com",
    phoneNumber: "+44 7700-900123",
    gender: "Female",
    department: "HR",
    role: "Admin",
    country: "UK",
    isActive: true,
    createdAt: "2023-11-05T11:45:00Z",
  },
  {
    id: "5",
    userId: 1005,
    firstName: "Michael",
    lastName: "Chen",
    email: "michael.chen@workforce.com",
    phoneNumber: "+1 555-0105",
    gender: "Male",
    department: "Finance",
    role: "Manager",
    country: "Canada",
    isActive: true,
    createdAt: "2024-01-25T08:30:00Z",
  },
  {
    id: "6",
    userId: 1006,
    firstName: "Priya",
    lastName: "Sharma",
    email: "priya.sharma@workforce.com",
    phoneNumber: "+91 98765-12345",
    gender: "Female",
    department: "Engineering",
    role: "User",
    country: "India",
    isActive: true,
    createdAt: "2024-04-01T16:20:00Z",
  },
  {
    id: "7",
    userId: 1007,
    firstName: "David",
    lastName: "Brown",
    email: "david.brown@workforce.com",
    phoneNumber: "+61 400-123-456",
    gender: "Male",
    department: "Sales",
    role: "User",
    country: "Australia",
    isActive: false,
    createdAt: "2023-08-15T13:00:00Z",
  },
  {
    id: "8",
    userId: 1008,
    firstName: "Lisa",
    lastName: "Taylor",
    email: "lisa.taylor@workforce.com",
    phoneNumber: "+1 555-0108",
    gender: "Female",
    department: "Marketing",
    role: "User",
    country: "USA",
    isActive: true,
    createdAt: "2024-02-10T10:00:00Z",
  },
  {
    id: "9",
    userId: 1009,
    firstName: "James",
    lastName: "Williams",
    email: "james.williams@workforce.com",
    phoneNumber: "+44 7700-900456",
    gender: "Male",
    department: "Finance",
    role: "Viewer",
    country: "UK",
    isActive: true,
    createdAt: "2024-03-20T09:30:00Z",
  },
  {
    id: "10",
    userId: 1010,
    firstName: "Ananya",
    lastName: "Gupta",
    email: "ananya.gupta@workforce.com",
    phoneNumber: "+91 98765-67890",
    gender: "Female",
    department: "HR",
    role: "User",
    country: "India",
    isActive: true,
    createdAt: "2024-04-15T14:45:00Z",
  },
  {
    id: "11",
    userId: 1011,
    firstName: "Robert",
    lastName: "Garcia",
    email: "robert.garcia@workforce.com",
    phoneNumber: "+1 555-0111",
    gender: "Male",
    department: "Engineering",
    role: "User",
    country: "USA",
    isActive: true,
    createdAt: "2024-01-08T11:15:00Z",
  },
  {
    id: "12",
    userId: 1012,
    firstName: "Sophie",
    lastName: "Martin",
    email: "sophie.martin@workforce.com",
    phoneNumber: "+1 555-0112",
    gender: "Female",
    department: "Sales",
    role: "Manager",
    country: "Canada",
    isActive: true,
    createdAt: "2023-12-01T08:00:00Z",
  },
];

// Attendance types
export type AttendanceStatus = "Present" | "Absent" | "Late" | "Half Day" | "Work From Home";

export interface AttendanceRecord {
  id: string;
  date: string;
  employeeId: string;
  employeeName: string;
  department: string;
  checkIn: string | null;
  checkOut: string | null;
  status: AttendanceStatus;
  workHours: number;
}

// Generate attendance for the current month
function generateAttendance(): AttendanceRecord[] {
  const records: AttendanceRecord[] = [];
  const today = new Date();
  const statuses: AttendanceStatus[] = ["Present", "Present", "Present", "Present", "Late", "Work From Home", "Half Day"];
  
  MOCK_EMPLOYEES.slice(0, 8).forEach((emp, empIndex) => {
    for (let i = 0; i < 15; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      // Skip weekends
      if (date.getDay() === 0 || date.getDay() === 6) continue;
      
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const checkIn = status === "Absent" ? null : `0${8 + Math.floor(Math.random() * 2)}:${Math.floor(Math.random() * 60).toString().padStart(2, "0")}`;
      const checkOut = status === "Absent" ? null : status === "Half Day" ? "13:00" : `1${7 + Math.floor(Math.random() * 2)}:${Math.floor(Math.random() * 60).toString().padStart(2, "0")}`;
      
      records.push({
        id: `att-${empIndex}-${i}`,
        date: date.toISOString().split("T")[0],
        employeeId: emp.id,
        employeeName: `${emp.firstName} ${emp.lastName}`,
        department: emp.department,
        checkIn,
        checkOut,
        status: Math.random() > 0.1 ? status : "Absent",
        workHours: status === "Absent" ? 0 : status === "Half Day" ? 4 : 8 + Math.random() * 2,
      });
    }
  });
  
  return records.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export const MOCK_ATTENDANCE = generateAttendance();

// Leave types
export type LeaveType = "Annual" | "Sick" | "Personal" | "Maternity" | "Paternity" | "Unpaid";
export type LeaveStatus = "Pending" | "Approved" | "Rejected";

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  leaveType: LeaveType;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: LeaveStatus;
  appliedOn: string;
  approvedBy: string | null;
}

export const MOCK_LEAVE_REQUESTS: LeaveRequest[] = [
  {
    id: "leave-1",
    employeeId: "3",
    employeeName: "Raj Patel",
    department: "Engineering",
    leaveType: "Annual",
    startDate: "2026-05-20",
    endDate: "2026-05-24",
    days: 5,
    reason: "Family vacation",
    status: "Pending",
    appliedOn: "2026-05-10",
    approvedBy: null,
  },
  {
    id: "leave-2",
    employeeId: "6",
    employeeName: "Priya Sharma",
    department: "Engineering",
    leaveType: "Sick",
    startDate: "2026-05-12",
    endDate: "2026-05-13",
    days: 2,
    reason: "Not feeling well",
    status: "Approved",
    appliedOn: "2026-05-11",
    approvedBy: "John Anderson",
  },
  {
    id: "leave-3",
    employeeId: "8",
    employeeName: "Lisa Taylor",
    department: "Marketing",
    leaveType: "Personal",
    startDate: "2026-05-18",
    endDate: "2026-05-18",
    days: 1,
    reason: "Personal appointment",
    status: "Approved",
    appliedOn: "2026-05-14",
    approvedBy: "Sarah Mitchell",
  },
  {
    id: "leave-4",
    employeeId: "11",
    employeeName: "Robert Garcia",
    department: "Engineering",
    leaveType: "Annual",
    startDate: "2026-06-01",
    endDate: "2026-06-07",
    days: 5,
    reason: "Summer break",
    status: "Pending",
    appliedOn: "2026-05-08",
    approvedBy: null,
  },
  {
    id: "leave-5",
    employeeId: "9",
    employeeName: "James Williams",
    department: "Finance",
    leaveType: "Sick",
    startDate: "2026-05-05",
    endDate: "2026-05-06",
    days: 2,
    reason: "Doctor's appointment",
    status: "Approved",
    appliedOn: "2026-05-04",
    approvedBy: "Michael Chen",
  },
  {
    id: "leave-6",
    employeeId: "2",
    employeeName: "Sarah Mitchell",
    department: "Marketing",
    leaveType: "Annual",
    startDate: "2026-05-25",
    endDate: "2026-05-30",
    days: 4,
    reason: "Attending a conference",
    status: "Rejected",
    appliedOn: "2026-05-01",
    approvedBy: "Emma Wilson",
  },
];

// Dashboard stats
export interface DashboardStats {
  totalEmployees: number;
  activeEmployees: number;
  departments: number;
  presentToday: number;
  onLeave: number;
  pendingLeaves: number;
}

export function getDashboardStats(): DashboardStats {
  const today = new Date().toISOString().split("T")[0];
  const presentToday = MOCK_ATTENDANCE.filter(
    (a) => a.date === today && a.status !== "Absent"
  ).length;

  return {
    totalEmployees: MOCK_EMPLOYEES.length,
    activeEmployees: MOCK_EMPLOYEES.filter((e) => e.isActive).length,
    departments: 5,
    presentToday: presentToday || 10, // Fallback for demo
    onLeave: MOCK_LEAVE_REQUESTS.filter((l) => l.status === "Approved").length,
    pendingLeaves: MOCK_LEAVE_REQUESTS.filter((l) => l.status === "Pending").length,
  };
}

// Department breakdown for charts
export interface DepartmentBreakdown {
  department: string;
  count: number;
  color: string;
}

export function getDepartmentBreakdown(): DepartmentBreakdown[] {
  const departments = ["Engineering", "Marketing", "Sales", "HR", "Finance"];
  const colors = ["#1890ff", "#52c41a", "#faad14", "#eb2f96", "#722ed1"];
  
  return departments.map((dept, index) => ({
    department: dept,
    count: MOCK_EMPLOYEES.filter((e) => e.department === dept).length,
    color: colors[index],
  }));
}

// Current logged in user (demo user)
export const CURRENT_USER = {
  id: "demo",
  firstName: "Demo",
  lastName: "User",
  email: "demo@workforce.com",
  role: "Admin" as const,
  department: "HR" as const,
  avatar: null,
};
