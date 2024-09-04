import { ReactNode } from 'react';
import GlobalLayout from './components/templates/GlobalLayout';

export default function RootLayout({ children }: { children: ReactNode }) {
  return <GlobalLayout>{children}</GlobalLayout>;
}
