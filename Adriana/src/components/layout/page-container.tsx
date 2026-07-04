import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const PageContainer = ({
  children,
}: Props) => {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  );
};

export default PageContainer;
