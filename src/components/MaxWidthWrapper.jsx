import React from 'react';

const MaxWidthWrapper = ({ children }) => {
    return (
        <div className="w-[375px] h-screen mx-auto bg-gray-50 rounded-2xl">
            {children}
        </div>
    );
};

export default MaxWidthWrapper;
