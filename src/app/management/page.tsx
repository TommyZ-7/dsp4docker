'use client';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <br />

      <div className="grid grid-cols-1 md:grid-cols-2 p-0 overflow-hidden ">
        <button
          className="border border-gray-800 p-0 overflow-hidden m-2"
          onClick={() => router.push('./management/dbimport')}
        >
          <p
            className={`p-5 bg-emerald-400 text-black h-full flex items-center justify-center xl:text-6xl sm:text-6xl text-5xl hover:bg-emerald-600`}
          >
            問題入力
          </p>
        </button>
        <button
          className="border border-gray-800 p-0 overflow-hidden m-2 "
          onClick={() => router.push('./management/dbedit')}
        >
          <p
            className={`p-5 bg-amber-400 text-black h-full flex items-center justify-center xl:text-6xl sm:text-6xl text-5xl hover:bg-amber-600`}
          >
            問題編集
          </p>
        </button>
      </div>
      <Button color="primary" variant="bordered" onClick={() => router.push('/')}>
        最初に戻る
      </Button>
      <br />
    </main>
  );
}
