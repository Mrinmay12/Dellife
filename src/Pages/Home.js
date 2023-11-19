import React from 'react'
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
  } from '@tanstack/react-query'
  
  import axios from 'axios';
  import TextShow from '../Component/TextShow';
export default function Home() {
    async function fetchRecipes() {
        try {
          const response = await axios.get('https://dummyjson.com/products');
          return response.data.products;
        } catch (error) {
          throw new Error(error.response.data.message);
        }
      }
      const { isFetching, error, data } = useQuery({queryKey:['Recipes'],queryFn: fetchRecipes,staleTime:Infinity,keepPreviousData:true});
      if (isFetching) return 'Loading...'
      if(error) return  console.log(error),"Something wrong"
    console.log(data,"productsproducts");
  return (
    <div>
      <TextShow/>
    </div>
  )
}
