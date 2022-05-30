

```
PRODUCT(admin)
@route  POST api/admin/products
@desc   add new product

@route  DELETE api/admin/products/:productId
@desc   delete a product

@route  PUT api/admin/products
@desc   update a product


CART
@route  POST api/cart/addToCart
@desc   add product to cart

@route  DELETE api/cart/:cartId/:productId
@desc   remove product from cart

@route  DELETE api/cart/deleteCart
@desc   delete cart


ORDER
@route  POST api/order/newOrder
@desc   intialize an order

@route  PATCH api/order/newOrder
@desc   update touch point status



 

```

