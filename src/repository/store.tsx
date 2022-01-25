import React, { useState } from "react";
import { useContext } from "react";
import { Student } from '../domain/entities/student/student';
import { getCurrentDate } from '../lib/utils';

const StoreContext = React.createContext<any>({});

export const useStore = () => useContext(StoreContext);

export const Provider: React.FC = ({ children }) => {
  const [student, setStudent] = useState(new Student());
  const [date, setDate] = useState(getCurrentDate());
  const [period, setPeriod] = useState(null);

  const value = {
      student,
      date,
      period,
      updateStudent: setStudent,
      updateDate: setDate,
      updatePeriod: setPeriod
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}