// /* eslint-disable no-prototype-builtins */
import { type ClassValue, clsx } from "clsx";
//import qs from "query-string";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// // FORMAT DATE TIME
// export const formatDateTime = (dateString: Date) => {
//   const dateTimeOptions: Intl.DateTimeFormatOptions = {
//     weekday: "short", // abbreviated weekday name (e.g., 'Mon')
//     month: "short", // abbreviated month name (e.g., 'Oct')
//     day: "numeric", // numeric day of the month (e.g., '25')
//     hour: "numeric", // numeric hour (e.g., '8')
//     minute: "numeric", // numeric minute (e.g., '30')
//     hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
//   };

//   const dateDayOptions: Intl.DateTimeFormatOptions = {
//     weekday: "short", // abbreviated weekday name (e.g., 'Mon')
//     year: "numeric", // numeric year (e.g., '2023')
//     month: "2-digit", // abbreviated month name (e.g., 'Oct')
//     day: "2-digit", // numeric day of the month (e.g., '25')
//   };

//   const dateOptions: Intl.DateTimeFormatOptions = {
//     month: "short", // abbreviated month name (e.g., 'Oct')
//     year: "numeric", // numeric year (e.g., '2023')
//     day: "numeric", // numeric day of the month (e.g., '25')
//   };

//   const timeOptions: Intl.DateTimeFormatOptions = {
//     hour: "numeric", // numeric hour (e.g., '8')
//     minute: "numeric", // numeric minute (e.g., '30')
//     hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
//   };

//   const formattedDateTime: string = new Date(dateString).toLocaleString(
//     "en-US",
//     dateTimeOptions
//   );

//   const formattedDateDay: string = new Date(dateString).toLocaleString(
//     "en-US",
//     dateDayOptions
//   );

//   const formattedDate: string = new Date(dateString).toLocaleString(
//     "en-US",
//     dateOptions
//   );

//   const formattedTime: string = new Date(dateString).toLocaleString(
//     "en-US",
//     timeOptions
//   );

//   return {
//     dateTime: formattedDateTime,
//     dateDay: formattedDateDay,
//     dateOnly: formattedDate,
//     timeOnly: formattedTime,
//   };
// };

// export function formatAmount(amount: number): string {
//   const formatter = new Intl.NumberFormat("en-US", {
//     style: "currency",
//     currency: "USD",
//     minimumFractionDigits: 2,
//   });

//   return formatter.format(amount);
// }

// export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

// export const removeSpecialCharacters = (value: string) => {
//   return value.replace(/[^\w\s]/gi, "");
// };

// interface UrlQueryParams {
//   params: string;
//   key: string;
//   value: string;
// }

// export function formUrlQuery({ params, key, value }: UrlQueryParams) {
//   const currentUrl = qs.parse(params);

//   currentUrl[key] = value;

//   return qs.stringifyUrl(
//     {
//       url: window.location.pathname,
//       query: currentUrl,
//     },
//     { skipNull: true }
//   );
// }

// export function getAccountTypeColors(type: AccountTypes) {
//   switch (type) {
//     case "depository":
//       return {
//         bg: "bg-blue-25",
//         lightBg: "bg-blue-100",
//         title: "text-blue-900",
//         subText: "text-blue-700",
//       };

//     case "credit":
//       return {
//         bg: "bg-success-25",
//         lightBg: "bg-success-100",
//         title: "text-success-900",
//         subText: "text-success-700",
//       };

//     default:
//       return {
//         bg: "bg-green-25",
//         lightBg: "bg-green-100",
//         title: "text-green-900",
//         subText: "text-green-700",
//       };
//   }
// }

// export function countTransactionCategories(
//   transactions: Transaction[]
// ): CategoryCount[] {
//   const categoryCounts: { [category: string]: number } = {};
//   let totalCount = 0;

//   // Iterate over each transaction
//   transactions &&
//     transactions.forEach((transaction) => {
//       // Extract the category from the transaction
//       const category = transaction.category;

//       // If the category exists in the categoryCounts object, increment its count
//       if (categoryCounts.hasOwnProperty(category)) {
//         categoryCounts[category]++;
//       } else {
//         // Otherwise, initialize the count to 1
//         categoryCounts[category] = 1;
//       }

//       // Increment total count
//       totalCount++;
//     });

