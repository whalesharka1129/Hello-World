import Link from "next/link";

const Navbar = () => {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/register">Register</Link>
      <Link href="/vote">Vote</Link>
      <Link href="/transfer">Transfer Tokens</Link>
      <Link href="/candidates">Candidates</Link>
      <Link href="/voters">Voters</Link>
    </nav>
  );
};

export default Navbar;
