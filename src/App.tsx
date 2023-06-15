import WebRTCComponent from "./components/WebRTC";
import PersonListComponent from "./components/PersonList"
import AlertComponent from "./components/Alert";
import "./css/App.css";

function App() {
  return (
    <div className="app">
      <table>
        <td><WebRTCComponent/></td>
        <td>
          <tr><PersonListComponent/></tr>
          <tr><AlertComponent/></tr>
        </td>
      </table>
    </div>
  );
}

export default App; 