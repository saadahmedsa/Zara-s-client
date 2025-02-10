"use client"
import { Button } from "../ui/button";
import {  StarIcon} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { Label } from "../ui/label";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { addTocart, getcartitems } from "../../config/store/shop/cart-slice";
import { useToast } from "../../hooks/use-toast";
import { setProductDetails } from "../../config/store/shop/product-slice";

function ProductDetailsDialog({ open, setOpen, productDetails }) {

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cartItems);
  const { toast } = useToast();


  function handleAddToCart(getCurrentProductId, getTotalStock) {
    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Only ${getQuantity} quantity can be added for this item`,
            variant: "destructive",
          });

          return;
        }
      }
    }
    dispatch(
      addTocart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getcartitems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
    // setRating(0);
    // setReviewMsg("");
  }

//   function handleAddReview() {
//     dispatch(
//       addReview({
//         productId: productDetails?._id,
//         userId: user?.id,
//         userName: user?.userName,
//         reviewMessage: reviewMsg,
//         reviewValue: rating,
//       })
//     ).then((data) => {
//       if (data.payload.success) {
//         setRating(0);
//         setReviewMsg("");
//         dispatch(getReviews(productDetails?._id));
//         toast({
//           title: "Review added successfully!",
//         });
//       }
//     });
//   }

//   useEffect(() => {
//     if (productDetails !== null) dispatch(getReviews(productDetails?._id));
//   }, [productDetails]);

//   console.log(reviews, "reviews");

//   const averageReview =
//     reviews && reviews.length > 0
//       ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
//         reviews.length
//       : 0;

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw]  sm:max-w-[80vw] lg:max-w-[70vw]">
        <DialogHeader className="relative overflow-hidden rounded-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={600}
            height={600}
            className="aspect-square w-full object-cover"
          />
        </DialogHeader>
        <div className="">
          <DialogTitle>
            <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
            <p className="text-muted-foreground text-2xl mb-5 mt-4">
              {productDetails?.description}
            </p>
          </DialogTitle>
          <DialogDescription className="flex items-center justify-between">
            <p
              className={`text-3xl font-bold text-primary ${
                productDetails?.salePrice > 0 ? "line-through" : ""
              }`}
            >
              ${productDetails?.price}
            </p>
            {productDetails?.salePrice > 0 ? (
              <p className="text-2xl font-bold text-muted-foreground">
                ${productDetails?.salePrice}
              </p>
            ) : null}
          </DialogDescription>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-0.5">
            <StarIcon className="h-5 w-5 fill-primary"/>
            <StarIcon className="h-5 w-5 fill-primary"/>
            <StarIcon className="h-5 w-5 fill-primary"/>
            <StarIcon className="h-5 w-5 fill-primary"/>
            <StarIcon className="h-5 w-5 fill-primary"/>
            </div>
            <span className="text-muted-foreground">
              (4.5)
            </span>
          </div>
          <div className="mt-5 pb-4 border-b-2 mb-5">
            {productDetails?.totalStock === 0 ? (
              <Button className="w-full opacity-60 cursor-not-allowed">
                Out of Stock
              </Button>
            ) : (
              <Button
                className=""
                onClick={() =>
                  handleAddToCart(
                    productDetails?._id,
                    productDetails?.totalStock
                  )
                }
              >
                Add to Cart
              </Button>
            )}
          </div>
          {/* <Separator /> */}
          <div className="max-h-[200px] overflow-auto">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            <div className="grid gap-6">
              
                  <div className="flex gap-4">
                    <Avatar className="w-10 h-10 border">
                      <AvatarFallback>
                        SA
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">Saad Ahmed</h3>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <StarIcon className="h-5 w-5 fill-primary"/>
                        <StarIcon className="h-5 w-5 fill-primary"/>
                        <StarIcon className="h-5 w-5 fill-primary"/>
                        <StarIcon className="h-5 w-5 fill-primary"/>
                        <StarIcon className="h-5 w-5 fill-primary"/>
                      </div>
                      <p className="text-muted-foreground">
                        Best Product & Best Quality!
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Avatar className="w-10 h-10 border">
                      <AvatarFallback>
                        AA
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">Ali Ahmed</h3>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <StarIcon className="h-5 w-5 fill-primary"/>
                        <StarIcon className="h-5 w-5 fill-primary"/>
                        <StarIcon className="h-5 w-5 fill-primary"/>
                        <StarIcon className="h-5 w-5 fill-primary"/>
                        <StarIcon className="h-5 w-5 fill-primary"/>
                      </div>
                      <p className="text-muted-foreground">
                        This is Awesome Product!
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Avatar className="w-10 h-10 border">
                      <AvatarFallback>
                        SS
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">Shaheen Shah</h3>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <StarIcon className="h-5 w-5 fill-primary"/>
                        <StarIcon className="h-5 w-5 fill-primary"/>
                        <StarIcon className="h-5 w-5 fill-primary"/>
                        <StarIcon className="h-5 w-5 fill-primary"/>
                        <StarIcon className="h-5 w-5 fill-primary"/>
                      </div>
                      <p className="text-muted-foreground">
                        Best Fabric in Cheap Price!
                      </p>
                    </div>
                  </div>
               
            </div>
            <div className="mt-10 flex-col flex gap-2">
              <Label>Write a review</Label>
              <div className="flex gap-1">
              <StarIcon className="h-5 w-5 fill-primary"/>
              <StarIcon className="h-5 w-5 fill-primary"/>
              <StarIcon className="h-5 w-5 fill-primary"/>
              <StarIcon className="h-5 w-5 fill-primary"/>
              <StarIcon className="h-5 w-5 fill-primary"/>

              </div>
             <Input
                placeholder="Write a review..."
              />
              <Button
            
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;