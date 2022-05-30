import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Head from "next/head";

const FileViewer = dynamic(() => import("react-file-viewer"), {
  ssr: false,
});

export default function Index() {
  const router = useRouter();
  const { filepath } = router.query;
  console.log(filepath);
  return (
    <>
      {" "}
      <Head>
        <title>Byer | Order Invoice</title>
        <meta
          name="description"
          content="India's Larget B2B distribution network for business & retailers"
        />
      </Head>{" "}
      <FileViewer fileType="pdf" filePath={filepath} />
    </>
  );
}
