import * as yup from "yup";

export const contactSchema = yup.object({
  fullName: yup.string().required("שדה חובה").max(120, "עד 120 תווים"),
  phone: yup.string().required("שדה חובה").min(7, "מספר קצר מדי"),
  email: yup
    .string()
    .email("אימייל לא תקין")
    .nullable()
    .transform((v) => (v === "" ? null : v)),
  message: yup.string().required("שדה חובה").min(5, "מינימום 5 תווים"),
});

export type ContactValues = yup.InferType<typeof contactSchema>;
