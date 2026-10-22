import { $axios } from "@/plugins/axios";
import type { LeadFilterPayload, LeadListResponse, RemoveLeadResponse } from "@/types/submission"; // 👈 Cleaned up unused imports

export default class SubmissionService {
  // Get leads/submissions with pagination and filters
  getLeadsFilter(payload: LeadFilterPayload, page: number = 1): Promise<LeadListResponse> {
    return $axios.post(`get_lead_list?page=${page}`, payload);
  }

  // Delete submission/leads (supports both single and bulk deletes)
  removeLeads(payload: { id: number[] }): Promise<RemoveLeadResponse> {
    // 👈 Changed to id
    return $axios.post(`remove_lead`, payload);
  }

  // Delete all submissions/leads
  removeAllLead(): Promise<RemoveLeadResponse> {
    return $axios.delete(`remove_all_lead`);
  }

  // Export submissions/leads to CSV
  exportLeadsCsv(payload: LeadFilterPayload): Promise<Blob> {
    return $axios.post(`export_lead`, payload, { responseType: "blob" });
  }
}
