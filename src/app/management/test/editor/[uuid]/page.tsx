'use client';
import { use, useState, useEffect } from 'react';
import { Button, Input } from '@nextui-org/react';
import { RadioGroup, Radio } from '@nextui-org/react';

import { Divider } from '@nextui-org/react';

import { Spinner } from '@nextui-org/react';

import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { fetchActions } from './dataFetch';
import { fetchQuedata } from './quedataFetch';
import { UpdateAction } from './dataUpdate';

type Action = {
  id: number;
  question: string;
  list: string;
  answer: string;
  comment: string;
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFinish, setIsFinish] = useState(false);
  const [id, setId] = useState<number>(1);
  const [score, setScore] = useState<number>(4);
  const [total, setTotal] = useState<number>(0);
  const [difficulty, setDifficulty] = useState<string>('');
  const [queName, setQueName] = useState<string>('');
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
  const [sendDate, setSendDate] = useState<Action[]>([]);
  const pathname = useParams();

  const router = useRouter();
  const pathnames = pathname.uuid.toString();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchActions(pathnames);
        console.log(response);
        for (let i = 0; i < 5; i++) {
          const newQuestion = question;
          newQuestion[i] = response[i].question;
          setQuestion(newQuestion);
          const newQueChoice = queChoice;
          newQueChoice[i] = response[i].list.split('/$');
          setQueChoice(newQueChoice);
          const newAnswer = answer;
          newAnswer[i] = response[i].answer;
          setAnswer(newAnswer);
        }
        const queresponse = await fetchQuedata(pathnames);
        setQueName(queresponse[0].name);
        setDifficulty(queresponse[0].difficulty);
        setCreatorName(queresponse[0].creator);
        setGrade(queresponse[0].grade);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [pathname, pathnames, answer, queChoice, question]);

  const handleNext = (isCor: boolean) => {
    setIsLoading(true);
    if (isCor) {
      setTotal(total + score);
    }
    setId(id + 1);
    setScore(4);
    setIsLoading(false);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    console.log('submit');
    console.log(queName);
    console.log(question);
    console.log(queChoice);
    console.log(answer);

    //ここから空欄check
    if (queName === '') {
      alert('問題名が入力されていません');
      setIsLoading(false);
      return;
    }
    if (difficulty === '') {
      alert('難易度が選択されていません');
      setIsLoading(false);
      return;
    }

    for (let i = 0; i < 5; i++) {
      if (question[i] === '') {
        alert('問' + Number(i + 1) + 'の問題が入力されていません');
        setIsLoading(false);
        return;
      }
      if (queChoice[i][0] === '') {
        alert('問' + Number(i + 1) + 'の解答1が入力されていません');
        setIsLoading(false);
        return;
      }
      if (queChoice[i][1] === '') {
        alert('問' + Number(i + 1) + 'の解答2が入力されていません');
        setIsLoading(false);
        return;
      }
      if (queChoice[i][2] === '') {
        alert('問' + Number(i + 1) + 'の解答3が入力されていません');
        setIsLoading(false);
        return;
      }
      if (queChoice[i][3] === '') {
        alert('問' + Number(i + 1) + 'の解答4が入力されていません');
        setIsLoading(false);
        return;
      }
      if (answer[i] === '') {
        alert('問' + Number(i + 1) + 'の答えが選択されていません');
        setIsLoading(false);
        return;
      }
    }

    //ここから送信用にデータを整形
    for (let i = 0; i < 5; i++) {
      const newAction = {
        id: i,
        question: question[i],
        list:
          queChoice[i][0] +
          '/$' +
          queChoice[i][1] +
          '/$' +
          queChoice[i][2] +
          '/$' +
          queChoice[i][3],
        answer: answer[i],
        comment: '',
      };
      sendDate.push(newAction);
    }
    const info = {
      name: queName,
      comment: '',
      difficulty: difficulty,
      creator: creatorName,
      grade: grade,
    };

    const response = await UpdateAction(pathnames, sendDate, info);
    setIsLoading(false);
    setIsFinish(true);
  };
  const updateAnswer = (value: string, index: number) => {
    const newAnswer = answer;
    newAnswer[index] = value;
    setAnswer(newAnswer);
  };
  const updateQuestion = (value: string, index: number) => {
    const newQuestion = question;
    newQuestion[index] = value;
    setQuestion(newQuestion);
  };

  const updateQueChoice = (value: string, index: number, index2: number) => {
    const newQueChoice = queChoice;
    newQueChoice[index][index2] = value;
    setQueChoice(newQueChoice);
  };

  const updateDifficulty = (value: string) => {
    setDifficulty(value);
  };

  const updateYear = (value: string) => {
    setGrade(value);
  };
  if (isLoading) {
    return (
      <>
        <div className="fixed inset-0 bg-black bg-opacity-25 z-50 w-100 h-100 flex items-center justify-center">
          <Spinner label="処理中..." color="primary" labelColor="primary" size="lg" />
        </div>
        <div className="flex min-h-screen flex-col justify-between p-24">
          <p>問題名</p>
          <Input placeholder="問題名" />
          <br />
          <p>制作者名</p>
          <Input placeholder="制作者" />
          <br />
          <RadioGroup label="難易度" orientation="horizontal">
            <Radio value="1">簡単</Radio>
            <Radio value="2">普通</Radio>
            <Radio value="3">難しい</Radio>
          </RadioGroup>
          <br />
          <RadioGroup label="学年" orientation="horizontal">
            <Radio value="1">1年</Radio>
            <Radio value="2">2年</Radio>
            <Radio value="3">3年</Radio>
            <Radio value="4">4年</Radio>
            <Radio value="5">5年</Radio>
            <Radio value="6">6年</Radio>
          </RadioGroup>
          <br />
          <Divider />
          {rooptime.map((i) => (
            <div key={i}>
              <br />

              <p>問1</p>
              <Input className="p-1" placeholder="問題" />
              <br />
              <Input className="p-1" placeholder="解答1" />
              <Input className="p-1" placeholder="解答2" />
              <Input className="p-1" placeholder="解答3" />
              <Input className="p-1" placeholder="解答4" />
              <br />
              <RadioGroup label="答え" orientation="horizontal">
                <Radio value="1">解答1</Radio>
                <Radio value="2">解答2</Radio>
                <Radio value="3">解答3</Radio>
                <Radio value="4">解答4</Radio>
              </RadioGroup>
              <br />
              <Divider />
            </div>
          ))}
        </div>
      </>
    );
  }

  return (
    <div className="flex min-h-screen flex-col justify-between p-24">
      <p>問題名</p>
      <Input placeholder="問題名" value={queName} onChange={(e) => setQueName(e.target.value)} />
      <br />
      <p>制作者名</p>
      <Input
        placeholder="制作者"
        value={creatorName}
        onChange={(e) => setCreatorName(e.target.value)}
      />
      <br />
      <RadioGroup label="難易度" orientation="horizontal" defaultValue={difficulty}>
        <Radio value="1" onClick={() => updateDifficulty('1')}>
          簡単
        </Radio>
        <Radio value="2" onClick={() => updateDifficulty('2')}>
          普通
        </Radio>
        <Radio value="3" onClick={() => updateDifficulty('3')}>
          難しい
        </Radio>
      </RadioGroup>
      <br />
      <RadioGroup label="学年" orientation="horizontal" defaultValue={grade}>
        <Radio value="1" onClick={() => updateYear('1')}>
          1年
        </Radio>
        <Radio value="2" onClick={() => updateYear('2')}>
          2年
        </Radio>
        <Radio value="3" onClick={() => updateYear('3')}>
          3年
        </Radio>
        <Radio value="4" onClick={() => updateYear('4')}>
          4年
        </Radio>
        <Radio value="5" onClick={() => updateYear('5')}>
          5年
        </Radio>
        <Radio value="6" onClick={() => updateYear('6')}>
          6年
        </Radio>
      </RadioGroup>
      <br />
      <Divider />
      {rooptime.map((i) => (
        <div key={i}>
          <br />
          <p>問{i + 1}</p>
          <Input
            className="p-1"
            placeholder="問題"
            defaultValue={question[i]}
            onChange={(e) => updateQuestion(e.target.value, i)}
          />
          <br />
          <Input
            className="p-1"
            placeholder="解答1"
            defaultValue={queChoice[i][0]}
            onChange={(e) => updateQueChoice(e.target.value, i, 0)}
          />
          <Input
            className="p-1"
            placeholder="解答2"
            defaultValue={queChoice[i][1]}
            onChange={(e) => updateQueChoice(e.target.value, i, 1)}
          />
          <Input
            className="p-1"
            placeholder="解答3"
            defaultValue={queChoice[i][2]}
            onChange={(e) => updateQueChoice(e.target.value, i, 2)}
          />
          <Input
            className="p-1"
            placeholder="解答4"
            defaultValue={queChoice[i][3]}
            onChange={(e) => updateQueChoice(e.target.value, i, 3)}
          />
          <br />
          <RadioGroup label="答え" orientation="horizontal" defaultValue={answer[i]}>
            <Radio value="1" onClick={() => updateAnswer('1', i)}>
              解答1
            </Radio>
            <Radio value="2" onClick={() => updateAnswer('2', i)}>
              解答2
            </Radio>
            <Radio value="3" onClick={() => updateAnswer('3', i)}>
              解答3
            </Radio>
            <Radio value="4" onClick={() => updateAnswer('4', i)}>
              解答4
            </Radio>
          </RadioGroup>
          <br />
          <Divider />
        </div>
      ))}
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
          <div className="grid grid-cols-3 m-3">
            <Button color="primary" variant="bordered" onClick={() => router.push('/management/')}>
              管理画面に戻る
            </Button>
            <Button
              color="primary"
              variant="bordered"
              onClick={() => router.push('/management/dbedit')}
            >
              編集選択画面に戻る
            </Button>
            <Button color="primary" variant="bordered" onClick={() => router.push('/')}>
              ホームに戻る
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <p></p>
        </div>
      )}
    </div>
  );
}
