import { BrowserRouter, Routes, Route } from "react-router-dom";
//import 문에서 'Ide'를 가져오고 있기 때문에, 해당 파일에서는 'IdeMain'으로 수정
import IdeMain from './pages/ide/Ide';
import Main from "./pages/main/Main";
import Join from "./pages/join/Join";
import FindInfo from "./pages/findinfo/FindInfo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/join" element={<Join />}></Route>
        {/* IdeMain으로 수정 */}
        <Route path="/ide" element={<IdeMain />}></Route>
        <Route path="/findinfo" element={<FindInfo />}></Route>
      </Routes>
    </BrowserRouter>


  );
}

export default App;
