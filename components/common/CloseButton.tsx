import { GrFormClose } from "react-icons/gr";

const CloseButton = ({ onClick }: { onClick: () => void }) => (
  <GrFormClose className="close-button" onClick={onClick} />
);

export default CloseButton;
