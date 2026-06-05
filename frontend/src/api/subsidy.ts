import request from "@/utils/request";

export interface SubsidySummaryItem {
  elderlyId: string;
  name: string;
  idCard: string;
  community: string;
  subsidyCategory: string;
  mealCount: number;
  totalSubsidy: number;
  totalSelfPay: number;
  totalMealPrice: number;
}

export interface MonthlySummaryResponse {
  month: string;
  quota: {
    totalQuota: number;
    usedAmount: number;
    remainingAmount: number;
    status: string;
  };
  total: number;
  list: SubsidySummaryItem[];
  page: number;
  pageSize: number;
}

export interface CategoryStat {
  category: string;
  count: number;
  totalSubsidy: number;
}

export function getMonthlySummary(params: {
  month?: string;
  page?: number;
  pageSize?: number;
}) {
  return request.get<any, MonthlySummaryResponse>("/subsidy/monthly-summary", {
    params,
  });
}

export function getSubsidyQuota(params?: { month?: string }) {
  return request.get<any, any>("/subsidy/quota", { params });
}

export function getCategoryStats(params?: { month?: string }) {
  return request.get<any, CategoryStat[]>("/subsidy/category-stats", {
    params,
  });
}

export function exportSubsidyCsv(month?: string) {
  const token = localStorage.getItem("token") || "";
  const params = month ? `?month=${month}` : "";
  const url = `/api/subsidy/export-csv${params}`;
  const link = document.createElement("a");
  link.href = url;
  link.target = "_blank";
  link.click();
}
