import InfoPage from '../components/InfoPage';
import { Lime } from '../components/UI';

export const metadata = { title: 'Digital Products | Betamind' };

export default function DigitalProductsPage() {
    return (
        <InfoPage
            eyebrow="The knowledge marketplace"
            title={<>Package what you know. <Lime>Sell</Lime> it.</>}
            intro="Turn your experience into e-books, workbooks, playbooks and guides that people can learn from and come back to."
            audience="For approved mentors"
            stepsTitle={<>From idea to <Lime>income</Lime>.</>}
            steps={[
                { t: 'Become an approved mentor', d: 'Digital product selling is available to approved mentors. Apply first if you have not already.' },
                { t: 'Choose your format', d: 'E-book, workbook, playbook, guide or another practical resource.' },
                { t: 'Upload your product', d: 'Add your file, a cover, a title and a clear description.' },
                { t: 'Set your price', d: 'Decide what your work is worth and price it in naira.' },
                { t: 'Publish', d: 'Your product goes live in the marketplace for buyers to discover.' },
                { t: 'Earn and track', d: 'Follow sales and earnings from your dashboard.' },
            ]}
            criteriaTitle={<>What we look for in a <Lime>product</Lime>.</>}
            criteriaIntro="Quality keeps the marketplace worth browsing. Before you publish, make sure your product meets these points."
            criteria={[
                'You are an approved Betamind mentor',
                'The work is original, or you own the rights to sell it',
                'It is practical and helps the buyer do or understand something',
                'A clear title, cover and description that set honest expectations',
                'A clean, readable file (such as PDF) with no broken or missing pages',
                'Fair pricing that reflects the value of the content',
            ]}
            perksTitle={<>Why sell on <Lime>Betamind</Lime>.</>}
            perks={[
                { t: 'Earn from your expertise', d: 'Create once and keep earning as people discover your work.' },
                { t: 'A ready audience', d: 'Reach people already looking to learn.' },
                { t: 'Build your authority', d: 'Your products sit beside your mentor profile and strengthen it.' },
            ]}
            ctaTitle={<>What you know can take <Lime>someone</Lime> further.</>}
            ctaText="Get started and turn your knowledge into something people can use."
            secondary={{ label: 'Become a mentor first', href: '/become-a-mentor' }}
        />
    );
}