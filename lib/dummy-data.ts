import { FlowableTask } from "@/types/dashboard";
import { CheckCircle, Clock, FileText, Users } from "lucide-react";

export const metrics = [
    { label: 'Active Service Orders', value: 12, icon: FileText, color: 'bg-blue-500' },
    { label: 'Pending Offers', value: 5, icon: Clock, color: 'bg-yellow-500' },
    { label: 'Available Specialists', value: 18, icon: Users, color: 'bg-green-500' },
    { label: "This Month's Wins", value: 8, icon: CheckCircle, color: 'bg-purple-500' }
];

export const flowableTasks = [
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
] satisfies FlowableTask[];

export const submittedOffers = [
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

export const activeOrders = [
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