import avatar from "../images/avatar.png";
import { personLists } from "../data/personLists";
import { useContext } from "react";
import { MainContext } from "../MainContext";
import { useState } from "react";
import EditPanel from "./EditPanel";
import ProfileOptions from "./ProfileOptions";
import ProfileModal from "./ProfileModal";

export default function SidePanel() {
    const { value, setValue } = useContext(MainContext);
    const [openEditPanel, setOpenEditPanel] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [showAddress, setShowAddress] = useState(false);

    return (
        <>
        {openEditPanel ? (
            <EditPanel setOpenEditPanel={setOpenEditPanel} />
        ) : (
            <>
            <div className="h-[10vh] flex justify-between bg-gradient-to-r from-blue-400 to-purple-600 md:px-2 lg:px-5 border-b-2 border-[#9CA3AF]">
            <div
            className="cursor-pointer self-center"
            onClick={() => setOpenEditPanel(true)}
            >
            <img
            src={avatar}
            alt="avatar"
            className="object-fill rounded-full h-[55px] lg:h-[78px] border-2"
            />
            </div>
            <div className="flex self-center">
            <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-white mr-5 cursor-pointer"
            viewBox="0 0 20 20"
            fill="currentColor"
            onClick={() => {
                setOpenModal(true);
                setShowAddress(false);
            }}
            >
            <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
            <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
            </svg>
            <ProfileModal
            open={openModal}
            setOpen={setOpenModal}
            showAddress={showAddress}
            setShowAddress={setShowAddress}
            />
            <ProfileOptions />
            </div>
            </div>
            <div className="h-[15vh] border-b-2 border-[#9CA3AF] relative">
            <label htmlFor="search" className="text-gray-400 focus-within:text-gray-600 block">
            <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 pointer-events-none absolute top-[50%] transform translate-y-[-50%] left-6 z-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            >
            <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
            </svg>
            </label>
            <input
            type="text"
            name="search"
            className="h-[35px] lg:h-[42px] w-[95%] rounded-[50px] border-2 border-[#9CA3AF] pl-11 py-4 absolute top-[50%] translate-y-[-50%] ml-2 lg:ml-3"
            />
            </div>

            <div className="fixed h-[70vh] w-1/3 overflow-hidden border-r-4 border-[#D1D5DB] flex">
            <ul className="w-full overflow-x-hidden overflow-y-auto list-none pb-3">
            {personLists.map((person) => (
                <div key={person.id}>
                <li
                className="py-4 md:px-1 lg:px-3 cursor-pointer hover:bg-gray-200"
                onClick={() =>
                    setValue({
                        ...value,
                        name: person.name,
                        img: person.avatarImg,
                        cryptoId: person.cryptoId,
                        chatState: true,
                    })
                }
                >
                <div className="grid grid-cols-6 gap-2">
                <div>
                <img
                src={person.avatarImg}
                alt="person avatar"
                className="md:h-[40px] lg:h-[56px] rounded-full object-fill mr-4"
                />
                </div>
                <div className="self-center col-span-5">
                <h1 className="text:base lg:text-lg font-bold">
                {person.name}
                </h1>
                <div>
                <p className="text-xs lg:text-sm text-[#6B7280] truncate">
                {person.message}
                </p>
                </div>
                </div>
                </div>
                </li>
                <hr className="border-[1px] border-[#9CA3AF]" />
                </div>
            ))}
            </ul>
            </div>
            </>
        )}
        </>
    );
};
