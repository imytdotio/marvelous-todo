import Shortcut from "../Components/Shortcut";

const Shortcuts = () => {
  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-2">
      <Shortcut to="/" title="Reschedule Overdue Tasks" />
      <Shortcut to="/projects/inbox" title="Plan Inbox" />
      <Shortcut to="/projects" title="Projects" />
      <Shortcut to="/focus" title="Focus Now" red />
    </div>
  );
};
export default Shortcuts;
