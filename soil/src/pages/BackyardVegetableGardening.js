import { VEGETABLEGARDENINGINFO } from "../utils/constants";

const BackyardVegetableGardening = () => {
  return (
    <div className="backyard-vegetable-gardening">
      <h2 className="title">Backyard Vegetable Gardening Tips</h2>
      <p className="intro">
        Growing your own vegetables in the backyard can be a rewarding and
        enjoyable experience. Not only do you get to eat fresh, organic produce,
        but you also get to spend time outdoors and connect with nature. Plus,
        gardening has been shown to have numerous health benefits, including
        reducing stress and improving mental health. So why not give it a try?
        Here are some vegetables that are suitable for growing in smaller
        spaces.
      </p>
      <ul className="vegetable-list">
        {VEGETABLEGARDENINGINFO.map((vegetable) => (
          <li key={vegetable.id} className="vegetable-item">
            <h3>{vegetable.name}</h3>
            <img src={vegetable.image} alt={vegetable.name} />
            <p>{vegetable.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BackyardVegetableGardening;
