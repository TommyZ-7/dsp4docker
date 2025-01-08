'use client';
import { use, useState } from 'react';
import { Button, Input } from '@nextui-org/react';
import { RadioGroup, Radio } from '@nextui-org/react';
import { ImportAction } from './importAction';

import { Divider } from '@nextui-org/react';

import { Spinner } from '@nextui-org/react';

import { useRouter } from 'next/navigation';


export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [isFinish, setIsFinish] = useState(false);

  const [difficulty, setDifficulty] = useState<string>('');
  const [teachName, setTeachName] = useState<string>('');
  const [creatorName, setCreatorName] = useState<string>('');
  const [grade, setGrade] = useState<string>('');
  const rooptime = [0, 1, 2, 3, 4];
  const [answer, setAnswer] = useState<string[]>(['', '', '', '', '']);
  const [question, setQuestion] = useState<string[]>(['', '', '', '', '']);
  const [queChoice, setQueChoice] = useState<string[][]>([
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
  ]);

  const router = useRouter();



  const handleSubmit = async () => {
    setIsLoading(true);
    
    setIsLoading(false);
    setIsFinish(true);
  };


  return (
    <div className="flex min-h-screen flex-col justify-between p-0">
      <p>教員名</p>
      <Input placeholder="教員名" onChange={(e) => setTeachName(e.target.value)} />
      <br />
      {isFinish ? (
        <Button color="primary" variant="bordered" isDisabled={true} onClick={handleSubmit}>
          登録完了
        </Button>
      ) : (
        <Button color="primary" variant="bordered" onClick={handleSubmit}>
          登録
        </Button>
      )}

      {isLoading ? (
        <div className="fixed inset-0 bg-black bg-opacity-25 z-50 w-100 h-100 flex items-center justify-center">
          <Spinner label="処理中..." color="primary" labelColor="primary" size="lg" />
        </div>
      ) : (
        <div>
          <p></p>
        </div>
      )}
      {isFinish ? (
        <div>
          <p>登録完了</p>
          <Button color="primary" variant="bordered" onClick={() => window.location.reload()}>
            さらに登録
          </Button>
        </div>
      ) : (
        <div>
          <p></p>
        </div>
      )}
    </div>
  );
}
