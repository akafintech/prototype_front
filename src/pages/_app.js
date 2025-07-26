import LeftNavigationBar from "@/components/sidebar";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <div className="flex min-h-screen">
      <div className="w-80 fixed left-0 top-0 h-full z-10">
        <LeftNavigationBar />
      </div>
      <div className="flex-1 ml-80">
        <Component {...pageProps} />
      </div>
    </div>
  );
}
