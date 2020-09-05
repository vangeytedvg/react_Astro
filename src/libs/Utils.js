/*
    Utils.js
    Utility functions
*/

export const fixToTwoDigits = (data) => {
    if (!data) return;
    let convert = data;
    return convert.toFixed(2);
};

export const fixToFourDigits = (data) => {
    if (!data) return;
    let convert = data;
    return convert.toFixed(4);
};