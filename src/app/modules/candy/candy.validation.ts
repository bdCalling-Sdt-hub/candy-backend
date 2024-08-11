import { z } from "zod";

const addressSchema = z.object({
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
  streetAddress: z.string().min(1, "Street Address is required"),
  city: z.string().min(1, "City is required"),
  zipCode: z.string().min(1, "Zip Code is required"),
});

const candySchema = z.object({
  body: z.object({
    address: addressSchema,
    location: z.object({
      type: z.literal("Point"),
      coordinates: z.tuple([z.number(), z.number()]), // [longitude, latitude]
    }),
    date: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in the format yyyy-mm-dd")
      .refine((val) => {
        const parsedDate = new Date(val);
        return (
          !isNaN(parsedDate.getTime()) &&
          val === parsedDate.toISOString().slice(0, 10)
        );
      }, "Invalid date format or not a valid date"),
  }),
});

export const candyValidaiton = {
  candySchema,
};
