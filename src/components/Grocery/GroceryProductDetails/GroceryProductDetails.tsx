// components/GroceryProductDetails/GroceryProductDetails.tsx
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { faChevronRight, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './GroceryProductDetails.module.scss';
import { useSearchParams } from 'next/navigation';
import { GroceryProductDetailsData } from '@/app/data/GroceryPageData/GroceryProductDetails';

interface ProductImage {
  id: string;
  url: string;
  alt?: string;
}

interface ProductVariant {
  id: string | number;
  name: string;
  price: string;
  isSelected?: boolean;
}

interface GroceryProductDetailsProps {
  productName?: string;
  brandName?: string;
  brandLogo?: string;
  deliveryTime?: string;
  price?: string;
  description?: string;
  productType?: string;
  images?: ProductImage[];
  variants?: ProductVariant[];
  inclusiveTaxText?: string;
}

interface ZoomPosition {
  x: number;
  y: number;
  show: boolean;
}

const GroceryProductDetails: React.FC<GroceryProductDetailsProps> = ({
  productName = 'Product Not Found',
  brandName = '',
  brandLogo = '',
  deliveryTime = '',
  price = '',
  description = '',
  productType = '',
  images = [{ id: '', url: '', alt: '' }],
  variants = [{ id: '', name: '', price: '' }],
  inclusiveTaxText = '(Inclusive of all taxes)',
  // productName = 'Product Name',
  // brandName = 'Brand',
  // brandLogo = '/placeholder.png',
  // deliveryTime = '10',
  // price = '₹0',
  // description = 'Product description not available',
  // productType = 'Type not specified',
  // images = [{ id: 'default', url: '/placeholder.png', alt: 'Product image' }],
  // variants = [{ id: 'default', name: 'Default', price: '₹0' }],
  // inclusiveTaxText = '(Inclusive of all taxes)',
}) => {
  const searchParams = useSearchParams();

  const [productDetails, setProductDetails] = useState<GroceryProductDetailsProps>({
    productName,
    brandName,
    brandLogo,
    deliveryTime,
    price,
    description,
    productType,
    images,
    variants,
    inclusiveTaxText,
  });

  const [selectedImage, setSelectedImage] = useState<ProductImage>(images[0]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [zoomPosition, setZoomPosition] = useState<ZoomPosition>({
    x: 100,
    y: 100,
    show: false,
  });

  const handleThumbnailClick = (image: ProductImage) => {
    setSelectedImage(image);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomPosition({
      x,
      y,
      show: true,
    });
  };

  const handleMouseLeave = () => {
    setZoomPosition({ ...zoomPosition, show: false });
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    const idParam = searchParams.get('id');
    const detailsProduct = GroceryProductDetailsData.find(
      (product) => product.id === idParam
    );
    console.log("detailsProduct", detailsProduct)
    if (detailsProduct) {
      setProductDetails({
        productName: detailsProduct.productName,
        brandName: detailsProduct.brandName,
        brandLogo: detailsProduct.brandLogo,
        deliveryTime: detailsProduct.deliveryTime,
        price: detailsProduct.price,
        description: detailsProduct.description,
        productType: detailsProduct.productType,
        images: detailsProduct.images,
        variants: detailsProduct.variants,
        inclusiveTaxText: detailsProduct.inclusiveTaxText,
      });
    }
  }, [searchParams]);


  useEffect(() => {
    if (productDetails.images && productDetails.images.length > 0) {
      setSelectedImage(productDetails.images[0]);
    }
  }, [productDetails.images]);

  return (
    <>
      {productDetails.productName !== "Product Not Found" ? (
        <div className={styles.productContainer}>
          <div className={styles.productLeftSection}>
            <div
              className={styles.mainImageContainer}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <Image
                src={selectedImage.url}
                alt={selectedImage.alt || productDetails.productName || 'Image'}
                width={480}
                height={480}
                className={styles.mainImage}
                priority
              />
              {zoomPosition.show && (
                <div
                  className={styles.zoomOverlay}
                  style={{
                    backgroundImage: `url(${selectedImage.url})`,
                    backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  }}
                />
              )}
            </div>

            <div className={styles.thumbnailContainer}>
              {productDetails.images?.map((image) => (
                <div
                  key={image.id}
                  className={`${styles.thumbnail} ${selectedImage.id === image.id ? styles.activeThumbnail : ''}`}
                  onClick={() => handleThumbnailClick(image)}
                >
                  <Image
                    src={image.url}
                    alt={image.alt || `${productDetails.productName} thumbnail`}
                    width={120}
                    height={120}
                    className={styles.thumbnailImage}
                  />
                </div>
              ))}
            </div>

            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h3 className={styles.sectionTitle}>Highlights</h3>
              </div>
              <div className={styles.highlightsContainer}>
                <div className={styles.highlightItem}>
                  <div className={styles.highlightLabel}>Type</div>
                  <div className={styles.highlightValue}>{productDetails.productType}</div>
                </div>
              </div>
            </div>

            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h3 className={styles.sectionTitle}>Product Details</h3>
              </div>
              <div className={styles.productDetails}>
                <div className={styles.detailItem}>
                  <div className={styles.detailLabel}>Description</div>
                  <div className={`${styles.detailValue} ${isExpanded ? styles.expanded : ''}`}>
                    {productDetails.description}
                  </div>
                </div>
              </div>
              <button className={styles.viewMoreButton} onClick={toggleExpand}>
                {isExpanded ? 'View less details' : 'View more details'}
                <FontAwesomeIcon
                  icon={isExpanded ? faChevronUp : faChevronDown}
                  className={styles.viewMoreIcon}
                />
              </button>
            </div>
          </div>

          <div className={styles.productRightSection}>
            <div className={styles.breadcrumb}>
              <span className={styles.breadcrumbLink}>Home</span>
              <span> / </span>
              <span className={styles.breadcrumbLink}>Category</span>
              <span> / </span>
              <span className={styles.breadcrumbCurrent}>{productDetails.productName}</span>
            </div>

            <h1 className={styles.productName}>{productDetails.productName}</h1>

            <div className={styles.deliveryInfo}>
              <div className={styles.deliveryTime}>
                <Image
                  src="/products/15-mins.png"
                  alt="Delivery time"
                  width={20}
                  height={20}
                  className={styles.deliveryIcon}
                />
                <span className={styles.deliveryText}>{productDetails.deliveryTime} mins</span>
              </div>
            </div>

            <div className={styles.divider}></div>

            <div className={styles.brandInfo}>
              <div className={styles.brandLogoContainer}>
                <Image
                  src={productDetails.brandLogo || '/placeholder.png'}
                  alt={productDetails.brandName || 'Image'}
                  width={32}
                  height={32}
                  className={styles.brandLogo}
                />
              </div>
              <div className={styles.brandDetails}>
                <div className={styles.brandName}>{productDetails.brandName}</div>
                <div className={styles.exploreBrand}>Explore all products</div>
              </div>
              <FontAwesomeIcon icon={faChevronRight} className={styles.brandArrow} />
            </div>

            <div className={styles.divider}></div>

            <div className={styles.variantSection}>
              <div className={styles.sectionHeader}>
                <h3 className={styles.sectionTitle}>Select Unit</h3>
              </div>
              <div className={styles.variantContainer}>
                {productDetails.variants?.map((variant) => (
                  <div
                    key={variant.id}
                    className={`${styles.variantItem} ${variant.isSelected ? styles.selectedVariant : ''}`}
                  >
                    <div className={styles.variantName}>{variant.name}</div>
                    <div className={styles.variantPrice}>{variant.price}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.priceSection}>
              <div className={styles.priceInfo}>
                <div className={styles.selectedVariantName}>
                  {
                    productDetails.variants?.find((v) => v.isSelected)?.name ||
                    productDetails.variants?.[0]?.name
                  }
                </div>
                <div className={styles.priceContainer}>
                  <span className={styles.price}>{productDetails.price}</span>
                </div>
                <div className={styles.taxInfo}>{productDetails.inclusiveTaxText}</div>
              </div>
              <button className={styles.addToCartButton}>Add to cart</button>
            </div>

            <div className={styles.promisesSection}>
              <div className={styles.promisesHeader}>Why shop from HufKo?</div>
              <div className={styles.promisesRow}>
                <div className={styles.promiseItem}>
                  <div className={styles.promiseIcon}>
                    <Image
                      src="/products/10_minute_delivery.png"
                      alt="Superfast Delivery"
                      width={56}
                      height={56}
                    />
                  </div>
                  <div className={styles.promiseContent}>
                    <div className={styles.promiseTitle}>Superfast Delivery</div>
                    <div className={styles.promiseDescription}>
                      Get your order delivered to your doorstep at the earliest from dark stores near you.
                    </div>
                  </div>
                </div>
                <div className={styles.promiseItem}>
                  <div className={styles.promiseIcon}>
                    <Image
                      src="/products/Best_Prices_Offers.png"
                      alt="Best Prices & Offers"
                      width={56}
                      height={56}
                    />
                  </div>
                  <div className={styles.promiseContent}>
                    <div className={styles.promiseTitle}>Best Prices & Offers</div>
                    <div className={styles.promiseDescription}>
                      Best price destination with offers directly from the manufacturers.
                    </div>
                  </div>
                </div>
                <div className={styles.promiseItem}>
                  <div className={styles.promiseIcon}>
                    <Image
                      src="/products/Wide_Assortment.png"
                      alt="Wide Assortment"
                      width={56}
                      height={56}
                    />
                  </div>
                  <div className={styles.promiseContent}>
                    <div className={styles.promiseTitle}>Wide Assortment</div>
                    <div className={styles.promiseDescription}>
                      Choose from 5000+ products across food, personal care, household & other categories.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>) : (<div className={styles.productContainer}>Page Not Found – We&apos;re working on it!</div>)}
    </>
  );
};

export default GroceryProductDetails;
