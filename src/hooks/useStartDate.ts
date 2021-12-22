import { useState } from "react";

export const useStartDate = () => {
  const [startDate, setStartDate] = useState<Date>();
  const onStartDateChange = (date: Date) => setStartDate(date);

  return {
    startDate,
    onStartDateChange,
  };
};
