type IncreaseBtnType = {
  date: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleShedule: (value: any) => void;
};

export default function IncreaseBtn({ date, handleShedule }: IncreaseBtnType) {
  return (
    <button
      id="increase-btn"
      onClick={async () => {
        const newShedule = await window.shedule.add(date);
        handleShedule(newShedule[date]);
      }}
    ></button>
  );
}
