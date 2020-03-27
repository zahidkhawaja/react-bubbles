import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, setModify, modify }) => {
  console.log(colors);
  const history = useHistory();
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState({
    color: "",
    code: { hex: "" }
  });

  const handleNewColor = e => {
    e.target.name === "hex" ? setNewColor({
      ...newColor, 
      code: {...newColor.code, [e.target.name]: e.target.value }}) :
    setNewColor({
      ...newColor,
      [e.target.name]: e.target.value
    });
    console.log("NEW Color", newColor);
  };

  const submitNewColor = e => {
    e.preventDefault();
    axiosWithAuth().post("/api/colors", newColor)
    .then(res => {
      console.log(res.data);
      setModify(!modify);
      setNewColor({
        color: "",
        code: { hex: "" }
      })
    })
    .catch(err => console.log(err));
  };

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
    console.log("Color to edit", colorToEdit);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth().put(`/api/colors/${colorToEdit.id}`, colorToEdit)
    .then(res => {
      console.log(res.data);
      setModify(!modify);
      setEditing(false);
    })
  }

  const deleteColor = color => {
    axiosWithAuth().delete(`/api/colors/${color.id}`)
    .then(res => {
      console.log(res.data);
      setModify(!modify);
    })
    .catch(err => console.log(err));
  };

  const logout = () => {
    localStorage.clear();
    history.push("/");
  }

  return (
    <div className="colors-wrap">
      <div className = "logout">
      <button onClick = {() => logout()}>Log Out</button>
      </div>
      <form onSubmit = {submitNewColor}>
      <legend>add color</legend>
      <label>color name:
        <input onChange = {handleNewColor} name = "color" value = {newColor.color} type = "text" placeholder = "Color name"/>
        </label>
        <label>hex code:
        <input onChange = {handleNewColor} name = "hex" type = "text" value = {newColor.code.hex} placeholder = "Hex code"/>
        </label>
        <button className = "addbutton" type = "submit">Add</button>
      </form>

      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
