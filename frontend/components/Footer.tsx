export default function Footer() {
  return (
    <footer className="bg-black text-white p-6">
      <div className="container mx-auto text-center">
        <span className="font-semibold">AllParts Ecommerce</span> &copy;{" "}
        {new Date().getFullYear()} - Desenvolvido por{" "}
        <a href="https://www.linkedin.com/in/leandro-oliveira-657432263/">
          Whofelisberto
        </a>
        <br />
      </div>
    </footer>
  );
}
