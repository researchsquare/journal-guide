'use client';

import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../src/lib/store';
import Header from '@/src/components/Header/Header';
import Footer from '@/src/components/Footer/Footer';

export default function AppPage() {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useSelector((state: RootState) => state.user);

  return (
    <div>
      <Header />
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {data && (
        <div>
          <h2>{data.name}</h2>
          <p>{data.email}</p>
        </div>
      )}
      <Footer title="Footer" />
    </div>
  );
}
