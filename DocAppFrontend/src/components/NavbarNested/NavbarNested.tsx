import { Group, Code, ScrollArea, rem } from '@mantine/core';
import {
  IconNotes,
  IconCalendarStats,
  IconGauge,
  IconPresentationAnalytics,
  IconFileAnalytics,
  IconAdjustments,
  IconLock,
} from '@tabler/icons-react';
import { UserButton } from '../UserButton/UserButton';
import { LinksGroup } from '../NavbarLinksGroup/NavbarLinksGroup';
import { Logo } from './Logo';
import classes from './NavbarNested.module.css';

const mockdata = [
  { label: 'Medical Report', icon: IconGauge, link: '/' },
  {
    label: 'Report',
    icon: IconNotes,
    initiallyOpened: true,
    links: [
      { label: 'Add Report', link: '/add-report' },
      { label: 'patient dashboard', link: '/patient-dashboard' },
      // { label: 'Outlook', link: '/' },
      // { label: 'Real time', link: '/' },
    ],
  },
  // {
  //   label: 'Releases',
  //   icon: IconCalendarStats,
  //   links: [
  //     { label: 'Upcoming releases', link: '/' },
  //     { label: 'Previous releases', link: '/' },
  //     { label: 'Releases schedule', link: '/' },
  //   ],
  // },
  { label: 'Disease Prediction', icon: IconPresentationAnalytics, link:'/disease_predict' },
  { label: 'Live Sensor Data', icon: IconFileAnalytics, link: '/dataLive'},
  { label: 'Settings', icon: IconAdjustments, link:'/theme' },
  // {
  //   label: 'Security',
  //   icon: IconLock,
  //   links: [
  //     { label: 'Enable 2FA', link: '/' },
  //     { label: 'Change password', link: '/' },
  //     { label: 'Recovery codes', link: '/' },
  //   ],
  // },
];

export function NavbarNested() {
  const links = mockdata.map((item) => <LinksGroup {...item} key={item.label} />);

  return (
    <nav className={classes.navbar}>
      <div className={classes.header}>
        MediTrack
      </div>

      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>

      <div className={classes.footer}>
        <UserButton />
      </div>
    </nav>
  );
}
