import InfoPage from '../components/InfoPage';
import { B, Lime } from '../components/UI';

export const metadata = { title: 'Become a Mentor | Betamind' };

export default function BecomeAMentorPage() {
    return (
        <InfoPage
            eyebrow="Mentorship"
            title={<>Turn your experience into <Lime>impact</Lime>.</>}
            intro={
                <>
                    Guide people <B>one-on-one</B> or in <B>groups</B>, and <B>earn</B> from what you have learned.
                    Mentorship is open to <B>approved mentors</B>.
                </>
            }
            audience="For mentors"
            points={[
                { t: 'Apply and get reviewed', d: 'Share your background and expertise. Every application is reviewed.' },
                { t: 'Set your own terms', d: 'Choose your rates, your availability and your session formats.' },
                { t: 'Grow beyond sessions', d: 'Once approved, sell digital products and host events too.' },
            ]}
        />
    );
}