import Shortcuts from "../Sections/Shortcuts";
import Todos from "../Sections/Todos";

const HomePage = () => {
  return (
    <div className="">
      <div className="flex flex-col gap-2">
        <Shortcuts />
        <Todos />
      </div>
    </div>
  );
};

export default HomePage;
