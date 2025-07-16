// components/Header/Header.tsx
import React, { useEffect, useState } from 'react';
import styles from './Header.module.scss';
import { FaMapMarkerAlt, FaSearch, FaShoppingCart } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import { ChevronDown } from 'lucide-react';

const Header = () => {
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems,] = useState(3); // Example cart items count
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [animate, setAnimate] = useState(false);

  const toggleLocationModal = () => {
    setShowLocationModal(!showLocationModal);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Add your search logic here
  };

  const placeholders = [
    "Shoping",
    "Food Delivery",
    "Grocery Delivery",
    "Flower Delivery",
    "Cabs",
    "Care",
    "Pharma"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(true); // Start fade out
      setTimeout(() => {
        setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
        setAnimate(false); // Reset for next animation
      }, 300); // Half of animation duration
    }, 2000);

    return () => clearInterval(interval);
  }, [placeholders.length]);



  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.leftSection}>
          <h1 className={styles.logo}>Hufko</h1>
          <div className={styles.locationContainer} onClick={toggleLocationModal}>
            <div className={styles.deliveryTime}>Delivery in 10 minutes</div>
            <div className={styles.deliveryLocation}>
              <FaMapMarkerAlt className={styles.locationIcon} />
              <span className={styles.locationText}>
                B62, Pocket B, South City |, Sect..
                <IoIosArrowDown className={styles.dropdownIcon} />
              </span>
            </div>

          </div>
        </div>

        <div className={styles.searchContainer}>
          <form onSubmit={handleSearch} className={styles.searchForm}>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                className={styles.searchInput}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {!searchQuery && (
                <>
                  <span className={styles.animatedPlaceholderFix}>Search for </span>
                  <span className={`${styles.animatedPlaceholder} ${animate ? styles.fadeOut : styles.fadeIn}`}>
                    &quot;{placeholders[placeholderIndex]}&quot;
                  </span>
                </>
              )}
            </div>
            <button type="submit" className={styles.searchButton}>
              <FaSearch className={styles.searchIcon} />
            </button>
          </form>
        </div>

        <div className={styles.rightSection}>
          <div className={styles.actionButtons}>
            <button className={styles.actionButton}>
              <span>Offer</span>
            </button>
            <button className={styles.actionButton}>
              <span className={styles.lang}>Eng <ChevronDown className={styles.langIcon} /></span>
            </button>
            <button className={styles.loginButton}><span>Login</span>
            </button>
            <button className={styles.cartButton}>
              <FaShoppingCart className={styles.cartIcon} />
              <div className={styles.cartDetails}>
                <span className={styles.cartItems}>{cartItems} items</span>
                <span className={styles.cartPrice}>₹90</span>
              </div>
            </button>


          </div>
        </div>

        {/* Location Selection Modal */}
        {showLocationModal && (
          <div className={styles.locationModal}>
            <div className={styles.modalContent}>
              <h3>Change Location</h3>
              <button className={styles.detectLocationButton}>
                Detect my location
              </button>
              <div className={styles.orDivider}>OR</div>
              <input
                type="text"
                placeholder="Search delivery location"
                className={styles.locationSearch}
              />
              <button className={styles.closeModal} onClick={toggleLocationModal}>
                ×
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;