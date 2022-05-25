function Dropdown_Menu() {
  // change navbars class name every time menu button is clicked - hide and show menu in mobile version
  let navbar = document.getElementById("Navbar");
  if (navbar.className === "navbar") navbar.className += "responsive";
  else {
    document.getElementById("Navbar").className = "navbar";
  }
  console.log(document.getElementById("Navbar").className);
}
