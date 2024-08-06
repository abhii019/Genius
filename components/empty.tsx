import Image from 'next/image';
import React from 'react';

interface emptyProps {
  label: string;
}

export default function Empty({ label }: emptyProps) {
  return (
    <div className="h-full p-20 flex flex-col items-center justify-center">
      <div className="relative h-72 w-72">
        <Image alt="Empty" src="/empty.png" fill />
      </div>
      <div className="text-muted-foreground text-sm text-center">{label}</div>
    </div>
  );
}
