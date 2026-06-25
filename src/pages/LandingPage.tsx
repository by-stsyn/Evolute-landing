import React from 'react';
import { Hero } from '../components/Hero';
import { ModelRange } from '../components/ModelRange';
import { CarSelector } from '../components/CarSelector';
import { InStock } from '../components/InStock';
import { TestDrive } from '../components/TestDrive';
import { CreditCalculator } from '../components/CreditCalculator';
import { TradeIn } from '../components/TradeIn';
import { Advantages } from '../components/Advantages';
import { Contacts } from '../components/Contacts';

export const LandingPage: React.FC = () => {
  return (
    <>
      <Hero />
      <ModelRange />
      <CarSelector />
      <InStock />
      <TestDrive />
      <CreditCalculator />
      <TradeIn />
      <Advantages />
      <Contacts />
    </>
  );
};
