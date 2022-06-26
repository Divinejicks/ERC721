import { StyledSelectSemi } from "../../common_styles/Fields.styled";

export default function Dropdown({label, value, options, onChange}) {
    return(
        <>
            <label>
                {label}
                <StyledSelectSemi value={value} onChange={onChange}>
                    {options.map((option) => (
                        <option value={option.value}>{option.label}</option>
                    ))}
                </StyledSelectSemi>
            </label>
        </>
    )
}