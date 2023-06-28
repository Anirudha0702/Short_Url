import UrlTable from '@/component/UrlTable';
import { useSession } from 'next-auth/react';
export default function Home() {
  const session=useSession();
  return (
    <>
    {
      session.status=='authenticated'?(<UrlTable/>):(<h2>Login First</h2>)
    }
    </>
  );
}
