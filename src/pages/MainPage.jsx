import { useEffect, useState } from "react";
import "../style.scss";
import { useDispatch, useSelector } from "react-redux";
import { getLanguages, translateText } from "../store/actions/translateActions";
import Select from "react-select";
import { clearAnswer } from "../store/slices/translateSlice";
// import { clearAnswer } from "../store/slices/TranslateSlice";

// const options = [
//   { value: "chocolate", label: "Chocolate" },
//   { value: "strawberry", label: "Strawberry" },
//   { value: "vanilla", label: "Vanilla" },
// ];

const MainPage = () => {
  const dispatch = useDispatch();

  const state = useSelector((store) => store.translateSlice);
  //*secilen dillerin state'i
  const [sourceLang, setSourceLang] = useState({
    value: "en",
    label: "English",
  });
  const [targetLang, setTargetLang] = useState({
    value: "de",
    label: "German",
  });

  // ! statelwein degrlerini degiştirir
  const handleChange = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
  };

  //dillerin verisini ceker
  const [text, setText] = useState("");

  useEffect(() => {
    dispatch(getLanguages());
  }, []);
  // console.log(targetLang);
  useEffect(() => {
    //   //text alanını temizle
    setText(" ");
    dispatch(clearAnswer());
  }, []);

  return (
    <div id="main-page">
      <div className="container">
        <h1>Translate +</h1>
        {/* top part */}
        <div className="upper">
          <Select
            isLoading={state.isLoading}
            options={state.languages}
            value={sourceLang}
            onChange={setSourceLang}
            className="react-select"
          />

          <button onClick={handleChange}>Switch</button>
          <Select
            isLoading={state.isLoading}
            options={state.languages}
            value={targetLang}
            onChange={setTargetLang}
            className="react-select"
          />
        </div>
        {/* bottom part */}
        <div className="bottom">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <textarea disabled value={state.answer}></textarea>
        </div>
        <button
          onClick={() =>
            dispatch(translateText({ sourceLang, targetLang, text }))
          }
          id="translate"
        >
          Translate
        </button>
      </div>
    </div>
  );
};

export default MainPage;
