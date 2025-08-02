import React, { useContext, useEffect, useState } from "react";
import Slider from "./Slider";
import { useDispatch, useSelector } from "react-redux";
import { AlertContext } from "../layout/alertProvider";
import { useNavigate, useParams } from "react-router-dom";
import {
  CLEAR_ERRORS,
  UPDATE_ADVERT_RESET,
} from "../../redux/constants/advertiseConstants";
import {
  getSingleAdvert,
  updateAdvertAction,
} from "../../redux/actions/advertiseAction";
import AdsForm from "./adsForm";

function UpdateAds() {
  const dispatch = useDispatch();
  const { isUpdated, error, loading, advertisement } = useSelector(
    (state) => state.advert
  );
  const navigator = useNavigate();
  const { id } = useParams();
  const navigate = useNavigate();
  const { sendAlert } = useContext(AlertContext);

  const [name, setName] = useState("");
  const [expireDate, setExpireDate] = useState();
  const [description, setDescription] = useState("");
  const [initialDate, setInitialDate] = useState();
  const [image, setImage] = useState();
  const [category, setCategory] = useState();
  const [images, setImages] = useState();
  const [tempImage, setTempImage] = useState();

  const submitHandler = (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("name", name);
    form.append("expireDate", expireDate);
    form.append("description", description);
    form.append("initialDate", initialDate);
    tempImage && form.append("image", tempImage);
    images && form.append("images", images);
    form.append("category", category);

    dispatch(updateAdvertAction(id, form));
  };

  const handlePayment = (e) => {
    e.preventDefault();
    if (new Date(initialDate) < new Date()) {
      sendAlert("please enter valid date", "error");
      return;
    }
    if (new Date(initialDate) - new Date(expireDate) >= 0) {
      sendAlert("please enter valid date2", "error");
      return;
    }
    submitHandler(e);
  };

  const imageChange = (e) => {
    if (!e.target.files || !e.target.files[0]) {
      return;
    }

    const reader = new FileReader();
    setTempImage(e.target.files[0]);

    reader.onload = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    dispatch(getSingleAdvert(id));
  }, [dispatch, id, navigate]);

  useEffect(() => {
    if (isUpdated) {
      sendAlert("Product created successfully", "success");
      dispatch({ type: UPDATE_ADVERT_RESET });
      navigator("/admin/ads");
    }

    if (error) {
      sendAlert(error, "error");
      dispatch({ type: CLEAR_ERRORS });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdated, dispatch, error]);

  useEffect(() => {
    if (advertisement) {
      setName(advertisement.name);
      setExpireDate(advertisement.expireDate);
      setDescription(advertisement.description);
      setInitialDate(advertisement.initialDate);
      setCategory(advertisement.category);
      setImages(advertisement.image);
    }
  }, [advertisement]);

  return (
    <div className="admin">
      <Slider />
      <section className="create-products">
        <AdsForm
          setCategory={setCategory}
          setDescription={setDescription}
          setExpireDate={setExpireDate}
          setInitialDate={setInitialDate}
          setName={setName}
          name={name}
          expireDate={expireDate}
          initialDate={initialDate}
          description={description}
          loading={loading}
          handlePayment={handlePayment}
          image={image ? image : images ? images.url : ""}
          imageChange={imageChange}
          heading="Update Advertisement"
        />
      </section>
    </div>
  );
}

export default UpdateAds;
