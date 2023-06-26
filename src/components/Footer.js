import React from "react";

export default function Footer(){
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} MovieSips. All rights reserved. Drink responsibly.</p>
    </footer>
  );
};