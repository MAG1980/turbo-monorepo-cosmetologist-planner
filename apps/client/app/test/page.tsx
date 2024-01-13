'use client';
import { useEffect, useState } from 'react';

export default function () {
  const [data, setData] = useState('initState');
  useEffect(() => {
    fetch('/api')
      .then((res) => res.text())
      .then((response) => setData(response))
      .catch((error) => console.log(error));

    return () => {};
  }, []);

  return <div>{data}</div>;
}
