import { format } from "date-fns";

export const dateFormatter = (date: any) => {
  return format(new Date(date), "dd MMM");
};