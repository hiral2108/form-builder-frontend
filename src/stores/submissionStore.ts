import { defineStore } from "pinia";

export interface EmailSettingsType {
  name: string;
  sendToEmail: string;
  subject: string;
  emailBody: string;
  replyTo: string;
  bcc: string;
  cc: string;
}

export interface SubmissionSettingType {
  confirmationType: "same_page" | "custom_url";
  messageToShow: string;
  customUrl: string;
  afterSubmission: "hide_form" | "reset_form";
  saveToDatabase: boolean;
  sendEmail: boolean;
  emailSettings: EmailSettingsType;
}

export const useSubmissionSettingStore = defineStore("submissionSetting", {
  state: () => ({
    submissionSetting: {
      confirmationType: "same_page",
      messageToShow: "Thank you! Your submission has been received successfully.",
      customUrl: "",
      afterSubmission: "hide_form",
      saveToDatabase: true,
      sendEmail: false,
      emailSettings: {
        name: "",
        sendToEmail: "",
        subject: "",
        emailBody: "",
        replyTo: "",
        bcc: "",
        cc: "",
      },
    } as SubmissionSettingType,
  }),
});