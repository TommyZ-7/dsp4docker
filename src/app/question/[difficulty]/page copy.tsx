'use client';
import { useState } from 'react';

import { useParams, useRouter } from 'next/navigation';
import type { Metadata } from 'next';

import { fetchActions } from './dataFetch';

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';

import { useEffect } from 'react';

import { Spinner } from '@nextui-org/react';
import path from 'path';
import Image from 'next/image';

type Action = {
  id: number;
  question: string;
  list: string;
  answer: string;
  comment: string;
};

type List = {
  uuid: string;
  name: string;
  comment: string;
  deletekey: string;
  difficulty: string;
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState<number>(1);
  const [score, setScore] = useState<number>(4);
  const [total, setTotal] = useState<number>(0);
  const [dataList, setDataList] = useState<List[]>([]);
  const [diffData, setDiffData] = useState<string>('');
  const pathname = useParams();
  const diff = pathname.difficulty.toString();
  const router = useRouter();
  const bgi = '/images/back.png';

  useEffect(() => {
    if (isLoading) return;
    const fetchList = async () => {
      const res = await fetchActions(diff);
      console.log(res);
      setDataList(res);
    };
    fetchList();

    setIsLoading(true);
  }, [isLoading, diff]);

  const handleNext = (isCor: boolean) => {
    setIsLoading(true);
    if (isCor) {
      setTotal(total + score);
    }
    setId(id + 1);
    setScore(4);
    setIsLoading(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 relative">
      <Image src={bgi} alt="title" layout="fill" objectFit="cover" className="z-1" />
      <Table selectionMode="single" aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>問題名</TableColumn>
          <TableColumn>難易度</TableColumn>
        </TableHeader>
        {isLoading ? (
          <TableBody>
            {dataList.map((data, index) => (
              <TableRow
                key={index}
                onClick={() => router.push('/question/' + diff + '/' + data.uuid)}
              >
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
