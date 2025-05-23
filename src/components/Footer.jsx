import React from 'react';
import Logo from '../assets/logo.png';
import Image from 'next/image';
import { Link } from '@/navigation';

import In from '../assets/In.png';
import { useLocale, useTranslations } from 'next-intl';
import useFetch from '@/utils/useFetch';

const Footer = () => {
    const t = useTranslations('footer');
    const [load, data] = useFetch('website/content/socials', 'd');
    const locale = useLocale()

    const [loading, dataSetting] = useFetch('/website/settings', 'token');

    const Hrefs = [
        {
            value: t.raw('h3')[0],
            links: [
                { path: '/', name: t.raw('names')[0] },
                { path: '/numbers', name: t.raw('names')[1] },
                { path: '/ads', name: t.raw('names')[2] },
                { path: '/offers', name: t.raw('names')[3] },
                { path: '/news', name: t.raw('names')[4] },
                { path: '/Faqs', name: t.raw('names')[5] },
            ],
        },

        {
            value: t.raw('h3')[1],
            links: [
                { path: '/evaluate/people', name: t.raw('names')[6] },
                { path: '/evaluate/banks', name: t.raw('names')[7] },
                { path: '/evaluate/companies', name: t.raw('names')[8] },
                { path: '/', name: t.raw('names')[9] },
            ],
        },

        {
            value: t.raw('h3')[2],
            links: [
                { path: '/about-us', name: t.raw('names')[14] },
                { path: '/complains', name: t.raw('names')[10] },
                { path: '/rate-us', name: t.raw('names')[11] },
                { path: '/contact-us', name: t.raw('names')[12] },
                { path: '/my-notifications', name: t.raw('names')[13] },
            ],
        },
    ];

    return (
        <footer>
            <div className='container'>
                <ul>
                    <div className='logo'>
                        <Image src={Logo} alt='Logo' />
                        <span> {t('logo')} </span>
                    </div>
                    <li className='bold bold-2'> {t('h1')}</li>
                    <li className='max-md:text-center'> {t('h2')} </li>
                    <Image src={In} alt='exists in App store & Google play' />
                </ul>

                {Hrefs.map((href, i) => (
                    <ul key={i}>
                        <li className='bold'> {href.value} </li>
                        {href.links.map((link, idx) => (
                            <ul key={idx}>
                                <li>
                                    {' '}
                                    <Link className='hover:rtl:translate-x-[-10px] hover:ltr:translate-x-[10px] font-[400]   ' href={link.path}>
                                        {' '}
                                        {link.name}{' '}
                                    </Link>{' '}
                                </li>
                            </ul>
                        ))}
                    </ul>
                ))}

                <ul className=' flex flex-col gap-[10px] '>
                    <li className='bold'> {t.raw('h3')[3]} </li>
                    {data.map((e, i) => (
                        <a key={i} className=' hover:opacity-70 hover:scale-[.9] origin-center duration-300 w-[33px] h-[33px]' href={e.link?.startsWith('ww') ? 'https://' + e.link : e.link} target='_blank'>
                            <Image className=' w-[33px] h-[33px] object-contain ' width={33} height={33} alt='' src={`/social/${e.social}.png`} />{' '}
                        </a>
                    ))}
                </ul>
            </div>

            <div className='  container mt-[40px] max-sm:!text-center flex  max-sm:!items-center max-sm:!gap-[10px] max-sm:!flex-col items-center !justify-between gap-[30px] '>
                {locale == "ar" ? dataSetting?.copyRightAr :  dataSetting?.copyRightEn}
                <ul className='flex !flex-row gap-[10px] items-center justify-center flex-wrap '>
                    <li>
                        {' '}
                        <Link className='underline font-[500] text-nowrap' href='/terms'>
                            {' '}
                            {t.raw('names')[15]}{' '}
                        </Link>{' '}
                    </li>
                    <li>
                        {' '}
                        <Link className='underline font-[500] ' href='/privacy'>
                            {' '}
                            {t.raw('names')[16]}{' '}
                        </Link>{' '}
                    </li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
