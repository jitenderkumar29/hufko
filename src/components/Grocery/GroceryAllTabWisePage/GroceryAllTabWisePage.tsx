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
import { GroceryAllTabWiseSweetData } from '@/app/data/GroceryPageData/GroceryAllTabWiseSweetData';
import { GroceryAllTabWiseFrozenData } from '@/app/data/GroceryPageData/GroceryAllTabWiseFrozenData';
import { GroceryAllTabWiseIceCreamData } from '@/app/data/GroceryPageData/GroceryAllTabWiseIceCreamData';
import { GroceryAllTabWisePackFoodData } from '@/app/data/GroceryPageData/GroceryAllTabWisePackFoodData';
import { GroceryAllTabWiseDrinkData } from '@/app/data/GroceryPageData/GroceryAllTabWiseDrinkData';
import { GroceryAllTabWiseMunchiesData } from '@/app/data/GroceryPageData/GroceryAllTabWiseMunchiesData';

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
      {groceryCategory === "spices" && (<AllCategoryTabWise categories={GroceryAllTabwiseMasalaData} initialActiveCategory="spices" />)}
      {groceryCategory === "chocolates" && (<AllCategoryTabWise categories={GroceryAllTabWiseSweetData} initialActiveCategory="chocolates" />)}
      {groceryCategory === "frozen-snacks" && (<AllCategoryTabWise categories={GroceryAllTabWiseFrozenData} initialActiveCategory="frozen-snacks" />)}
      {groceryCategory === "familyTubs" && (<AllCategoryTabWise categories={GroceryAllTabWiseIceCreamData} initialActiveCategory="familyTubs" />)}
      {groceryCategory === "cannedFoods" && (<AllCategoryTabWise categories={GroceryAllTabWisePackFoodData} initialActiveCategory="cannedFoods" />)}
      {groceryCategory === "milk" && (<AllCategoryTabWise categories={AllGroceryTabWiseMilkData} initialActiveCategory="milk" />)}
      {groceryCategory === "Carbonated-Soft-Drinks" && (<AllCategoryTabWise categories={GroceryAllTabWiseDrinkData} initialActiveCategory="Carbonated-Soft-Drinks" />)}
      {/* {groceryCategory === "Masala-Peanuts-Chana" && (<AllCategoryTabWise categories={GroceryAllTabWiseMunchiesData} initialActiveCategory="Masala-Peanuts-Chana" />)} */}

      <Footer />
    </div>
  )
}

export default AllGroceryTabWisePage
