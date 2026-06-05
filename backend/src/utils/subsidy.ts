import { IElderly, SubsidyCategory } from '../models/Elderly';

export const MEAL_PRICES: Record<string, number> = {
  A: 12,
  B: 15,
  C: 18,
};

export const SUBSIDY_RATES: Record<SubsidyCategory, number> = {
  low_income_full: 15,
  low_income: 10,
  normal: 5,
  senior_extra: 5,
};

export const SENIOR_SUBSIDY = 3;
export const SENIOR_AGE_THRESHOLD = 80;

export interface SubsidyCalculation {
  baseSubsidy: number;
  seniorSubsidy: number;
  totalSubsidy: number;
  selfPayAmount: number;
}

export function calculateSubsidy(
  elderly: IElderly,
  mealPrice: number
): SubsidyCalculation {
  let baseSubsidy = SUBSIDY_RATES[elderly.subsidyCategory];
  let seniorSubsidy = 0;

  if (elderly.age >= SENIOR_AGE_THRESHOLD) {
    seniorSubsidy = SENIOR_SUBSIDY;
  }

  let totalSubsidy = baseSubsidy + seniorSubsidy;
  let selfPayAmount = mealPrice - totalSubsidy;

  if (selfPayAmount < 0) {
    selfPayAmount = 0;
    totalSubsidy = mealPrice;
  }

  return {
    baseSubsidy: Math.min(baseSubsidy, totalSubsidy),
    seniorSubsidy: totalSubsidy > baseSubsidy ? totalSubsidy - baseSubsidy : 0,
    totalSubsidy,
    selfPayAmount,
  };
}

export function generateOrderNo(): string {
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `ORD${dateStr}${random}`;
}

export function getMonthKey(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  return `${year}-${month}`;
}
