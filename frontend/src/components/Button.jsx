import React from "react";

function Button({ value, handelSubmit , name}) {
  return (
    <button
      type="button"
      onClick={handelSubmit}
      name={name}
      className="text-white w-full cursor-pointer bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-xl px-5 py-3 text-center justify-center items-center me-2 mb-2"
    >
      {value}
    </button>
  );
}

export default React.memo(Button);
