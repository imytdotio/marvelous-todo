import Shortcut from "../Components/Shortcut";

const Shortcuts = () => {
  return (
    <>
      <Shortcut to="/" title="Reschedule Overdue Tasks" />
      <Shortcut to="/" title="Plan Inbox" />
      <Shortcut to="/" title="Projects" />
      <Shortcut to="/" title="Focus Now" red />
    </>
  );
};
export default Shortcuts;
