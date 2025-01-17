'use client';
import { use, useState } from 'react';

import { useRouter } from 'next/navigation';

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';

import { useEffect } from 'react';

import { Spinner } from '@nextui-org/react';

import { importActions } from './dataImporter';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [dataList, setDataList] = useState<string>('');
  const router = useRouter();
  const [text, setText] = useState<string>('');

  useEffect(() => {
    console.log(JSON.stringify(text));
  }, [text]);

  const handleImport = async () => {
    const res = await importActions(text);
    console.log(res);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <textarea name="" id="" onChange={(e) => setText(e.target.value)}></textarea>
      <button onClick={handleImport}>インポート</button>
    </main>
  );
}
