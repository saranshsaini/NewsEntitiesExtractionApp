import "./App.css";
import Header from "./components/Header";
import NewsDisplay from "./components/NewsDisplay";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="App">
        <Header />
        <NewsDisplay />
      </div>
    </LocalizationProvider>
  );
}

export default App;
