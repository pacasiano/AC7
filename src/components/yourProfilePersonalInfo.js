import React, {useState, useEffect} from "react";


export default function PersonalInfo({accountId, first_name, middle_name, last_name, contact_info, setReloadData, setSuccessAccInfo, setError}) {

    const [isEditPersonalInfo, setEditPersonalInfo] = useState(false);
    const [personalInfo, setPersonalInfo] = useState({
        first_name: null,
        middle_name: null,
        last_name: null,
        contactNo: null
    });

    useEffect(() => {
        setPersonalInfo({
            first_name: first_name,
            middle_name: middle_name,
            last_name: last_name,
            contactNo: contact_info
        })
    }, [first_name, middle_name, last_name, contact_info])
    

    const handlePersonalInfo = (e) => {
        setPersonalInfo({...personalInfo, [e.target.name]: e.target.value});
    }

    // edit personal info
    function editPersonalInfo(e) {
        e.preventDefault();

        if((personalInfo.first_name !== first_name || personalInfo.last_name !== last_name || personalInfo.middle_name !== middle_name || personalInfo.contactNo !== contact_info)&&(personalInfo.contactNo.length === 11)) {
        fetch(`/api/customer/${accountId}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                first_name: personalInfo.first_name,
                middle_name: personalInfo.middle_name,
                last_name: personalInfo.last_name,
                contact_info: personalInfo.contactNo
            })
        })
        .then(res => res.json)
        .then(data => {
            console.log(data)
            setEditPersonalInfo(false);
            setSuccessAccInfo(true);
            setTimeout(() => {
                setSuccessAccInfo(false);
            }, 3000);
            setReloadData((prev) => !prev);
        })
        .catch(err => console.error(err))
        }else {
            setError(true);
            setTimeout(() => {
                setError(false);
            }, 3000);
        }
    }

    return (
        <form onSubmit={editPersonalInfo}>
        <div className="px-1">
            <div className="flex flex-row pb-4 gap-2 pt-4">
                <div className="text-md font-bold">Personal Information</div>
                <button type="button" onClick={()=> setEditPersonalInfo(!isEditPersonalInfo)} className="bg-slate-800 text-white px-2 text-xs rounded">{isEditPersonalInfo ? 'Cancel' : 'Edit'}</button>
                {isEditPersonalInfo && <button type="submit" className="bg-slate-800 text-white px-2 text-xs rounded" >Save</button>}
            </div>

            {!isEditPersonalInfo ? ( 
            <>
            <div className="flex flex-col gap-3">
                <label className="flex flex-col max-w-sm">
                <span className="text-sm font-semibold">First name</span>
                <span className="border-b-2">{first_name}</span>
                </label> 
                <label className="flex flex-col max-w-sm">
                <span className="text-sm font-semibold">Middle name</span>
                <span className="border-b-2">{middle_name === null ? '-' : middle_name === 'null' ? '-' : middle_name}</span>
                </label> 
                <label className="flex flex-col max-w-sm">
                <span className="text-sm font-semibold">Last name</span>
                <span className="border-b-2">{last_name}</span>
                </label>
                <label className="flex flex-col max-w-sm">
                <span className="text-sm font-semibold">Contact number</span>
                <span className="border-b-2">{contact_info}</span>
                </label>
            </div>
            </>
            ):(
            <>
            {/* Edit Personal Information */}
            <div className="flex flex-col gap-3">
                <label className="flex flex-col max-w-sm">
                <span className="text-sm font-semibold">First name</span>
                <input placeholder={first_name} onChange={handlePersonalInfo} name="first_name" className="rounded-sm w-full pl-1"/>
                </label> 
                <label className="flex flex-col max-w-sm">
                <span className="text-sm font-semibold">Middle name</span>
                <input placeholder={middle_name} onChange={handlePersonalInfo} name="middle_name" className="rounded-sm w-full pl-1"/>
                </label> 
                <label className="flex flex-col max-w-sm">
                <span className="text-sm font-semibold">Last name</span>
                <input placeholder={last_name} onChange={handlePersonalInfo} name="last_name" className="rounded-sm w-full pl-1"/>
                </label>
                <label className="flex flex-col max-w-sm">
                <span className="text-sm font-semibold">Contact number</span>
                <input placeholder={contact_info} onChange={handlePersonalInfo} name="contactNo" className="rounded-sm w-full pl-1"/>
                </label>
            </div>
            </>
            )}
        </div>
        </form>

    )
}