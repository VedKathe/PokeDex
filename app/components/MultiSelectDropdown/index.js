export default function MultiSelectDropdown({ formFieldName, options }) {
  return (
    <div className="bg-[#C9DDE2] rounded-md p-1">
    <label className="">
      <input type="checkbox" className="hidden peer" />
        <div className="m-2 text-center">
         {"Show the dropdown"}
         </div>
      <div className="m-2  absolute bg-white border rounded-md transition-opacity opacity-0 pointer-events-none peer-checked:opacity-100 peer-checked:pointer-events-auto z-100">
        <ul>
          {options.map((option, i) => {
            return (
              <li key={option}>
                <label className="flex whitespace-nowrap cursor-pointer px-2 py-1 transition-colors hover:bg-blue-100 [&:has(input:checked)]:bg-blue-200">
                  <input
                    type="checkbox"
                    name={formFieldName}
                    value={option}
                    className="cursor-pointer"
                  />
                  <span className="ml-1">{option}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </div>
    </label>
    </div>
  );
}