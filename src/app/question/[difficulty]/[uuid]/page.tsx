'use client';
import { useState } from 'react';
import { useEffect } from 'react';
import { fetchActions } from './dataFetch';
import { fetchQuedata } from './quedataFetch';
import { Button } from '@nextui-org/react';
import { Divider } from '@nextui-org/react';

import { League_Gothic, Noto_Sans_JP } from 'next/font/google';

import { useRouter } from 'next/navigation';

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/react';

import { useParams } from 'next/navigation';

import React from 'react';

type Action = {
  id: number;
  question: string;
  list: string;
  answer: string;
  comment: string;
};
type QueData1 = {
  uuid: string;
  name: string;
  comment: string;
  deletekey: string;
  difficulty: string;
};

const numfonts = League_Gothic({
  subsets: ['latin'],
  display: 'swap',
});

const quefonts = Noto_Sans_JP({
  display: 'swap',
  subsets: ['latin'],
});

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [id, setId] = useState<number>(1);
  const [dataLen, setDataLen] = useState<number>(0);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [score, setScore] = useState<number>(4);
  const [total, setTotal] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [retry, setRetry] = useState<number>(0);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [data, setData] = useState<Action[]>([]);
  const [isNotfound, setIsNotfound] = useState<boolean>(false);
  const [queData, setQueData] = useState<QueData1>();
  const [queName, setQueName] = useState<string>('');
  const pathname = useParams();
  const [selected, setSelected] = useState<string>('');

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchActions(pathname.uuid.toString());
        setData(response);
        setDataLen(response.length);
        const queresponse = await fetchQuedata(pathname.uuid.toString());
        console.log(queresponse);
        setQueData(queresponse[0]);
        console.log(queresponse);
      } catch (error) {
        console.error(error);
        setIsNotfound(true);
      }
    };
    fetchData();
    setIsLoading(false);
  }, [pathname]);

  const handlePress = (value: string, item: string) => {
    setSelected(item);
    if (value === data[id - 1].answer) {
      if (score === 4) {
        setCount(count + 1);
      }
      setIsCorrect(true);
      isOpen ? onOpenChange() : onOpen();
    } else {
      setIsCorrect(false);
      isOpen ? onOpenChange() : onOpen();
    }
  };

  const handleNext = (isCor: boolean) => {
    setIsLoading(true);
    if (isCor) {
      setTotal(total + score);
    }
    setId(id + 1);
    setScore(4);
    setIsLoading(false);
  };

  const handleRetry = () => {
    if (score > 0) {
      setScore(score - 1);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isNotfound) {
    return <div>Not Found</div>;
  }
  if (id > dataLen) {
    return (
      <>
        <p className="text-4xl text-center p-4">終了!!</p>
        <p className="text-4xl text-center">5問中{count}問一発正解!!</p>
        <p className="text-4xl text-center">{retry}回再挑戦したよ!!</p>
        <p className="text-4xl text-center">スコア:{total}</p>
        <div className="text-center grig grid-cols-2">
          <Button
            className="col-span-1 m-2"
            color="primary"
            variant="bordered"
            onClick={() => window.location.reload()}
          >
            再挑戦する
          </Button>
          <Button
            className="col-span-1 m-2"
            color="primary"
            variant="bordered"
            onClick={() => router.push('/')}
          >
            ホームに戻る
          </Button>
        </div>
      </>
    );
  }
  return (
    <div>
      <h1 className={`bg-blue-600 text-white text-4xl col-span-1 ${quefonts.className}`}>
        問{id}/5
      </h1>
      <br />
      <h1 className="text-4xl text-center">{queData?.name}</h1>
      <br />

      <h2 className="text-center text-4xl sm:text-6xl">{data[id - 1].question}</h2>

      <br />
      <br />
      <br />
      <br />
      <br />
      <Divider />

      <div className="grid grid-cols-1 md:grid-cols-2 p-0 overflow-hidden ">
        {data[id - 1].list.split('/$').map((item, index) => {
          return (
            <button
              key={index}
              className="grid grid-cols-6 border border-gray-800 p-0 overflow-hidden m-2"
              onClick={() => handlePress((index + 1).toString(), item)}
            >
              <p
                className={`p-0 col-span-1 bg-blue-600 text-white aspect-square lg:text-[159px] sm:text-9xl text-8xl sm:-mb-5 -mb-3 items-end text-center ${numfonts.className}`}
              >
                {index + 1}
              </p>
              <p
                className={`p-0 col-span-5 bg-slate-100 text-black h-full flex items-center justify-center xl:text-10xl sm:text-7xl text-5xl ${quefonts.className} hover:bg-sky-500`}
              >
                {item}
              </p>
            </button>
          );
        })}
      </div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        backdrop="blur"
        hideCloseButton={true}
        placement="center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h2 className="text-5xl text-center">{isCorrect ? '正解' : '不正解'}</h2>
              </ModalHeader>
              <ModalBody>
                <Divider />
                {isCorrect ? (
                  <div>
                    <h1 className="text-center text-4xl">問：{data[id - 1].question}</h1>
                    <br />
                    <h1 className="text-center text-4xl">解答：{selected}</h1>
                  </div>
                ) : (
                  <div>
                    <h1 className="text-center text-4xl">問：{data[id - 1].question}</h1>
                    <br />
                    <h1 className="text-center text-4xl">解答：{selected}</h1>
                  </div>
                )}
              </ModalBody>
              {isCorrect ? (
                <ModalFooter>
                  <Button
                    color="primary"
                    onPress={() => {
                      handleNext(true);
                      onClose();
                    }}
                  >
                    次の問題
                  </Button>
                </ModalFooter>
              ) : (
                <ModalFooter>
                  <Button
                    color="danger"
                    onPress={() => {
                      handleRetry();
                      onClose();
                      setRetry(retry + 1);
                    }}
                  >
                    もう一回
                  </Button>
                </ModalFooter>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
