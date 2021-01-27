export const isSetEqual = (as, bs) => {
    if (as.size !== bs.size) return false;
    for (var a of as) if (!bs.has(a)) return false;
    return true;
}

export const getLastValue = (set) => {
    let value;
    for (value of set);
    return value;
}