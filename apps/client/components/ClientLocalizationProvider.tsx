'use client'
import { FC, ReactNode } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/ru';
export const ClientLocalizationProvider: FC<{ children: ReactNode }> = ({ children }: { children: ReactNode }) => {
  return (
    <LocalizationProvider dateAdapter={ AdapterDayjs } adapterLocale="ru-ru">
      { children }
    </LocalizationProvider>
  )
}
