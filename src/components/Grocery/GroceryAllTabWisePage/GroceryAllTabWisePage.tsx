import React, { useEffect, useState } from 'react'
import AllCategoryTabWise from './CategoryAllTabWise/CategoryAllTabWise'
import Header from '@/components/Header/Header/Header'
import Footer from '@/components/Footer/Footer'
import styles from './GroceryAllTabWisePage.module.scss';
import { AllGroceryTabWiseMilkData } from '@/app/data/GroceryPageData/GroceryAllTabWiseMilkData';
import { useSearchParams } from 'next/navigation';
import { GroceryAllTabWiseAttaData } from '@/app/data/GroceryPageData/GroceryAllTabWiseAttaData';
import { GroceryAllTabwiseMasalaData } from '@/app/data/GroceryPageData/GroceryAllTabWiseMasalaData';
import { GroceryAllTabWiseSweetData } from '@/app/data/GroceryPageData/GroceryAllTabWiseSweetData';
import { GroceryAllTabWiseFrozenData } from '@/app/data/GroceryPageData/GroceryAllTabWiseFrozenData';
import { GroceryAllTabWiseIceCreamData } from '@/app/data/GroceryPageData/GroceryAllTabWiseIceCreamData';
import { GroceryAllTabWisePackFoodData } from '@/app/data/GroceryPageData/GroceryAllTabWisePackFoodData';
import { GroceryAllTabWiseDrinkData } from '@/app/data/GroceryPageData/GroceryAllTabWiseDrinkData';
import { GroceryAllTabWiseMunchiesData } from '@/app/data/GroceryPageData/GroceryAllTabWiseMunchiesData';
import { GroceryAllTabWiseMeatsData } from '@/app/data/GroceryPageData/GroceryAllTabWiseMeatsData';
import { GroceryAllTabWiseBreakfastData } from '@/app/data/GroceryPageData/GroceryAllTabWiseBreakfastData';
import { GroceryAllTabWiseCoffeeData } from '@/app/data/GroceryPageData/GroceryAllTabWiseCoffeeData';
import { GroceryAllTabWisePaanData } from '@/app/data/GroceryPageData/GroceryAllTabWisePaanData';
import { GroceryAllTabWiseBakeryData } from '@/app/data/GroceryPageData/GroceryAllTabWiseBakeryData';
import { GroceryAllTabWiseOrganicData } from '@/app/data/GroceryPageData/GroceryAllTabWiseOrganicData';
import { GroceryAllTabWiseBabyCareData } from '@/app/data/GroceryPageData/GroceryAllTabWiseBabyCareData';
import { GroceryAllTabWiseFruitsData } from '@/app/data/GroceryPageData/GroceryAllTabWiseFruitsData';
import { GroceryAllTabWisePharmaData } from '@/app/data/GroceryPageData/GroceryAllTabWisePharmaData';
import { GroceryAllTabWiseCleningData } from '@/app/data/GroceryPageData/GroceryAllTabWiseCleningData';
import { GroceryAllTabWiseHomeOfficeData } from '@/app/data/GroceryPageData/GroceryAllTabWiseHomeOfficeData';
import { GroceryAllTabWisePersonalCareData } from '@/app/data/GroceryPageData/GroceryAllTabWisePersonalCareData';
import { GroceryAllTabWisePetCareData } from '@/app/data/GroceryPageData/GroceryAllTabWisePetCareData';

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
      {groceryCategory === "fruits" && (<AllCategoryTabWise categories={GroceryAllTabWiseFruitsData} initialActiveCategory="fruits" />)}
      {groceryCategory === "atta" && (<AllCategoryTabWise categories={GroceryAllTabWiseAttaData} initialActiveCategory="atta" />)}
      {groceryCategory === "spices" && (<AllCategoryTabWise categories={GroceryAllTabwiseMasalaData} initialActiveCategory="spices" />)}
      {groceryCategory === "chocolates" && (<AllCategoryTabWise categories={GroceryAllTabWiseSweetData} initialActiveCategory="chocolates" />)}
      {groceryCategory === "frozen-snacks" && (<AllCategoryTabWise categories={GroceryAllTabWiseFrozenData} initialActiveCategory="frozen-snacks" />)}
      {groceryCategory === "familyTubs" && (<AllCategoryTabWise categories={GroceryAllTabWiseIceCreamData} initialActiveCategory="familyTubs" />)}
      {groceryCategory === "cannedFoods" && (<AllCategoryTabWise categories={GroceryAllTabWisePackFoodData} initialActiveCategory="cannedFoods" />)}
      {groceryCategory === "milk" && (<AllCategoryTabWise categories={AllGroceryTabWiseMilkData} initialActiveCategory="milk" />)}
      {groceryCategory === "Carbonated-Soft-Drinks" && (<AllCategoryTabWise categories={GroceryAllTabWiseDrinkData} initialActiveCategory="Carbonated-Soft-Drinks" />)}
      {groceryCategory === "Masala-Peanuts-Chana" && (<AllCategoryTabWise categories={GroceryAllTabWiseMunchiesData} initialActiveCategory="Masala-Peanuts-Chana" />)}
      {groceryCategory === "fresh-chicken-mutton" && (<AllCategoryTabWise categories={GroceryAllTabWiseMeatsData} initialActiveCategory="fresh-chicken-mutton" />)}
      {groceryCategory === "Breakfast-Cereals-Muesli" && (<AllCategoryTabWise categories={GroceryAllTabWiseBreakfastData} initialActiveCategory="Breakfast-Cereals-Muesli" />)}
      {groceryCategory === "Amul-Kool-Cafe" && (<AllCategoryTabWise categories={GroceryAllTabWiseCoffeeData} initialActiveCategory="Amul-Kool-Cafe" />)}

      {/*  */}
      {groceryCategory === "Meetha-Paan" && (<AllCategoryTabWise categories={GroceryAllTabWisePaanData} initialActiveCategory="Meetha-Paan" />)}
      {groceryCategory === "Breads-Buns" && (<AllCategoryTabWise categories={GroceryAllTabWiseBakeryData} initialActiveCategory="Breads-Buns" />)}
      {groceryCategory === "Organic-Staples" && (<AllCategoryTabWise categories={GroceryAllTabWiseOrganicData} initialActiveCategory="Organic-Staples" />)}
      {groceryCategory === "Diapers-Wipes" && (<AllCategoryTabWise categories={GroceryAllTabWiseBabyCareData} initialActiveCategory="Diapers-Wipes" />)}
      {groceryCategory === "Medicines-OTC" && (<AllCategoryTabWise categories={GroceryAllTabWisePharmaData} initialActiveCategory="Medicines-OTC" />)}
      {groceryCategory === "Floor-Surface-Cleaners" && (<AllCategoryTabWise categories={GroceryAllTabWiseCleningData} initialActiveCategory="Floor-Surface-Cleaners" />)}
      {groceryCategory === "Stationery-Essentials" && (<AllCategoryTabWise categories={GroceryAllTabWiseHomeOfficeData} initialActiveCategory="Stationery-Essentials" />)}
      {groceryCategory === "Bath-Body" && (<AllCategoryTabWise categories={GroceryAllTabWisePersonalCareData} initialActiveCategory="Bath-Body" />)}
      {groceryCategory === "Pet-Food" && (<AllCategoryTabWise categories={GroceryAllTabWisePetCareData} initialActiveCategory="Pet-Food" />)}

      <Footer />
    </div>
  )
}

export default AllGroceryTabWisePage
