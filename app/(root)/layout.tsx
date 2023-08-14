import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';

import '@/app/globals.css';
import { Bottombar, Leftsidebar, Rightsidebar, Topbar } from '@/components/shared';

export const metadata = {
	title: 'Threads',
	description: 'A Next.js 13 Meta Threads Application',
};

const inter = Inter({
	subsets: ['latin'],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<ClerkProvider>
			<html lang='en'>
				<body className={`${inter.className}`}>
					<Topbar />
					<main className='flex flex-row'>
						<Leftsidebar />

						<section className='main-container'>
							<div className='w-full max-w-4xl'>{children}</div>
						</section>

						<Rightsidebar />
					</main>
					<Bottombar />
				</body>
			</html>
		</ClerkProvider>
	);
}
