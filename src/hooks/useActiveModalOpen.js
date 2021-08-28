import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showAndHidePortal } from "../store";

const useActiveModalOpen = () => {
  const param = useParams();
  const { activeModal } = param;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showAndHidePortal(activeModal));
  }, [activeModal]);
};

export default useActiveModalOpen;
