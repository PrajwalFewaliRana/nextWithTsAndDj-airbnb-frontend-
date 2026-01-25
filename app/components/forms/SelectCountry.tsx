'use client'
import useCountries from "@/app/hooks/useCountries";
import Select from "react-select"

export type SelectCountryValue ={
    label:string;
    value:string;
}

interface SelectCountryProps{
    value?:SelectCountryValue; // value={{ label: "India", value: "IN" }}
    onChange:(value:SelectCountryValue)=>void
}
const SelectCountry:React.FC<SelectCountryProps> = ({value,onChange}) => {
    const {getAll} = useCountries()
  return (
    <>
      <Select value={value} onChange={(value)=>onChange(value as SelectCountryValue)} isClearable placeholder="Anywhere" options={getAll()} />
    </>
  )
}

export default SelectCountry