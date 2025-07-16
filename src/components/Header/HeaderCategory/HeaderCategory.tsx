import React, { useState } from 'react';
import styles from './HeaderCategory.module.scss';
import { faStore, faUtensils, faBasketShopping, faSeedling, faHandsHelping, faPills, faCab } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AllCategory from '../../HomePage/AllCategory/AllCategory';
import { ShopingCategories } from '@/app/data/ShopingCategories';
import { FruitsCategories } from '@/app/data/FruitsCategories';
import { FlowersCategories } from '@/app/data/FlowersCategories';
import { GroceryCategories } from '@/app/data/GroceryCategories';

interface CategoryItem {
  id: string;
  name: string;
  icon: any;
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
      {activeTab === "shoping" && (
        <div className={styles.allCategory}>
          <AllCategory
            categories={ShopingCategories}
            title="Shop by Category"
          />
        </div>
      )}
      {activeTab === "food" && (
        <div className={styles.allCategory}>
          <AllCategory
            categories={FruitsCategories}
            title="Shop by Category"
          />
        </div>
      )}
      {activeTab === "grocery" && (
        <div className={styles.allCategory}>
          <AllCategory
            categories={GroceryCategories}
            title="Shop by Category"
          />
        </div>
      )}
      {activeTab === "flower" && (
        <div className={styles.allCategory}>
          <AllCategory
            categories={FlowersCategories}
            title="Shop by Category"
          />
        </div>
      )}
    </>
  );
};

export default HeaderCategory;