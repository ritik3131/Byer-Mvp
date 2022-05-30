import TopBar from "../../component/topBar";
import MiddlePart from "../../component/MiddlePart";
import Head from "next/head";
import { Stack } from "@mui/material";
import { ListItem } from "@mui/material";
function Home() {
  return (
    <>
      <Head>
        <title>Byer | Home</title>
        <meta
          name="description"
          content="India's Larget B2B distribution network for business & retailers"
        />
      </Head>
      <Stack>
        <ListItem>
          <TopBar />
        </ListItem>
        <ListItem>
          <MiddlePart />
        </ListItem>
      </Stack>
    </>
  );
}
export default Home;
