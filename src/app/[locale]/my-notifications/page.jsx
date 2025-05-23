'use client';
import BreadCrumbs from '@/atoms/BreadCrumbs';
import { useEffect, useRef, useState } from 'react';

//! validation

import { AXIOS } from '@/config/axios';
import { useTranslations } from 'next-intl';

import Image from 'next/image';
import notFound from '@/assets/notFound.png';
import { Link } from '@/navigation';
import { GetUser } from '@/utils/GetUser';

const page = () => {
    const t = useTranslations('my-notifications');
    const lang = useTranslations('');
    const user = GetUser();


    const [notification, setnotification] = useState([]);
    const [loading, setloading] = useState(true);

    useEffect(
        _ => {
            if (user) 
            AXIOS.get('user/notfication/mylist', { headers: { Authorization: `Bearer ${user?.token}`, 'Accept-Language': lang('lang') } })
                .then(res => {
                    setnotification(res.data?.data);
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(() => {
                    setloading(false);
                });
        },
        [user  ],
    );



    return (
        <div className='people my-notifications'>
            <BreadCrumbs main={t.raw('breadCrumbs')[0]} slash='/' second={t.raw('breadCrumbs')[1]} />
            <div className='container'>
                {loading ? (
                    // 🔄 Skeleton while loading
                    <div className='skeleton-container'>
                        {[...Array(3)].map((_, i) => (
                            <div className='skeleton-box' key={i}>
                                <div className='skeleton-header'>
                                    <div className='skeleton-title'></div>
                                    <div className='skeleton-subtitle'></div>
                                </div>
                                <div className='skeleton-icon'></div>
                            </div>
                        ))}
                    </div>
                ) : notification?.length >= 1 ? (
                    notification.map((e, i) => (
                        <div key={i} className='bg-white mb-4 border-b pb-[10px] border-b-gray-200   transition'>
                            <div className='flex flex-col space-y-1'>
                                <h3 className='text-lg font-semibold text-primary '>{e.title}</h3>
                                <p className='text-sm text-gray-600'>{e.body}</p>
                            </div>
                            <div className='text-xs text-gray-400 mt-3'>
                                {new Date(e.created_at).toLocaleString('en-GB', {
                                    dateStyle: 'medium',
                                    timeStyle: 'short',
                                })}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='not-found'>
                        <Image className='w-[300px] h-[300px] flex-none object-contain ' src={notFound} alt='not found' width={200} height={200} />
                        <div className='p'>{t.raw('error')[0]}</div>
                        <Link className='btn1 !w-fit !px-[40px] !mx-auto ' href='/'>
                            {t.raw('error')[1]}
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default page;
