// function ------------------------------------------------>
const nameFormatter = (name) => {
    if (typeof name !== 'string') {
        throw new Error('Name must be a string!');
    }

    const normalizedName = name.trim().toLowerCase();

    if (normalizedName === '') {
        throw new Error('Name must not be empty!');
    }

    return normalizedName
        .split(' ')
        .filter((empty) => empty !== '')
        .map((word) => word.charAt(0).toLocaleUpperCase() + word.slice(1))
        .join(' ');
};

// export module ------------------------------------------->
export default nameFormatter;
