// Shopping.tsx
import { useState, useRef, useEffect } from 'react';
import styles from './Shopping.module.scss';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const Shopping = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleItems, setVisibleItems] = useState(6);

  const products = [
    {
      name: 'Clothes',
      imageUrl: '/products/shoping.png',
      price: '$2.99',
      discount: '50'
    },
    {
      name: 'Books',
      imageUrl: '/products/books.png',
      price: '$4.49',
      discount: '60'
    },
    {
      name: 'Gifts',
      imageUrl: '/products/gifts.png',
      price: '$1.99',
      discount: '40'
    },
    // {
    //   name: 'Bakery Items',
    //   imageUrl: '/products/bakery.png',
    //   price: '$3.29',
    //   discount: '$3.99'
    // },
    // {
    //   name: 'Beverages',
    //   imageUrl: '/products/beverages.png',
    //   price: '$1.49',
    //   discount: '$1.99'
    // },
    // {
    //   name: 'Snacks',
    //   imageUrl: '/products/snacks.png',
    //   price: '$0.99',
    //   discount: '$1.29'
    // },
    // {
    //   name: 'Meat & Poultry',
    //   imageUrl: '/products/meat.png',
    //   price: '$7.99',
    //   discount: '$8.99'
    // },
    // {
    //   name: 'Seafood',
    //   imageUrl: '/products/seafood.png',
    //   price: '$9.99',
    //   discount: '$11.99'
    // },
  ];

  useEffect(() => {
    const updateVisibleItems = () => {
      if (typeof window !== 'undefined') {
        if (window.innerWidth < 640) {
          setVisibleItems(2);
        } else if (window.innerWidth < 768) {
          setVisibleItems(3);
        } else if (window.innerWidth < 1024) {
          setVisibleItems(4);
        } else {
          setVisibleItems(6);
        }
      }
    };

    updateVisibleItems();
    window.addEventListener('resize', updateVisibleItems);

    return () => {
      window.removeEventListener('resize', updateVisibleItems);
    };
  }, []);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -300,
        behavior: 'smooth',
      });
      setActiveIndex(Math.max(0, activeIndex - 1));
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: 300,
        behavior: 'smooth',
      });
      setActiveIndex(Math.min(products.length - visibleItems, activeIndex + 1));
    }
  };

  return (
    <div className={styles.shoppingContainer}>
      {/* <h2 className={styles.sectionTitle}>Weekly Deals</h2>
      <p className={styles.sectionSubtitle}>Shop our best deals this week</p> */}

      <div className={styles.productsWrapper}>
        <button
          className={`${styles.navButton} ${styles.leftButton}`}
          onClick={scrollLeft}
          disabled={activeIndex === 0}
          aria-label="Scroll left"
        >
          <ChevronLeft size={24} />
        </button>

        <div className={styles.productsContainer} ref={containerRef}>
          {products.map((product, index) => (
            <div
              key={index}
              className={styles.productCard}
              aria-label={product.name}
            >
              <div className={styles.productImage}>
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={160}
                  height={160}
                  loading="lazy"
                  className={styles.image}
                />
                <button className={styles.addToCart}>Add to Cart</button>
              </div>
              <div className={styles.productInfo}>
                <h3 className={styles.productName}>{product.name}</h3>
                <div className={styles.priceContainer}>
                  <span className={styles.currentPrice}>Discount Upto: {product.discount}%</span>
                  {/* <span className={styles.originalPrice}>{product.discount}</span> */}
                </div>
                <div className={styles.rating}>
                  ★★★★☆ <span className={styles.reviewCount}>(24)</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          className={`${styles.navButton} ${styles.rightButton}`}
          onClick={scrollRight}
          disabled={activeIndex === products.length - visibleItems}
          aria-label="Scroll right"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default Shopping;