import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  let navigate = useNavigate();
  function getMovies(e) {
    e.preventDefault(); // Prevents page reload
    if (!search) return; // Prevents fetching empty search
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=5405f852812293f5486008e0ac489d19&query=${search}`
    )
      .then((res) => res.json())
      .then((data) => setMovies(data.results))
      .catch((error) => console.error("Error fetching movies:", error));
  }

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=5405f852812293f5486008e0ac489d19"
    )
      .then((res) => res.json())
      .then((data) => setMovies(data.results))
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  return (
    <div>
      {/* Navigation Bar */}
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
          {/* Search Bar */}
          <form onSubmit={getMovies} className="d-flex">
            <input
              type="text"
              placeholder="Search for a movie..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-control me-2"
            />
            <Button type="submit" variant="primary">
              Search
            </Button>
          </form>
        </Container>
      </Navbar>

      {/* Movie List */}
      <Container className="mt-4">
        <h2 className="text-center">
          {search ? `Search Results for "${search}"` : "Trending Movies"}
        </h2>
        <div className="d-flex flex-wrap justify-content-center">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <Card key={movie.id} style={{ width: "18rem", margin: "10px" }}>
                <Card.Img
                  variant="top"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <Card.Text>{movie.overview}</Card.Text>
                  <Button variant="primary" onClick={()=>navigate("/movie",{state:movie})}>Know More</Button>
                </Card.Body>
              </Card>
            ))
          ) : (
            <p className="text-center">No movies found.</p>
          )}
        </div>
      </Container>
    </div>
  );
};
export default Home;
