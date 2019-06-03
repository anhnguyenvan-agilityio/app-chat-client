import React from "react";

const CustomInput = React.forwardRef((props, ref) => (
  <div className="form-label-group">
    <input
      ref={ref}
      type={props.type}
      id={props.id}
      className="form-control"
      placeholder={props.title}
      value={props.value}
      required
    />
    <label htmlFor={props.id}>{props.title}</label>
  </div>
));

export default CustomInput;
