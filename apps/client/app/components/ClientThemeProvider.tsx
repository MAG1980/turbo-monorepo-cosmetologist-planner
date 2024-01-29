'use client'
import { FC, ReactNode } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ruRU } from "@mui/x-date-pickers/locales";
import { ruRU as dataGridRuRu } from '@mui/x-data-grid';
import { ruRU as coreRuRu } from '@mui/material/locale';

const theme = createTheme({
  components: {
    // @ts-ignore
    MuiDateCalendar: {
      styleOverrides: {
        root: {
          color: '#1565c0',
          borderRadius: 18,
          borderWidth: 8,
          borderColor: 'blue',
          border: '8px solid',
          backgroundColor: '#f8bbd0',
        },
      },
    },
  },
  ruRU,
  dataGridRuRu,
  coreRuRu
});

export const ClientThemeProvider: FC<{ children: ReactNode }> = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider theme={ theme }>
      { children }
    </ThemeProvider>
  )
}
