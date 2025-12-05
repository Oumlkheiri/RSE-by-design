import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'RSE by Design - Articles Environnementaux',
    description: 'Découvrez des articles environnementaux et agissez pour un avenir durable',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="fr">
            <body style={{ margin: 0, padding: 0 }}>{children}</body>
        </html>
    );
}
