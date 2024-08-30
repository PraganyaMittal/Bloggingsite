'use client'
import Footer from "@/components/footer";
import NavigationBar from "@/components/navigation";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) { return (
    <div>
        <NavigationBar/>
        {children}
        <Footer/>
    </div>
  );
}
