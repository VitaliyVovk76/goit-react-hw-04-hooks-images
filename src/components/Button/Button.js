import PropTypes from "prop-types";
import s from "./Button.module.css";
function Button({ onNextPageImg }) {
  return (
    <button type="button" className={s.loadButton} onClick={onNextPageImg}>
      Load more
    </button>
  );
}

Button.propTypes = { onNextPageImg: PropTypes.func.isRequired };

export default Button;
