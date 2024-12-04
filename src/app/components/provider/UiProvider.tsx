'use client';

import { NextUIProvider } from '@nextui-org/react';
import { FC, ReactNode } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

type UiProviderProps = {
  children: ReactNode;
};

export const UiProvider: FC<UiProviderProps> = ({ children }) => {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="system">
        {children}
      </NextThemesProvider>
    </NextUIProvider>
  );
};
