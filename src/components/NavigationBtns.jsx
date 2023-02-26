import { usePokeContext } from "../context";

const NavigationBtns = () => {
  const { handleNextBtn, handlePrevBtn, prev } = usePokeContext();
  return (
    <div className="flex items-center justify-center gap-14">
      {prev && (
        <button
          className="px-5 py-2 bg-red-400 text-white rounded-xl hover:bg-orange-400 hover:scale-110 duration-300"
          onClick={handlePrevBtn}
        >
          Prev
        </button>
      )}
      <button
        className="px-5 py-2 bg-red-400 text-white rounded-xl hover:bg-orange-400 hover:scale-110 duration-300"
        onClick={handleNextBtn}
      >
        Next
      </button>
    </div>
  );
};
export default NavigationBtns;
