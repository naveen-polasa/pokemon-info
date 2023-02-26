import { usePokeContext } from "../context";
import { IoCloseSharp } from "react-icons/io5";

const Modal = () => {
  const { modal, modal_poke, toggleModal, topHeight } = usePokeContext();
  if (!modal) return;
  const { name, img, p } = modal_poke;
  const type = p.types[0].type.name;
  const { height, weight, stats } = p;
  return (
    <section
      style={{ marginTop: topHeight }}
      className="absolute top-20 mt-4 sm:top-0 left-0 h-screen w-screen flex justify-center items-center "
    >
      <div className="flex flex-col sm:flex-row mx-auto flex-wrap gap-6 items-center justify-center p-12 border border-red-600 bg-red-200 rounded-xl absolute  md:hover:scale-105 duration-300">
        <div className="absolute top-2 right-3 text-red-700 hover:scale-110 hover:text-red-900 duration-300 ">
          <button onClick={toggleModal}>
            <IoCloseSharp size={"44px"} />
          </button>
        </div>
        <div className="border border-red-600 rounded-xl p-4 bg-red-100 my-auto mt-6 ">
          <img src={img} alt={name} className="w-44 my-2" />
          <div className="capitalize font-semibold text-lg pt-5 px-4">
            <h3 className="text-center py-4 text-2xl">{name}</h3>
            <h3>
              Heigth :<span className="font-normal"> {height / 10} meters</span>
            </h3>
            <h3>
              Weight : <span className="font-normal"> {weight / 10} KGs</span>
            </h3>
            <h3>
              Type : <span className="font-normal"> {type} </span>
            </h3>
          </div>
        </div>
        <div className="border border-red-600 rounded-xl p-4 bg-red-100 ">
          <h3 className="font-bold text-2xl my-3">Pokemon Stats</h3>
          {stats.map((st) => {
            const { base_stat, stat } = st;
            const { name } = stat;
            return (
              <div key={name} className="my-2 flex gap-4 items-center">
                <h4 className="capitalize font-semibold text-xl">{name} :</h4>
                <span className=" text-xl font-mono mt-1">{base_stat}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default Modal;
