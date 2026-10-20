export default function Icon({ name = 'arrow', size = 20, ...props }) {
  const paths = {
    arrow: 'M7 17 17 7M7 7h10v10',
    sort: 'm8 3-4 4h8M8 3v18m8 0 4-4h-8m4 4V3',
    link: 'M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-2 2M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l2-2',
    sun: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1 1m12 12 1 1M5 19l1-1M18 6l1-1',
    cloud: 'M7 18h11a4 4 0 0 0 0-8 6 6 0 0 0-12-1 4.5 4.5 0 0 0 1 9',
    search: 'm21 21-5-5M10 3a7 7 0 1 0 0 14 7 7 0 0 0 0-14',
    copy: 'M9 9h12v12H9zM15 5V3H3v12h2',
    check: 'm5 12 4 4L19 6',
    download: 'M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5',
    upload: 'M12 16V4m-5 5 5-5 5 5M4 17v4h16v-4',
    plus: 'M12 4v16M4 12h16',
    trash: 'M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7m4-7v7',
    pin: 'M12 22s8-8 8-14A8 8 0 0 0 4 8c0 6 8 14 8 14ZM12 5a3 3 0 1 0 0 6 3 3 0 0 0 0-6',
    star: 'm12 3 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1Z',
    wallet: 'M3 6h16v15H3V6Zm0 0 13-4v4m1 6h5v5h-5z',
    close: 'm6 6 12 12M6 18 18 6',
    refresh: 'M20 7V3l-4 4M4 17v4l4-4M20 7a8 8 0 0 0-14-2M4 17a8 8 0 0 0 14 2',
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d={paths[name] || paths.arrow} />
    </svg>
  );
}
