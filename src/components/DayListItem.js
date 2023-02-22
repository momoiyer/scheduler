import React from "react";
import classNames from "classnames";
import 'components/DayListItem.scss';

export default function DayListItem(props) {
  const { name, spots, selected, setDay } = props;
  const className = classNames('day-list__item ', {
    'day-list__item--selected': selected,
    'day-list__item--full': props.spots === 0
  });

  const formatSpots = () => {
    if (spots === 0) {
      return 'no spots remaining';
    }

    return `${spots} ${spots > 1 ? 'spots' : 'spot'} remaining`;
  };

  return (
    <li
      onClick={() => setDay(name)}
      className={className}
    >
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}
