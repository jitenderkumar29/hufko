// components/AllCategoryTabWise/AllCategoryTabWise.tsx
"use client";
import React, { useEffect, useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import styles from './CategoryAllTabWise.module.scss';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  image: string;
  quantity: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  deliveryTime: string;
  options?: number;
  inCart?: boolean;
  cartQuantity?: number;
}

interface Category {
  id: string;
  name: string;
  imageCategory: string;
  products: Product[];
}

interface AllCategoryTabWiseProps {
  categories: Category[];
  initialActiveCategory?: string;
}

const AllCategoryTabWise: React.FC<AllCategoryTabWiseProps> = ({
  categories,
  initialActiveCategory,
}) => {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<string>(
    initialActiveCategory || categories[0]?.id || ''
  );
  const [, setGroceryCategory] = useState(null);
  const [cartItems, setCartItems] = useState<Record<string, number>>({});

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      try {
        const parsedData = JSON.parse(categoryParam);
        setGroceryCategory(parsedData);
      } catch (error) {
        console.error('Error parsing category data:', error);
        // Handle error or redirect
      }
    }
  }, [searchParams]);

  const handleAddToCart = (productId: string) => {
    setCartItems((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => {
      const newQuantity = (prev[productId] || 0) - 1;
      if (newQuantity <= 0) {
        const newItems = { ...prev };
        delete newItems[productId];
        return newItems;
      }
      return {
        ...prev,
        [productId]: newQuantity,
      };
    });
  };

  const activeCategoryData = categories.find((cat) => cat.id === activeCategory);

  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>Buy {activeCategoryData?.name} Online</h1>
      </div>
      <div className={styles.container}>
        <div className={styles.sidebar}>
          {/* <h2 className={styles.sidebarTitle}>Categories</h2> */}
          <ul className={styles.categoryList}>
            {categories.map((category) => (
              <li
                key={category.id}
                className={`${styles.categoryItem} ${activeCategory === category.id ? styles.active : ''
                  }`}
                onClick={() => setActiveCategory(category.id)}
              >
                <div className={styles.imageCategory}>
                  <Image src={category.imageCategory} alt='Category Image' width={50} height={50} />
                </div>
                <span className={styles.sidebarCategory}>{category.name}</span>
                {/* <FaChevronDown className={styles.categoryIcon} /> */}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.mainContent}>
          {/* <h1 className={styles.pageTitle}>Buy {activeCategoryData?.name} Online</h1> */}

          <div className={styles.productsGrid}>
            {activeCategoryData?.products.map((product) => (
              <div key={product.id} className={styles.productCard}>
                {product.discount && (
                  <div className={styles.discountBadge}>
                    <span>{product.discount}% OFF</span>
                  </div>
                )}

                <div className={styles.productImageContainer}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    className={styles.productImage}
                    width={200}
                    height={200}
                  />
                </div>

                <div className={styles.deliveryTime}>
                  <span>{product.deliveryTime}</span>
                </div>

                <div className={styles.productInfo}>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <p className={styles.productQuantity}>{product.quantity}</p>
                </div>

                <div className={styles.priceContainer}>
                  <span className={styles.price}>₹{product.price.toFixed(2)}</span>
                  {product.originalPrice && (
                    <span className={styles.originalPrice}>
                      ₹{product.originalPrice.toFixed(2)}
                    </span>
                  )}
                  <div className={styles.addToCartContainer}>
                    {cartItems[product.id] ? (
                      <div className={styles.quantityControl}>
                        <button
                          onClick={() => handleRemoveFromCart(product.id)}
                          className={styles.quantityButton}
                        >
                          <FaMinus />
                        </button>
                        <span className={styles.quantity}>
                          {cartItems[product.id]}
                        </span>
                        <button
                          onClick={() => handleAddToCart(product.id)}
                          className={styles.quantityButton}
                        >
                          <FaPlus />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleAddToCart(product.id)}
                        className={styles.addToCartButton}
                      >
                        ADD
                        {/* {product.options && (
                        <span className={styles.optionsBadge}>
                          {product.options} options
                        </span>
                      )} */}
                      </button>
                    )}
                  </div>
                </div>


              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllCategoryTabWise;