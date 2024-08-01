'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../../public/next.svg';
import { signOut } from "next-auth/react";

const Header: React.FC<{ session: any }> = ({ session }) => {
    return (
        <header className="bg-light shadow-sm">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <Link href="/" legacyBehavior>
                        <a className="navbar-brand mx-auto">
                            <Image src={logo} alt="Logo" width={100} height={50} />
                        </a>
                    </Link>
                    <div className="ml-auto">
                        {session && (
                            <button className="btn btn-primary" onClick={() => signOut()}>
                                Logout
                            </button>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
