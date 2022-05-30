import React from "react";
import { getSession } from "../../../lib/get-session";
import dbConnect from "../../../utils/dbConnect";
import Appbar from "../../../component/AppBar";
import orderModel from "../../../models/orderModel";
import Head from "next/head";
import { useRouter } from "next/router";

function orderId({ status, user }) {
  const router = useRouter();
  const routerToStoreKycHandler = () => {
    router.push("/Store-Verification");
  };

  const routerToCartHandler = () => {
    router.push("/cart");
  };

  const routerToProfile = async () => {
    router.push(`/retailerProfile/${user._id}`);
  };
  let content = <p>Due to some reason your payment is failed</p>;
  if (status !== "0%")
    content = (
      <div style={{ margin: "100px" }}>
        <p>
          Your payment is successfully done and you have paid {status} of amount
          of total Amount
        </p>
      </div>
    );
  return (
    <div>
      <Head>
        <title>Byer | Order Status</title>
        <meta
          name="description"
          content="India's Larget B2B distribution network for business & retailers"
        />
      </Head>
      <Appbar
        routerToProfile={routerToProfile}
        cartCount={0}
        routerToCartHandler={routerToCartHandler}
        routerToStoreKyc={routerToStoreKycHandler}
      />
      {content}
    </div>
  );
}

export default orderId;

export async function getServerSideProps(context) {
  await dbConnect();
  const { orderId } = context.query;
  const { user } = await getSession(context.req, context.res);
  if (user === undefined || !user) {
    return {
      redirect: {
        destination: `/home`,
      },
    };
  }
  const order = await orderModel.findById(orderId);
  const status = order.paymentStatus;
  return {
    props: { status: JSON.parse(JSON.stringify(status)), user },
  };
}
