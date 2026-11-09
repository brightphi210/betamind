import InfoPage from '../components/InfoPage';
import { B, Lime } from '../components/UI';

export const metadata = { title: 'Events | Betamind' };

export default function EventsPage() {
    return (
        <InfoPage
            eyebrow="Events & experiences"
            title={<>Find an event. Or <Lime>host</Lime> one.</>}
            intro={
                <>
                    Betamind is <B>open to everyone</B>. Discover <B>workshops</B>, <B>conferences</B>,{' '}
                    <B>webinars</B> and <B>meetups</B>, or bring people together around something you care about.
                </>
            }
            audience="Open to everyone"
            points={[
                { t: 'Browse or create', d: 'Explore events by category, or publish your own in minutes.' },
                { t: 'Free or paid tickets', d: 'Offer as many ticket types as you need and manage registrations.' },
                { t: 'Better turnout', d: 'Automated email and WhatsApp reminders keep attendees on track.' },
            ]}
        />
    );
}