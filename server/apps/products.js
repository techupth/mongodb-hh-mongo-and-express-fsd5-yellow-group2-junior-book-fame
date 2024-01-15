import { Router } from "express";
import { ObjectId } from "mongodb";
import { db } from "../utils/db.js";

const productRouter = Router();

productRouter.get("/", async (req, res) => {
  const collection = db.collection("Products");
  const products = await collection.find({}).limit(10).toArray();
  return res.json({
    data: products,
  });
});

productRouter.get("/:id", async (req, res) => {
  //   const collection = db.collection("Product");
  //   const productId = new ObjectId(req.params.id);
  //   const productById = await collection.find({ _id: productId }).toArray();
  //   return res.json({
  //     data: productById,
  //   });
  const collection = db.collection("Products");
  const productId = new ObjectId(req.params.id);

  const productById = await collection.findOne({ _id: productId });

  return res.json({ data: productById });
});

productRouter.post("/", async (req, res) => {
  const collection = db.collection("Products");
  const productData = { ...req.body };
  const products = await collection.insertOne(productData);
  return res.json({
    message: "Product has been created successfully",
  });
});

// productRouter.put("/:id", async (req, res) => {
//   const collection = db.collection("Product");
//   const productId = new ObjectId(req.params.productId);
//   const newProductData = { ...req.body, created_at: new Date() };
//   await collection.updateOne(
//     {
//       _id: productId,
//     },
//     {
//       $set: newProductData,
//     }
//   );
//   return res.json({
//     message: "Product has been updated successfully",
//   });
// });

productRouter.put("/", async (req, res) => {
  const collection = db.collection("Products");
  const productId = new ObjectId(req.params.id);
  const productData = { ...req.body };
  await collection.updateOne(
    {
      _id: productId,
    },
    {
      $set: productData,
    }
  );

  return res.json({
    message: `Product has been updated successfully`,
  });
});

productRouter.delete("/:id", async (req, res) => {
  const collection = db.collection("Products");
  const productId = new ObjectId(req.params.id);
  await collection.deleteOne({ _id: productId });
  return res.json({
    message: "Product has been deleted successfully",
  });
});

export default productRouter;
