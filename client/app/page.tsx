'use client';

import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../src/lib/store';
import { fetchUser } from '../src/slices/userSlice';

export default function AppPage() {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useSelector((state: RootState) => state.user);

  return (
    <div>
      <h1>Dashboards</h1>
      <button onClick={() => dispatch(fetchUser(1))}>Fetch User</button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {data && (
        <div>
          <h2>{data.name}</h2>
          <p>{data.email}</p>
        </div>
      )}
    </div>
  );
}