//   // Convert the categoryCounts object to an array of objects
//   const aggregatedCategories: CategoryCount[] = Object.keys(categoryCounts).map(
//     (category) => ({
//       name: category,
//       count: categoryCounts[category],
//       totalCount,
//     })
//   );

//   // Sort the aggregatedCategories array by count in descending order
//   aggregatedCategories.sort((a, b) => b.count - a.count);

//   return aggregatedCategories;
// }

// export function extractCustomerIdFromUrl(url: string) {
//   // Split the URL string by '/'
//   const parts = url.split("/");

//   // Extract the last part, which represents the customer ID
//   const customerId = parts[parts.length - 1];

//   return customerId;
// }

// export function encryptId(id: string) {
//   return btoa(id);
// }

// export function decryptId(id: string) {
//   return atob(id);
// }

// export const getTransactionStatus = (date: Date) => {
//   const today = new Date();
//   const twoDaysAgo = new Date(today);
//   twoDaysAgo.setDate(today.getDate() - 2);

//   return date > twoDaysAgo ? "Processing" : "Success";
// };

export const authFormSchema = () =>
  z.object({
    email: z.string().email(),
    password: z
      .string()
      .min(8, "Password must contain at least 8 character(s)"),
  });

export const forgetPasswordFormSchema = () =>
  z.object({
    email: z.string().email(),
  });

export const resetPasswordFormSchema = () =>
  z
    .object({
      password: z
        .string()
        .min(8, "Password must contain at least 8 character(s)"),
      confirmPassword: z
        .string()
        .min(8, "Password must contain at least 8 character(s)"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"], // Specify that the error message should be on the confirmPassword field
    });

export const shopFormSchema = () =>
  z.object({
    name: z.string().nonempty("Name is required"),
    city: z.string().nonempty("City is required"),
    status: z.string().nonempty("Status is required"),
  });

export const categoryFormSchema = () =>
  z.object({
    name: z.string().nonempty("Name is required"),
    code: z.string().nonempty("Code is required"),
    status: z.string().nonempty("Status is required"),
  });

export const productsFormSchema = () =>
  z.object({
    name: z.string().nonempty("Name is required"),
    code: z.string().nonempty("Code is required"),
    category: z.string().nonempty("Category is required"),
    shop: z.string().nonempty("Shop is required"),
    price: z
      .string()
      .nonempty("Price is required")
      .transform((val) => parseFloat(val))
      .refine((val) => !isNaN(val), "Price must be a number"),
    quantity: z
      .string()
      .nonempty("Quantity is required")
      .transform((val) => parseInt(val, 10))
      .refine((val) => !isNaN(val), "Quantity must be a number"),
  });

export const userFormSchema = () =>
  z.object({
    username: z.string().nonempty("User name is required"),
    email: z.string().email(),
    role: z.string().nonempty("User role is required"),
    shop: z.string().nonempty("Shop is required"),
    password: z.string().nonempty("Password is required"),
    status: z.string().nonempty("Status is required"),
  });

export const salesFormSchema = () =>
  z.object({
    invoice: z.string().nonempty("Invoice number is required"),
    total: z
      .string()
      .nonempty("Total is required")
      .transform((val) => parseFloat(val))
      .refine((val) => !isNaN(val), "Total must be a number"),
    status: z.string().nonempty("Status is required"),
    products: z.array(
      z.object({
        productId: z.string(),
        code: z.string(),
        name: z.string(),
        existingQuantity: z.number(),
        saleQuantity: z
          .string()
          .min(1, "Sale quantity must be greater than 0")
          .nonempty("Quantity is required")
          .transform((val) => parseInt(val, 10))
          .refine((val) => !isNaN(val), "Quantity must be a number"),
      })
    ),
    shop: z.string().nonempty("Shop is required"),
  });

export const accountFormSchema = () =>
  z.object({
    name: z.string().nonempty("User name is required"),
    email: z.string().email(),
  });

export const newPasswordFormSchema = () =>
  z
    .object({
      password: z
        .string()
        .min(8, "Password must contain at least 8 character(s)"),
      newPassword: z
        .string()
        .min(8, "New password must contain at least 8 character(s)"),
      confirmPassword: z
        .string()
        .min(8, "Password must contain at least 8 character(s)"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"], // Specify that the error message should be on the confirmPassword field
    });
