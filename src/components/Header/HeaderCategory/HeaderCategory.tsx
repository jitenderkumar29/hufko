import React, { useState } from 'react';
import styles from './HeaderCategory.module.scss';
import { faStore, faUtensils, faBasketShopping, faSeedling, faHandsHelping, IconDefinition, faNotesMedical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AllCategory from '../../HomePage/AllCategory/AllCategory';
import { GroceryCategories } from '@/app/data/Categorywise/GroceryCategories';
import HeroBannerAll from '@/components/HomePage/HeroBannerAll/HeroBannerAll';
import { ShopingHeroBannerData } from '@/app/data/HeroBannerwise/ShopingHero';
import { FoodHeroBannerData } from '@/app/data/HeroBannerwise/FoodHero';
import { GroceryHeroBannerData } from '@/app/data/HeroBannerwise/GroceryHero';
import { FlowerHeroBannerData } from '@/app/data/HeroBannerwise/FlowerHero';
import { CareHeroBannerData } from '@/app/data/HeroBannerwise/CareHero';
import ShoppingSlides1 from '@/components/Shopping/ShoppingSlides1/ShoppingSlides1';
import { ShopingSlide1SmartPhoneDeals } from '@/app/data/Shoping/ShopingSlide1';
import { PharmaHeroBannerData } from '@/app/data/HeroBannerwise/PharmaHero';
import { ShopingCategories } from '@/app/data/Categorywise/ShopingCategories';
import AllCategoryOne from '@/components/HomePage/AllCategoryOne/AllCategoryOne';
import { FlowersCategories } from '@/app/data/Categorywise/FlowersCategories';
import { CareCategories } from '@/app/data/Categorywise/CareCategories';
import { PharmaCategories } from '@/app/data/Categorywise/PharmaCategories';
import { FoodsCategories } from '@/app/data/Categorywise/FoodsCategories';
import AllCategoryRound from '@/components/HomePage/AllCategoryRound/AllCategoryRound';
import { GroceryData1, GroceryData2 } from '@/app/data/GroceryPageData/GroceryData';
import { CandiesGumsData, ColdDrinksJuicesData, DairyBreadEggsData, HookahData, MouthFreshenersData, RollingPapersData, SnacksMunchiesData } from '@/app/data/GroceryPageData/GroceryProductData';
import GroceryProductList from '@/components/Grocery/GroceryProductList/GroceryProductList';

interface CategoryItem {
  id: string;
  name: string;
  icon: IconDefinition;
}

const HeaderCategory: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('food');

  const categories: CategoryItem[] = [
    { id: 'food', name: 'Food Delivery', icon: faUtensils },
    { id: 'grocery', name: 'Grocery Delivery', icon: faBasketShopping },
    { id: 'shopping', name: 'Shopping', icon: faStore },
    { id: 'flower', name: 'Flower Delivery', icon: faSeedling },
    // { id: 'cab', name: 'cabs', icon: faCab },
    { id: 'care', name: 'Care Services', icon: faHandsHelping },
    { id: 'pharma', name: 'Pharma', icon: faNotesMedical }
    // { id: 'pharma', name: 'Pharma', icon: faPills }
  ];

  //  const handleViewAllGroceryTabwise = () => {
  //   console.log("groceryCategory", groceryCategory);

  //   // Create URLSearchParams
  //   const params = new URLSearchParams();
  //   params.set('category', JSON.stringify(groceryCategory));

  //   // Navigate with the query string
  //   router.push(`/all-grocery-tabwise-Page?${params.toString()}`);
  // };
  
  return (
    <>
      <div className={styles.headerCategory}>
        <div className={styles.container}>
          <div className={styles.categoryTabs}>
            {categories.map((category) => (
              <button
                key={category.id}
                className={`${styles.categoryTab} ${activeTab === category.id ? styles.active : ''}`}
                onClick={() => setActiveTab(category.id)}
              >
                <FontAwesomeIcon icon={category.icon} className={styles.icon} />
                <span>{category.name}</span>
              </button>
            ))}

          </div>
        </div>
      </div>
      <div className={styles.tabContainer}>

        {activeTab === "food" && (
          <div className={styles.allCategory}>
            <AllCategory categories={FoodsCategories} />
            {/* <AllCategory categories={GroceryCategories} /> */}
            <HeroBannerAll banners={FoodHeroBannerData} />


          </div>
        )}
        {activeTab === "grocery" && (
          <div className={styles.allCategory}>
            <AllCategory categories={GroceryCategories} />
            {/* <AllCategory categories={GroceryCategories} /> */}
            <HeroBannerAll banners={GroceryHeroBannerData} />
            <AllCategoryRound categories={GroceryData1} />
            <AllCategoryRound categories={GroceryData2} />
            <div className={styles.GroceryProductCategory}>
              <GroceryProductList category="Dairy, Bread & Eggs" grocery={DairyBreadEggsData} groceryCategory="milk"/>
              <GroceryProductList category="Rolling Paper & Tobacco" grocery={RollingPapersData} groceryCategory="tobacco"/>
              <GroceryProductList category="Snacks & Munchies" grocery={SnacksMunchiesData} groceryCategory="snacks"/>
              <GroceryProductList category="Hookah" grocery={HookahData} groceryCategory="Hookah"/>
              <GroceryProductList category="Mouth fresheners" grocery={MouthFreshenersData} groceryCategory="fresheners"/>
              <GroceryProductList category="Cold Drinks, & Juices" grocery={ColdDrinksJuicesData} groceryCategory="cold"/>
              <GroceryProductList category="Candies & Gums" grocery={CandiesGumsData} groceryCategory="candies"/>
            </div>
          </div>
        )}
        {activeTab === "shopping" && (
          <div className={styles.allCategory}>
            <AllCategoryOne categories={ShopingCategories} />
            {/* <AllCategory categories={GroceryCategories} /> */}
            <HeroBannerAll banners={ShopingHeroBannerData} />
            <ShoppingSlides1
              title="Today's Top Smartphone Deals"
              deals={ShopingSlide1SmartPhoneDeals}
              cardWidth={200}
              showArrow={true}
            />
          </div>
        )}
        {activeTab === "flower" && (
          <div className={styles.allCategory}>
            <AllCategory categories={FlowersCategories} />
            {/* <AllCategory categories={GroceryCategories} /> */}
            <HeroBannerAll banners={FlowerHeroBannerData} />

          </div>
        )}
        {activeTab === "care" && (
          <div className={styles.allCategory}>
            <AllCategory categories={CareCategories} />
            {/* <AllCategory categories={GroceryCategories} /> */}
            <HeroBannerAll banners={CareHeroBannerData} />

          </div>
        )}
        {activeTab === "pharma" && (
          <div className={styles.allCategory}>
            <AllCategoryOne categories={PharmaCategories} />
            {/* <AllCategory categories={GroceryCategories} /> */}
            <HeroBannerAll banners={PharmaHeroBannerData} />
          </div>
        )}
      </div>
    </>
  );
};

export default HeaderCategory;