import React, { useRef } from "react";
import emailjs from "emailjs-com";
import Button from "../atoms/Button";
import InputField from "../atoms/InputField";
import InputTextArea from "../atoms/InputTextArea";
import styles from "./ContactForm.module.css";

const ContactForm = () => {
  const form = useRef<HTMLFormElement>(null);
  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.current) {
      console.error("フォームが見つかりません");
      return;
    }

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
        form.current!,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      )
      .then(
        (result) => {
          console.log(result.text);
          alert("メールが送信されました！");
        },
        (error) => {
          console.log(error.text);
          alert("送信に失敗しました。");
        }
      );
  };

  return (
    <form ref={form} onSubmit={sendEmail} className={styles.contactForm}>
      <div className={styles.inputRow}>
        <div className={styles.inputGroup}>
          <InputField
            type="text"
            placeholder="First Name"
            name="from_first_name"
            className={styles.input}
            required={true}
          />
        </div>
        <div className={styles.inputGroup}>
          <InputField
            type="text"
            placeholder="Last Name"
            name="from_last_name"
            className={styles.input}
            required={true}
          />
        </div>
      </div>
      <div className={styles.inputGroup}>
        <InputField
          type="email"
          placeholder="Email"
          name="from_email"
          className={styles.input}
          required={true}
        />
      </div>
      <div className={styles.inputGroup}>
        <InputField type="tel" placeholder="Phone" name="from_phone" className={styles.input} />
      </div>
      <div className={styles.inputGroup}>
        <InputTextArea
          placeholder="Describe your issue"
          name="message"
          className={styles.textarea}
          required={true}
        ></InputTextArea>
      </div>
      <Button type="submit" label={"Send"} className={styles.submitButton} />
    </form>
  );
};

export default ContactForm;
