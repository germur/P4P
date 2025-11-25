import { Fighter, Weights, CalculationResult } from '../types';

/**
 * Calculates the Recency/Activity score using Exponential Decay.
 * Value = Initial * e^(-lambda * t)
 */
const calculateActivityScore = (fighter: Fighter): number => {
  const today = new Date('2025-12-01').getTime(); // Simulating late 2025
  const lastFight = new Date(fighter.lastFightDate).getTime();
  const monthsInactive = (today - lastFight) / (1000 * 60 * 60 * 24 * 30);
  
  // Base decay from inactivity
  const recencyFactor = Math.exp(-0.15 * monthsInactive);
  
  // Bonus for frequency (fights in last year)
  // 3 fights = 1.3x, 2 fights = 1.1x, 1 fight = 1.0x, 0 fights = 0.5x
  let frequencyBonus = 1.0;
  if (fighter.fightsInLast12Months >= 3) frequencyBonus = 1.4;
  else if (fighter.fightsInLast12Months === 2) frequencyBonus = 1.2;
  else if (fighter.fightsInLast12Months === 0) frequencyBonus = 0.5;

  return 100 * recencyFactor * frequencyBonus;
};

/**
 * Calculates Strength of Schedule (SOS).
 * Lower opponent rank is better.
 */
const calculateSOSScore = (fighter: Fighter): number => {
  // Inverse relationship: fighting rank 1 is worth more than rank 10.
  // Base score 100.
  const rankValue = Math.max(0, 15 - fighter.avgOpponentRank * 2); 
  const multiDivBonus = fighter.isMultiDivChamp ? 1.2 : 1.0;
  return rankValue * 8 * multiDivBonus;
};

/**
 * Calculates Dominance/Control Score based on Z-Score approximation.
 * Combines volume striking and control time.
 */
const calculateDominanceScore = (fighter: Fighter): number => {
  // Approximate Z-Score logic (simplified for frontend without full DB)
  // Assuming avg control time is 3 min, avg strikes is 3.0
  const zControl = (fighter.controlTimeAvg - 3.0) / 2.0; 
  const zStrikes = (fighter.sigStrikesPerMin - 3.0) / 1.5;
  const zTakedowns = (fighter.takedownAvg - 1.5) / 1.5;

  const rawScore = (zControl + zStrikes + zTakedowns) * 20; 
  return Math.max(0, 50 + rawScore); // Normalize around 50
};

/**
 * Calculates Finish/Damage Score.
 */
const calculateFinishScore = (fighter: Fighter): number => {
  // Finish rate * Knockdown power
  const finishValue = fighter.finishRate * 100;
  const kdBonus = fighter.knockdownsAvg * 20;
  return finishValue + kdBonus;
};

export const calculateARIRankings = (fighters: Fighter[], weights: Weights): CalculationResult[] => {
  const results = fighters.map((fighter) => {
    // 1. Calculate Sub-scores
    const activityRaw = calculateActivityScore(fighter);
    const sosRaw = calculateSOSScore(fighter);
    const dominanceRaw = calculateDominanceScore(fighter);
    const finishRaw = calculateFinishScore(fighter);

    // 2. Apply User Weights (normalized 0-100 inputs)
    const wActivity = weights.activity / 50; 
    const wSOS = weights.sos / 50;
    const wControl = weights.control / 50;
    const wFinish = weights.finish / 50;
    
    // 3. Weighted Sum
    // We adjust the formula to balance the scales
    const totalScore = 
      (activityRaw * wActivity * 1.2) + 
      (sosRaw * wSOS * 1.5) + 
      (dominanceRaw * wControl) + 
      (finishRaw * wFinish);

    return {
      fighterId: fighter.id,
      totalScore: Number(totalScore.toFixed(1)),
      rank: 0, // Assigned later
      breakdown: {
        activityScore: activityRaw * wActivity,
        sosScore: sosRaw * wSOS,
        dominanceScore: dominanceRaw * wControl,
        finishScore: finishRaw * wFinish
      }
    };
  });

  // Sort by Total Score Descending
  results.sort((a, b) => b.totalScore - a.totalScore);

  // Assign Ranks
  results.forEach((r, index) => {
    r.rank = index + 1;
  });

  return results;
};