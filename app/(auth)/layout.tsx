import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Auth | Genius',
  description: 'Auhthentication page for Genius',
};

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center h-full">{children}</div>
  );
};

export default AuthLayout;
