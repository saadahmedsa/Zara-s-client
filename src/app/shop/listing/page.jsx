
"use client"
import React,{useEffect, useState} from 'react'
import Filter from "../../../components/view/filter"
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem,  DropdownMenuTrigger } from '../../../components/ui/dropdown-menu'
import { Button } from '../../../components/ui/button'
import { ArrowUpDownIcon } from 'lucide-react'
import { sortOptions } from '../../../config'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllFilteredProducts, fetchProductDetails } from '../../../config/store/shop/product-slice'
import ProductDetailsDialog from "../../../components/view/productdetails"
import ShoppingProductTile from "../../../components/view/Productcard"
import { addTocart, getcartitems } from '../../../config/store/shop/cart-slice'
import { useToast } from '../../../hooks/use-toast'
import { useSearchParams } from 'next/navigation'

const page = () => {
  const dispatch = useDispatch()
  const {productList,productDetails} = useSelector(state =>  state.shopProducts)
  const {user} = useSelector(state =>  state.auth)
  const {toast} = useToast()
  const [filter,setfilter] = useState({})
  const [sort,setsort] = useState("price-lowtohigh")
  const [open,setopen] = useState(false)  
  const searchParams = useSearchParams()
  // ✅ Convert query parameters into filter object
  useEffect(() => {
    const params = {};
    searchParams.forEach((value, key) => {
      params[key] = value.split(",").map(v => v.toLowerCase()); // Store as array
    });
    setfilter(params);
  }, [searchParams]);
  const handlesort = (value)=>{
    setsort(value) 
  }
  
  const handlefilter = (id,option)=>{
    let cpyFilters = { ...filter };
    const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(id);

    if (indexOfCurrentSection === -1) {
      cpyFilters = {
        ...cpyFilters,
        [id]: [option],
      };
    } else {
      const indexOfCurrentOption =
        cpyFilters[id].indexOf(option);

      if (indexOfCurrentOption === -1)
        cpyFilters[id].push(option);
      else cpyFilters[id].splice(indexOfCurrentOption, 1);
    }

    setfilter(cpyFilters);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
  }
  
 const getdetail = (id)=>{
dispatch(fetchProductDetails(id))

 }  
 const handleAddtoCart = (productId)=>{
dispatch(addTocart({userId : user.id ,productId,quantity :1}))
.then((data) => {
if(data?.payload?.success){
dispatch(getcartitems(user?.id))
toast({
  title :"Product is added to cart."
}) 
}})

 }  
 
 const filterproduct = productList
 .filter((item) => {
  return Object.entries(filter).every(([key, values]) => {
    if (!values.length) return true;
    return values.includes(item[key]?.toLowerCase()); 
  });
})
.sort((a, b) => {
  if (sort === "price-lowtohigh") {
    return Number(a.price) - Number(b.price);  // ✅ Safe parsing
  }
  if (sort === "price-hightolow") {
    return Number(b.price) - Number(a.price);  // ✅ Safe parsing
  }
  return 0; 
});


 

  useEffect(()=>{
    if(productDetails !== null) setopen(true )

  },[productDetails])
  useEffect(()=>{
    dispatch(fetchAllFilteredProducts())

  },[dispatch])
  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
      <Filter filter={filter} handlefilter={handlefilter}/>
      <div className="bg-background w-full rounded-lg shadow-sm">
       <div className='p-4 border-b flex items-center justify-between'>
        <h2 className='text-lg font-extrabold'>All Products</h2>
        <div className='flex items-center gap-2'>
         <span className='text-muted-foreground'>{productList.length} Products</span>
         <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <ArrowUpDownIcon className='h-6 w-6' />
              <span>Sort by :</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuRadioGroup value={sort} onValueChange={handlesort}>
            {sortOptions.map(item => <DropdownMenuRadioItem value={item.id} key={item.id}>
              {item.label}
            </DropdownMenuRadioItem>)}

            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
         </DropdownMenu>
        </div>

       </div>
       <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 ">
       {
        filterproduct && filterproduct.length > 0 ?
         filterproduct.map(item => <ShoppingProductTile handledetails={getdetail} handleAddtoCart={handleAddtoCart} product={item} key={item._id}/>) : null
       }
       </div>
      </div>
      <ProductDetailsDialog open={open} setOpen={setopen} productDetails={productDetails} />
    </div>
  )
}

export default page