"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '../../../components/ui/button'
import { ChevronLeftIcon, ChevronRightIcon, ShirtIcon,CloudLightning,BabyIcon,UmbrellaIcon ,WatchIcon,Shirt,ShoppingBasket,Images,WashingMachine,Airplay,Heater} from 'lucide-react'
import { Card, CardContent } from '../../../components/ui/card'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllFilteredProducts, fetchProductDetails } from '../../../config/store/shop/product-slice'
import ShoppingProductTile from '../../../components/view/Productcard'
import ProductDetailsDialog from '../../../components/view/productdetails'
import { addTocart, getcartitems } from '../../../config/store/shop/cart-slice'
import { useToast } from '../../../hooks/use-toast'
import Link from 'next/link'
import { getfeature } from '../../../config/store/common-slice'


const page = () => {
  const [currentslide,setcurrentslide]= useState(0)
  const {productList,productDetails} = useSelector(state => state.shopProducts)
  const {user} = useSelector(state => state.auth)
  const {toast} = useToast()
    const [open,setopen] = useState(false)
  
  const dispatch = useDispatch()
      const {featurelist} = useSelector(state => state.commonSlice)
  
  const categoriesWithIcon = [
    { id: "men", label: "Men", icon: ShirtIcon,path: "/shop/listing?category=Men",},
    { id: "women", label: "Women", icon: CloudLightning,path: "/shop/listing?category=Women",},
    { id: "kids", label: "Kids", icon: BabyIcon ,path: "/shop/listing?category=Kids",},
    { id: "accessories", label: "Accessories", icon: WatchIcon ,path: "/shop/listing?category=Accessories",},
    { id: "footwear", label: "Footwear", icon: UmbrellaIcon,path: "/shop/listing?category=Footwear" },
  ];
  
  const brandsWithIcon = [
    { id: "nike", label: "Nike", icon: Shirt,path: "/shop/listing?brand=Nike" },
    { id: "adidas", label: "Adidas", icon: WashingMachine,path: "/shop/listing?brand=Adidas" },
    { id: "puma", label: "Puma", icon: ShoppingBasket,path: "/shop/listing?brand=Puma" },
    { id: "levi", label: "Levi's", icon: Airplay,path: "/shop/listing?brand=Levi's" },
    { id: "zara", label: "Zara", icon: Images,path: "/shop/listing?brand=Zara" },
    { id: "h&m", label: "H&M", icon: Heater,path: "/shop/listing?brand=H&M" },
  ];
   const getdetail = (id)=>{
  dispatch(fetchProductDetails(id))
  
   }  
   useEffect(()=>{
       dispatch(getfeature())
       },[dispatch])
  useEffect(() => {
    const timer = setInterval(() => {
      setcurrentslide((prevSlide) => (prevSlide + 1) % featurelist.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [featurelist]);
 const handleAddtoCart = (productId)=>{
dispatch(addTocart({userId : user?.id ,productId,quantity :1}))
.then((data) => {
if(data?.payload?.success){
dispatch(getcartitems(user?.id))
toast({
  title :"Product is added to cart."
}) 
}})

 }  

  useEffect(()=>{
    if(productDetails !== null) setopen(true )

  },[productDetails])  
  useEffect(()=>{
    dispatch(fetchAllFilteredProducts())
  },[dispatch])
  
  return (
    <div className='flex flex-col min-h-screen'>
      <div className='relative w-full h-[600px] overflow-hidden'>
       { featurelist && featurelist.length > 0 ? 
        featurelist.map((item,index) => <img src={item.image} alt='feature image' key={item._id}  className={`${
          index === currentslide ? "opacity-100" : "opacity-0"
        } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}/>)
        :null
       }
       <Button 
      onClick={() =>
        setcurrentslide(
          (prevSlide) =>
            (prevSlide - 1 + featurelist.length) %
            slide.length
        )
      }
       variant="outline" size="icon" className="absolute top-1/2 left-4 transform translate-y-1/2 bg-white ">
        <ChevronLeftIcon/>
       </Button>
       <Button onClick={() =>
        setcurrentslide(
          (prevSlide) => (prevSlide + 1) % featurelist.length
        )
      }
        variant="outline" size="icon" className="absolute top-1/2 right-4 transform translate-y-1/2 bg-white ">
        <ChevronRightIcon/>
       </Button>
      </div>
      <section className='py-14 bg-gray-50'>
        <div className='container mx-auto px-4'>
           <h2 className='text-3xl text-center mb-8 font-bold'>Shop by category</h2>
           <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
             {
              categoriesWithIcon.map(item =><Link href={item.path} key={item.id}> <Card  className="cursor-pointer hover:shadow-lg transition-shadow">
               <CardContent className="flex flex-col items-center justify-center p-6">
                  <item.icon className='w-14 h-14 mb-4 text-primary'/>
                  <span className="font-font">{item.label}</span>
                </CardContent>
              </Card></Link>)
             }
           </div>
        </div>

      </section>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by Brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brandsWithIcon.map((brandItem) => (
              <Link href={brandItem.path} key={brandItem.id}>
              <Card key={brandItem.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <brandItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{brandItem.label}</span>
                </CardContent>
              </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Feature Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0
              ? productList.slice(0,8).map((productItem,index) => (
                  <ShoppingProductTile
                  handledetails={getdetail}
                  key={index}
                  handleAddtoCart={handleAddtoCart}
                  product={productItem}
                  />
                ))
              : null}
          </div>
          <div className='text-right mt-2 underline'><Link href={"/shop/listing"}>See All product..</Link></div>

        </div>
      </section>
          <ProductDetailsDialog open={open} setOpen={setopen} productDetails={productDetails} />
      
    </div>
  )
}

export default page