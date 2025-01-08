'use client';
import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { fetchActions } from './dataFetch';

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';

import { useEffect } from 'react';

import { Spinner } from '@nextui-org/react';

type List = {
  uuid: string;
  name: string;
  comment: string;
  deletekey: string;
  difficulty: string;
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [dataList, setDataList] = useState<List[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    const fetchList = async () => {
      const res = (await fetchActions()) as List[];
      console.log(res);
      setDataList(res);
    };
    fetchList();

    setIsLoading(true);
  }, [isLoading]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Table selectionMode="single" aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>問題名</TableColumn>
          <TableColumn>難易度</TableColumn>
        </TableHeader>
        {isLoading ? (
          <TableBody>
            {dataList.map((data, index) => (
              <TableRow key={index} onClick={() => router.push('/management/test/editor/' + data.uuid)}>
                <TableCell className="text-xl md:text-3xl">{data.name}</TableCell>
                <TableCell className="text-xl md:text-3xl">{data.difficulty}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <TableBody>
            <TableRow key="1">
              <TableCell>
                <Spinner color="default" />
              </TableCell>
              <TableCell>
                <p></p>
              </TableCell>
            </TableRow>
          </TableBody>
        )}
      </Table>
    </main>
  );
}
