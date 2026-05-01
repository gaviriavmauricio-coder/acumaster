export interface Challenge {
  nivel: number;
  desafio: string;
  descripcion: string;
  opciones: string[];
  respuesta_correcta: string;
  explicacion: string;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  level: number;
  xpReward: number;
  status: 'locked' | 'available' | 'completed';
  category?: string;
}

export interface UserProgress {
  level: number;
  xp: number;
  completedMissions: string[];
}

export interface CompendiumEntry {
  id: string;
  title: string;
  category: string;
  content: string;
  level: number;
  metaphor?: string;
  example?: string;
  exercise?: string;
}

