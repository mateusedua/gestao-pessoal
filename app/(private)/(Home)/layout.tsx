import React from "react";




export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <title>Home</title>
            {children}
        </>
    )
}