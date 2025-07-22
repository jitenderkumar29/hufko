import React, { useEffect, useState } from 'react'
import AllCategoryTabWise from './CategoryAllTabWise/CategoryAllTabWise'
import Header from '@/components/Header/Header/Header'
import Footer from '@/components/Footer/Footer'
import styles from './GroceryAllTabWisePage.module.scss';
import { AllGroceryTabWiseMilkData } from '@/app/data/GroceryPageData/GroceryAllTabWiseMilkData';
import { useSearchParams } from 'next/navigation';
import { AllGroceryTabWiseVegData } from '@/app/data/GroceryPageData/GroceryAllTabWiseVegData';
import { GroceryAllTabWiseAttaData } from '@/app/data/GroceryPageData/GroceryAllTabWiseAttaData';
import { GroceryAllTabwiseMasalaData } from '@/app/data/GroceryPageData/GroceryAllTabWiseMasalaData';

const AllGroceryTabWisePage = () => {
  const [groceryCategory, setGroceryCategory] = useState<string>();

  const searchParams = useSearchParams();
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    console.log("categoryParam", categoryParam)
    if (categoryParam) {
      try {
        // const parsedData = JSON.parse(categoryParam);
        setGroceryCategory(categoryParam);
      } catch (error) {
        console.error('Error parsing category data:', error);
        // Handle error or redirect
      }
    }
  }, [searchParams]);

  return (
    <div className={styles.container}>
      <Header />
      {/* <HeaderCategory /> */}
      {groceryCategory === "fruits" && (<AllCategoryTabWise categories={AllGroceryTabWiseVegData} initialActiveCategory="fruits" />)}
      {groceryCategory === "atta" && (<AllCategoryTabWise categories={GroceryAllTabWiseAttaData} initialActiveCategory="atta" />)}
      {/* {groceryCategory === "spices" && (<AllCategoryTabWise categories={GroceryAllTabwiseMasalaData} initialActiveCategory="spices" />)} */}
      {groceryCategory === "milk" && (<AllCategoryTabWise categories={AllGroceryTabWiseMilkData} initialActiveCategory="milk" />)}

      <Footer />
    </div>
  )
}

export default AllGroceryTabWisePage
