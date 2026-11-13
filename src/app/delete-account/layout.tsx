import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
    title: 'Account & Data Deletion Request | DRS Deals',
    description: 'Self-service account and personal data deletion request portal for users of the DRS Deals Android App and website, in compliance with Google Play Developer Policy and DPDP Act.',
    alternates: {
        canonical: `${siteConfig.url}/delete-account`,
    },
    robots: {
        index: false,
        follow: true,
    },
};

export default function DeleteAccountLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
