export interface TimelineEvent {
  day: string;
  event: string;
  status: 'warning' | 'critical' | 'danger' | string;
}

export interface JobAnalysis {
  story: string;
  irreplaceabilityScore: number;
  impactAnalysis: string;
  timeline: TimelineEvent[];
  advice: string[];
}

export interface WhatsAppMessage {
  id: string;
  sender: 'moussa' | 'awa';
  text: string;
  time: string;
  dayLabel: string;
  isRead?: boolean;
}

export interface StoryDay {
  id: number;
  title: string;
  subtitle: string;
  date: string;
  description: string;
  quote?: string;
  metrics: {
    stability: number; // 0 - 100
    satisfaction: number; // 0 - 100
    chaos: number; // 0 - 100
    pressure: number; // 80 - 180 (heart rate or pressure)
  };
  whatsappPreview: string[];
}
