import React from 'react';

interface IconProps {
    backgroundSrc?: string;
    foregroundSrc?: string;
}

const Icon: React.FC<IconProps> = ({
    backgroundSrc,
    foregroundSrc,
}) => {
    return (
        <div className={`main-container w-[257.4px] h-[300px] bg-[url(${backgroundSrc})] bg-[length:100%_100%] bg-no-repeat relative mx-auto my-0`} />
    );
};

export default Icon;