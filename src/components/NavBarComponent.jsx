import { useNavigate } from "react-router-dom";

const NavBarComponent = () => {
  const navigate = useNavigate();

  const goToWishlist = () => {
    navigate("/");
  };

  return (
    <nav>
      <button
        onClick={goToWishlist}
        style={{
          height: "40px",
          backgroundColor: "#463138",
          fontFamily: "Arial, Helvetica, sans-serif",
          borderRadius: '8px',
        }}
      >
        Favourites List
      </button>
    </nav>
  );
};

export default NavBarComponent;
