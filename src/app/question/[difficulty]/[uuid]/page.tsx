'use client';
import { useState } from 'react';
import { useEffect } from 'react';
import { fetchActions } from './dataFetch';
import { fetchQuedata } from './quedataFetch';
import { Button } from '@nextui-org/react';
import { Divider } from '@nextui-org/react';
import Image from 'next/image';

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
type animationData = {
  x: number;
  y: number;
  rotate: number;
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

  const boximage = '/images/box.png';
  const wavesimage = '/images/waves.png';
  const kaizokuimage = '/images/kaizokusen.png';

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

  const imageChanger = (id: number) => {
    switch (id) {
      case 1:
        return (
          <>
            
          </>
        );
      case 2:
        return (
          <>
            <Image className='absolute translate-x-3/4 animate-vibrate-1' 
              src="/images/takara02.png" alt="box" width={300} height={300}
              sizes="(max-width: 100px)10vw, (max-width: 100px) 50vw, 33vw"
              style={{ width: '15%', height: 'auto', bottom: "-5%", left: "70%" }}
            />
          </>
        );
      case 3:
        return (
          <>
            <Image className='absolute translate-x-3/4' 
              src="/images/takara03.png" alt="box" width={300} height={300}
              sizes="(max-width: 100px)10vw, (max-width: 100px) 50vw, 33vw"
              style={{ width: '25%', height: 'auto', bottom: "-22%", left: "55%" }}
            />
          </>
        );
      case 4:
        return (
          <>
            <Image className='absolute translate-x-3/4 animate-vibrate-1' 
              src="/images/takara04.png" alt="box" width={300} height={300}
              sizes="(max-width: 100px)10vw, (max-width: 100px) 50vw, 33vw"
              style={{ width: '18%', height: 'auto', bottom: "0%", left: "75%" }}
            />
            <Image className='absolute translate-x-3/4' 
              src="/images/takara04-1.png" alt="box" width={300} height={300}
              sizes="(max-width: 100px)10vw, (max-width: 100px) 50vw, 33vw"
              style={{ width: '25%', height: 'auto', bottom: "40%", left: "53%" }}
            />
          </>
        );
      case 5:
        return (
          <>
            <Image className='absolute translate-x-3/4' 
              src="/images/takara05.png" alt="box" width={300} height={300}
              sizes="(max-width: 100px)10vw, (max-width: 100px) 50vw, 33vw"
              style={{ width: '20%', height: 'auto', bottom: "-5%", left: "63%" }}
            />
            <Image className='absolute translate-x-3/4 animate-vibrate-1' 
              src="/images/takara05-1.png" alt="box" width={300} height={300}
              sizes="(max-width: 100px)10vw, (max-width: 100px) 50vw, 33vw"
              style={{ width: '15%', height: 'auto', bottom: "-15%", left: "63%" }}
            />
          </>
        );
    }
  }

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
      <div>問題名 {queData?.name}</div>
      <div>問 {id}/5</div>
      <div className={`text-center text-7xl  ${quefonts.className} `}>{data[id - 1]?.question}</div>
      <div className='relative'>
        <Image className='absolute top-3/4 z-10' src={wavesimage} alt="box" width={1216} height={57} style={{ width: "100%", height: "auto"}} />
        {imageChanger(id)}
        <Image className='animate-slide-in-blurred-left z-0' src={kaizokuimage} alt="box" width={300} height={300} 
        sizes="(max-width: 150px) 10vw, (max-width: 150px) 50vw, 33vw"
        style={{ width: '17%', height: 'auto' }}
        />

      </div>
      <div
        className="grid grid-cols-1 md:grid-cols-2 overflow-hidden  p-4"
        style={{ height: '50vh' }}
      >
        {data[id - 1].list.split('/$').map((item, index) => {
          return (
            <button
              key={index}
              className="border border-orange-500 rounded-3xl p-0 m-2 relative"
              onClick={() => handlePress((index + 1).toString(), item)}
            >
              <p
                className={`rounded-3xl p-0 bg-slate-100 text-black h-full flex items-center justify-center xl:text-10xl sm:text-7xl text-5xl ${quefonts.className} hover:bg-orange-300`}
              >
                {item}
              </p>
              <Image
                src={boximage}
                alt="box"
                width={100}
                height={100}
                className="absolute bottom-0 right-0"
                style={{ pointerEvents: 'none' }}
              />
            </button>
          );
        })}

      </div>
      <p>debug</p>
        <Button onClick={
          () => {
            setId(1);
          }
        }>id -- 1</Button>
        <Button onClick={
          () => {
            setId(2);
          }
        }>id -- 2</Button>
        <Button onClick={
          () => {
            setId(3);
          }
        }>id -- 3</Button>
        <Button onClick={
          () => {
            setId(4);
          }
        }>id -- 4</Button>
        <Button onClick={
          () => {
            setId(5);
          }
        }>id -- 5</Button>
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
