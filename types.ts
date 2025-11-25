export interface Fighter {
  id: string;
  name: string;
  nickname: string;
  division: string;
  officialRank: number;
  imgUrl: string;
  // Raw Stats (2025 Projected)
  record: string;
  lastFightDate: string; // ISO Date
  fightsInLast12Months: number;
  avgOpponentRank: number; // Lower is harder (1 = Champ, 2 = #1 Contender)
  finishRate: number; // 0.0 to 1.0
  controlTimeAvg: number; // Minutes
  sigStrikesPerMin: number;
  knockdownsAvg: number;
  takedownAvg: number;
  titleDefenses: number;
  isMultiDivChamp: boolean;
}

export interface Weights {
  activity: number;    // Weight for frequency/recency
  sos: number;         // Strength of Schedule
  finish: number;      // Weight for KOs/Subs
  control: number;     // Weight for dominance/minutes
  legacy: number;      // Weight for title defenses/history
}

export interface CalculationResult {
  fighterId: string;
  totalScore: number;
  rank: number;
  breakdown: {
    activityScore: number;
    sosScore: number;
    dominanceScore: number;
    finishScore: number;
  };
}