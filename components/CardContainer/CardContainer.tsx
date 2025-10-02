import HomeCard from './components/HomeCard';
import styles from './CardContainer.module.scss';

const CardContainer = ({ cardData }) => {
  return (
    <div className={styles.container}>
      {cardData.map((card, index) => (
        <div key={index}>
          <HomeCard
            title={card.title}
            description={card.description}
            link={card.link}
            isExternal={card.isExternal}
            version={card.version}
            isBeta={card.isBeta}
          />
        </div>
      ))}
    </div>
  );
};

export default CardContainer;
