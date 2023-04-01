import { Button } from "react-bootstrap";
import ModalScreen from "../../UI/ModalScreen";
import { useNavigate } from "react-router-dom";

const Cancel = (props) => {
  props.onCancel();

  const navigate = useNavigate();

  const closeHandler = () => {
    navigate("/schedule");
  };
  return (
    <ModalScreen title="Payment Cancelled">
      <div className="alert alert-danger text-center">
        <strong>Your payment was cancelled</strong>
      </div>
      <Button onClick={closeHandler} className="m-1 btn-secondary">
        Exit
      </Button>
    </ModalScreen>
  );
};

export default Cancel;
