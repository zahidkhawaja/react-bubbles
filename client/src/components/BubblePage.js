import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  const [modify, setModify] = useState(false);

  useEffect(() => {
    axiosWithAuth()
    .get("/api/colors")
    .then(res => {
      setColorList(res.data);
    });
  }, [modify]);

  return (
    <>
      <ColorList colors={colorList} modify = {modify} setModify = {setModify} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
