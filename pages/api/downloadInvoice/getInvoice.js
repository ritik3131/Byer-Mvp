// import orderModel from "../../../models/orderModel";
// import productModel from "../../../models/productModel";
// import dbConnect from "../../../utils/dbConnect";
// import { getSession } from "../../../lib/get-session";
// import pdfTemplate from '../../../documents/invoiceTemplate';
// import * as pdf from 'html-pdf'
// import * as path from "path";
// import * as PDFDocument from "pdfkit";
// import * as fs from "fs";

// dbConnect();

// // var html = fs.readFileSync('/home/ritik/Desktop/Nextjs/byer-mvp/documents/invoice.html', 'utf8');
// // /api/new-retailer
// async function handler(req, res) {
//   if (req.method === "POST") {
//     try {
//       const session = await getSession(req, res);
//       if (!session)
//         res.status.json({
//           error: {
//             message: "You are not authorized",
//             statusCode: 400,
//           },
//         });
//       const { orderId } = req.body;
//       const order = await orderModel.findById(orderId);
//       let products=[{productName:"Fdsfdsf",price:"50"},{productName:"Fdsfdsfdfdf",price:"510"}]
//     //   console.log("Order",order)
//     //   let products =order.products.forEach(async (prod) => {
//     //     const productId = prod.productId;
//     //    return productModel.findById(productId).then(prod=>prod);
//     //   });;
//     //   console.log("productArray",products)
//       const data = {
//         orderId: order._id,
//         name: session.user.ownerName,
//         products,
//         totalAmount: order.totalAmount,
//       };
//       const filename = "invoice-" + orderId + ".pdf";
//       const filepath = path.join("data", "invoices", filename);
//       pdf.create(pdfTemplate(data)).toFile(filename, (err) => {
//         if(err) {
//             res.send(Promise.reject());
//         }

//         res.send(Promise.resolve());
//     });
//     } catch (err) {
//       console.log(err);
//     }
//   }
//   res.status(200).send("Wrong method");
// }

// export default handler;

//Method-2

import orderModel from "../../../models/orderModel";
import productModel from "../../../models/productModel";
import dbConnect from "../../../utils/dbConnect";
import { getSession } from "../../../lib/get-session";
import * as path from "path";
import * as PDFDocument from "pdfkit";
import * as fs from "fs";

dbConnect();

// var html = fs.readFileSync('/home/ritik/Desktop/Nextjs/byer-mvp/documents/invoice.html', 'utf8');
// /api/new-retailer
async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const session = await getSession(req, res);
      if (!session)
        res.status.json({
          error: {
            message: "You are not authorized",
            statusCode: 400,
          },
        });
      const { orderId } = req.body;
      const order = await orderModel.findById(orderId);
      const filename = "invoice-" + orderId + ".pdf";
      const filepath = path.join("public/documents/invoices", filename);

      //Generation the pdf
      const pdfDoc = new PDFDocument();
        // pdfDoc.pipe(res);
      pdfDoc.pipe(fs.createWriteStream(filepath));
      pdfDoc.fontSize(26).fillColor("blue").text("Invoice: ", {
        underline: true,
      });
      pdfDoc.text("---------------------");
      let { products } = await order.populate(`products.0.productId`);

      products.map((product) =>
        pdfDoc
          .fontSize(14)
          .text(
            `${product.productId.productName}- Quantity ${product.qty} x ${product.productId.price}Rs`
          )
      );
      pdfDoc.text("---------------------");
      pdfDoc
        .fontSize(20)
        .fillColor("red")
        .text("Total Price: " + order.totalAmount);
        // res.status(200).send("Invoice Generated");
      pdfDoc.end();
    } catch (err) {
      console.log(err);
    }
  }
  res.status(200).send("Wrong method");
}

// export default handler;

//Method-3

// import orderModel from "../../../models/orderModel";
// import Product from "../../../models/productModel";
// import dbConnect from "../../../utils/dbConnect";
// import { getSession } from "../../../lib/get-session";
// import * as pdf from "html-pdf";
// import * as path from "path";
// import * as PDFDocument from "pdfkit";
// import easyinvoice from "easyinvoice";
// import * as fs from "fs";

// dbConnect();

// function base64_encode(img) {
//     // read binary data
//     let png = fs.readFileSync(img);
//     // convert binary data to base64 encoded string
//     return new Buffer.from(png).toString('base64');
// };

// let imgPath = path.resolve('Resources', 'cod.png');

// // var html = fs.readFileSync('/home/ritik/Desktop/Nextjs/byer-mvp/documents/invoice.html', 'utf8');
// // /api/new-retailer
// async function handler(req, res) {
//   if (req.method === "POST") {
//     try {
//       const session = await getSession(req, res);
//       if (!session)
//         res.status.json({
//           error: {
//             message: "You are not authorized",
//             statusCode: 400,
//           },
//         });
//       const { orderId } = req.body;
//       const order = await orderModel.findById(orderId);
//       const filename = "invoice-" + orderId + ".pdf";
//       const filepath = path.join(
//         "documents/invoices",
//         filename
//       );
//       //   console.log("order", order);
//       let date = order.createdAt.toString();

//       //   order.products.forEach((prod) => {
//       //     // const productId = prod.productId;
//       //     // productModel.findById(productId).then((product) => {
//       //     //   let productDetails = {
//       //     //     description: product.ProductName,
//       //     //     quantity: prod.qty,
//       //     //     price: product.price,
//       //     //   };
//       //     //   products.push(productDetails);
//       //     // });
//       //     products=prod.populate("productId");
//       //     console.log(products)
//       //   });
//       let { products } = await order.populate(`products.0.productId`);
//       let temp = [];
//       products.map((product) => {
//         let productDetails = {
//           description: product.productId.productName,
//           quantity: "1",
//           tax: 0,
//           price: product.productId.price,
//         };
//         temp.push(productDetails);
//       });
//       console.log(temp);

//       //Generation the pdf
//       let data = {
//         //"documentTitle": "RECEIPT", //Defaults to INVOICE
//         currency: "EUR",
//         taxNotation: "vat", //or gst
//         marginTop: 25,
//         marginRight: 25,
//         marginLeft: 25,
//         marginBottom: 25,
//         logo: `${base64_encode(imgPath)}`, //or base64
//         logoExtension: "png", //only when logo is base64
//         sender: {
//           company: "Buy Me A Gradient",
//           address: "Corso Italia 13",
//           zip: "1234 AB",
//           city: "Milan",
//           country: "IT",
//           //"custom1": "custom value 1",
//           //"custom2": "custom value 2",
//           //"custom3": "custom value 3"
//         },
//         client: {
//           company: "Client Corp",
//           address: "Clientstreet 456",
//           zip: "4567 CD",
//           city: "Clientcity",
//           country: "Clientcountry",
//           //"custom1": "custom value 1",
//           //"custom2": "custom value 2",
//           //"custom3": "custom value 3"
//         },
//         invoiceNumber: orderId,
//         invoiceDate: date,
//         products: temp,
//         bottomNotice: "Kindly pay your invoice within 15 days.",
//       };
//       let result = await easyinvoice.createInvoice(data);
//       fs.writeFileSync(filepath, result.pdf, "base64");
//     } catch (err) {
//       console.log(err);
//     }
//   }
//   res.status(200).send("Wrong method");
// }

export default handler;
