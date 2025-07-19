import React, { useState, useRef, useEffect } from 'react';
import styles from './GroceryProductList.module.scss';
import { FaClock, FaChevronRight, FaChevronLeft, FaPlus, FaMinus } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

interface Grocery {
  id: string;
  title: string;
  variant: string;
  price: number | null;  // Allow null for price
  originalPrice?: number | null;  // Allow null
  discount?: string | null;       // Change to string and allow null
  eta: string;
  pack?: string;
  weight?: string;
  imageUrl: string;
}

interface FoodProductListProps {
  category: string;
  grocery: Grocery[];
  groceryCategory: string;
}

const GroceryProductList: React.FC<FoodProductListProps> = ({ category, grocery, groceryCategory }) => {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [showLeftNav, setShowLeftNav] = useState(false);
  const [showRightNav, setShowRightNav] = useState(false);
  const productListRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const checkScrollPosition = () => {
    if (productListRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = productListRef.current;
      setShowLeftNav(scrollLeft > 0);
      setShowRightNav(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    const currentRef = productListRef.current;
    if (currentRef) {
      currentRef.addEventListener('scroll', checkScrollPosition);
      const timer = setTimeout(checkScrollPosition, 100);
      return () => {
        currentRef.removeEventListener('scroll', checkScrollPosition);
        clearTimeout(timer);
      };
    }
  }, [grocery]);

  useEffect(() => {
    window.addEventListener('resize', checkScrollPosition);
    return () => window.removeEventListener('resize', checkScrollPosition);
  }, []);

  const handleIncrement = (productId: string) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  const handleDecrement = (productId: string) => {
    setQuantities(prev => {
      const newQuantity = Math.max((prev[productId] || 0) - 1, 0);
      if (newQuantity === 0) {
        const { [productId]: _, ...rest } = prev;
        return rest;
      }
      return {
        ...prev,
        [productId]: newQuantity
      };
    });
  };

  const handleAddClick = (productId: string) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: 1
    }));
  };

  const scrollLeft = () => {
    if (productListRef.current) {
      productListRef.current.scrollBy({
        left: -500,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (productListRef.current) {
      productListRef.current.scrollBy({
        left: 500,
        behavior: 'smooth'
      });
    }
  };

  const handleViewAllGroceryTabwise = () => {
    console.log("groceryCategory", groceryCategory);

    // Create URLSearchParams
    const params = new URLSearchParams();
    params.set('category', JSON.stringify(groceryCategory));

    // Navigate with the query string
    router.push(`/all-grocery-tabwise-Page?${params.toString()}`);
  };

  return (
    <div className={styles.widgetContainer}>
      <div className={styles.widgetContent}>
        <div className={styles.headerContainer}>
          <div className={styles.headerStrip}>
            <div className={styles.header}>
              <h2 className={styles.heading}>{category}</h2>
            </div>
          </div>
          <div className={styles.seeAllButton} onClick={handleViewAllGroceryTabwise}>
            <span className={styles.buttonText}>see all</span>
            <FaChevronRight className={styles.chevronIcon} />
          </div>
        </div>

        <div className={styles.productListWrapper}>
          {showLeftNav && (
            <button
              className={styles.navButton}
              onClick={scrollLeft}
              aria-label="Scroll left"
            >
              <FaChevronLeft />
            </button>
          )}

          <div className={styles.productListContainer} ref={productListRef}>
            {grocery.map((grocery) => (
              <div key={grocery.id} className={styles.productCard}>
                <div className={styles.productContainer}>
                  <div className={styles.imageContainer}>
                    <div className={styles.productImage}>
                      <img
                        src={grocery.imageUrl}
                        alt={grocery.title}
                        loading="lazy"
                        className={styles.image}
                      />
                      {/* discount offer badge */}
                      {grocery.discount && (
                        <div className={styles.offerBadge}>
                          <div className={styles.offerContent}>
                            <span className={styles.discountText}>{grocery.discount}</span>
                            <span className={styles.offerText}></span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={styles.detailContainer}>
                    <div className={styles.etaContainer}>
                      <div className={styles.etaBadge}>
                        <div className={styles.etaContent}>
                          <FaClock className={styles.clockIcon} />
                          <span className={styles.etaText}>{grocery.eta}</span>
                        </div>
                      </div>
                    </div>
                    <div className={styles.contentContainer}>
                      <div className={styles.titleContainer}>
                        <h3 className={styles.productTitle}>{grocery.title}</h3>
                        <span className={styles.productVariant}>{grocery.variant}</span>
                      </div>
                      <div className={styles.priceContainer}>
                        <div>
                          <span className={styles.currentPrice}>₹{grocery.price}</span>
                          {grocery.originalPrice && (
                            <span className={styles.originalPrice}>₹{grocery.originalPrice}</span>
                          )}
                        </div>
                        {quantities[grocery.id] ? (
                          <div className={styles.quantityControl}>
                            <button
                              className={styles.quantityButton}
                              onClick={() => handleDecrement(grocery.id)}
                              aria-label="Decrease quantity"
                            >
                              <FaMinus />
                              {/* <FaChevronDown /> */}
                            </button>
                            <span className={styles.quantityDisplay}>
                              {quantities[grocery.id]}
                            </span>
                            <button
                              className={styles.quantityButton}
                              onClick={() => handleIncrement(grocery.id)}
                              aria-label="Increase quantity"
                            >
                              <FaPlus />
                              {/* <FaChevronUp /> */}
                            </button>
                          </div>
                        ) : (
                          <button
                            className={styles.addButton}
                            onClick={() => handleAddClick(grocery.id)}
                          >
                            ADD
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {showRightNav && (
            <button
              className={styles.navButton}
              onClick={scrollRight}
              aria-label="Scroll right"
            >
              <FaChevronRight />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroceryProductList;
