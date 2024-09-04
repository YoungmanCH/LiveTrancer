import { GetServerSideProps } from 'next';

export default function Home() {
  return (
    <div>
      <p>Redirecting to Dashboard...</p>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.writeHead(302, { Location: '/dashboard' });
  res.end();
  return { props: {} };
};
