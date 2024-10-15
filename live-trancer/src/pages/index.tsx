import { GetServerSideProps } from "next";

export default function Home() {
  return (
    <div>
      <p>Redirecting to Home...</p>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.writeHead(302, { Location: '/home' });
  res.end();
  return { props: {} };
};
