import { Listbox } from "@headlessui/react";
import { Fragment } from "react";
import Checkmark from "./Checkmark";

const Multiselect = ({
    options,
    value,
    onChange,
    label,
    placeholder,
    disabled,
}) => {
    return (
        <div className="form-control w-80 relative">
            <Listbox
                value={value}
                onChange={onChange}
                multiple
                disabled={disabled}
            >
                <Listbox.Label className="label">{label}</Listbox.Label>
                <Listbox.Button
                    className={
                        "select select-bordered items-center truncate block text-left"
                    }
                >
                    {value.map((val) => val.name).join(", ") || placeholder}
                </Listbox.Button>
                <Listbox.Options className="border border-customSelect-border rounded-lg p-2 focus:outline-none max-h-60 overflow-auto absolute w-full mt-1 bg-base-100 top-full">
                    {options.map((option, n) => {
                        return (
                            <Listbox.Option
                                key={n}
                                value={option}
                                as={Fragment}
                            >
                                {({ active, selected }) => {
                                    return (
                                        <li
                                            className={`cursor-pointer py-1 pr-0 pl-8 truncate relative align-middle ${
                                                active
                                                    ? "bg-customSelect-active"
                                                    : ""
                                            } ${
                                                selected
                                                    ? "font-medium"
                                                    : "font-normal"
                                            }`}
                                        >
                                            {selected && (
                                                <span className="absolute top-1 bottom-0 left-0 pl-2 fill-primary flex items-center">
                                                    <Checkmark />
                                                </span>
                                            )}
                                            {option.name}
                                        </li>
                                    );
                                }}
                            </Listbox.Option>
                        );
                    })}
                </Listbox.Options>
            </Listbox>
        </div>
    );
};

export default Multiselect;
