import InfoPage from '../components/InfoPage';
import { Lime } from '../components/UI';

export const metadata = { title: 'Events | Betamind' };

export default function EventsPage() {
    return (
        <InfoPage
            eyebrow="Events & experiences"
            title={<>Find an event. Or <Lime>host</Lime> one.</>}
            intro="Betamind is open to everyone. Discover workshops, conferences, webinars and meetups, or bring people together around something you care about."
            audience="Open to everyone"
            stepsTitle={<>How events work on <Lime>Betamind</Lime>.</>}
            steps={[
                { t: 'Create your account', d: 'Sign up for free. One account lets you attend events and host your own.' },
                { t: 'Browse or create', d: 'Explore upcoming events by category, or create your own with a title, description, date, location and cover image.' },
                { t: 'Set your tickets', d: 'Offer free or paid tickets, with as many ticket types as you need.' },
                { t: 'Publish and share', d: 'Go live and share your event link with your audience.' },
                { t: 'Manage registrations', d: 'Track who has registered from your dashboard.' },
                { t: 'Keep attendees informed', d: 'Automated email and WhatsApp reminders help people keep the promise to show up.' },
            ]}
            criteriaTitle={<>What makes a good <Lime>event</Lime>.</>}
            criteriaIntro="Anyone can host. To keep Betamind useful for everyone, every event should meet these basics."
            criteria={[
                'A clear title and an honest description of what attendees will get',
                'An accurate date, time and location (or a link for online events)',
                'A cover image that represents the event',
                'Transparent ticket pricing, with no hidden costs',
                'A real event you are able and ready to deliver',
                'Respect for attendees and for all applicable laws',
            ]}
            perksTitle={<>Why host on <Lime>Betamind</Lime>.</>}
            perks={[
                { t: 'Reach interested people', d: 'Your event is seen by people already looking for experiences like yours.' },
                { t: 'Less manual work', d: 'Ticketing, registrations and reminders in one place.' },
                { t: 'Better turnout', d: 'Automated reminders help registrations turn into attendance.' },
            ]}
            ctaTitle={<>Your next room is <Lime>waiting</Lime>.</>}
            ctaText="Attend something new or create something worth attending."
        />
    );
}