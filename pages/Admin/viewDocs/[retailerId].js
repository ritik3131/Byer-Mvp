import dbConnect from "../../../utils/dbConnect";
import Retailers from "../../../models/retailerModel";
import { getSession } from "../../../lib/get-session";

function viewDocs({ kycDocs, creditDocs }) {
  return (
    <div>
      <h2>KYC Docs</h2>
      {kycDocs.forEach((doc) => {
        return <img src={`/api/getImage/${doc}`}></img>;
      })}
      <h2>Credits Docs</h2>
      {creditDocs.forEach((doc) => {
        return <img src={`/api/getImage/${doc}`}></img>;
      })}
    </div>
  );
}

export default viewDocs;

export async function getServerSideProps(context) {
  await dbConnect();
  const { user } = await getSession(context.req, context.res);
  if (user === undefined || !user || !user.isAdmin) {
    return {
      redirect: {
        destination: `/home`,
      },
    };
  }
  const { retailerId } = context.query;
  let retailer;
  let kycDocs;
  let creditDocs;
  try {
    retailer = await Retailers.findById(retailerId);
    kycDocs = retailer.kycFiles;
    creditDocs = retailer.creditsFiles;
  } catch (error) {
    console.log(error);
  }
  return {
    props: {
      kycDocs: kycDocs ? JSON.parse(JSON.stringify(kycDocs)) : [],
      creditDocs: creditDocs ? JSON.parse(JSON.stringify(creditDocs)) : [],
    },
  };
}
