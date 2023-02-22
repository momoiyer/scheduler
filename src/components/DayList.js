import React from "react";
import DayListItem from 'components/DayListItem';


export default function DayList(props) {
  const { days, day, setDay } = props;
  const dayList = days.map(currentDay => {
    return (
      <DayListItem
        key={currentDay.id}
        name={currentDay.name}
        spots={currentDay.spots}
        selected={currentDay.name === day}
        setDay={() => setDay(currentDay.name)}
      />
    );
  });

  return (
    <ul>
      {dayList}
    </ul>
  );
}