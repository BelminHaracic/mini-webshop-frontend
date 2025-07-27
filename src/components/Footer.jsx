export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-12">
      <div className="container mx-auto text-center">
        &copy; {new Date().getFullYear()} Mini Webshop. Sva prava zadržana.
      </div>
    </footer>
  );
}
