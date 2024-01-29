'use client'

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from "dayjs";

export default () => {
  const minDate = dayjs()
  const maxDate = minDate.add(5, 'w')
  return (
    <LocalizationProvider dateAdapter={ AdapterDayjs }>
      <DateCalendar
        views={ ['day'] }
        // maxDate={ dayjs('2022-04-17') }
        minDate={ minDate }
        maxDate={ maxDate }
      />
    </LocalizationProvider>
  )
}