import InfoPage from '../components/InfoPage';
import { B, Lime } from '../components/UI';

export const metadata = { title: 'Digital Products | Betamind' };

export default function DigitalProductsPage() {
    return (
        <InfoPage
            eyebrow="The knowledge marketplace"
            title={<>Package what you know. <Lime>Sell</Lime> it.</>}
            intro={
                <>
                    Turn your experience into <B>e-books</B>, <B>workbooks</B>, <B>playbooks</B> and <B>guides</B> that
                    people can learn from and come back to.
                </>
            }
            audience="For approved mentors"
            points={[
                { t: 'Create once', d: 'Upload your file, add a cover and a clear description.' },
                { t: 'Price it in naira', d: 'Decide what your work is worth and publish to the marketplace.' },
                { t: 'Earn and track', d: 'Follow your sales and earnings from your dashboard.' },
            ]}
        />
    );
}