import React, { useRef } from 'react';
import styles from './ShoppingSlides1.module.scss';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import Image from 'next/image';

export interface SmartphoneDeal {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
  link: string;
}

interface ShoppingSlides1Props {
  title?: string;
  deals: SmartphoneDeal[];
  cardWidth?: number | string;
  showArrow?: boolean;
}

const ShoppingSlides1: React.FC<ShoppingSlides1Props> = ({
  title = "Best Deals on Smartphones",
  deals,
  cardWidth = 216,
  showArrow = false
}) => {
  const dealsContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (dealsContainerRef.current) {
      const scrollAmount = direction === 'left' ? -216 : 216;
      dealsContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className={styles.shoppingSlidesContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
      </div>

      <div className={styles.sliderWrapper}>
        <button
          className={`${styles.navButton} ${styles.prevButton}`}
          onClick={() => scroll('left')}
          aria-label="Previous deals"
        >
          <FaChevronLeft />
        </button>

        <div className={styles.dealsContainer} ref={dealsContainerRef}>
          {deals.map((deal) => (
            <a
              key={deal.id}
              href={deal.link}
              className={styles.dealCard}
              style={{ minWidth: typeof cardWidth === 'number' ? `${cardWidth}px` : cardWidth }}
            >
              <div className={styles.imageContainer}>
                <Image
                  src={deal.imageUrl}
                  alt={deal.name}
                  className={styles.productImage}
                  loading="lazy"
                  width={92}
                  height={120}
                />
              </div>
              <div className={styles.productInfo}>
                <h3 className={styles.productName}>{deal.name}</h3>
                <p className={styles.productPrice}>{deal.price}</p>
              </div>
              {showArrow && (
                <div className={styles.arrowIcon}>
                  <FaChevronRight />
                </div>
              )}
            </a>
          ))}
        </div>

        <button
          className={`${styles.navButton} ${styles.nextButton}`}
          onClick={() => scroll('right')}
          aria-label="Next deals"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default ShoppingSlides1;