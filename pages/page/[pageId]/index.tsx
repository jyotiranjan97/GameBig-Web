import Head from 'next/head';
import useSWR from 'swr';
import PageHeader from '../../../components/Page/PageHeader/PageHeader';
import AboutPage from '../../../components/Page/AboutPage/AboutPage';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import { useRouter } from 'next/router';
import axios from 'axios';
const { BASE_URL } = process.env;

async function getPageData(arg: string) {
  const response = await axios.get(arg);
  return response.data.pageData;
}

export default function Page() {
  const router = useRouter();
  const { pageId } = router.query;
  const { data: pageData } = useSWR(
    `${BASE_URL}/api/page/?pageId=${pageId}`,
    getPageData
  );

  if (!pageData) return null;

  return (
    <Aux>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <div>
        <PageHeader data={pageData} />
        <AboutPage data={pageData} />
      </div>
    </Aux>
  );
}
