import { Link } from "react-router";
import axios from "axios";
import { useState } from "react";

const Import = () => {
  return (
    <div>
      <div>
        <div>Buying Request</div>
        <div>Add request free</div>
      </div>
      s
      <div>
        {importItems.map((importItem) => {
          return (
            <div>
              {categories.map((category) => {
                return <div>{category.name}</div>;
              })}
            </div>
          );
          <div></div>;
        })}
      </div>
    </div>
  );
};

export default Import;
