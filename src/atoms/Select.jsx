'use client';

import { ChevronDown, SendHorizontal, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Selection = ({ reg, err, id, label, lists, place }) => {
    const t = useTranslations();

    return (
        <div className='select'>
            <label htmlFor={id}>
                {label} <span>*</span>
            </label>
            <div className='inner-select'>
                <select {...reg} className=' !font-[500] !text-[#909090] '>
                    {place && <option value=''> {place} </option>}

                    {lists &&
                        lists?.map((e, i) => (
                            <option key={i} value={e?.id || e}>
                                {e?.title || e?.name || e}
                            </option>
                        ))}
                </select>

                <ChevronDown />
            </div>
            <span className='err'> {err?.message && t(err?.message)} </span>
        </div>
    );
};

export default Selection;

export const Selection1 = ({ setValueHook, clearErrors, err, id, label, lists, place, type }) => {
    const t = useTranslations();
    const [search, setSearch] = useState('');
    const [Value, setValue] = useState(place);
    const [Show, setShow] = useState(false);
    const [Data, setData] = useState(lists);
    const selectRef = useRef(null);


    // Filter data based on search
    useEffect(() => {
        if (search) {
            const filteredData = lists?.filter(item => {
                if(typeof item.name == "string"){
                    return item.name.toLowerCase().includes(search.toLowerCase())
                }
            }
            );
        setData(filteredData);
            
        } else {
            setData(lists);
        }
    }, [search, lists]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = event => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setShow(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Handle selection of an item
    const handleValue = e => {
        setShow(false);
        setValue(e.title || e.title_en || e.name || e.name_en);
        setValueHook(type , e?.id )
        clearErrors(type);
     };

    const handleClearSearch = () => {
        setSearch('');
        setData(lists);
    };

    return (
        <div className='w-full'>
            <label htmlFor={id}>
                {label} <span>*</span>
            </label>

            <div className='w-full h-[50px] relative' ref={selectRef}>
                <div onClick={() => setShow(!Show)} className='w-full h-[50px] border-[1px] border-[#a7a7a7] rounded-[8px] flex items-center justify-between p-[5px] px-[10px] cursor-pointer hover:bg-[#fcfcfc] duration-300'>
                    <h1 className={`text-[18px] opacity-60  ${Value == place ? "font-[400]" : "font-[500] !opacity-80 "} `}>{Value}</h1>
                    <ChevronDown className='stroke-[#909090]' />
                </div>

                <div
                    className='border-[#a7a7a7] border-[1px] rounded-[10px] custom-select duration-300 absolute top-[102%] bg-white z-[100] max-h-[400px] w-full overflow-auto shadow-lg'
                    style={{
                        clipPath: Show ? 'polygon(-130% -130%, 130% 0, 130% 130%, 0 130%)' : 'polygon(0 0, 100% 0, 100% 0, 0 0)',
                    }}>
                    <div className='flex items-center justify-center sticky top-0 bg-white z-[200]'>
                        <input type='input' placeholder={t('searchHere')} className='my-[10px] w-[calc(100%-20px)] px-[20px] outline-none h-[50px] border-[1px] !border-[#a7a7a7] rounded-[0px]' onChange={e => setSearch(e.target.value)} value={search} />
                        {search && <X className='cursor-pointer absolute rtl:left-[20px] ltr:right-[20px] w-[20px] stroke-[#909090]' onClick={handleClearSearch} />}
                    </div>

                    {Data &&
                        Data.map((e, i) => (
                            <div onClick={() => handleValue(e)} className='text-[#111] h-[35px] leading-[35px] px-[10px] hover:bg-[#1967d2] hover:text-white duration-150 cursor-pointer' key={i} value={e?.id}>
                                {e?.title || e?.title_en || e?.name_en || e?.name}
                            </div>
                        ))}
                </div>
            </div>

            <span className='err'>{err?.message && t(err?.message)}</span>
        </div>
    );
};


export const Selection2 = ({ onChange, onBlur, value, err, id, label, lists, place, onClick }) => {
    const t = useTranslations();

    return (
        <div className='select'>
            <label htmlFor={id}>
                {label} <span>*</span>
            </label>
            <div className='inner-select'>
                <select className='text-[18px]  font-[500] ' value={value} onChange={onChange} onBlur={onBlur} id={id}>
                    <option value='' className=' !text-[#909090] '>
                        {place}
                    </option>

                    {lists &&
                        lists?.map((e, i) => (
                            <option className='!text-[#111] ' key={i} value={e?.id}>
                                {e?.title || e?.title_en || e?.name_en || e?.name}
                            </option>
                        ))}
                </select>
                <ChevronDown />
            </div>
            <span className='err'> {err?.message && t(err?.message)} </span>
        </div>
    );
};

export const SelectionSearch = ({ setName, type, send, setValueHook, clearErrors, err, id, label, lists, place, onClick }) => {
    const t = useTranslations();
    const [idOther , setidOther] = useState()
    const [search, setSearch] = useState('');
    const [other, setOther] = useState(false);
    const [Value, setValue] = useState(place);
    const [Show, setShow] = useState(false);
    const [Data, setData] = useState(lists);
    const [field, setField] = useState('');
    const [new_model, setnew_model] = useState('');
    const selectRef = useRef(null);
    const inputRef = useRef(null);

    // GSAP animation for showing/hiding the input
    useEffect(() => {
        if (other) {
            gsap.to(inputRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.3,
                ease: 'power2.out',
            });
        } else {
            gsap.to(inputRef.current, {
                opacity: 0,
                y: -20,
                duration: 0.3,
                ease: 'power2.in',
                onComplete: () => setShow(false),
            });
        }
    }, [other]);

    // Filter data based on search
    useEffect(() => {
        if (search) {
            const filteredData = lists?.filter(item => (item.title || item.title_en || item.name_en || item.name).toLowerCase().includes(search.toLowerCase()));
            // Always include the "Other" option in the filtered data
            const otherOption = lists?.find(item => item.name === 'other' || item.name_en === 'other');
            if (otherOption) {
                setData([...filteredData, otherOption]);
            } else {
                setData(filteredData);
            }
        } else {
            setData(lists);
        }
    }, [search, lists]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = event => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setShow(false);
                setOther(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Handle selection of an item
    const handleValue = e => {
        setidOther(e?.id)
        if (other == true) setOther(false);

        if (e?.name_en?.toLowerCase() == 'other' || e?.name?.toLowerCase() == 'other') {
            setOther(true);
            setShow(false);
        } else {
            setShow(false);
            setValue(e.title || e.title_en || e.name || e.name_en);
            setName(e.title || e.title_en || e.name || e.name_en);
            setValueHook(type, e.id);
            clearErrors(type);
            setSearch('');
        }
    };

    // Handle adding a new item
    const handleClickNewModel = () => {
        setShow(false);
        setValue(new_model);
        setValueHook('new_model', new_model);
        setValueHook(type, idOther );
        setName(new_model);
        clearErrors(type);
        setSearch('');
        setOther(false);
        setField('');
    };

    const handleCancelInput = () => {
        setOther(false);
        setField('');
        // setShow(true);
    };

    const handleClearSearch = () => {
        setSearch('');
        setData(lists);
    };

    const handleNewModel = e => {
        setnew_model(e);
    };

    return (
        <div className='w-full'>
            <label htmlFor={id}>
                {label} <span>*</span>
            </label>

            <div className='w-full h-[50px] relative' ref={selectRef}>
                <div onClick={() => setShow(!Show)} className='w-full h-[50px] border-[1px] border-[#a7a7a7] rounded-[8px] flex items-center justify-between p-[5px] px-[10px] cursor-pointer hover:bg-[#fcfcfc] duration-300'>
                    <h1 className={`text-[18px] opacity-60  ${Value == place ? "font-[400]" : 'font-[500] !opacity-80 '} `}>{Value}</h1>
                    <ChevronDown className='stroke-[#909090]' />
                </div>

                {!other && (
                    <div
                        className='border-[#a7a7a7] border-[1px] rounded-[10px] custom-select duration-300 absolute top-[102%] bg-white z-[100] max-h-[400px] w-full overflow-auto shadow-lg'
                        style={{
                            clipPath: Show ? 'polygon(-130% -130%, 130% 0, 130% 130%, 0 130%)' : 'polygon(0 0, 100% 0, 100% 0, 0 0)',
                        }}>
                        <div className='flex items-center justify-center sticky top-0 bg-white z-[200]'>
                            <input type='input' placeholder={t('searchHere')} className='my-[10px] w-[calc(100%-20px)] px-[20px] outline-none h-[50px] border-[1px] !border-[#a7a7a7] rounded-[0px]' onChange={e => setSearch(e.target.value)} value={search} />
                            {search && <X className='cursor-pointer absolute rtl:left-[20px] ltr:right-[20px] w-[20px] stroke-[#909090]' onClick={handleClearSearch} />}
                        </div>

                        {Data &&
                            Data.map((e, i) => (
                                <div onClick={() => handleValue(e)} className='text-[#111] h-[35px] leading-[35px] px-[10px] hover:bg-[#1967d2] hover:text-white duration-150 cursor-pointer' key={i} value={e?.id}>
                                    {e?.title || e?.title_en || e?.name_en || e?.name}
                                </div>
                            ))}
                    </div>
                )}

                {other && (
                    <div ref={inputRef} className='border-[#a7a7a7] shadow-custom border-[1px] w-full z-[10] bg-white p-[10px] rounded-[10px] flex h-fit my-[10px]  items-center gap-[5px] relative  transform translate-y-[-20px]'>
                        <div className='flex items-center gap-[10px] w-full '>
                            <input onChange={e => handleNewModel(e.target.value)} value={new_model} type='text' placeholder={t('newModel')} className='border-[#a7a7a7] !border-[1px]  my-[10px] w-full px-[10px] outline-none h-[35px] !rounded-[8px]' />

                            <div onClick={handleClickNewModel} className=' flex-none w-[35px] h-[35px] rounded-[8px]  hover:opacity-80 duration-300 bg-[#3e64f4] cursor-pointer  flex items-center justify-center'>
                                <SendHorizontal className='stroke-white w-[15px] ' />
                            </div>
                            <div onClick={handleCancelInput} className=' flex-none w-[35px] h-[35px] rounded-[8px]  hover:opacity-80 duration-300 bg-[#ff4d4d] cursor-pointer flex items-center justify-center'>
                                <X className='stroke-white w-[15px] ' />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <span className='err'>{err?.message && t(err?.message)}</span>
        </div>
    );
};
