import { useState, useRef, useEffect } from 'react';
import styles from './AllCategoryRound.module.scss';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface Category {
  name: string;
  imageUrl: string;
}

interface AllCategoryProps {
  categories: Category[];
  // title?: string;
}

const AllCategoryRound = ({ categories }: AllCategoryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleItems, setVisibleItems] = useState(6);

  useEffect(() => {
    const updateVisibleItems = () => {
      if (typeof window !== 'undefined') {
        if (window.innerWidth < 640) {
          setVisibleItems(3);
        } else if (window.innerWidth < 768) {
          setVisibleItems(4);
        } else if (window.innerWidth < 1024) {
          setVisibleItems(5);
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
        left: -500,
        behavior: 'smooth',
      });
      setActiveIndex(Math.max(0, activeIndex - 1));
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: 500,
        behavior: 'smooth',
      });
      setActiveIndex(Math.min(categories.length - visibleItems, activeIndex + 1));
    }
  };

  return (
    <div className={styles.allCategoryContainer}>
      {/* <h2 className={styles.sectionTitle}>Shop by Category</h2> */}

      <div className={styles.categoryWrapper}>
        {/* <button
          className={`${styles.navButton} ${styles.leftButton}`}
          onClick={scrollLeft}
          disabled={activeIndex === 0}
          aria-label="Scroll left"
        >
          <ChevronLeft size={24} />
        </button> */}

        <div className={styles.categoryContainer} ref={containerRef}>
          {categories.map((category, index) => (
            <a
              key={index}
              href="#"
              className={styles.categoryItem}
              aria-label={category.name}
            >
              <div className={styles.categoryImage}>
                <Image
                  src={category.imageUrl}
                  alt={category.name}
                  width={100}
                  height={148}
                  loading="lazy"
                  className={styles.image}
                />
              </div>
              <div className={styles.categoryName}>
                {category.name}
                {/* {category.name.split(' ').map((word, i) => (
                  <span key={i}>{word}</span>
                ))} */}
              </div>
            </a>
          ))}
        </div>

        {/* <button
          className={`${styles.navButton} ${styles.rightButton}`}
          onClick={scrollRight}
          disabled={activeIndex === categories.length - visibleItems}
          aria-label="Scroll right"
        >
          <ChevronRight size={24} />
        </button> */}
      </div>
    </div>
  );
};

export default AllCategoryRound;