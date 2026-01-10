import { ActiveContract, ActiveOrder, ActivityLog, FlowableTask, Metric, NegotiationTask, PendingApproval, PublishedContract, SubmittedOffer } from "@/types/dashboard";
import { Specialist, UserAccount } from "@/types/user";
import { Activity, AlertTriangle, CheckCircle, Clock, FileText, TrendingUp, Users } from "lucide-react";

export const metrics: Metric[] = [
    { label: 'Active Service Orders', value: 12, icon: FileText, color: 'bg-blue-500' },
    { label: 'Pending Offers', value: 5, icon: Clock, color: 'bg-yellow-500' },
    { label: 'Available Specialists', value: 18, icon: Users, color: 'bg-green-500' },
    { label: "This Month's Wins", value: 8, icon: CheckCircle, color: 'bg-purple-500' }
];

export const contractMetrics: Metric[] = [
    { label: 'Active Negotiations', value: 3, icon: TrendingUp, color: 'bg-orange-500' },
    { label: 'Pending Approvals', value: 2, icon: Clock, color: 'bg-yellow-500' },
    { label: 'Published Contracts', value: 15, icon: FileText, color: 'bg-blue-500' },
    { label: 'Expiring Soon', value: 4, icon: AlertTriangle, color: 'bg-red-500' }
];

export const adminMetrics = [
    { label: 'Total Users', value: 24, icon: Users, color: 'bg-blue-500' },
    { label: 'Total Specialists', value: 142, icon: Users, color: 'bg-purple-500' },
    { label: 'Active Specialists', value: 98, icon: CheckCircle, color: 'bg-green-500' },
    { label: 'Recent Activity', value: 47, icon: Activity, color: 'bg-orange-500' }
];

export const activityLogs: ActivityLog[] = [
    { id: 'L001', user: 'Max Müller', action: 'submitted an offer', timestamp: '2 hours ago', details: 'Offer for SR-2024-001 - Senior Java Developer' },
    { id: 'L002', user: 'Anna Schmidt', action: 'accepted contract terms', timestamp: '3 hours ago', details: 'Contract CNT-2024-008 - IT Consulting Services' },
    { id: 'L003', user: 'Thomas Weber', action: 'updated specialist profile', timestamp: '5 hours ago', details: 'Updated John Smith - Added Spring Boot certification' },
    { id: 'L004', user: 'Michael Becker', action: 'created new user account', timestamp: '1 day ago', details: 'Created account for Lisa Wagner - Supplier Representative' },
    { id: 'L005', user: 'Max Müller', action: 'viewed service request', timestamp: '1 day ago', details: 'Viewed SR-2024-005 - DevOps Engineer' },
];

export const flowableTasks: FlowableTask[] = [
    {
      id: 'SR-2024-001',
      title: 'Senior Java Developer for Banking Platform',
      role: 'Senior Developer',
      domain: 'Technology',
      deadline: '2 days',
      priority: 'high',
      requiredSkills: ['Java', 'Spring Boot', 'Microservices']
    },
    {
      id: 'SR-2024-002',
      title: 'Project Manager for Digital Transformation',
      role: 'Project Manager',
      domain: 'Consulting',
      deadline: '5 days',
      priority: 'medium',
      requiredSkills: ['Agile', 'Scrum', 'Stakeholder Management']
    },
    {
      id: 'SR-2024-003',
      title: 'UI/UX Designer for Mobile App',
      role: 'UX Designer',
      domain: 'Design',
      deadline: '1 day',
      priority: 'high',
      requiredSkills: ['Figma', 'User Research', 'Prototyping']
    }
];

export const submittedOffers: SubmittedOffer[] = [
    {
      id: 'OFF-001',
      requestId: 'SR-2024-005',
      title: 'DevOps Engineer',
      specialist: 'John Smith',
      dailyRate: 850,
      status: 'under_review',
      submittedDate: '2024-01-05'
    },
    {
      id: 'OFF-002',
      requestId: 'SR-2024-007',
      title: 'Data Analyst',
      specialist: 'Sarah Johnson',
      dailyRate: 720,
      status: 'accepted',
      submittedDate: '2024-01-03'
    }
];

export const activeOrders: ActiveOrder[] = [
    {
      id: 'SO-2024-012',
      specialist: 'Michael Chen',
      client: 'Global Finance Corp',
      role: 'Solution Architect',
      location: 'Onshore',
      endDate: '2024-03-15',
      daysRemaining: 68
    },
    {
      id: 'SO-2024-018',
      specialist: 'Emma Wilson',
      client: 'TechStart GmbH',
      role: 'Frontend Developer',
      location: 'Remote',
      endDate: '2024-02-28',
      daysRemaining: 52
    }
];

export const negotiationTasks: NegotiationTask[] = [
    {
      id: 'CNT-2024-008',
      title: 'IT Consulting Services Framework Agreement',
      supplier: 'TechConsult GmbH',
      offeredRate: 850,
      targetRate: 780,
      domain: 'Technology',
      offerDeadline: '3 days',
      priority: 'high',
      terms: 'Standard terms with extended warranty clause',
      matchScore: 92
    },
    {
      id: 'CNT-2024-012',
      title: 'Digital Transformation Consulting',
      supplier: 'Digital Solutions AG',
      offeredRate: 920,
      targetRate: 850,
      domain: 'Consulting',
      offerDeadline: '5 days',
      priority: 'medium',
      terms: 'Negotiating payment terms and deliverable schedule',
      matchScore: 88
    }
];

