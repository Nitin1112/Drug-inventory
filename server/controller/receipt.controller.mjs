import Receipt from "../models/receipt.model.mjs";

const generateReceiptNumber = async () => {
    const now = new Date();
    const baseReceiptNumber = `REC${now.getFullYear()}${(now.getMonth() + 1)
        .toString()
        .padStart(2, "0")}${now.getDate()
            .toString()
            .padStart(2, "0")}${now.getHours()
                .toString()
                .padStart(2, "0")}${now.getMinutes()
                    .toString()
                    .padStart(2, "0")}${now.getSeconds().toString().padStart(2, "0")}`;

    // Fetch the last count from the database
    const lastReceipt = await Receipt.findOne().sort({ createdAt: -1 });
    let lastCount = lastReceipt ? parseInt(lastReceipt.receiptNumber.slice(-6)) : 0;

    // Increment the count
    const newCount = (lastCount + 1).toString().padStart(6, "0");

    // Combine base receipt number with incremented count
    return `${baseReceiptNumber}${newCount}`;
};

console.log(await generateReceiptNumber());
