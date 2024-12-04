'use client';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { League_Gothic, Noto_Sans_JP } from 'next/font/google';
import Image from 'next/image';

const numfonts = League_Gothic({
  subsets: ['latin'],
  display: 'swap',
});

const quefonts = Noto_Sans_JP({
  display: 'swap',
  subsets: ['latin'],
});

export default function Home() {
  const router = useRouter();
  const easy = '/images/easy.png';
  const norm = '/images/norm.png';
  const hard = '/images/hard.png';
  const title = '/images/title.png';

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <br />
      <div className="flex items-center justify-center">
        <Image src={title} alt="title" width={500} height={100} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 p-0 overflow-hidden ">
        <button
          className="p-0 overflow-hidden m-6 hover:border-2 border-black"
          onClick={() => router.push('./question/easy')}
        >
          <Image src={easy} alt="easy" width={300} height={300} />
        </button>
        <button
          className="p-0 overflow-hidden m-6 hover:border-2 border-black"
          onClick={() => router.push('./question/normal')}
        >
          <Image src={norm} alt="easy" width={300} height={300} />
        </button>
        <button
          className="p-0 overflow-hidden m-6 hover:border-2 border-black"
          onClick={() => router.push('./question/hard')}
        >
          <Image src={hard} alt="easy" width={300} height={300} />
        </button>
      </div>
      <br />
    </main>
  );
}
