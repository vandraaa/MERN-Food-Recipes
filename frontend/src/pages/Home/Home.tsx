import Container from "../../components/container/Container";
import Navbar from "../../layout/Navbar";

export default function HomePage() {
  return (
    <div className="h-[200vh] bg-slate-100">
        <Navbar />

      <Container>
        {/* <div className="pt-20"></div> */}
      </Container>
    </div>
  );
}
