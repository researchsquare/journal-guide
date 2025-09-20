'use client';

import { useState } from 'react';
import Header from '@/src/components/Header/Header';
import Footer from '@/src/components/Footer/Footer';
import { CrossRefArticle } from '@/src/components/SearchBar/SearchBar';
import Journals from '@/src/components/Journals/Journals';
import SearchBar from '@/src/components/SearchBar/SearchBar';

export default function AppPage() {
const [journals, setJournals] = useState<[string, number][]>([]);
const [articles, setArticles] = useState<CrossRefArticle[]>([]);
const [loading, setLoading] = useState(false);
  return (
    <div>
      <Header />
      <SearchBar setJournals={setJournals} setArticles={setArticles} setLoading={setLoading} />
      <Journals articles={articles} journals={journals} loading={loading} />
      <br/>
      <Footer title="Footer" />
    </div>
  );
}
