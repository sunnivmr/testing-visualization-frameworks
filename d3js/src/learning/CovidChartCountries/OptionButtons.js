export const OptionButtons = () => {
  return (
    <>
      <div className="data-choices">
        <form>
          {datasets.map((dataset) => (
            <div className="data-choice" key={dataset.value}>
              <input
                checked={chosenValue === dataset.value}
                onChange={(e) => {
                  setChosenValue(e.target.value);
                  setChosenData(dataset.data);
                }}
                id={dataset.value}
                type="radio"
                value={dataset.value}
                name={dataset.label}
              />
              <label htmlFor={dataset.value}>{dataset.label}</label>
            </div>
          ))}
        </form>
      </div>
      <div className="scale-choices">
        <form>
          {scales.map((scale) => (
            <div className="scale-choice" key={scale.value}>
              <input
                checked={scale.value === chosenScale}
                onChange={(e) => {
                  setChosenScale(scale.value);
                }}
                id={scale.value}
                type="radio"
                value={scale.value}
                name={scale.label}
              />
              <label htmlFor={scale.value}>{scale.label}</label>
            </div>
          ))}
        </form>
      </div>
    </>
  );
};
