import { EventType } from '../utils/theme';

export interface Event {
  id: string;
  title: string;
  description?: string;
  type: EventType;
  startTime: string;
  endTime: string;
  date: string;
  location?: string;
  attendees?: string[];
  isAllDay?: boolean;
  reminder?: number; // minutes before event
}

export const sampleEvents: Event[] = [
  {
    id: '1',
    title: 'Team Standup',
    description: 'Daily team sync to discuss progress and blockers',
    type: 'meeting',
    startTime: '09:00',
    endTime: '09:30',
    date: '2024-01-15',
    location: 'Conference Room A',
    attendees: ['John Doe', 'Jane Smith', 'Mike Johnson'],
    reminder: 15,
  },
  {
    id: '2',
    title: 'Complete Project Proposal',
    description: 'Finish writing the Q1 project proposal document',
    type: 'task',
    startTime: '10:00',
    endTime: '12:00',
    date: '2024-01-15',
    reminder: 30,
  },
  {
    id: '3',
    title: 'Product Launch Event',
    description: 'Annual product showcase and networking event',
    type: 'event',
    startTime: '14:00',
    endTime: '18:00',
    date: '2024-01-15',
    location: 'Main Auditorium',
    attendees: ['Marketing Team', 'Sales Team', 'External Partners'],
    reminder: 60,
  },
  {
    id: '4',
    title: 'Code Review Session',
    description: 'Review PRs and discuss code quality improvements',
    type: 'meeting',
    startTime: '15:00',
    endTime: '16:00',
    date: '2024-01-16',
    location: 'Dev Room',
    attendees: ['Sarah Wilson', 'Tom Brown', 'Lisa Davis'],
    reminder: 10,
  },
  {
    id: '5',
    title: 'Update Documentation',
    description: 'Update API documentation with latest changes',
    type: 'task',
    startTime: '09:00',
    endTime: '11:00',
    date: '2024-01-16',
    reminder: 15,
  },
  {
    id: '6',
    title: 'Company All-Hands',
    description: 'Monthly company-wide meeting with leadership updates',
    type: 'event',
    startTime: '10:00',
    endTime: '11:00',
    date: '2024-01-17',
    location: 'Main Conference Hall',
    isAllDay: false,
    reminder: 30,
  },
  {
    id: '7',
    title: 'Client Presentation',
    description: 'Present project milestones to key stakeholders',
    type: 'meeting',
    startTime: '14:00',
    endTime: '15:30',
    date: '2024-01-17',
    location: 'Executive Boardroom',
    attendees: ['Client Team', 'Project Manager', 'Lead Developer'],
    reminder: 45,
  },
  {
    id: '8',
    title: 'Bug Fixes - Authentication',
    description: 'Fix login issues reported by QA team',
    type: 'task',
    startTime: '16:00',
    endTime: '18:00',
    date: '2024-01-17',
    reminder: 20,
  },
  {
    id: '9',
    title: 'Team Building Workshop',
    description: 'Interactive workshop to improve team collaboration',
    type: 'event',
    startTime: '13:00',
    endTime: '17:00',
    date: '2024-01-18',
    location: 'Training Center',
    attendees: ['All Team Members'],
    reminder: 60,
  },
  {
    id: '10',
    title: 'Design System Review',
    description: 'Review and update component library standards',
    type: 'meeting',
    startTime: '11:00',
    endTime: '12:00',
    date: '2024-01-18',
    location: 'Design Studio',
    attendees: ['Design Team', 'Frontend Developers'],
    reminder: 15,
  },
];

// Utility functions for working with events
export function getEventsByType(events: Event[], type: EventType): Event[] {
  return events.filter(event => event.type === type);
}

export function getEventsByDate(events: Event[], date: string): Event[] {
  return events.filter(event => event.date === date);
}

export function getTodaysEvents(events: Event[]): Event[] {
  const today = new Date().toISOString().split('T')[0];
  return getEventsByDate(events, today);
}

export function getUpcomingEvents(events: Event[], days: number = 7): Event[] {
  const today = new Date();
  const futureDate = new Date(today.getTime() + days * 24 * 60 * 60 * 1000);

  return events.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate >= today && eventDate <= futureDate;
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export function formatEventTime(startTime: string, endTime: string): string {
  return `${startTime} - ${endTime}`;
}

export function isEventToday(event: Event): boolean {
  const today = new Date().toISOString().split('T')[0];
  return event.date === today;
}

export function isEventUpcoming(event: Event): boolean {
  const today = new Date().toISOString().split('T')[0];
  return event.date > today;
}
