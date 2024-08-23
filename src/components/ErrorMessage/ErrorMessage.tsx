import styles from "./ErrorMessage.module.css";

const ErrorMessage = ({ message }) => {
  return <p className={styles.ErrorMessage}>{message}</p>;
};

export default ErrorMessage;
