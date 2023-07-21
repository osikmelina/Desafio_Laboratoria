import styles from "./Card.module.css";

function Card(props) {
  const verticalClass = props.vertical ? styles.vertical : ''
  return (
    <div className={`${styles.card} ${verticalClass}`}>
      {props.children}
    </div>
  );
}

export default Card;
