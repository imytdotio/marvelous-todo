import { Link } from "react-router-dom";

interface ShortcutProps {
  to: string;
  title: string;
  red?: boolean | false;
}

const Shortcut = ({ to, title, red }: ShortcutProps) => {
  return (
    <Link
      to={to}
      className={`border-zinc-700 border-2 ${
        red
          ? "hover:bg-red-800/30 focus:bg-red-800/30"
          : "hover:bg-zinc-800 focus:bg-zinc-800"
      } duration-200 rounded-md px-4 text-lg flex flex-col text-center justify-center py-2 h-20`}
    >
      {title}
    </Link>
  );
};

export default Shortcut;
