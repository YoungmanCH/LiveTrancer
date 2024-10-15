import React from "react";
import styles from "./ContactSection.module.css";
import ContactForm from "../../../molecules/ContactForm";

const ContactSection = () => {
  return (
    <div className={styles.contactSection}>
      <div className={styles.contactContainer}>
        <div className={styles.contactHeader}>
          <h2 className={styles.title}>GET IN TOUCH</h2>
          <p className={styles.subtitle}>
            We will answer your questions and problems.
          </p>
        </div>
        <ContactForm></ContactForm>
      </div>
    </div>
  );
};

export default ContactSection;
