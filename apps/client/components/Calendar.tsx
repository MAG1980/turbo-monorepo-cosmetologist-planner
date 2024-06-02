'use client'

import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { Typography, useTheme } from "@mui/material";

export default () => {
  const [date, setDate] = useState<Dayjs | null>(null);
  const minDate = dayjs()
  const maxDate = minDate.add(5, 'w')
  console.log('date', date)
  const theme = useTheme()
  console.log(theme)
  return (
    <LocalizationProvider dateAdapter={ AdapterDayjs }>
      <DateCalendar
        views={ ['day'] }
        defaultValue={ minDate }
        // maxDate={ dayjs('2022-04-17') }
        minDate={ minDate }
        maxDate={ maxDate }
        value={ date }
        onChange={ setDate }
      />
      <DatePicker
        views={ ['day'] }
        defaultValue={ minDate }
        // maxDate={ dayjs('2022-04-17') }
        minDate={ minDate }
        maxDate={ maxDate }
        value={ date }
        onChange={ setDate }
      />
      <Typography>
        Stored value: { date == null ? 'null' : date.format() }
      </Typography>
    </LocalizationProvider>
  )
}