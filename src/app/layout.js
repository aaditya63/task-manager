import { Inter } from "next/font/google";
import "./globals.css";

import { ToastContainer } from 'react-toastify';     //File for importing react-tostify
import 'react-toastify/dist/ReactToastify.css';

import CustomNavbar from "@/components/CustomNavbar";
import Footer from "@/components/Footer";
import UserProvider from "@/context/userProvider";
const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <UserProvider>
          <ToastContainer />
          <div>
            <CustomNavbar />
            <div className="my-3">
              {children}
            </div>
            <Footer />
          </div>
          </UserProvider>
      </body>
    </html>
  );
}
