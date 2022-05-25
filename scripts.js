function Dropdown_Menu() {
  let navbar = document.getElementById("Navbar");
  if (navbar.className === "navbar") navbar.className += "responsive";
  else {
    document.getElementById("Navbar").className = "navbar";
  }
  console.log(document.getElementById("Navbar").className);
}
