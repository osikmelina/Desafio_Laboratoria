import { useState } from "react";
import data from "../../API/data.json";
import styles from "./CardList.module.css"
import Card from "../../components/Card/card";
import Button from "../../components/Button/button";

const CardList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(5);
  const [verticalLayout, setVerticalLayout] = useState(false);

  const lastIndex = currentPage * cardsPerPage;
  const firstIndex = lastIndex - cardsPerPage;
  const currentCards = data.slice(firstIndex, lastIndex);
  const pagesQtd = Math.ceil(data.length / cardsPerPage);
  const pagination = Array.from({ length: pagesQtd }, (value, index) => index + 1);

  const toggleLayout = (layout) => {
    setVerticalLayout(layout);
  };

  const changeCardsPerPage = (e) => {
    setCardsPerPage(Number(e.target.value))
  };

  const pageChange = (page) => {
    setCurrentPage(page)
  };

  return (
    <main className={styles.container}>
      <section>
        <div className={styles.btnLayoutChange}>
        <h5>Visualização</h5>
        <Button onClick={() => toggleLayout(true)}>vertical</Button>
        <Button onClick={() => toggleLayout(false)}>horizontal</Button>
      </div>
      <div className={styles.qtdSelection}>
        <h5>Itens por página</h5>
        <select value={cardsPerPage} onChange={changeCardsPerPage}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>20</option>
        </select>
        </div>
      </section>
      <div className={verticalLayout ? styles.vertical : styles.horizontal}>
        {currentCards.map((car) => (
          <Card key={car.veiculo_id} vertical={verticalLayout}>
            <div className={`${styles.imgOverlay} ${verticalLayout ? styles.imgOverlayVertical : ''}`}>
              <img src={car.veiculo_foto[0]} alt="foto do veículo"/>
              <div className={styles.city}>{car.cidade_nome}</div>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.infoList}>
                <h5><span>{car.veiculo_marca}</span> {car.modelo_nome_pai}</h5>
                <p className={styles.model}> {car.veiculo_modelo}</p>
                <p>{car.ano_fabricacao} - {car.ano_modelo}</p>
                <p>{car.veiculo_cambio}</p>
                <p>{Number(car.veiculo_km).toLocaleString('pt-br',{maximumSignificantDigits: 3})} km</p>
                <h5>{Number(car.veiculo_valor).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</h5>
              </div>
              <div className={styles.buttons}>
                <Button>Simular financiamento</Button>
                <Button>Entrar em contato</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <ul className={styles.pagination}>
        {pagination.map((page) => (
          <li key={page} className={styles.pageNumbers} onClick={() => pageChange(page)}>{page}</li>
        ))}
      </ul>
    </main>
  );
};

export default CardList;
