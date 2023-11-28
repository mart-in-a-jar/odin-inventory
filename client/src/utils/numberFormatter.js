const numberFormatter = new Intl.NumberFormat("no-NO");

export const formatNumber = (number) => {
    if (isNaN(number)) {
        return "";
    }
    return numberFormatter.format(number);
};
