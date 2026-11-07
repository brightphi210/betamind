import InfoPage from '../components/InfoPage';
import { Lime } from '../components/UI';

export const metadata = { title: 'Become a Mentor | Betamind' };

export default function BecomeAMentorPage() {
    return (
        <InfoPage
            eyebrow="Mentorship"
            title={<>Turn your experience into <Lime>impact</Lime>.</>}
            intro="Guide people one-on-one or in groups, and earn from what you have learned."
            audience="For mentors"
            stepsTitle={<>How to become a <Lime>mentor</Lime>.</>}
            steps={[
                { t: 'Create your account', d: 'Sign up and complete your profile with your background and expertise.' },
                { t: 'Apply to mentor', d: 'Tell us about your experience, your field and who you want to help.' },
                { t: 'Get reviewed', d: 'Our team reviews every application to keep quality high.' },
                { t: 'Set up your offers', d: 'Offer one-on-one sessions, group mentorship, or both, with your own availability and pricing.' },
                { t: 'Get booked', d: 'Mentees find you and book sessions that fit your schedule.' },
                { t: 'Grow further', d: 'Once approved, you can also sell digital products and host events.' },
            ]}
            criteriaTitle={<>Who we <Lime>approve</Lime>.</>}
            criteriaIntro="Mentorship is available to approved mentors. Here is what we look for in an application."
            criteria={[
                'Real, relevant professional experience in your field',
                'A complete profile with a clear photo, bio and areas of expertise',
                'The ability to give practical, actionable guidance',
                'Reliable availability, and a commitment to show up for booked sessions',
                'A professional and respectful approach to every mentee',
                'Honest claims about your background and results',
            ]}
            perksTitle={<>What you get as a <Lime>mentor</Lime>.</>}
            perks={[
                { t: 'Earn from expertise', d: 'Set your rates for one-on-one and group sessions.' },
                { t: 'Flexible schedule', d: 'You decide when you are available to be booked.' },
                { t: 'More ways to create', d: 'Sell digital products and host events from the same profile.' },
            ]}
            ctaTitle={<>Share what you&apos;ve <Lime>learned</Lime>.</>}
            ctaText="Start your application and help someone make their next move."
        />
    );
}