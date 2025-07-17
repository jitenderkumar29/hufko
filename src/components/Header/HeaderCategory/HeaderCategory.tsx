import React, { useState } from 'react';
import styles from './HeaderCategory.module.scss';
import { faStore, faUtensils, faBasketShopping, faSeedling, faHandsHelping, faPills, faCab, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AllCategory from '../../HomePage/AllCategory/AllCategory';
import { GroceryCategories } from '@/app/data/Categorywise/GroceryCategories';
import HeroBannerAll from '@/components/HomePage/HeroBannerAll/HeroBannerAll';
import { ShopingHeroBannerData } from '@/app/data/HeroBannerwise/ShopingHero';
import { FoodHeroBannerData } from '@/app/data/HeroBannerwise/FoodHero';
import { GroceryHeroBannerData } from '@/app/data/HeroBannerwise/GroceryHero';
import { FlowerHeroBannerData } from '@/app/data/HeroBannerwise/FlowerHero';
import { CareHeroBannerData } from '@/app/data/HeroBannerwise/CareHero';
import ShoppingSlides1 from '@/components/HomePage/Shopping/ShoppingSlides1/ShoppingSlides1';
import { ShopingSlide1SmartPhoneDeals } from '@/app/data/Shoping/ShopingSlide1';
import { PharmaHeroBannerData } from '@/app/data/HeroBannerwise/PharmaHero';

interface CategoryItem {
  id: string;
  name: string;
  icon: IconDefinition;
}

const HeaderCategory: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('shoping');

  const categories: CategoryItem[] = [
    { id: 'shoping', name: 'Shoping', icon: faStore },
    { id: 'food', name: 'Food Delivery', icon: faUtensils },
    { id: 'grocery', name: 'Grocery Delivery', icon: faBasketShopping },
    { id: 'flower', name: 'Flower Delivery', icon: faSeedling },
    { id: 'cab', name: 'cabs', icon: faCab },
    { id: 'care', name: 'Care', icon: faHandsHelping },
    { id: 'pharma', name: 'Pharma', icon: faPills }
  ];

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
        {activeTab === "shoping" && (
          <div className={styles.allCategory}>
            <AllCategory categories={GroceryCategories} />
            {/* <AllCategoryOne categories={ShopingCategories} /> */}
            <HeroBannerAll banners={ShopingHeroBannerData} />
            <ShoppingSlides1
              title="Today's Top Smartphone Deals"
              deals={ShopingSlide1SmartPhoneDeals}
              cardWidth={200}
              showArrow={true}
            />
          </div>
        )}
        {activeTab === "food" && (
          <div className={styles.allCategory}>
            <AllCategory categories={GroceryCategories} />
            {/* <AllCategory categories={FoodsCategories} /> */}
            <HeroBannerAll banners={FoodHeroBannerData} />
          </div>
        )}
        {activeTab === "grocery" && (
          <div className={styles.allCategory}>
            <AllCategory categories={GroceryCategories} />
            {/* <AllCategory categories={GroceryCategories} /> */}
            <HeroBannerAll banners={GroceryHeroBannerData} />

          </div>
        )}
        {activeTab === "flower" && (
          <div className={styles.allCategory}>
            <AllCategory categories={GroceryCategories} />
            {/* <AllCategory categories={FlowersCategories} /> */}
            <HeroBannerAll banners={FlowerHeroBannerData} />

          </div>
        )}
        {activeTab === "care" && (
          <div className={styles.allCategory}>
            <AllCategory categories={GroceryCategories} />
            {/* <AllCategory categories={CareCategories} /> */}
            <HeroBannerAll banners={CareHeroBannerData} />

          </div>
        )}
        {activeTab === "pharma" && (
          <div className={styles.allCategory}>
            <AllCategory categories={GroceryCategories} />
            {/* <AllCategory categories={PharmaCategories} /> */}
            <HeroBannerAll banners={PharmaHeroBannerData} />
          </div>
        )}
      </div>
    </>
  );
};

export default HeaderCategory;