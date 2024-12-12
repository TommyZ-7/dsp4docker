'use client';
import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { fetchActions } from './dataFetch';

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';

import { useEffect } from 'react';

import { Spinner } from '@nextui-org/react';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [dataList, setDataList] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const fetchList = async () => {
      const res = await fetchActions();
      console.log(res);
      setDataList(JSON.stringify(res));
    };
    fetchList();
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Spinner color="default" />
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>でーた</p>
      <p>{dataList}</p>
    </main>
  );
}
