import { Fighter } from './types';

// Data extrapolated from the "Late 2025" scenario in the prompt
export const FIGHTERS: Fighter[] = [
  {
    id: 'islam',
    name: 'Islam Makhachev',
    nickname: '',
    division: 'Lightweight',
    officialRank: 1,
    imgUrl: 'https://picsum.photos/seed/islam/200/200', // Placeholder
    record: '28-1',
    lastFightDate: '2025-11-15', // Recent win vs JDM
    fightsInLast12Months: 2, // Jan 2025, Nov 2025
    avgOpponentRank: 0.5, // Champ vs Champ fights count heavily
    finishRate: 0.65,
    controlTimeAvg: 8.5,
    sigStrikesPerMin: 2.85,
    knockdownsAvg: 0.4,
    takedownAvg: 3.5,
    titleDefenses: 5,
    isMultiDivChamp: true
  },
  {
    id: 'merab',
    name: 'Merab Dvalishvili',
    nickname: 'The Machine',
    division: 'Bantamweight',
    officialRank: 5, // Perceived low rank in text
    imgUrl: 'https://picsum.photos/seed/merab/200/200',
    record: '20-4',
    lastFightDate: '2025-10-20',
    fightsInLast12Months: 3, // Jan, June, Oct (High Activity)
    avgOpponentRank: 2.3, // Umar (#2), O'Malley (#1), Sandhagen (#4)
    finishRate: 0.25, // Low finish rate
    controlTimeAvg: 12.0, // Massive control
    sigStrikesPerMin: 4.8,
    knockdownsAvg: 0.1,
    takedownAvg: 6.4,
    titleDefenses: 3,
    isMultiDivChamp: false
  },
  {
    id: 'ilia',
    name: 'Ilia Topuria',
    nickname: 'El Matador',
    division: 'Lightweight',
    officialRank: 2,
    imgUrl: 'https://picsum.photos/seed/ilia/200/200',
    record: '17-0',
    lastFightDate: '2025-06-15', // Win vs Oliveira
    fightsInLast12Months: 1, // Lower activity
    avgOpponentRank: 3.0,
    finishRate: 0.85, // High finish rate
    controlTimeAvg: 2.5,
    sigStrikesPerMin: 4.5,
    knockdownsAvg: 1.2,
    takedownAvg: 1.8,
    titleDefenses: 2,
    isMultiDivChamp: true // Moved up
  },
  {
    id: 'pantoja',
    name: 'Alexandre Pantoja',
    nickname: 'The Cannibal',
    division: 'Flyweight',
    officialRank: 8, // Often underrated
    imgUrl: 'https://picsum.photos/seed/pantoja/200/200',
    record: '30-5',
    lastFightDate: '2025-06-10',
    fightsInLast12Months: 2,
    avgOpponentRank: 4.0,
    finishRate: 0.60,
    controlTimeAvg: 6.0,
    sigStrikesPerMin: 4.36,
    knockdownsAvg: 0.5,
    takedownAvg: 2.8,
    titleDefenses: 4,
    isMultiDivChamp: false
  },
  {
    id: 'jon',
    name: 'Jon Jones',
    nickname: 'Bones',
    division: 'Heavyweight',
    officialRank: 3, // Legacy rank
    imgUrl: 'https://picsum.photos/seed/jon/200/200',
    record: '28-1',
    lastFightDate: '2023-11-11', // Inactive
    fightsInLast12Months: 0,
    avgOpponentRank: 1.0,
    finishRate: 0.70,
    controlTimeAvg: 5.0,
    sigStrikesPerMin: 4.3,
    knockdownsAvg: 0.3,
    takedownAvg: 1.9,
    titleDefenses: 15, // Historical weight
    isMultiDivChamp: true
  },
  {
    id: 'pereira',
    name: 'Alex Pereira',
    nickname: 'Poatan',
    division: 'Light Heavyweight',
    officialRank: 4,
    imgUrl: 'https://picsum.photos/seed/pereira/200/200',
    record: '12-2',
    lastFightDate: '2025-04-01',
    fightsInLast12Months: 2,
    avgOpponentRank: 3.5,
    finishRate: 0.90, // Massive finish rate
    controlTimeAvg: 1.0, // Low control
    sigStrikesPerMin: 5.1,
    knockdownsAvg: 1.5,
    takedownAvg: 0.2,
    titleDefenses: 3,
    isMultiDivChamp: true
  },
  {
    id: 'arman',
    name: 'Arman Tsarukyan',
    nickname: 'Ahalkalakets',
    division: 'Lightweight',
    officialRank: 12, // Underrated
    imgUrl: 'https://picsum.photos/seed/arman/200/200',
    record: '23-3',
    lastFightDate: '2025-09-01',
    fightsInLast12Months: 2,
    avgOpponentRank: 5.0,
    finishRate: 0.55,
    controlTimeAvg: 7.0,
    sigStrikesPerMin: 3.8,
    knockdownsAvg: 0.4,
    takedownAvg: 3.8,
    titleDefenses: 0,
    isMultiDivChamp: false
  }
];

export const INITIAL_WEIGHTS = {
  activity: 50, // Impact of recency & frequency
  sos: 50,      // Impact of quality of opponents
  finish: 50,   // Impact of KOs/Subs
  control: 50,  // Impact of dominance (grappling/striking vol)
  legacy: 30    // Impact of historical defenses
};