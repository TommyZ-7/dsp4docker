'use client';
import { useState } from 'react';

import { useParams, useRouter } from 'next/navigation';
import type { Metadata } from 'next';

import { fetchActions } from './dataFetch';
import { AiFillCaretLeft } from 'react-icons/ai';
import { AiFillCaretRight } from 'react-icons/ai';

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';
import { Button } from '@nextui-org/react';
import { useEffect } from 'react';

import { Spinner } from '@nextui-org/react';
import path from 'path';
import Image from 'next/image';
import { data, p } from 'framer-motion/client';

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

type ifShowButton = {
  next: boolean;
  before: boolean;
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState<number>(1);
  const [score, setScore] = useState<number>(4);
  const [total, setTotal] = useState<number>(0);
  const [dataList, setDataList] = useState<List[]>([]);
  const [diffData, setDiffData] = useState<string>('');
  const pathname = useParams();
  const [showButton, setShowButton] = useState<ifShowButton>({ next: false, before: false });
  const diff = pathname.difficulty.toString();
  const router = useRouter();
  const bgi = '/images/back.png';
  const mapi = '/images/map.jpg';
  const [maxPage, setMaxPage] = useState<number>(0);
  const [pageMug, setPageMug] = useState<number>(0);
  const [hoverButton, setHoverButton] = useState<number>(0);

  useEffect(() => {
    if (isLoading) return;
    const fetchList = async () => {
      const res = await fetchActions(diff);
      console.log(res);
      setDataList(res);
      setMaxPage(Math.floor(res.length / 5));
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

  const handleShowButton = () => {
    console.log(maxPage);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 relative">
      <Image src={bgi} alt="title" layout="fill" objectFit="cover" className="z-[1]" />

      <div className="grid grid-cols-2 z-[2]">
        <div className="grid-cols-1">
          <p className="text-black">
            {diff === 'easy'
              ? 'かんたん'
              : diff === 'normal'
              ? 'ふつう'
              : diff === 'hard'
              ? 'むずかしい'
              : ''}
          </p>
          {isLoading ? (
            <div>
              {[...Array(5)]
                .map((_, index) => index + pageMug * 5)
                .map((index) => (
                  <div key={index - 1}>
                    {dataList[index] === undefined ? (
                      <p className="text-xl" m-3>
                        &nbsp;
                      </p>
                    ) : (
                      <button
                        onClick={() =>
                          router.push('/question/' + diff + '/' + dataList[index].uuid)
                        }
                        onMouseEnter={() => {
                          setHoverButton(index);
                          console.log(index);
                        }}
                      >
                        <p
                          className="text-xl  m-3 md:text-3xl border-3 border-black"
                          style={{ color: 'black' }}
                        >
                          {dataList[index]?.name}
                        </p>
                      </button>
                    )}
                  </div>
                ))}
            </div>
          ) : (
            <div key="1">
              <Spinner color="default" />
            </div>
          )}
          <div className="grid grid-cols-4 w-full">
            <div className="grid-cols-1"></div>
            <div className="grid-cols-1 justify-center">
              {pageMug === 0 ? (
                <p></p>
              ) : (
                <button onClick={() => setPageMug(pageMug - 1)}>
                  <AiFillCaretLeft />
                </button>
              )}
            </div>
            <div className="grid-cols-1 justify-center">
              {pageMug === maxPage ? (
                <p></p>
              ) : (
                <button onClick={() => setPageMug(pageMug + 1)}>
                  <AiFillCaretRight />
                </button>
              )}
            </div>
            <div className="grid-cols-1"></div>
          </div>
        </div>
        <div className="grid-cols-1">
          <Image className="" src={mapi} alt="title" width={800} height={800} />
          <p className="text6xl" style={{ color: hoverButton % 5 === 0 ? 'yellow' : 'black' }}>
            ・
          </p>
          <p className="text6xl" style={{ color: hoverButton % 5 === 1 ? 'yellow' : 'black' }}>
            ・
          </p>
          <p className="text6xl" style={{ color: hoverButton % 5 === 2 ? 'yellow' : 'black' }}>
            ・
          </p>
          <p className="text6xl" style={{ color: hoverButton % 5 === 3 ? 'yellow' : 'black' }}>
            ・
          </p>
          <p className="text6xl" style={{ color: hoverButton % 5 === 4 ? 'yellow' : 'black' }}>
            ・
          </p>
        </div>
      </div>
    </main>
  );
}
