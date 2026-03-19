const calculateMonthlyMunafa = (transactions) => {
  const now = new Date();

  const currentMonthTransactions = (transactions || []).filter(t => {
    const d = new Date(t.date);
    return (
      d.getMonth() === now.getMonth() &&
      d.getFullYear() === now.getFullYear()
    );
  });

  let monthBuyWeight = 0;
  let monthBuyPrice = 0;
  let monthSellWeight = 0;
  let monthSellPrice = 0;

  currentMonthTransactions.forEach(t => {
    monthBuyWeight += t.kroyweight;
    monthBuyPrice += t.kroyprice;
    monthSellWeight += t.dailysaleweight;
    monthSellPrice += t.dailysaleprice;
  });

  let monthAvgBuy;

  if (monthBuyWeight > 0) {
    monthAvgBuy = monthBuyPrice / monthBuyWeight;
  } else {
    const lastKroyTransaction = [...(transactions || [])]
      .filter(t => t.kroyweight > 0)
      .sort((a, b) => new Date(b.date) - new Date(a.date))[0];

    if (lastKroyTransaction) {
      monthAvgBuy =
        lastKroyTransaction.kroyprice /
        lastKroyTransaction.kroyweight;
    } else {
      monthAvgBuy = 0;
    }
  }

  const monthAvgSell = monthSellWeight
    ? monthSellPrice / monthSellWeight
    : 0;

  const monthlyMunafa =
    monthSellWeight && monthAvgBuy
      ? Number(
          (monthSellWeight * (monthAvgSell - monthAvgBuy)).toFixed(2)
        )
      : 0;

  return monthlyMunafa;
};

export default calculateMonthlyMunafa;