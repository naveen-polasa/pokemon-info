import Modal from "./components/Modal";
import PokeList from "./components/PokeList";
import SearchForm from "./components/SearchForm";
import { usePokeContext } from "./context";

function App() {
  const { modal } = usePokeContext();
  return (
    <main>
      <Modal />
      <div className={`${modal && "relative -z-30 h-screen opacity-60 "}`}>
        <div className="bg-green-200 min-h-screen">
          <div className="max-w-7xl mx-auto px-5 py-7">
            <SearchForm />
            <PokeList />
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
