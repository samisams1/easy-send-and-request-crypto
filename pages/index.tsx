import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Head from "next/head";
import Layout from '@/components/Layout';
import AssetTable from '@/components/AssetTable';
import Image from 'next/image';
import backgroundImage from '../assets/easy.jpeg';
import AssetBottom from '@/components/AssetBootom';

type Asset = {
  id: number;
  assets: string;
  lastTrade: string;
  dayChange: number;
  dayChangeAmount: number;
  image:string;
};

const Home: NextPage = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    const fetchAssets = async () => {
      const response = await fetch('/api/assets');
      const data = await response.json();
      setAssets(data);
    };
    fetchAssets();

    // Add event listener to update window width
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial window width

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/favicon-32x32.png" />
      </Head>
      <main className="bg-[#0D192B] flex items-center justify-center p-5" style={{backgroundColor:'black'}}>
        <div className="relative w-full h-full">
          <Image
            src={backgroundImage}
            alt="Background Image"
            layout="fill"
            objectFit="cover"
            className="z-0"
          />
          <Layout >
            <div className="relative z-10 w-full max-w-[1200px] mx-auto bg-black" style={{ width: `min(1200px, ${windowWidth - 40}px)` }}>
              <AssetTable assets={assets} />
              <AssetBottom />
            </div>
          </Layout>
        </div>
      </main>
    </>
  );
};

export default Home;