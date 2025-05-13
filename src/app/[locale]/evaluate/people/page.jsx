'use client';
import BreadCrumbs from '@/atoms/BreadCrumbs';
import Input, { Phone } from '@/atoms/Input';
import Selection, { Selection1, Selection2, SelectionSearch } from '@/atoms/Select';
import Radio, { Radio2 } from '@/atoms/Radio';
import React, { useEffect, useState } from 'react';

//! validation
import { peopleSchema } from '@/validation/peopleSchema';
import Checkbox from '@/atoms/Checkbox';
import { CircleChevronUp } from 'lucide-react';
import { useTranslations } from 'next-intl';
import ButtonLoad from '@/atoms/ButtonLoad';
import { usePostPeople } from '@/utils/usePost';
import { GetUser } from '@/utils/GetUser';
import useFetch from '@/utils/useFetch';
import { axiosFetch } from '@/utils/Evaluate_reqs';
import { AXIOS } from '@/config/axios';
import Checkout from '@/components/Checkout';
import Car from '@/components/evaluate/Car';
import { Controller } from 'react-hook-form';
import Alert2 from '@/atoms/Alert2';
import { Link } from '@/navigation';

const page = () => {
    const [brandName, setbrandName] = useState();
    const [modelName, setmodelName] = useState();
    const t = useTranslations('people');
    const t_ = useTranslations('');
    const tAlt = useTranslations('');
    const lang = useTranslations();

    //! Submit handler
    const user = GetUser();

    const DATA = data => ({
        type: 1,
        user_id: user?.user?.id,
        country: data.country,
        city: data.city,
        email: data.email,
        name: data.name,
        phone: data.phone,
        purpose: data.purpose,

        model_id: data.model,
        new_model: data.new_model,
        brand_id: data.brand,
        new_model: data.new_model,

        damage_pieces: Object.keys(parts).filter(e => parts[e].color != 'transparent').length || 0,
        damage_places: partsFilter || 0,

        made_year: data.date,
        car_case: data.status,

        current_price: data.price,
        kilos: data.distance,

        car_desc: Description,
        motor: Number(data.motor),
        gearbox: Number(data.gearbox),
    });
    const [register, Submit, errors, isLoading, DataCheckout, control, getValues, watch, setValue, clearErrors, setError, setShow, show] = usePostPeople(peopleSchema, '/user/order/create', 'people', DATA, user?.token);

    const [disabled, setdisabled] = useState(false);
    useEffect(() => {
        if (user) {
            setValue('email', user?.user?.email);
            setdisabled(true);
        }
    }, [user]);

    //! manual

    //! region
    const [load, country] = useFetch('/regions', '', 'without token');

    //! cities
    const [cities, setCities] = useState();
    const cityWatch = watch('country');
    useEffect(() => {
        let filter = country.filter(e => e.id == getValues('country'));
        setCities(filter[0]?.cities);
    }, [cityWatch]);

    //! brands
    const brand = axiosFetch('website/brands', 2);
    const watchedBrand = watch('brand');
    const [model, setModel] = useState();
    const [manual, setManual] = useState(0);

    const WatchModel = watch('model');
    useEffect(() => {
        if (WatchModel) {
            const manual = model?.filter(e => e.id == WatchModel)[0]?.manual;
            setManual(manual);
        } else {
            setManual(0);
        }
    }, [WatchModel]);

    useEffect(() => {
        if (getValues('brand') && getValues('brand') !== 0) {
            AXIOS.get(`/website/models/${getValues('brand')}`, { headers: { 'Accept-Language': lang('lang') } }).then(res => {
                setModel(res.data.data);
            });
        }
    }, [watchedBrand]);

    //! car description
    let [, carDescription] = useFetch('/website/carDesc', 'dd');
    const [Description, setDescription] = useState([]);

    //! colapse info-bank
    const [showBank, setShowBank] = useState(false);
    const [showCar, setShowCar] = useState(false);

    //! years
    const years = [];
    const currentYear = new Date().getFullYear();
    for (let i = 0; i < 13; i++) years.push({ id: currentYear - i, title: currentYear - i });

    //! car

    const [parts, setParts] = useState({});
    const [partsFilter, setPartsFilter] = useState({});

    useEffect(
        _ => {
            let filter = Object.keys(parts).map(e => {
                if (parts[e].color != 'transparent') {
                    return parts[e]?.id;
                }
            });
            setPartsFilter(filter.filter(e => e !== undefined));
        },
        [parts],
    );

    return (
        <>
            <Alert2 />
            <div className={`people ${DataCheckout ? 'hidden' : 'block'} `}>
                <BreadCrumbs main={t.raw('breadCrumbs')[0]} slash='/' second={t.raw('breadCrumbs')[1]} />

                <div className={`container `}>
                    <div className={`info-bank ${showBank ? 'collapse1' : ''} `}>
                        <div className='info-head' onClick={_ => setShowBank(!showBank)}>
                            <CircleChevronUp className='up' /> <div className='h3-head text-[24px] font-[800] max-md:text-[18px] max-md:font-[500]'> {t.raw('depart')[0]} </div>
                        </div>

                        <form className='inputs'>
                            <Input reg={register('name')} err={errors.name} id='name' label={t.raw('boxes')[0].label} place={t.raw('boxes')[0].place} type='text' />
                            <Input disabled={disabled} reg={register('email')} err={errors.email} id='email' label={t.raw('boxes')[1].label} place={t.raw('boxes')[1].place} type='email' />
                            <Phone reg={register('phone')} err={errors.phone} id='phone' label={t.raw('boxes')[2].label} place={t.raw('boxes')[2].place} type='phone' />

                            {/* <Controller name='country' control={control} render={({ field: { onChange, onBlur, value } }) => <Selection2 show_search={true} onBlur={onBlur} onChange={onChange} value={value} err={errors.country} id='country' label={t.raw('boxes')[3].label} place={t.raw('boxes')[3].place} lists={country} />} />
                            <Controller name='city' control={control} render={({ field: { onChange, onBlur, value } }) => <Selection2 show_search={true} onBlur={onBlur} onChange={onChange} value={value} err={errors.city} id='city' label={t.raw('boxes')[4].label} place={t.raw('boxes')[4].place} lists={cities} />} /> */}
                            <Selection1 setValueHook={setValue} show_search={true} clearErrors={clearErrors} type='country' err={errors.country} id='country' label={t.raw('boxes')[3].label} place={t_('selectRegion')} lists={country} />
                            <Selection1 setValueHook={setValue} show_search={true} clearErrors={clearErrors} type='city' err={errors.city} id='city' label={t.raw('boxes')[4].label} place={t.raw('boxes')[4].place} lists={cities} />

                            <Radio reg={register('purpose')} err={errors.purpose} id='purpose' label={t.raw('boxes')[5].label} values={t.raw('boxes')[5]?.choose} />
                        </form>
                    </div>
                    <div className='divider' />
                    <div className={`info-car  `}>
                        <div className='info-head' onClick={_ => setShowCar(!showCar)}>
                            <CircleChevronUp style={{ rotate: showCar ? '-180deg' : '0deg' }} className='up' /> <div className='h3-head text-[24px] font-[800] max-md:text-[18px] max-md:font-[500] '> {t.raw('depart')[1]} </div>
                        </div>
                        <form action='' className={`inputs ${showCar ? 'collapse2' : ''}  `}>
                            <SelectionSearch setName={setbrandName} type='brand' send={false} setValueHook={setValue} clearErrors={clearErrors} err={errors.brand} id='brand' label={t.raw('boxes2')[0].label} place={t.raw('boxes2')[0].place} lists={brand} />
                            <SelectionSearch setName={setmodelName} type='model' send={true} setValueHook={setValue} clearErrors={clearErrors} err={errors.model} id='model' label={t.raw('boxes2')[1].label} place={t.raw('boxes2')[1].place} lists={model} />

                            <Controller name='date' control={control} render={({ field: { onChange, onBlur, value } }) => <Selection2 onBlur={onBlur} onChange={onChange} value={value} err={errors.date} id='date' label={t.raw('boxes2')[2].label} place={t.raw('boxes2')[2].place} lists={years} />} />

                            <Controller name='status' control={control} render={({ field: { onChange, onBlur, value } }) => <Selection2 onBlur={onBlur} onChange={onChange} value={value} err={errors.status} id='status' label={t.raw('boxes2')[3].label} place={t.raw('boxes2')[3].place} lists={t.raw('boxes2')[3].choose} />} />

                            <Controller name='motor' control={control} render={({ field: { onChange, onBlur, value } }) => <Selection2 onBlur={onBlur} onChange={onChange} value={value} err={errors.motor} id='motor' label={t.raw('boxes2')[4].label} place={t.raw('boxes2')[4].place} lists={t.raw('boxes2')[4].choose} />} />

                            <Controller name='gearbox' control={control} render={({ field: { onChange, onBlur, value } }) => <Selection2 onBlur={onBlur} onChange={onChange} value={value} err={errors.gearbox} id='gearbox' label={t.raw('boxes2')[5].label} place={t.raw('boxes2')[5].place} lists={t.raw('boxes2')[5].choose} />} />

                            <Selection reg={register('distance')} err={errors.distance} id='distance' label={t.raw('boxes2')[6].label} place={t.raw('boxes2')[6].place} lists={t.raw('distance')} DM='KM' />
                            <Input reg={register('price')} err={errors.price} id='price' label={t.raw('boxes2')[7].label} place={t.raw('boxes2')[7].place} type='number' />
                            <Radio2 setShow={setShow} id='spray' label={t.raw('boxes2')[8].label} values={t.raw('boxes2')[8].choose} classn='row' />
                        </form>
                        <div className='err'> {errors.damage_pieces?.message} </div>
                        {show == 'yes' && <Car err={errors.damage_pieces} classname={showCar ? 'hidden' : 'block'} parts={parts} setParts={setParts} />}
                    </div>
                    <div className={`info-car-details  ${showCar ? 'collapse2' : ''}  `}>
                        <label style={{ marginBottom: '30px' }}>
                            {t.raw('depart')[2]} <span>*</span>
                        </label>
                        <form className='checks-boxes'>{carDescription.length >= 1 && carDescription.map((e, i) => <Checkbox setDescription={setDescription} key={i} title={e.title} id={e.id} />)}</form>
                    </div>
                    <div className={`rights  ${showCar ? 'collapse2' : ''} `}>
                        <label htmlFor='1'>
                            {t.raw('rights')[0]} <span>*</span> <b className='err'></b>
                        </label>
                        <div className='group-rights custom-circle'>
                            <input {...register('rights')} value={true} type='radio' name='rights' id='rights' />
                            <label className='text-black flex items-center flex-wrap text-[18px] gap-[5px] ' htmlFor='rights'>
                                <div className=''> {t.raw('rights')[1]} </div>
                                <div className=''> {tAlt('the')} </div>
                                <Link className='hover:opacity-80 duration-300 underline text-[#3e64f4]' href={'/terms'}>
                                    {' '}
                                    {tAlt('terms2')}{' '}
                                </Link>
                                <div className=''> {tAlt('and')} </div>
                                <Link className='hover:opacity-80 duration-300 underline text-[#3e64f4]' href={'/terms'}>
                                    {' '}
                                    {tAlt('conditions')}{' '}
                                </Link>
                                {/* <Link className=' hover:opacity-80 duration-300 underline text-[#3e64f4] ' href={"/terms"} > {t("termsConditions")} </Link> */}
                            </label>
                        </div>
                        {errors?.rights && <div className='err'> {tAlt(errors?.rights?.message)} </div>}
                    </div>
                    <ButtonLoad onClick={Submit} isLoading={isLoading} value1={t.raw('button')[0]} value2={t.raw('button')[1]} />
                </div>
            </div>

            {DataCheckout && <Checkout manual={manual} brandName={brandName} modelName={modelName} data={DataCheckout} />}
        </>
    );
};

export default page;
