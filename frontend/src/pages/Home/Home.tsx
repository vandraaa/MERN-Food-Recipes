import { ToastContainer } from "react-toastify";
import Container from "../../components/container/Container";
import Navbar from "../../layout/Navbar";

export default function HomePage() {
  return (
    <div className="h-[200vh] bg-slate-200">
        <Navbar />

      <Container>
        <ToastContainer position="top-right" autoClose={3000} />
        {/* <div className="pt-20"></div> */}
      </Container>
    </div>
  );
}
