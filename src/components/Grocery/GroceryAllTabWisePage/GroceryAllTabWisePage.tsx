import React from 'react'
import AllCategoryTabWise from './CategoryAllTabWise/CategoryAllTabWise'
import { AllGroceryTabWiseData } from '@/app/data/GroceryPageData/GroceryAllTabWiseData'
import Header from '@/components/Header/Header/Header'
import Footer from '@/components/Footer/Footer'
import styles from './GroceryAllTabWisePage.module.scss';

const AllGroceryTabWisePage = () => {
  return (
    <div className={styles.container}>
      <Header />
      {/* <HeaderCategory /> */}
      <AllCategoryTabWise categories={AllGroceryTabWiseData} initialActiveCategory="milk" />
      <Footer />
    </div>
  )
}

export default AllGroceryTabWisePage
