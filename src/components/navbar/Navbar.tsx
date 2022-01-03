import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <Nav variant="pills" defaultActiveKey="/" className="flex-column">
            <Nav.Item>
                <Nav.Link as={Link} to="/">Dashboard</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/commands">Commands</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/overlay">Overlay</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/widgets">Widgets</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/settings">Settings</Nav.Link>
            </Nav.Item>
        </Nav>
    );
}

export default Navbar;