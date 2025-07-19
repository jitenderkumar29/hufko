"use client";
import React, { useState } from "react";
import styles from "./Footer.module.scss";
import { FaChevronDown, FaChevronUp, FaWhatsapp } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

interface FooterLink {
  text: string;
  url: string;
}

interface FooterSection {
  heading: string;
  links: FooterLink[];
}

const Footer: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  // const [openB2BServices, setOpenB2BServices] = useState(false);
  // const [chatRegister, setChatRegister] = useState(false);

  const footerSections: FooterSection[] = [
    {
      heading: "Information",
      links: [
        { text: "About Us", url: "/" },
        { text: "Investor Relations", url: "/" },
        { text: "Careers", url: "/" },
        { text: "Blog", url: "/" },
        { text: "CSR & Sustainability", url: "/" },
        { text: "Recipes", url: "/" },
      ],
    },
    {
      heading: "Support",
      links: [
        { text: "Contact Us", url: "/" },
        { text: "Partner", url: "/" },
        { text: "Franchise", url: "/" },
        { text: "Seller", url: "/" },
        { text: "Warehouse", url: "/" },
        { text: "Deliver", url: "/" },
      ],
    },
    {
      heading: "Services",
      links: [
        { text: "Food Delivery", url: "/" },
        { text: "Grocery Delivery", url: "/" },
        { text: "Shopping", url: "/" },
        { text: "Flower Delivery", url: "/" },
        { text: "Care Services", url: "/" },
        { text: "Pharma", url: "/" },
      ],
    },
    {
      heading: "Legal",
      links: [
        { text: "Terms and Conditions", url: "/" },
        { text: "Privacy Policy", url: "/" },
        { text: "FAQs", url: "/" },
        { text: "Disclosure", url: "/" },
        { text: "Refund Policy", url: "/" },
        { text: "Safety & Cyber Security", url: "/" },
      ],
    },
  ];

  // const b2bServices: FooterSection[] = [
  //   {
  //     heading: "Products & Services",
  //     links: [
  //       { text: "Recharge & Bill Payment", url: "/recharge-Bill-Payments" },
  //       { text: "Domestic Money Transfer", url: "/domestic-Money-Transfer" },
  //       { text: "AEPS", url: "/aadhaar-Enabled-payment" },
  //       { text: "Prepaid Cards", url: "/prepaid-Cards" },
  //       { text: "Travel & Entertainment", url: "/travel-Stay" },
  //     ],
  //   },
  //   {
  //     heading: "Services",
  //     links: [
  //       { text: "Retailer", url: "/retailer" },
  //       { text: "Distributor", url: "/distributors" },
  //       { text: "Master Distributor", url: "/master-distributor" },
  //       { text: "Advertise with us", url: "/" },
  //       { text: "FAQs", url: "/faqsb2b" },
  //     ],
  //   },
  //   {
  //     heading: "Solutions",
  //     links: [
  //       { text: "Corporate Solutions", url: "/corporate-solutions" },
  //       { text: "Government Solutions", url: "/government-solutions" },
  //       { text: "Campus Solutions/Institution", url: "/campus-solutions" },
  //       { text: "Travel Solutions", url: "/travel-solutions" },
  //       { text: "Resources", url: "/" },
  //     ],
  //   },
  //   {
  //     heading: "Legal",
  //     links: [
  //       { text: "Privacy Policy", url: "/privacy-policy" },
  //       { text: "Customer Grievance", url: "/customer-grievance" },
  //       { text: "Refund Policy", url: "/refund-policy" },
  //       { text: "Terms & Conditions", url: "/terms-conditions" },
  //       { text: "Registration Guidelines", url: "/registration-guidelines" },
  //     ],
  //   },
  // ];

  const socialIcons = [
    { icon: "/icons/facebook.png", alt: "Facebook" },
    { icon: "/icons/x.png", alt: "X" },
    { icon: "/icons/twitter.png", alt: "Twitter" },
    { icon: "/icons/instagram.png", alt: "Instagram" },
    { icon: "/icons/linkedin.png", alt: "LinkedIn" },
    { icon: "/icons/youtube.png", alt: "YouTube" },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <button
          className={styles.toggleButton}
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
        >
          {isExpanded ? (
            <>
              <span>Hide Footer</span>
              <FaChevronUp className={styles.toggleIcon} />
            </>
          ) : (
            <>
              <span>Show Footer</span>
              <FaChevronDown className={styles.toggleIcon} />
            </>
          )}
        </button>

        {isExpanded && (
          <>
            <div className={styles.footerTop}>
              <div className={styles.appSection}>
                <h3 className={styles.sectionTitle}>Download Our App</h3>
                <div className={styles.downloadButtons}>
                  <Link href="#" className={styles.downloadLink}>
                    <Image
                      src="/icons/appStore.png"
                      alt="Download on the App Store"
                      width={150}
                      height={50}
                    />
                  </Link>
                  <Link href="#" className={styles.downloadLink}>
                    <Image
                      src="/icons/playStore.png"
                      alt="Get it on Google Play"
                      width={150}
                      height={50}
                    />
                  </Link>
                </div>
                <div className={styles.customerCare}>
                  <p>Customer Care No.</p>
                  <p className={styles.phoneNumber}>1800 410 2926</p>
                </div>
              </div>

              <div className={styles.linksContainer}>
                {footerSections.map((section, index) => (
                  <div key={index} className={styles.linksSection}>
                    <h3 className={styles.sectionTitle}>{section.heading}</h3>
                    <ul className={styles.linksList}>
                      {section.links.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          <Link href={link.url} className={styles.footerLink}>
                            {link.text}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* <div className={styles.b2bServices}> */}
            {/* <FontAwesomeIcon
              icon={faChevronDown}
              className={`${styles.iconChevron} ${openB2BServices ? styles.rotate : ''}`}
              onClick={() => setOpenB2BServices(!openB2BServices)}
            /> */}

            {/* Footer Section Working */}
            {/* <Image src={"/png/arrowDown.png"} alt="Arrow Icon" width={200} height={200} className={`${styles.iconChevron} ${openB2BServices ? styles.rotate : ''}`}
              onClick={() => setOpenB2BServices(!openB2BServices)} />
            <h2 className={styles.b2bServices}> B2B Services</h2> */}

            {/* {openB2BServices && (
              <div className={styles.footerTop}>
                <div className={styles.appSection}>
                  <h3 className={styles.sectionTitle}>Download Our Partner App</h3>
                  <div className={styles.downloadButtons}>
                    <Link href="#" className={styles.downloadLink}>
                      <Image
                        src="/icons/appStore.png"
                        alt="Download on the App Store"
                        width={120}
                        height={40}
                      />
                    </Link>
                    <Link href="#" className={styles.downloadLink}>
                      <Image
                        src="/icons/playStore.png"
                        alt="Get it on Google Play"
                        width={120}
                        height={40}
                      />
                    </Link>
                  </div>
                  <div className={styles.customerCare}>
                    <p>Customer Care No.</p>
                    <p className={styles.phoneNumber}>1800 410 2926</p>
                  </div>
                </div>

                <div className={styles.linksContainer}>
                  {b2bServices.map((section, index) => (
                    <div key={index} className={styles.linksSection}>
                      <h3 className={styles.sectionTitle}>{section.heading}</h3>
                      <ul className={styles.linksList}>
                        {section.links.map((link, linkIndex) => (
                          <li key={linkIndex}>
                            <Link href={link.url} className={styles.footerLink}>
                              {link.text}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )} */}
            {/* {openB2BServices && (<div className={styles.footerTop}>
              <div className={styles.b2blinksContainer}>
                {b2bServices.map((section, index) => (
                  <div key={index} className={styles.linksSection}>
                    <h3 className={styles.sectionTitle}>{section.heading}</h3>
                    <ul className={styles.linksList}>
                      {section.links.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          <Link href={link.url} className={styles.footerLink}>
                            {link.text}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>)} */}


            <div className={styles.footerBottom}>
              <div className={styles.copyright}>
                <p>Copyright@2025 HufKo - All Right Reserved</p>
              </div>

              <div className={styles.socialSection}>
                <span className={styles.socialLabel}>Follow Us:</span>
                <div className={styles.socialIcons}>
                  {socialIcons.map((social, index) => (
                    <Link
                      key={index}
                      href="#"
                      className={styles.socialLink}
                      aria-label={social.alt}
                    >
                      <Image
                        src={social.icon}
                        alt={social.alt}
                        width={24}
                        height={24}
                        className={styles.socialImg} />
                    </Link>
                  ))}
                </div>
              </div>

              <div className={styles.whatsappSection}>
                <FaWhatsapp className={styles.whatsappIcon} />
                <div>
                  <p className={styles.phoneNumber}>+91 8956231245</p>
                  <p>Connect with Us on WhatsApp</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* <button className={styles.chatButton} aria-label="Chat with us">
        <FaComment className={styles.chatIcon} onClick={() => setChatRegister(true)} />
      </button> */}
      {/* {chatRegister && (
        )} */}
      <div className={styles.overlay}>
        <div className={styles.overlayContent} >
          {/* <LiveChat /> */}
          {/* <ChatRegister />  */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;