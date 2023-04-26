import {SignUp} from "./components/SignUp";
import { EditItem } from "./components/EditItem";
// import { ModifyItem} from "./components/ModifyItem";
import { Routes, Route } from "react-router-dom";
import { ModifyItem } from "./components/ModifyItem";

function App() {
  return (
    <div>
      <Routes>
       <Route path="/" element={<SignUp />} />
       
        <Route path="/components/modifyItem" element={<ModifyItem />} />
         <Route path="/components/edit" element={<EditItem />} />
      </Routes>
    </div>
  );
}

export default App;
