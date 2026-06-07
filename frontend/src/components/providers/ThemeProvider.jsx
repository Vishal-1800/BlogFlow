import { ThemeProvider as NextThemesProvider } from 'next-themes';

/**
 * Theme provider wrapper for dark/light mode support.
 * Uses next-themes with class-based strategy for Tailwind CSS.
 * @param {object} props
 * @param {React.ReactNode} props.children
 */
export function ThemeProvider({ children }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
