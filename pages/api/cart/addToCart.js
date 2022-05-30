import dbConnect from "../../../utils/dbConnect";
import Cart from "../../../models/cartModel";
import Retailer from "../../../models/retailerModel";
import { getSession } from "../../../lib/get-session";

dbConnect();

async function handler(req, res) {
  if (req.method === "PUT") {
    const { user } = await getSession(req, res);

    const retailerId = user._id;
    // const retailerId="628e0f7fa8cf29efca07e5fe";

    const { productId, qty } = req.body;
    let retailer = await Retailer.findById(retailerId);

    if (!retailer) {
      res.status(404).json({ err: "Retailer not found" });
      return;
    }

    let cartId = retailer.cart;

    if (!cartId) {
      const newCart = new Cart({
        retailerId,
        products: [{ productId, qty }],
      });
      let createdCart = await newCart.save();
      retailer.cart = createdCart;
      retailer.save();
      res.status(200).json(createdCart);
    } else {
      let cart;
      cart = await Cart.findOne({ _id: cartId });
      if (!cart) {
        const newCart = new Cart({
          retailerId,
          products: [{ productId, qty }],
        });
        let createdCart = await newCart.save();
        retailer.cart = createdCart;
        retailer.save();
        res.status(200).json(createdCart);
      } else {
        const products = [...cart.products];
        const isProductPresent = products.find((item) => {
          return item.productId.equals(productId);
        });

        let newProducts;

        if (isProductPresent) {
          newProducts = products.map((item) =>
            item.productId.equals(productId)
              ? { productId: productId, qty: qty }
              : item
          );
        } else {
          products.push({ productId: productId, qty: qty });
          newProducts = products;
        }

        await Cart.findOneAndUpdate(
          { _id: cart._id },
          { products: newProducts }
        );
        res.status(200).json("cart updated");
      }
    }
  }
}

export default handler;
