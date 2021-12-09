import { getPrincipalCurrency, getTokenPrice, nationalBadgeDictionary } from "./GlobalFunctions";

export const getSelectedBadges = (setSelectedBadges) => {
    setSelectedBadges([
        {
            id: 3,
            value: "600",
        },
        {
            id: 2,
            value: "2,9",
        },
        {
            id: 0,
            value: "0,00002",
        },
    ]);
}

export const getLinkedAccounts = () => {
    return [
        {
            id: 1,
            name: "Brubank",
            balance: "1600",
            currency: "ARS",
            color: "#6440D9",
        },
        {
            id: 2,
            name: "Ualá",
            balance: "2900",
            currency: "ARS",
            color: "#3C67F6",
        },
        {
            id: 3,
            name: "BBVA Francés",
            balance: "2100",
            currency: "ARS",
            color: "#005096",
        },
        {
            id: 6,
            name: "Macro",
            balance: "3000",
            currency: "ARS",
            color: "#017DBC",
        },
        {
            id: 4,
            name: "Binance",
            balance: "0.0004",
            currency: "BTC",
            color: "#E8B30B",
        },
        {
            id: 5,
            name: "Mdex",
            balance: "27",
            currency: "MDX",
            color: "#0E1752",
        },
    ];
}

export const getAccountsSeries = (accounts, usdValue) => {
    let series = [];
    const principalCurrency = getPrincipalCurrency();

    accounts.forEach(account => {
        console.log(account);

        //? In case the account isn't in the principal currency, we need to know the account value in the principal currency
        if (account.currency === principalCurrency.toUpperCase()) {
            series.push(parseFloat(account.balance));
        } else {
            if (nationalBadgeDictionary.includes(account.currency)) {
                series.push(parseFloat(account.balance) * usdValue);
            } else {
                getTokenPrice(account.currency).then(res => {
                    console.log(res);
                    series.push(parseFloat((account.balance * (res * usdValue)).toFixed(2)));
                });
            }
        }
    });
    return series;
}

export const getOptionsLabels = (accounts) => {
    let labels = [];
    accounts.forEach(account => {
        labels.push(account.name);
    });
    return labels;
}

export const getOptionsColors = (accounts) => {
    let colors = [];
    accounts.forEach(account => {
        colors.push(account.color);
    });
    return colors;
}