export const pendingApprovals: PendingApproval[] = [
    {
      id: 'CNT-2024-015',
      title: 'Cloud Infrastructure Services',
      supplier: 'CloudTech Solutions',
      agreedRate: 780,
      startDate: '2024-02-01',
      endDate: '2025-02-01',
      scope: 'AWS and Azure cloud management',
      status: 'awaiting_final_approval'
    }
];

export const publishedContracts: PublishedContract[] = [
    {
      id: 'CNT-2024-001',
      title: 'Software Development Services',
      offersReceived: 8,
      offerDeadline: '2024-01-15',
      daysLeft: 8,
      domains: ['Technology', 'Development'],
      status: 'open'
    },
    {
      id: 'CNT-2024-003',
      title: 'Business Analysis Framework',
      offersReceived: 5,
      offerDeadline: '2024-01-20',
      daysLeft: 13,
      domains: ['Business', 'Consulting'],
      status: 'open'
    },
    {
      id: 'CNT-2024-005',
      title: 'Project Management Services',
      offersReceived: 12,
      offerDeadline: '2024-01-12',
      daysLeft: 5,
      domains: ['Consulting', 'Project Management'],
      status: 'open'
    }
];

export const activeContracts: ActiveContract[] = [
    {
      id: 'CNT-2023-089',
      title: 'Enterprise Application Development',
      supplier: 'DevPro International',
      startDate: '2023-06-01',
      endDate: '2024-06-30',
      daysRemaining: 175,
      consumption: 68,
      activeRequests: 4
    },
    {
      id: 'CNT-2023-095',
      title: 'IT Security Consulting',
      supplier: 'SecureIT Solutions',
      startDate: '2023-09-01',
      endDate: '2024-08-31',
      daysRemaining: 237,
      consumption: 45,
      activeRequests: 2
    }
];

export const users: UserAccount[] = [
    { id: 'U001', name: 'Max Müller', email: 'max.mueller@company.de', role: 'SUPPLIER_REP', status: 'active', lastLogin: '2024-01-08 09:30' },
    { id: 'U002', name: 'Anna Schmidt', email: 'anna.schmidt@company.de', role: 'CONTRACT_COORDINATOR', status: 'active', lastLogin: '2024-01-08 10:15' },
    { id: 'U003', name: 'Thomas Weber', email: 'thomas.weber@company.de', role: 'SUPPLIER_REP', status: 'active', lastLogin: '2024-01-07 16:45' },
    { id: 'U004', name: 'Sarah Fischer', email: 'sarah.fischer@company.de', role: 'SUPPLIER_REP', status: 'inactive', lastLogin: '2024-01-05 14:20' },
    { id: 'U005', name: 'Michael Becker', email: 'michael.becker@company.de', role: 'PROVIDER_ADMIN', status: 'active', lastLogin: '2024-01-08 08:00' },
];


export const specialists = [
  {
    first_name: 'Michael',
    last_name: 'Chen',
    email: 'michael.chen@example.com',
    phone: '+49 151 12345678',
    specialist_code: 'SP-2024-001',
    role_name: 'Solution Architect',
    experience_level: 'Expert',
    skills: ['Java', 'Spring Boot', 'Microservices', 'AWS', 'Docker', 'Kubernetes'],
    certifications: ['AWS Solutions Architect', 'TOGAF 9'],
    specialization: 'Cloud Architecture & Migration',
    avg_daily_rate: 950,
    status: 'active',
    available_from: '2024-02-01',
    available_until: '2024-12-31',
    max_weekly_hours: 40,
    location: 'Frankfurt',
    work_mode: 'hybrid',
    language_spoken: ['English', 'German', 'Mandarin']
  },
  {
    first_name: 'Sarah',
    last_name: 'Johnson',
    email: 'sarah.j@example.com',
    phone: '+49 170 98765432',
    specialist_code: 'SP-2024-002',
    role_name: 'Data Analyst',
    experience_level: 'Senior',
    skills: ['Python', 'SQL', 'Tableau', 'Power BI', 'Statistics'],
    certifications: ['Microsoft Certified: Data Analyst'],
    specialization: 'Business Intelligence & Analytics',
    avg_daily_rate: 720,
    status: 'active',
    available_from: '2024-03-15',
    available_until: '2024-09-30',
    max_weekly_hours: 32,
    location: 'Munich',
    work_mode: 'remote',
    language_spoken: ['English', 'German']
  },
  {
    first_name: 'Emma',
    last_name: 'Wilson',
    email: 'emma.w@example.com',
    phone: '+49 160 55512345',
    specialist_code: 'SP-2024-003',
    role_name: 'Frontend Developer',
    experience_level: 'Mid',
    skills: ['React', 'TypeScript', 'CSS', 'HTML', 'Jest'],
    certifications: [],
    specialization: 'Modern Web Applications',
    avg_daily_rate: 650,
    status: 'on_leave',
    available_from: '2024-02-15',
    available_until: '2024-08-31',
    max_weekly_hours: 40,
    location: 'Berlin',
    work_mode: 'remote',
    language_spoken: ['English']
  }
];